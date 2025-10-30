---
layout: default
title: Renew Traefik/ACME via FreeIPA
parent: Runbooks
nav_order: 13
permalink: /runbooks/traefik-acme-renew/
---

# Renew Traefik/ACME via FreeIPA

**Purpose**  
Ensure certificates renew cleanly using DNS‑01 with IPA records.

**Use When**  
ACME renewal warnings appear or certs < 14 days from expiry.

**Prerequisites/Access**  
- Traefik host SSH
- Access to IPA DNS (via Technitium/IPA plugin or API)

**Impact/Risk**  
Temporary TLS handshake errors if renewal fails.

---

## Steps
1. **Check expiry**
   ```bash
   echo | openssl s_client -servername portainer.home.domain.internal -connect portainer.home.domain.internal:443 2>/dev/null | openssl x509 -noout -enddate
   ```
2. **Force renew (optional)**
   ```bash
   docker exec traefik traefik renew --certificatesresolvers ipa
   ```
3. **Validate TXT records** for `_acme-challenge` if needed
   ```bash
   dig TXT _acme-challenge.<host>.home.racelee.internal +short
   ```

## Validate
- Traefik logs show `certificate obtained`
- Browser shows renewed expiry date

## Rollback
- Switch resolver to backup (e.g., http‑01 internal CA) and restart Traefik

## References
- Traefik config: `/srv/traefik/traefik.yml`
- ACME store: `/var/lib/traefik/acme.json`

**Change History**  
- 2025-10-30 – v1.0 – Created