CREATE OR REPLACE FUNCTION public.price_order()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE prices int[] := ARRAY[2900,1450,2200,420,2350,980,860,740,1980,690,1120,1340];
DECLARE t int := 0; i int;
BEGIN
  IF jsonb_typeof(NEW.items) <> 'array' OR jsonb_array_length(NEW.items) = 0 THEN
    RAISE EXCEPTION 'Order must contain items';
  END IF;
  FOR i IN SELECT (x)::int FROM jsonb_array_elements_text(NEW.items) x LOOP
    IF i < 0 OR i > 11 THEN RAISE EXCEPTION 'Unknown item'; END IF;
    t := t + prices[i + 1];
  END LOOP;
  NEW.total := t;
  NEW.status := 'Placed';
  RETURN NEW;
END $$;
CREATE TRIGGER orders_price BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.price_order();