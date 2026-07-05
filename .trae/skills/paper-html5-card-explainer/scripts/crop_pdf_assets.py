#!/usr/bin/env python3
"""Crop paper figures/tables from a PDF using an explicit JSON crop plan.

Plan format:
{
  "items": [
    {
      "name": "figure-1-overview-crop",
      "page": 2,
      "box": [50, 42, 545, 292],
      "kind": "figure"
    }
  ]
}
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import fitz


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Crop precise figure/table assets from a PDF.")
    parser.add_argument("--pdf", required=True, help="Path to source PDF.")
    parser.add_argument("--plan", required=True, help="Path to crop plan JSON.")
    parser.add_argument("--out-dir", default="artifacts/paper-assets", help="Output asset directory.")
    parser.add_argument("--scale", type=float, default=3.0, help="Render scale. 3.0 is usually enough for web.")
    return parser.parse_args()


def validate_item(item: dict) -> None:
    required = {"name", "page", "box"}
    missing = required - set(item)
    if missing:
        raise ValueError(f"Crop item missing required fields: {sorted(missing)}")
    if len(item["box"]) != 4:
        raise ValueError(f"Crop item {item['name']} must have a 4-value box.")
    if item.get("kind") == "figure" and "crop" not in item["name"]:
        raise ValueError(f"Figure asset {item['name']} should use a crop-specific filename.")


def main() -> None:
    args = parse_args()
    pdf_path = Path(args.pdf)
    plan_path = Path(args.plan)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    plan = json.loads(plan_path.read_text(encoding="utf-8"))
    items = plan.get("items", [])
    if not items:
        raise ValueError("Crop plan must contain a non-empty items list.")

    doc = fitz.open(pdf_path)
    for item in items:
        validate_item(item)
        page_no = int(item["page"])
        page = doc[page_no - 1]
        rect = fitz.Rect(*item["box"]) & page.rect
        if rect.is_empty:
            raise ValueError(f"Crop item {item['name']} produced an empty rectangle.")
        pix = page.get_pixmap(matrix=fitz.Matrix(args.scale, args.scale), clip=rect, alpha=False)
        out_path = out_dir / f"{item['name']}.png"
        pix.save(out_path)
        print(
            f"{out_path.name}: page={page_no} "
            f"crop={tuple(round(v, 1) for v in rect)} "
            f"pixels={pix.width}x{pix.height} bytes={out_path.stat().st_size}"
        )


if __name__ == "__main__":
    main()
