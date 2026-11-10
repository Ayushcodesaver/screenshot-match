<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Customer accounts use Lovable Cloud auth; profiles and orders are read/written from the browser under per-user RLS, and order totals are priced by a database trigger so the client cannot set prices. Keep item prices in that trigger in sync with src/site/data.ts.
- Order tracking uses database-stamped milestones with sequential privileged status updates; account history polls owner-scoped orders so shoppers cannot alter fulfillment progress.
