#!/usr/bin/env python3
"""Build public/order.pdf from /tmp/book-content.json using PyMuPDF Story."""
from __future__ import annotations

import html
import json
from pathlib import Path

import pymupdf

SRC = Path("/tmp/book-content.json")
OUT = Path("/workspace/public/order.pdf")
PUBLIC = Path("/workspace/public")
CROWN = PUBLIC / "images/crown.jpg"


def esc(s: str) -> str:
    return html.escape(s, quote=True)


def img_tag(src: str, alt: str = "") -> str:
    if src.startswith("/"):
        src = src[1:]
    path = PUBLIC / src
    if not path.exists():
        return ""
    return f'<p class="illum"><img src="{esc(src)}" alt="{esc(alt)}"></p>'


def blocks_html(blocks: list[str]) -> str:
    parts: list[str] = []
    for p in blocks:
        if p.startswith("[[img:"):
            inner = p[6:-2] if p.endswith("]]") else p[6:]
            src, _, alt = inner.partition("|")
            parts.append(img_tag(src, alt or "Illustration from ORDER"))
            continue
        if p.startswith("## "):
            parts.append(f"<h3>{esc(p[3:])}</h3>")
            continue
        if p.startswith("> "):
            rest = p[2:]
            text, sep, ref = rest.partition(" ||| ")
            cite = f'<cite>{esc(ref)}</cite>' if sep else ""
            parts.append(f"<blockquote><p>{esc(text)}</p>{cite}</blockquote>")
            continue
        parts.append(f"<p>{esc(p)}</p>")
    return "\n".join(parts)


def paras(items: list[str]) -> str:
    return "\n".join(f"<p>{esc(p)}</p>" for p in items)


def build_html(data: dict) -> str:
    book = data["book"]
    parts: list[str] = []

    parts.append(
        f"""
<section class="cover">
  {img_tag("/images/crown.jpg", "ORDER")}
  <p class="kicker">A living sanctuary</p>
  <h1 class="title">{esc(book["title"])}</h1>
  <p class="subtitle">{esc(book["subtitle"])}</p>
  <p class="author">By {esc(book["author"])}</p>
  <blockquote class="epi">
    <p>“{esc(book["epigraph"]["text"])}”</p>
    <cite>— {esc(book["epigraph"]["ref"])}</cite>
  </blockquote>
  <p class="ded">{esc(book["dedication"])}</p>
  <p class="pub">{esc(book["publisher"])} · {esc(str(book["year"]))}</p>
</section>
"""
    )

    how = data["howToUse"]
    parts.append(
        f"""
<h2>How to use this book</h2>
<p>{esc(how["feast"])}</p>
<p>{esc(how["notAFormula"])}</p>
<p>{esc(how["repetition"])}</p>
<h3>The three parts</h3>
<p><strong>Part One — Understanding the Battlefield.</strong> {esc(data["partHow"]["one"])}</p>
<p><strong>Part Two — Taking Back Authority.</strong> {esc(data["partHow"]["two"])}</p>
<p><strong>Part Three — Walking in the Light.</strong> {esc(data["partHow"]["three"])}</p>
<h3>Keys to the Order</h3>
"""
    )
    for k in data["fourPrinciples"]:
        parts.append(f"<p><strong>{esc(k['t'])}.</strong> {esc(k['b'])}</p>")

    parts.append("<h2>Contents</h2><ol class='toc'>")
    parts.append("<li>Introduction</li>")
    for c in data["chambers"]:
        parts.append(f"<li>{esc(c['number'])} — {esc(c['title'])}</li>")
    parts.append("<li>Strongholds and Legal Rights Assessment</li>")
    for st in data["steps"]:
        parts.append(f"<li>Step {st['n']} — {esc(st['title'])}</li>")
    parts.append("<li>7 Steps at a Glance</li>")
    parts.append("<li>Walking in the Light</li>")
    parts.append("<li>Prayers and decrees</li>")
    parts.append("<li>Glossary</li>")
    parts.append("<li>About the Author · Acknowledgments</li>")
    parts.append("</ol>")

    parts.append("<h2>Introduction</h2>")
    parts.append(blocks_html(data["bookIntroduction"]))

    parts.append('<h2 class="part">Part One · Understanding the Battlefield</h2>')
    for c in data["chambers"]:
        parts.append(f"<h2>{esc(c['number'])} · {esc(c['title'])}</h2>")
        parts.append(f"<p class='kicker-line'>{esc(c['kicker'])}</p>")
        parts.append(blocks_html(c["teaching"]))
        scr = c.get("scripture") or {}
        if scr.get("text"):
            parts.append(
                f"<blockquote><p>“{esc(scr['text'])}”</p><cite>{esc(scr.get('ref',''))}</cite></blockquote>"
            )
        parts.append("<h3>Ponder</h3><ol>")
        for q in c["ponderings"]:
            parts.append(f"<li>{esc(q)}</li>")
        parts.append("</ol>")
        act = c["activation"]
        parts.append(f"<h3>Activate · {esc(act['title'])}</h3>")
        for line in act["lines"]:
            parts.append(f"<p class='decree'>{esc(line)}</p>")
        ex = c["exercise"]
        parts.append(f"<h3>Exercise · {esc(ex['title'])}</h3>")
        parts.append(f"<p>{esc(ex['prompt'])}</p>")

    parts.append("<h2>Strongholds and Legal Rights Assessment</h2>")
    parts.append(paras(data["assessIntro"]))
    parts.append("<h3>Prayer before beginning</h3>")
    parts.append(paras(data["assessPrayerOpen"]))
    parts.append("<h3>Entry points</h3>")
    for ep in data["entryPoints"]:
        parts.append(f"<h3>{esc(ep['n'])} · {esc(ep['title'])}</h3>")
        parts.append(f"<p class='kicker-line'>{esc(ep['ref'])} — {esc(ep['scripture'])}</p>")
        parts.append("<ol>")
        for q in ep["questions"]:
            parts.append(f"<li>☐ {esc(q)}</li>")
        parts.append("</ol>")
    parts.append("<h3>Prayer</h3>")
    parts.append(paras(data["assessPrayerMid"]))
    parts.append("<h3>Legal rights checklist</h3><ul>")
    for it in data["legalRights"]:
        parts.append(f"<li>☐ {esc(it['label'])}</li>")
    parts.append("</ul>")
    parts.append("<h3>Closing prayer</h3>")
    parts.append(paras(data["assessPrayerClose"]))

    parts.append('<h2 class="part">Part Two · Taking Back Authority</h2>')
    parts.append(blocks_html(data["partTwoIntroduction"]))
    for st in data["steps"]:
        parts.append(f"<h2>Step {st['n']} · {esc(st['title'])}</h2>")
        parts.append(f"<p class='kicker-line'>{esc(st['kicker'])}</p>")
        if st.get("blurb"):
            parts.append(f"<p>{esc(st['blurb'])}</p>")
        parts.append(blocks_html(st["teaching"]))
        parts.append("<h3>Practice</h3>")
        parts.append(f"<p>{esc(st['practice'])}</p>")

    parts.append("<h2>7 Steps at a Glance</h2>")
    glance_row = "".join(img_tag(g["src"], g["alt"]) for g in data["glanceIcons"])
    parts.append(f'<div class="glances">{glance_row}</div>')
    parts.append(blocks_html(data["stepsAtAGlance"]))

    parts.append('<h2 class="part">Part Three · Walking in the Light</h2>')
    parts.append(blocks_html(data["walkingInTheLight"]))

    parts.append("<h2>Prayers and decrees</h2>")
    parts.append("<h3>Prayers</h3>")
    for p in data["prayers"]:
        ref = f"<p class='kicker-line'>{esc(p['ref'])}</p>" if p.get("ref") else ""
        parts.append(f"<h3>{esc(p['title'])}</h3>{ref}<p class='kicker-line'>{esc(p['kicker'])}</p>")
        for line in p["lines"]:
            parts.append(f"<p class='decree'>{esc(line)}</p>")
    parts.append("<h3>Decrees</h3>")
    for p in data["decrees"]:
        ref = f"<p class='kicker-line'>{esc(p['ref'])}</p>" if p.get("ref") else ""
        parts.append(f"<h3>{esc(p['title'])}</h3>{ref}<p class='kicker-line'>{esc(p['kicker'])}</p>")
        for line in p["lines"]:
            parts.append(f"<p class='decree'>{esc(line)}</p>")
    parts.append("<h3>Reassignment prayers</h3>")
    parts.append(paras(data["reassignmentPrayers"]))

    parts.append("<h2>Glossary</h2>")
    for g in data["glossary"]:
        parts.append(f"<p><strong>{esc(g['term'])}.</strong> {esc(g['body'])}</p>")

    parts.append("<h2>About the Author</h2>")
    parts.append(paras(data["aboutTheAuthorBook"]))
    parts.append("<h2>Acknowledgments</h2>")
    parts.append(paras(data["acknowledgments"]))
    parts.append(f"<p class='ded'>{esc(book['dedication'])}</p>")
    parts.append(f"<p class='pub'>{esc(data['disclaimer'])}</p>")
    parts.append(f"<p class='pub'>{esc(book['author'])} · {esc(book['publisher'])} · {esc(str(book['year']))}</p>")

    css = """
@page { size: letter; }
body { font-family: "Liberation Serif", "Times New Roman", serif; font-size: 11pt; line-height: 1.45; color: #2c261c; font-variant-ligatures: none; }
h1.title { font-size: 42pt; letter-spacing: 0.18em; text-align: center; margin: 8pt 0; }
h2 { font-size: 18pt; color: #8a6a28; page-break-before: always; margin: 18pt 0 10pt; }
h2.part { font-size: 22pt; text-align: center; padding-top: 180pt; }
h3 { font-size: 11.5pt; color: #8a6a28; letter-spacing: 0.12em; text-transform: uppercase; margin: 16pt 0 8pt; }
p { margin: 0 0 8pt; }
.kicker { text-align: center; letter-spacing: 0.35em; text-transform: uppercase; font-size: 9pt; color: #8a6a28; }
.kicker-line { font-style: italic; color: #8a6a28; }
.subtitle { text-align: center; font-size: 14pt; font-style: italic; color: #8a6a28; }
.author { text-align: center; font-size: 13pt; }
.ded { text-align: center; font-style: italic; margin-top: 24pt; }
.pub { text-align: center; font-size: 8.5pt; color: #5c5346; }
.cover { text-align: center; padding-top: 48pt; }
.cover img { width: 72pt; height: 72pt; }
blockquote { margin: 12pt 18pt; padding-left: 12pt; border-left: 2pt solid #8a6a28; font-style: italic; }
cite { display: block; font-style: normal; font-size: 8.5pt; letter-spacing: 0.16em; text-transform: uppercase; color: #8a6a28; margin-top: 4pt; }
.illum { text-align: center; margin: 10pt 0; }
.illum img { max-width: 280pt; max-height: 220pt; }
.decree { font-style: italic; margin: 2pt 0; }
.toc { margin: 8pt 0 8pt 18pt; }
.glances { text-align: center; }
"""
    return f"<html><head><style>{css}</style></head><body>{''.join(parts)}</body></html>"


def main() -> None:
    data = json.loads(SRC.read_text())
    html_doc = build_html(data)
    archive = pymupdf.Archive(str(PUBLIC))
    story = pymupdf.Story(html=html_doc, archive=archive)
    writer = pymupdf.DocumentWriter(str(OUT))
    mediabox = pymupdf.paper_rect("letter")
    where = mediabox + (54, 54, -54, -60)
    more = True
    pages = 0
    while more:
        device = writer.begin_page(mediabox)
        more, _filled = story.place(where)
        story.draw(device)
        writer.end_page()
        pages += 1
        if pages > 800:
            raise RuntimeError("PDF exceeded 800 pages — aborting")
    writer.close()
    size = OUT.stat().st_size
    print(f"wrote {OUT} pages={pages} bytes={size}")


if __name__ == "__main__":
    main()
