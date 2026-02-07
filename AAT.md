# AAT UI v1 Tech Stack

## ✅ Core application

Build / Dev

Vite
Fast dev server + modern bundling. Minimal magic, great long-term maintainability.


Framework

React (SPA)
You already have React experience — no reason to change.


Routing

React Router (v7)
Lightweight, flexible, no framework lock-in.



---

✅ Data + networking

Server state (REST + WebSockets)

TanStack Query (React Query)
Handles:

- fetch lifecycle
Sure — here it is reformatted as GitHub-compatible Markdown (you can paste this straight into a README or docs repo):


---

Frontend Tech Stack Recommendation

Based on our conversation (SPA, React team, GPLv3 OSS core, schema-driven UI, inline rich text, drag/drop, ISO/security, easy theming, Node backend).

This stack is intentionally boring-in-a-good-way: popular, well-maintained, GPL-friendly, and proven for complex authoring tools.


---

✅ Core Application

Build / Dev

Vite
Fast dev server + modern bundling. Minimal magic, great long-term maintainability.


Framework

React (SPA)
Existing team experience — no reason to change.


Routing

React Router (v7)
Lightweight, flexible, no framework lock-in.



---

✅ Data + Networking

Server State (REST + WebSockets)

TanStack Query (React Query)


Handles:

Fetch lifecycle

Caching

Retries

Mutations

Background refetch


Keeps UI logic clean since the app is predominantly server-state driven.

Realtime

Native WebSockets (or Socket.IO if already used server-side)



---

✅ Forms + JSON Schema

Backend owns validation and exposes full JSON Schema.

Schema-driven UI

react-jsonschema-form (RJSF)


Used for:

Auto-generated forms

Property editors

Config panels


Extended with:

Custom widgets (e.g. rich text)

Custom field layouts


Fits the “UI consumes schema, server owns rules” model.


---

✅ Rich Text (Inline Only)

Inline Editor

Tiptap (MIT licensed)


Configured narrowly to allow only:

Bold

Italic

Underline

Link (optional)


Key design choices:

Store Tiptap JSON, not HTML

Single shared <InlineRichText /> component

No document-style features (no tables, headings, etc.)


This replaces CKEditor cleanly and avoids licensing ambiguity.


---

✅ Drag & Drop (Authoring Layouts)

@dnd-kit


Used for:

Block reordering

Page layout builders

Tree structures


Modern, composable, actively maintained.


---

✅ UI Components + Theming

Two viable approaches:

Option A — Faster to Ship

MUI Core


Pros:

Complete component set

Mature theming

CSS variables for per-client reskins

Integrates nicely with RJSF


Avoid MUI X Pro (commercial).


---

Option B — Maximum Visual Control

Radix UI primitives

Custom LESS / CSS on top


Pros:

Fully unstyled primitives

Ideal for custom design systems

Clean separation between behavior and appearance


More work, more control.


---

✅ Tables / Grids (Future)

If/when needed:

TanStack Table (headless, you style it)


Only move to heavier grids if enterprise features are required.


---

✅ Charts (Future)

Recharts


Simple React charts suitable for dashboards and analytics.


---

✅ Security (ISO + Pen Tests)

Content Safety

Canonical storage = structured JSON

If HTML is ever rendered:

Sanitize with DOMPurify

Enforce strict CSP



Architecture Rules

GPL frontend must not import proprietary JS

SaaS extensions stay:

Server-side, or

In clearly separated non-GPL bundles




---

✅ Licensing Profile

Everything above is:

MIT or Apache-2.0

No runtime license keys

No open-core traps

No commercial ambiguity


Keeps the OSS repo clean and the SaaS boundary defensible.


---

🧱 Final Stack Summary

Core

Vite

React

React Router


Data

TanStack Query

REST + WebSockets


Authoring

Tiptap (inline rich text)

@dnd-kit (drag/drop)

react-jsonschema-form


UI

MUI Core or Radix + LESS


Security

JSON storage

DOMPurify (if HTML ever appears)

CSP



---

If you’d like next, I can help with:

Folder / package architecture for modular npm setup

<InlineRichText /> reference implementation

RJSF + Tiptap integration pattern

Migration strategy from CKEditor HTML

Monorepo layout (packages/ui, packages/editor, etc.)


Just tell me 👍caching

retries

mutations

background refetch


This keeps your UI logic clean since your app is predominantly server-state driven.

Realtime

Native WebSockets (or Socket.IO if you already use it server-side)



---

✅ Forms + JSON Schema

Since your backend owns validation and exposes full JSON Schema:

Schema-driven UI

react-jsonschema-form (RJSF)


Use it for:

auto-generated forms

property editors

config panels


Then extend with:

custom widgets (e.g. rich text)

custom field layouts


This fits your “UI consumes schema, server owns rules” model perfectly.


---

✅ Rich text (inline only)

You decided on:

Inline editor

Tiptap (MIT licensed)


Configured narrowly to allow only:

bold

italic

underline

link (optional)


Key design choices:

Store Tiptap JSON, not HTML

Single shared <InlineRichText /> component

No document-style features (no tables, headings, etc.)


This replaces CKEditor cleanly and avoids licensing ambiguity.


---

✅ Drag & drop (authoring layouts)

@dnd-kit


Modern, actively maintained, composable.

Good for:

block reordering

page layout builders

tree structures



---

✅ UI components + theming

You have two viable paths — pick one:

Option A (fastest to ship)

MUI Core


Pros:

complete component set

mature theming

CSS variables for per-client reskins

integrates nicely with RJSF


Avoid MUI X Pro (commercial).


---

Option B (maximum visual control)

Radix UI primitives

Your own LESS / CSS on top


Pros:

totally unstyled primitives

perfect for custom design systems

clean separation between behavior and appearance


More work, more control.


---

✅ Tables / grids (future)

If/when you need serious tabular UI:

TanStack Table (headless, you style it)


Only move to something heavier if you truly need enterprise grid features.


---

✅ Charts (future)

Recharts


Simple React charts, good enough for dashboards/analytics.


---

✅ Security (important for ISO + pen tests)

Content safety

Canonical storage = structured JSON

If HTML is ever rendered:

sanitize with DOMPurify

enforce strict CSP



Architecture rules

GPL frontend must not import proprietary JS

SaaS extensions stay:

server-side, or

in clearly separated non-GPL bundles




---

✅ Licensing profile (all compatible with GPLv3)

Everything above is:

MIT or Apache-2.0

no runtime license keys

no open-core traps

no commercial ambiguity


This keeps your OSS repo clean and your SaaS boundary defensible.


---

🧱 Summary: your final recommended stack

Core

Vite

React

React Router


Data

TanStack Query

REST + WebSockets


Authoring

Tiptap (inline rich text)

@dnd-kit (drag/drop)

react-jsonschema-form


UI

MUI Core or Radix + LESS


Security

JSON storage

DOMPurify (if HTML ever appears)

CSP
