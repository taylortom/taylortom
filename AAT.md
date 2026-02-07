
## ✅ Core application

### Build / Dev : Vite
Fast dev server + modern bundling. Minimal magic, great long-term maintainability.


## Framework : React (SPA)
You already have React experience — no reason to change.


## Routing : React Router (v7)
Lightweight, flexible, no framework lock-in.

---
## ✅ Data + networking

### Server state (REST + WebSockets) : TanStack Query (React Query)
Handles:
- fetch lifecycle
- caching
- retries
- mutations
- background refetch

This keeps your UI logic clean since your app is predominantly server-state driven.

Realtime:

Native WebSockets (or Socket.IO if you already use it server-side)



---

## ✅ Forms + JSON Schema

Since your backend owns validation and exposes full JSON Schema:

### Schema-driven UI : react-jsonschema-form (RJSF)

Use it for:
- auto-generated forms
- property editors
- config panels

Then extend with:
- custom widgets (e.g. rich text)
- custom field layouts

This fits your “UI consumes schema, server owns rules” model perfectly.


---

## ✅ Rich text (inline only)

### Inline editor : Tiptap (MIT licensed)


Configured narrowly to allow only:

- bold
- italic
- underline
- link (optional)


Key design choices:

- Store Tiptap JSON, not HTML
- Single shared <InlineRichText /> component
- No document-style features (no tables, headings, etc.)


This replaces CKEditor cleanly and avoids licensing ambiguity.


---

## ✅ Drag & drop (authoring layouts) : @dnd-kit


Modern, actively maintained, composable. Good for:

- block reordering
- page layout builders
- tree structures


---

## ✅ UI components + theming

You have two viable paths — pick one:

### Option A (fastest to ship) : MUI Core

Pros:

- complete component set
- mature theming
- CSS variables for per-client reskins
- integrates nicely with RJSF

Avoid MUI X Pro (commercial).


### Option B (maximum visual control) : Radix UI primitives

Your own LESS / CSS on top


Pros:

- totally unstyled primitives
- perfect for custom design systems
- clean separation between behavior and appearance
- More work, more control.

---

## ✅ Charts (future) : Recharts


Simple React charts, good enough for dashboards/analytics.


---

## ✅ Security (important for ISO + pen tests)

- Content safety
- Canonical storage = structured JSON
- If HTML is ever rendered:
  - sanitize with DOMPurify
  - enforce strict CSP


## Architecture rules

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
