import argparse
import logging

from src.loop.runner import LoopRunner
from src.loop.watcher import LoopWatcher


def main() -> None:
    parser = argparse.ArgumentParser(description="Loop Engineering - Autonomous Blog Generation")
    parser.add_argument("--run", action="store_true", help="Run a single execution")
    parser.add_argument("--watch", action="store_true", help="Start continuous loop watcher")
    parser.add_argument("--poll-interval", type=int, default=60, help="Poll interval in seconds for watcher")
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )

    runner = LoopRunner()
    if args.run:
        runner.run()
    elif args.watch:
        watcher = LoopWatcher(runner)
        watcher.watch(poll_interval=args.poll_interval)
    else:
        runner.run()


if __name__ == "__main__":
    main()
