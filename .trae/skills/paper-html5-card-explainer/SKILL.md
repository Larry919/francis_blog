---
name: "paper-html5-card-explainer"
description: "Creates HTML5 card explainers for papers with precise figure/table crops. Invoke when user asks to explain a paper as an HTML card page."
---

# Paper HTML5 Card Explainer

## Purpose

Use this skill to turn a technical paper, arXiv PDF, local PDF, or paper text into a polished HTML5 card-style explainer.

The output must teach the paper through:

- A structured Markdown deep-dive report.
- A self-contained HTML5 card page.
- Precise crops of original paper figures/tables.
- Commentary explaining how to read each figure/table and what evidence it supports.

Invoke this skill for requests like:

- "解读这篇论文，然后写一个 HTML5 卡片形式详细讲解"
- "把这篇 paper 做成卡片式网页"
- "生成带论文原图/表格说明的 HTML 精读报告"
- "整理成可以分享的论文讲解页面"

## Skill Layout

This skill is intentionally organized as a reusable mini-project, not a single long prompt file.

- `SKILL.md`
  - Entry point, workflow, contracts, and quality gates.
- `templates/html5-card-template.html`
  - Default self-contained HTML5 page template.
- `templates/card-snippets.md`
  - Reusable card snippets for claims, methods, formulas, evidence, pitfalls, and original visuals.
- `scripts/crop_pdf_assets.py`
  - PyMuPDF-based precise figure/table cropper driven by a JSON crop plan.
- `scripts/validate_artifact.py`
  - HTML and image asset validator.
- `examples/crop-plan.example.json`
  - Example crop plan showing figure-body and table crop conventions.

## Required First Actions

When this skill is triggered:

1. Use the `pdf` skill if a PDF URL or PDF file is involved.
2. Use `frontend-design` if generating or materially editing the HTML page.
3. Use a paper/document digest skill if the user expects deep explanation.
4. If visual direction matters, offer 2-3 visual directions and recommend one before final implementation.

Do not skip original figure/table handling. A paper explainer is incomplete if it only paraphrases the paper.

## Output Contract

Unless the user explicitly asks otherwise, produce:

- `papers/<paper-id>.pdf`
  - Source PDF downloaded or copied into the workspace.
- `papers/<paper-id>.txt`
  - Extracted full text with page markers.
- `artifacts/paper-assets/`
  - Precise original figure/table crops.
- `reports/<paper-title>-doc-10min-digest.md`
  - Markdown report used as the content source of truth.
- `artifacts/<paper-title>-paper-cards.html`
  - Final self-contained HTML5 card explainer.

The HTML page must be directly openable in a browser. Do not require a frontend build pipeline unless the user asks for one.

## Workflow

1. Acquire the paper.
2. Extract text with page markers.
3. Identify key figures, tables, formulas, methods, experiments, ablations, transfer results, limitations, and conclusion.
4. Create a crop plan for original figures/tables.
5. Render precise crops with `scripts/crop_pdf_assets.py`.
6. Build the Markdown report as the single source of truth.
7. Generate HTML from `templates/html5-card-template.html` and `templates/card-snippets.md`.
8. Validate with `scripts/validate_artifact.py`.
9. Preview through a local static server.
10. Return links to the HTML, Markdown report, assets, and validation results.

## Text Extraction

Use `pdftotext` if available:

```bash
mkdir -p papers reports artifacts artifacts/paper-assets
pdftotext -layout papers/<paper-id>.pdf papers/<paper-id>.txt
```

Fallback to Python `pypdf` when needed:

```python
from pathlib import Path
from pypdf import PdfReader

pdf = Path("papers/<paper-id>.pdf")
out = Path("papers/<paper-id>.txt")
reader = PdfReader(str(pdf))
parts = []

for i, page in enumerate(reader.pages, start=1):
    text = page.extract_text() or ""
    parts.append(f"\n\n=== PAGE {i} ===\n{text}")

out.write_text("\n".join(parts), encoding="utf-8")
print(f"pages={len(reader.pages)} chars={out.stat().st_size}")
```

Record page count and extracted text size.

## Evidence Targeting

Search extracted text for:

- `Figure 1`, `Figure 2`, etc.
- `Table 1`, `Table 2`, etc.
- `Ablation`, `transfer`, `cost`, `limitations`, `conclusion`
- Method section headings.
- Equations and algorithms.
- Appendix details if core results depend on them.

For each important figure/table, record:

- Figure/table ID.
- Page number.
- Caption or table note.
- What the reader should look at.
- What claim the evidence supports.
- What it does not prove.
- Common misreading or limitation.

## Precise Crop Protocol

### Core Rule

Default to precise figure/table crops. Do not use full PDF page screenshots as final assets.

Full-page screenshots are allowed only as temporary debugging artifacts or when boundaries cannot be determined. If used as fallback, explicitly state why.

### Figure Policy

For `Figure` assets:

- Crop the figure body only by default.
- Do not include unrelated section body text.
- Usually do not include long captions inside the screenshot.
- Put caption, explanation, and interpretation in the HTML commentary card.
- If the figure and caption are visually inseparable or the caption contains essential legend semantics, include only the minimal caption lines needed.

### Table Policy

For `Table` assets:

- Crop the full table.
- Include table title/note/caption only if needed to interpret columns, markers, colors, or subscripts.
- Exclude unrelated paragraphs before or after the table.
- If a table spans most of a page, a large crop is acceptable, but it must still remove margins and unrelated body text.

### Coordinate Discovery

Use PyMuPDF text block coordinates to locate captions and nearby content:

```python
import fitz

doc = fitz.open("papers/<paper-id>.pdf")
for page_no in [2, 4, 7]:
    page = doc[page_no - 1]
    print("page", page_no, "rect", page.rect)
    blocks = page.get_text("blocks")
    for block in sorted(blocks, key=lambda b: (b[1], b[0])):
        x0, y0, x1, y1, text, *_ = block
        t = " ".join(text.split())
        if any(k in t for k in ["Figure", "Table", "Model", "Setting", "Benchmark"]):
            print(f"{x0:.1f},{y0:.1f},{x1:.1f},{y1:.1f} :: {t[:160]}")
```

### Crop Plan

Create a JSON crop plan using `examples/crop-plan.example.json` as reference:

```json
{
  "items": [
    {
      "name": "figure-1-overview-crop",
      "page": 2,
      "box": [50, 42, 545, 292],
      "kind": "figure",
      "note": "Figure body only; caption is explained in HTML notes."
    }
  ]
}
```

Render assets:

```bash
python .trae/skills/paper-html5-card-explainer/scripts/crop_pdf_assets.py \
  --pdf papers/<paper-id>.pdf \
  --plan artifacts/paper-assets/crop-plan.json \
  --out-dir artifacts/paper-assets \
  --scale 3.0
```

### Cache Busting

After recropping an image:

- Prefer a new asset file name, such as `figure-1-overview-crop.png`.
- Or add a query string in HTML, such as `figure-1-overview-crop.png?v=2`.
- This avoids browser cache showing stale full-page images.

## Markdown Report Requirements

The Markdown report is the source of truth for the HTML.

Required sections:

1. Content positioning.
2. Full paper logic framework.
3. Core claims and conclusions.
4. Key technical points.
5. Execution/proof flow.
6. Original figure/table guide.
7. Hard points, easy mistakes, failure modes.
8. Applications and landing value.
9. One-sentence final summary.

Quality gates:

- At least 6 conclusions.
- At least 8 technical points.
- At least 2 failure modes or counterexamples.
- At least 3 concrete application scenarios.
- Every major claim cites page, section, figure, or table evidence.

## HTML Generation

Use `templates/html5-card-template.html` as the default page skeleton.

Use `templates/card-snippets.md` to generate:

- Positioning cards.
- Logic/framework cards.
- Claim cards.
- Method cards.
- Formula cards.
- Flow cards.
- Original figure/table cards.
- Experiment evidence cards.
- Pitfall cards.
- Application cards.

Required HTML sections:

1. `论文定位`
2. `全文框架`
3. `核心结论`
4. `方法精讲`
5. `训练与部署流程`
6. `论文原图与原表精读`
7. `实验与证据`
8. `难点、误区与失败模式`
9. `落地价值`
10. `终极总结`

For original visuals, always use the figure/table card snippet. Never embed an image without commentary.

Each original visual must explain:

- `看什么`
- `说明什么`
- `不要误读`
- Source as `原图/原表：Figure/Table X，第Y页`

## Validation

Run:

```bash
python .trae/skills/paper-html5-card-explainer/scripts/validate_artifact.py \
  --html artifacts/<paper-title>-paper-cards.html
```

Before final response, verify:

- PDF was downloaded or available.
- Text extraction succeeded.
- Page count and text size were checked.
- Key figures/tables were identified with page numbers.
- Original figures/tables were rendered into `artifacts/paper-assets/`.
- Figure screenshots are figure-body crops, not full pages.
- Table screenshots include complete tables and necessary notes, but not unrelated paragraphs.
- Recropped images use new file names or cache-busting query strings.
- HTML references all image assets with no missing paths.
- HTML parses successfully.
- The page opens through a local static server.
- Markdown report and HTML are consistent.

## Final Response

In the final user response, include:

- HTML preview URL if a local server is running.
- Link to final HTML file.
- Link to Markdown report.
- Link to original figure/table asset directory.
- Short summary of what was covered.
- Validation results, especially `images=<n>`, `missing=[]`, and `html_parse=ok`.
- Mention whether figure/table crops are precise crops.

## Example From This Workspace

This skill was refined from the SkillOpt paper workflow:

- PDF: `papers/arxiv-2605.23904.pdf`
- Extracted text: `papers/arxiv-2605.23904.txt`
- HTML: `artifacts/skillopt-paper-cards.html`
- Markdown: `reports/SkillOpt-doc-10min-digest.md`
- Original assets: `artifacts/paper-assets/`

Important crop examples:

- `figure-1-overview-crop.png`
  - Figure body only, no following body paragraphs.
- `figure-2-pipeline-crop.png`
  - Pipeline figure body only.
- `figure-4-learned-rules-crop.png`
  - Learned-rule figure body only.
- `table-1-main-results.png`
  - Large but precise table crop because Table 1 occupies most of the page.
- `table-2-3-ablation.png`
  - Combined table crop for hyperparameter and ablation panels.

## Design Principles

- Keep `SKILL.md` as the orchestration contract, not a dumping ground for all templates.
- Put reusable HTML in `templates/`.
- Put repeatable operations in `scripts/`.
- Treat the Markdown report as the content source of truth.
- Preserve original paper evidence instead of only redrawing diagrams.
- Use precise visual crops, not full-page screenshots.
- Keep captions and interpretation in HTML commentary cards unless the caption is essential to the visual.
- Prefer concrete numbers, page references, figure IDs, and table IDs over vague claims.
- Explain not only what the paper says, but how to read the evidence.
- Keep the final HTML self-contained, readable, and shareable.
