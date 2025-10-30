---
title: DNS Strategy (Technitium + Internal Domains)
tags: [dns, technitium, design]
nav_order: 20
parent: Design Index
---

- One primary **zone per parent domain** is simplest (`domain.internal`), with subdomains as **delegations** only if needed.
- Keep `A/AAAA` at apex; avoid `CNAME` at apex.
- Publishing import files: ensure no CNAME shares a name with other records.
- For service FQDNs, prefer `CNAME` targets to stable internal names (then you can retarget without changing clients).
