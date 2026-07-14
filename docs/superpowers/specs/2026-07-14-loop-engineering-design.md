# Loop Engineering: Failure Recovery & Resume — Design

## 1. Problem
A fully autonomous blog-generation loop that can run unattended for years without manual intervention. Any failure—API timeout, network issue, rate limiting, build/deployment failure, process crash—must be recoverable by resuming from the last checkpoint, not restarting from scratch.

## 2. Scope
Build the **complete autonomous blog loop** with failure recovery from scratch. Includes: workflow orchestration, step execution, state persistence, checkpointing, retry with exponential backoff, self-healing, idempotency, and a continuous GitHub-PR-driven loop.

## 3. Architecture
```
.github/workflows/loop.yml
automation/
  state.json
  checkpoints/
    <execution_id>.json
  logs/
    <execution_id>.log
src/
  engine/
    workflow.py
    step.py
    state.py
    checkpoint.py
  recovery/
    retry.py
    healing.py
  guard/
    idempotency.py
  integrations/
    github.py
    blog.py
    gsc.py
    social.py
    sheets.py
  loop/
    watcher.py
    runner.py
tests/
```

## 4. Components
- **Workflow Engine**: Defines steps, execution order, and dependencies. Loads state, identifies the next incomplete step, and resumes from there.
- **State Manager**: Reads/writes `automation/state.json`. Tracks execution_id, workflow_id, current_iteration, current_step, completed_steps, pending_steps, failed_steps, retry_count, last_successful_timestamp, current_blog, current_branch, repository_commit, deployment_status, indexing_status, social_status.
- **Checkpoint Manager**: Writes a JSON checkpoint after every completed step. Checkpoints include step result, timestamp, and output references.
- **Retry & Self-Healing**: Wraps external calls with exponential backoff. Diagnoses errors, attempts automatic repair (e.g., regenerate failed artifact, retry API), validates output, then continues. Independent tasks proceed even if one fails; workflow marked partially completed and scheduled for automatic retry.
- **Idempotency Guard**: Before performing any action, checks current state to prevent duplicates (duplicate blogs, duplicate PRs, duplicate social posts, duplicate sitemap entries, duplicate sheet rows).
- **Continuous Loop**: Watches for merged PRs into `develop`. Starts a new execution on merge. If interrupted, resumes from the latest checkpoint. Runs forever.

## 5. Data Flow
1. Loop watcher detects merged PR → starts new execution
2. Load `state.json`; if existing execution is incomplete, resume
3. Execute next step
4. On success: save checkpoint, update `state.json`, proceed to next step
5. On failure: retry with backoff up to 4 attempts
6. If still failing: log failure, continue with independent tasks, mark step failed, save checkpoint
7. Repeat until all steps complete or workflow is partially completed
8. Return to watcher state

## 6. Error Handling
- Every external API call wrapped in retry decorator: attempt 1 → 2 → 3 → exponential backoff → final attempt → store failure → continue independent tasks → mark partially completed → schedule retry
- Step outputs validated before proceeding
- Partial outputs regenerated only if invalid
- No duplicate actions due to idempotency checks

## 7. Storage
- `automation/state.json`: current execution metadata
- `automation/checkpoints/<execution_id>.json`: per-step checkpoint data
- `automation/logs/<execution_id>.log`: structured execution logs

## 8. Execution Steps (canonical)
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
