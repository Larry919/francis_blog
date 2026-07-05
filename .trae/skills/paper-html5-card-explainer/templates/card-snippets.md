# HTML Card Snippets

Use these snippets to fill placeholders in `templates/html5-card-template.html`.

## Claim Card

```html
<article class="card {{OPTIONAL_COLOR_CLASS}}">
  <div class="kicker">Conclusion {{N}}</div>
  <h3>{{CLAIM_TITLE}}</h3>
  <p>{{CLAIM_EXPLANATION}}</p>
  <span class="source">{{EVIDENCE_SOURCE}}</span>
</article>
```

## Method Card

```html
<article class="card {{OPTIONAL_WIDTH_OR_COLOR_CLASS}}">
  <div class="kicker">{{TECHNICAL_POINT_LABEL}}</div>
  <h3>{{TECHNICAL_POINT_TITLE}}</h3>
  <p>{{DEFINITION_MECHANISM_TRADEOFF_BOUNDARY}}</p>
  <span class="source">{{PAGE_OR_SECTION_SOURCE}}</span>
</article>
```

## Formula Card

```html
<article class="card wide">
  <div class="kicker">Formula</div>
  <h3>{{FORMULA_TITLE}}</h3>
  <div class="formula">{{FORMULA_TEXT}}</div>
  <p>{{VARIABLE_EXPLANATION_AND_INTUITION}}</p>
  <span class="source">{{FORMULA_SOURCE}}</span>
</article>
```

## Figure/Table Card

Use this for every original figure/table asset. The screenshot must be a precise crop.

```html
<article class="card full">
  <div class="kicker">{{FIGURE_OR_TABLE_ID}} · {{SHORT_NAME}}</div>
  <h3>{{VISUAL_CARD_TITLE}}</h3>
  <div class="paper-figure">
    <div class="paper-shot">
      <img src="paper-assets/{{PRECISE_CROP_ASSET}}?v={{CACHE_VERSION}}" alt="{{ALT_TEXT}}" loading="lazy">
    </div>
    <div class="paper-notes">
      <div class="note-block"><b>看什么</b><p>{{WHAT_TO_LOOK_AT}}</p></div>
      <div class="note-block"><b>说明什么</b><p>{{WHAT_IT_SUPPORTS}}</p></div>
      <div class="note-block"><b>不要误读</b><p>{{MISREADING_OR_LIMITATION}}</p></div>
      <span class="source">原图/原表：{{FIGURE_OR_TABLE_ID}}，第{{PAGE_NO}}页</span>
    </div>
  </div>
</article>
```

## Evidence Card

```html
<article class="card wide {{OPTIONAL_COLOR_CLASS}}">
  <div class="kicker">{{EVIDENCE_TYPE}}</div>
  <h3>{{EVIDENCE_TITLE}}</h3>
  <p>{{KEY_COMPARISON_AND_NUMBERS}}</p>
  <p>{{WHAT_THE_EVIDENCE_DOES_NOT_PROVE}}</p>
  <span class="source">{{TABLE_OR_SECTION_SOURCE}}</span>
</article>
```

## Pitfall Card

```html
<article class="card red">
  <div class="kicker">Failure Mode</div>
  <h3>{{FAILURE_MODE_TITLE}}</h3>
  <p>{{WHY_IT_FAILS_AND_HOW_TO_DETECT_IT}}</p>
  <span class="source">{{SOURCE_OR_ASSUMPTION}}</span>
</article>
```
