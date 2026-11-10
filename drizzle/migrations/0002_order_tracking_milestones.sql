ALTER TABLE public.orders
  ADD COLUMN confirmed_at timestamptz,
  ADD COLUMN processing_at timestamptz,
  ADD COLUMN shipped_at timestamptz,
  ADD COLUMN delivered_at timestamptz,
  ADD COLUMN status_updated_at timestamptz;

UPDATE public.orders SET confirmed_at = created_at, status_updated_at = created_at;

CREATE OR REPLACE FUNCTION public.order_status_rank(value text)
RETURNS integer LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT CASE value WHEN 'Placed' THEN 0 WHEN 'Confirmed' THEN 0 WHEN 'Processing' THEN 1 WHEN 'Shipped' THEN 2 WHEN 'Delivered' THEN 3 ELSE -1 END;
$$;

CREATE OR REPLACE FUNCTION public.track_order_status()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE next_rank integer; previous_rank integer;
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.status := 'Confirmed';
    NEW.created_at := now();
    NEW.confirmed_at := now();
    NEW.status_updated_at := now();
    NEW.processing_at := NULL;
    NEW.shipped_at := NULL;
    NEW.delivered_at := NULL;
  ELSE
    NEW.confirmed_at := OLD.confirmed_at;
    NEW.processing_at := OLD.processing_at;
    NEW.shipped_at := OLD.shipped_at;
    NEW.delivered_at := OLD.delivered_at;
    NEW.status_updated_at := OLD.status_updated_at;
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      next_rank := public.order_status_rank(NEW.status);
      previous_rank := public.order_status_rank(OLD.status);
      IF next_rank < 0 OR next_rank <> previous_rank + 1 THEN
        RAISE EXCEPTION 'Order status must advance one stage: Confirmed, Processing, Shipped, Delivered';
      END IF;
      NEW.status_updated_at := now();
      IF next_rank = 1 THEN NEW.processing_at := now(); END IF;
      IF next_rank = 2 THEN NEW.shipped_at := now(); END IF;
      IF next_rank = 3 THEN NEW.delivered_at := now(); END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER orders_tracking BEFORE INSERT OR UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.track_order_status();
COMMENT ON COLUMN public.orders.status IS 'Fulfillment status: Confirmed, Processing, Shipped, Delivered. Legacy Placed means Confirmed. Updates remain privileged; shoppers have SELECT/INSERT only.';