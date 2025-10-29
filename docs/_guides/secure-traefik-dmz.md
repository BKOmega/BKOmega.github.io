---
title: Secure Traefik in a DMZ with Internal Services
summary: DMZ Traefik on Docker; internal routing via CNAMEs; ACME DNS-01; firewall rules (UniFi).
tags: [traefik, dmz, docker, acme, unifi]
nav_order: 10
---

## Goal
Front Traefik in `dmz.racelee.internal` and publish internal apps safely.

## Diagram
_Add your diagram or ascii layout here_

## Prerequisites
- UniFi gateway/firewall with rules between DMZ ↔ Services
- Technitium DNS (authoritative) and FreeIPA where needed
- ACME: DNS-01 provider configured (Technitium API or IPA hook)

## Steps
1. **DNS** – Create public `A/AAAA` for proxy, internal `CNAME`s for apps pointing to `internalproxy.services.racelee.internal`.
2. **Traefik** – Entrypoints :80/:443, routers with TLS + middlewares (headers, rate limit).
3. **ACME** – DNS-01; avoid mixing `CNAME` with other records on the same name.
4. **Firewall** – Allow :80→:443 for redirect, :443 inbound; egress to internal app ports only.
5. **Validation** – curl, headers, TLS chain, OCSP stapling considerations in private CA envs.
6. **Observability** – Access logs + Grok patterns for parsing.

## Snippets
```yaml
# docker-compose.yml (Traefik section)
services:
  traefik:
    image: traefik:latest
    command:
      - --providers.docker=true
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.letsencrypt.acme.dnschallenge=true
      - --certificatesresolvers.letsencrypt.acme.email=you@example.com
      - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
    labels:
      - traefik.http.middlewares.secure.headers.stsSeconds=31536000
      - traefik.http.middlewares.secure.headers.forceSTSHeader=true
      - traefik.http.middlewares.ratelimit.ratelimit.average=50
      - traefik.http.middlewares.ratelimit.ratelimit.burst=100
```

## Rollback
- Re-point public DNS to maintenance page; disable routers; revert firewall changes.

## Lessons learned
- `CNAME` cannot coexist with other record types on the **same name**; keep apex `A/AAAA`, use `CNAME` only on leaf names.
- Private CA OCSP endpoints must be resolvable if you enable stapling; otherwise disable stapling or publish `ipa-ca` DNS.
