---
title: ACME DNS-01 via RFC2136 (Technitium or FreeIPA) with Traefik
summary: Automate Let's Encrypt (and private ACME) certs using Traefik + DNS-01; updates DNS with RFC2136 to Technitium or FreeIPA.
tags: [acme, dns, rfc2136, traefik, technitium, freeipa, tls]
nav_order: 15
parent: Guides
---

## Goal
Use Traefik to obtain/renew certs automatically via **DNS-01** by updating TXT records over **RFC2136** against either **Technitium DNS** or **FreeIPA DNS**.

> Why DNS-01? Works for internal hosts and wildcards, no inbound ports required.

---

## Option A — Technitium DNS (recommended, simple)

### 1) Create a TSIG key & restrict scope
1. In Technitium Web UI: **Settings → TSIG Keys → Add**  
   - Algorithm: `HMAC-SHA256`  
   - Leave secret blank to auto-generate (copy it after saving).
2. For your zone: **Zones → <zone> → Options → Dynamic Updates (RFC2136)**  
   - **Allow** updates.  
   - Add **Security Policy**: Key = the TSIG above, Domain = `_acme-challenge.<your zone>`, Allowed Types = `TXT`.

_This limits updates to only the ACME TXT records._

### 2) Configure Traefik resolver (RFC2136 provider)
Add to Traefik (CLI args or static config), e.g. Docker Compose:

```yaml
services:
  traefik:
    image: traefik:latest
    environment:
      # lego/Traefik RFC2136 provider variables:
      RFC2136_NAMESERVER: "ns01.services.domain.internal:53"   # IP or host:port of Technitium
      RFC2136_TSIG_ALGORITHM: "hmac-sha256"                     # match Technitium
      RFC2136_TSIG_KEY: "acme-tsig"                             # your TSIG key name
      RFC2136_TSIG_SECRET: "BASE64/SECRET=="                    # your TSIG secret
    command:
      - --certificatesresolvers.le.acme.email=you@example.tld
      - --certificatesresolvers.le.acme.storage=/letsencrypt/acme.json
      - --certificatesresolvers.le.acme.dnschallenge=true
      - --certificatesresolvers.le.acme.dnschallenge.provider=rfc2136
    volumes:
      - ./letsencrypt:/letsencrypt
```

Then on each router that needs a cert:
```yaml
labels:
  - traefik.http.routers.portainer.tls=true
  - traefik.http.routers.portainer.tls.certresolver=le
```

### 3) Test
- Deploy Traefik, watch logs for `_acme-challenge` TXT creation.  
- Verify: `dig TXT _acme-challenge.<host> +short`

---

## Option B — FreeIPA DNS (RFC2136 or GSS-TSIG)

If FreeIPA provides your authoritative DNS, you can also use RFC2136 (TSIG) or GSS-TSIG. High level:
1. Create/obtain a TSIG key (via `dnssec-keygen` or FreeIPA tooling).  
2. Permit dynamic updates on the zone for `_acme-challenge.<zone>` TXT only.  
3. Use the same Traefik config as above, pointing `RFC2136_NAMESERVER` at an IPA DNS server.

> If using GSS-TSIG (Kerberos), use a client like `cert-manager` or `nsupdate -g`. For Traefik, stick to TSIG.

---

## Notes & gotchas
- DNS **propagation**: set a small TTL (e.g., 60s) on the `_acme-challenge` TXT records via the server’s policy if supported.
- If you use the **CNAME alias** method for `_acme-challenge`, remember that the TXT must be created **at the CNAME target**, not at the alias name.
- Keep `acme.json` on a persistent volume with `0600` permissions.
- For private CAs, set Traefik’s `acme.caserver` to your ACME directory URL.
