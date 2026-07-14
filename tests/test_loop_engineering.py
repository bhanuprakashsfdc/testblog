import unittest
from src.engine.state import StateManager
from src.engine.checkpoint import CheckpointManager
from src.engine.workflow import WorkflowEngine
from src.engine.step import Step
from src.recovery.retry import retry, FailureRecovery
from src.guard.idempotency import IdempotencyGuard
from src.loop.runner import LoopRunner


class TestStateManager(unittest.TestCase):
    def setUp(self):
        import os
        if os.path.exists("automation/state.json"):
            os.remove("automation/state.json")
        self.state = StateManager()

    def test_default_state(self):
        self.assertIsNone(self.state.get("execution_id"))
        self.assertEqual(self.state.get("completed_steps"), [])

    def test_mark_step_completed(self):
        self.state.mark_step_completed("repository_analyzed")
        self.assertTrue(self.state.is_step_completed("repository_analyzed"))
        self.assertIn("repository_analyzed", self.state.get("completed_steps"))

    def test_mark_step_failed(self):
        self.state.mark_step_failed("gsc_submitted")
        self.assertTrue(self.state.is_step_failed("gsc_submitted"))


class TestCheckpointManager(unittest.TestCase):
    def test_save_and_load(self):
        cm = CheckpointManager("exec-123")
        cm.save("repository_analyzed", {"result": "ok"})
        self.assertTrue(cm.exists("repository_analyzed"))
        data = cm.load("repository_analyzed")
        self.assertEqual(data["step_name"], "repository_analyzed")
        self.assertEqual(data["data"]["result"], "ok")


class TestWorkflowEngine(unittest.TestCase):
    def setUp(self):
        import os
        if os.path.exists("automation/state.json"):
            os.remove("automation/state.json")

    def test_execute_sequential(self):
        results = []

        def step1(ctx, state):
            results.append(1)
            return None

        def step2(ctx, state):
            results.append(2)
            return "output"

        steps = [
            Step(name="step1", func=step1),
            Step(name="step2", func=step2, dependencies=["step1"], output_key="step2_output"),
        ]
        engine = WorkflowEngine(workflow_id="test", steps=steps)
        context = engine.execute({})
        self.assertEqual(results, [1, 2])
        self.assertEqual(context.get("step2_output"), "output")

    def test_execute_continues_after_failure(self):
        results = []

        def good_step(ctx, state):
            results.append("good")
            return None

        def bad_step(ctx, state):
            results.append("bad")
            raise RuntimeError("fail")

        def independent_step(ctx, state):
            results.append("independent")
            return None

        steps = [
            Step(name="good_step", func=good_step),
            Step(name="bad_step", func=bad_step, dependencies=["good_step"]),
            Step(name="independent_step", func=independent_step, dependencies=["good_step"], independent=True),
        ]
        engine = WorkflowEngine(workflow_id="test", steps=steps)
        context = engine.execute({})
        self.assertIn("good", results)
        self.assertIn("bad", results)
        self.assertIn("independent", results)
        self.assertTrue(engine.state.is_step_failed("bad_step"))
        self.assertTrue(engine.state.is_step_completed("independent_step"))


class TestRetry(unittest.TestCase):
    def test_retry_success_on_third(self):
        attempts = []

        @retry(max_attempts=4, initial_delay=0.01)
        def flaky():
            attempts.append(1)
            if len(attempts) < 3:
                raise RuntimeError("fail")
            return "ok"

        self.assertEqual(flaky(), "ok")
        self.assertEqual(len(attempts), 3)

    def test_retry_exhausted(self):
        @retry(max_attempts=2, initial_delay=0.01)
        def always_fail():
            raise RuntimeError("fail")

        with self.assertRaises(RuntimeError):
            always_fail()


class TestFailureRecovery(unittest.TestCase):
    def test_diagnose_timeout(self):
        self.assertEqual(FailureRecovery.diagnose(RuntimeError("timeout")), "timeout")

    def test_diagnose_rate_limit(self):
        self.assertEqual(FailureRecovery.diagnose(RuntimeError("rate limit 429")), "rate_limit")

    def test_diagnose_unknown(self):
        self.assertEqual(FailureRecovery.diagnose(RuntimeError("weird")), "unknown")


class TestIdempotencyGuard(unittest.TestCase):
    def test_blog_exists(self):
        from unittest.mock import MagicMock
        state = MagicMock()
        state.get.return_value = "blog-slug"
        self.assertTrue(IdempotencyGuard.blog_exists(state))

    def test_social_posted(self):
        from unittest.mock import MagicMock
        state = MagicMock()
        state.get.return_value = "completed"
        self.assertTrue(IdempotencyGuard.social_posted(state))


class TestLoopRunner(unittest.TestCase):
    def test_runner_instantiation(self):
        runner = LoopRunner()
        self.assertIsNotNone(runner)


if __name__ == "__main__":
    unittest.main()
