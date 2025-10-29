---
title: Technitium DNS – Import Strategies & CNAME Pitfalls
summary: Safe ways to bulk‑import records and avoid CNAME conflicts (and apex issues). Includes ACME alias tips.
tags: [technitium, dns, cname, import, acme]
nav_order: 12
---

## TL;DR
- Prefer **AXFR import** from an existing DNS where possible.  
- If importing from scratch, use the **DNS Client → Import** (ANY/AXFR) or the **HTTP API**.  
- **Never** mix a **CNAME** with **any** other record type on the **same name**; **no CNAME at zone apex**.

---

## Import options
1. **AXFR** — In Technitium Web UI, open **DNS Client**, set `Server=<old DNS>`, `Domain=<zone>`, **Type=AXFR**, then **Import** to a new **Primary** zone.  
2. **ANY Import** — If AXFR isn’t allowed, query `ANY` for each name and use **Import** to append records into a Primary zone.  
3. **HTTP API** — For scripted bulk add. Useful when generating many CNAMEs from a template.

### Minimal HTTP API examples
> Create TXT (e.g., ACME):  
`/api/zones/records/add?token=$TOKEN&domain=_acme-challenge.example.tld&type=TXT&ttl=60&text=$VALUE`

> Delete TXT:  
`/api/zones/records/delete?token=$TOKEN&domain=_acme-challenge.example.tld&type=TXT&text=$VALUE`

Create a dedicated user/token with **limited zone permissions**.

---

## CNAME rules that bite
- A **CNAME name cannot have any other records** (A/AAAA/TXT/MX/… or additional CNAME) at that **same name**.  
- The **zone apex** (e.g., `example.tld`) already has **NS/SOA**, so it **cannot** be a CNAME.  
- For **ACME DNS-01 aliasing**, if you make `_acme-challenge.example.tld` a **CNAME**, you must publish the **TXT** on the **target name**, not on `_acme-challenge.example.tld`.

### Safer pattern for internal apps
- Keep apex with only `A/AAAA` and `NS/SOA`.  
- Use **leaf names** for CNAMEs (e.g., `portainer.example.tld CNAME internalproxy.services.example.tld.`).  
- Don’t generate import files that attempt to set `CNAME` where an `A`, `AAAA`, `TXT`, or `MX` already exists.

---

## Example: Input list → zone records
If you have a list like:
```
portainer -> internalproxy.services.example.tld
grafana   -> internalproxy.services.example.tld
```
Add these **CNAMEs** (ensure no same‑name A/AAAA/TXT exist):
```
portainer  300  IN CNAME internalproxy.services.example.tld.
grafana    300  IN CNAME internalproxy.services.example.tld.
```

> Tip: keep `_acme-challenge.<service>` names **TXT only** (no CNAME there).

---

## Troubleshooting
- “CNAME cannot exist with other record types”: delete the conflicting record first.  
- Import created duplicates: search for same‑name records in the zone; consolidate.  
- ACME not validating: check where the TXT was created if using a CNAME alias method.

