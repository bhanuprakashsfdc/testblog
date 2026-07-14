import logging
from typing import Any, Dict

from ..engine.step import Step
from ..engine.workflow import WorkflowEngine
from ..guard.idempotency import IdempotencyGuard
from ..integrations.blog import BlogIntegration
from ..integrations.github import GitHubIntegration
from ..integrations.gsc import GoogleSearchConsoleIntegration
from ..integrations.sheets import SheetsIntegration
from ..integrations.social import SocialIntegration
from ..recovery.healing import SelfHealingExecutor

logger = logging.getLogger(__name__)


class LoopRunner:
    def __init__(self) -> None:
        self.github = GitHubIntegration()
        self.blog = BlogIntegration()
        self.gsc = GoogleSearchConsoleIntegration()
        self.social = SocialIntegration()
        self.sheets = SheetsIntegration()
        self.healing = SelfHealingExecutor(None)

    def run(self) -> Dict[str, Any]:
        steps = [
            Step(name="repository_analyzed", func=self.github.analyze_repository),
            Step(name="knowledge_graph_created", func=self.blog.create_knowledge_graph, dependencies=["repository_analyzed"]),
            Step(name="topic_selected", func=self.blog.select_topic, dependencies=["knowledge_graph_created"]),
            Step(name="research_completed", func=self.blog.research_topic, dependencies=["topic_selected"]),
            Step(name="blog_generated", func=self.blog.generate_blog, dependencies=["research_completed"], output_key="current_blog"),
            Step(name="image_generated", func=self.blog.generate_image, dependencies=["blog_generated"]),
            Step(name="sitemap_updated", func=self.blog.update_sitemap, dependencies=["blog_generated"]),
            Step(name="commit_created", func=self.github.create_commit, dependencies=["sitemap_updated"]),
            Step(name="branch_created", func=self.github.create_branch, dependencies=["commit_created"]),
            Step(name="pull_request_created", func=self.github.create_pull_request, dependencies=["branch_created"]),
            Step(name="gsc_submitted", func=self.gsc.submit_url, dependencies=["pull_request_created"], independent=True),
            Step(name="social_created", func=self.social.create_posts, dependencies=["pull_request_created"], independent=True),
        ]

        engine = WorkflowEngine(workflow_id="blog-loop", steps=steps)
        self.healing.state = engine.state
        context: Dict[str, Any] = {}
        return engine.execute(context)
