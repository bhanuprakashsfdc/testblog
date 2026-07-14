# Loop Engineering - Failure Recovery & Resume

Autonomous blog generation loop with full failure recovery, checkpointing, and unattended operation.

## Features

- **Workflow Engine**: Sequential and parallel step execution with dependency management
- **State Persistence**: Tracks execution progress in `automation/state.json`
- **Checkpointing**: Saves step output after every completed step to `automation/checkpoints/`
- **Retry Logic**: Exponential backoff for all external API calls (1 → 2 → 3 → backoff → final)
- **Self-Healing**: Automatic diagnosis and repair of recoverable errors
- **Idempotency**: Prevents duplicate blogs, PRs, social posts, sitemap entries, and sheet rows
- **Continuous Loop**: Watches for merged PRs into `develop` and resumes from latest checkpoint

## Project Structure

```
src/
  engine/
    state.py          - State management for automation/state.json
    checkpoint.py     - Checkpoint manager for per-step persistence
    step.py           - Step definition with dependencies and output keys
    workflow.py       - Workflow engine with resume capability
  recovery/
    retry.py          - Retry decorator with exponential backoff
    healing.py        - Self-healing executor
  guard/
    idempotency.py    - Idempotency guard to prevent duplicates
  integrations/
    github.py         - GitHub API integration stubs
    blog.py           - Blog generation integration stubs
    gsc.py            - Google Search Console integration stubs
    social.py         - Social media integration stubs
    sheets.py         - Google Sheets integration stubs
  loop/
    watcher.py        - Continuous PR watcher
    runner.py         - Main loop runner
  main.py             - Entry point
automation/
  state.json          - Current execution state
  checkpoints/        - Per-step checkpoint files
  logs/               - Execution logs
tests/
  test_loop_engineering.py
```

## Storage

- `automation/state.json`: Current execution metadata including execution_id, current_step, completed_steps, failed_steps, retry_count, last_successful_timestamp, current_blog, current_branch, repository_commit, deployment_status, indexing_status, social_status
- `automation/checkpoints/<execution_id>_<step>.json`: Per-step checkpoint data
- `automation/logs/<execution_id>.log`: Structured execution logs

## Canonical Workflow Steps

1. Repository analyzed
2. Knowledge graph created
3. Topic selected
4. Research completed
5. Blog generated
6. Image generated
7. Sitemap updated
8. Commit created
9. Google Search Console submitted
10. Social posts created

Steps 1-8 are sequential. Steps 9-10 are independent and can run in parallel after step 8.

## Usage

```bash
# Run a single execution
python3 src/main.py --run

# Start continuous loop watcher
python3 src/main.py --watch --poll-interval 60
```

## Failure Recovery

If execution fails:
1. Detects the last successfully completed step from checkpoints
2. Loads execution state from `automation/state.json`
3. Resumes exactly where execution stopped
4. Never repeats completed steps unless marked invalid
5. Continues remaining independent tasks
6. Marks workflow as partially completed
7. Schedules automatic retry

## Retry Strategy

Every external API call supports retries:
- Attempt 1
- Attempt 2
- Attempt 3
- Exponential backoff
- Final attempt
- If still failing: store failure, continue independent tasks, mark as partially completed, schedule retry

## Testing

```bash
python3 -m unittest tests/test_loop_engineering.py -v
```
