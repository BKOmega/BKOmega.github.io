---
layout: default
title: SSHFP 
parent: Runbooks
nav_order: 1
permalink: /runbooks/sshfp/
---

# SSHFP records

**Purpose**  
Describe the outcome in one or two sentences.

**Use When**  
When installing FreeIPA client due to TSIG implimentation the SSHFP 

**Impact/Risk**  
With DNSSEC on the zone, SSH clients can cryptographically trust the fingerprint they fetch from DNS → strong protection against first-connect MITM.

Without DNSSEC, records can be spoofed; OpenSSH will treat them as advisory at best. Still useful for inventory, but not security-relevant.

---

## Steps
1. Install with: ipa-client-install
2. Generate SSHFP and add them to Technitium statically
    {% raw %}
    ```bash
   ssh-keygen -r "$(hostname -f)"  # prints SSHFP lines
   ```
   {% endraw %}
3. Paste those into the zone.

## Validate
- Check DNS entries 
 {% raw %}
    ```bash
    dig "$(hostname -f)" sshfp
    ```
   {% endraw %}

## Escalation
- Primary on‑call (<name>), Slack/Phone: <contact>
- Secondary: <name>
- SLA/Expectations: <e.g., respond within 15 minutes>

## References
- Dashboards: <links>
- Logs: <links>
- Repos/Docs: <links>

---

**Change History**  
- 2025-10-30 – v1.0 – Created by <author>