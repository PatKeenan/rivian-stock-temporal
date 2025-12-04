# Temporal Activities

Activities are the atoms within an larger temporal workflow. They are individual units of work that can be executed independently. They are usually also the points of failure for a workflow.

It's important to remember that activities have side effects. They can mutate state, make API calls, or perform other operations that can affect the outside world or the workflow itself.

- Perform actual side effects.
- Call APIs.
- Query databases.
- Perform I/O.
- Run ML models.
- Write files.
- Log.
- Do CPU-heavy work.
- Are retried automatically.
- Are stateless.
