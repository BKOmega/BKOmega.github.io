---
title: OCSP Stapling Troubleshooting with Private CA (FreeIPA)
tags: [tls, ocsp, freeipa, traefik]
nav_order: 10
---

**Symptoms**  
Traefik log shows `no OCSP stapling ... Post "http://ipa-ca...": lookup failed`.

**Checks**
- Ensure `ipa-ca.<your internal domain>` resolves from Traefik container network.
- Publish `A/AAAA` for `ipa-ca` or set resolvable host/alias.
- If stapling not required, explicitly disable stapling in Traefik (document risk).

**Fix**
1) DNS: add `ipa-ca.` record → IPA CA host.  
2) Firewall: allow Traefik → IPA CA :80 (or configured port).  
3) Reload Traefik; verify `openssl s_client -status -connect host:443`.
