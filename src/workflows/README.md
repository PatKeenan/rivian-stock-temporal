# Temporal Workflows

A workflow is a long-running, durable “agent” that manages logic, state, decisions, loops, scheduling, and the orchestration of activities. It contains no side effects itself — all real work is delegated to activities.

- Maintain state across minutes/hours/days/months/years
- Run deterministic logic (no randomness or direct I/O inside them)
- Can loop forever (e.g., every hour, every day)
- Can call activities in any order
- Can branch logic based on results
- Can be signaled to change behavior
- Can expose queries so you can inspect state
- Survive worker crashes and resume instantly
- Are orchestrated by Temporal Server, not by the worker

🔗 Workflows connect and orchestrate activities
