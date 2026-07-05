#!/usr/bin/env python3
"""Validate an HTML paper-card artifact and its local image assets."""

from __future__ import annotations

import argparse
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

from PIL import Image


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate HTML and image assets.")
    parser.add_argument("--html", required=True, help="Path to final HTML artifact.")
    parser.add_argument("--warn-tall-ratio", type=float, default=2.2, help="Warn when image height/width exceeds this ratio.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    html_path = Path(args.html)
    html = html_path.read_text(encoding="utf-8")
    HTMLParser().feed(html)

    image_sources = re.findall(r'<img[^>]+src="([^"]+)"', html)
    missing: list[str] = []
    warnings: list[str] = []

    for src in image_sources:
        clean = urlparse(src).path
        path = html_path.parent / clean
        if not path.exists():
            missing.append(src)
            continue
        image = Image.open(path)
        ratio = image.height / max(image.width, 1)
        if "figure" in path.name.lower() and ratio > args.warn_tall_ratio:
            warnings.append(f"{src} looks too tall for a figure crop: {image.width}x{image.height}")
        print(f"{src}: {image.width}x{image.height}, {path.stat().st_size} bytes")

    print(f"images={len(image_sources)} missing={missing} html_parse=ok")
    if warnings:
        print("warnings:")
        for warning in warnings:
            print(f"- {warning}")
    if missing:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
