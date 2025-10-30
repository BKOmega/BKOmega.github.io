---
layout: default
title: Runbook Template
parent: Runbooks
nav_order: 1
permalink: /runbooks/template/
---

# <Runbook Title>

**Purpose**  
Describe the outcome in one or two sentences.

**Use When**  
The specific conditions or symptoms for running this.

**Prerequisites/Access**  
Accounts, roles, SSH access, VPN, secrets, tooling.

**Impact/Risk**  
What might break, expected blast radius, user impact.

---

## Steps
1. ...
2. ...
3. ...

> Decision point? Use **If / Then** blocks:
> - **If** X, **then** do A
> - **Else** do B

## Validate
- How to confirm success (HTTP codes, dashboard green, log messages, queries)

## Rollback
- How to revert to the last good state with exact commands

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