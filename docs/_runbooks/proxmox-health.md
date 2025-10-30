---
layout: default
title: Proxmox VM Quick Health Check
parent: Runbooks
nav_order: 14
permalink: /runbooks/proxmox-health/
---

# Proxmox VM Quick Health Check

**Purpose**  
Rapid triage when a VM or service is reported down.

**Use When**  
Alert from monitoring; user reports outage.

**Prerequisites/Access**  
Proxmox UI/API access; SSH to node/guest.

**Impact/Risk**  
Read‑only checks; safe.

---

## Steps
1. **Check cluster/node health**
   - Proxmox UI → Datacenter → Summary (quorum, HA state)
2. **Check VM status**
   ```bash
   qm status <vmid>
   journalctl -xe --no-pager -u <service> -n 200
   ```
3. **Network quick checks**
   ```bash
   ip a
   ip r
   ping -c2 <gateway>
   ```
4. **Storage quick checks**
   ```bash
   df -h
   zpool status
   ```

## Validate
- VM responds to ping/HTTP
- Service logs quiet after fix

## Rollback
- Revert last change or restore snapshot if taken pre‑change

## References
- Proxmox API: https://pve.your‑domain:8006/api2/json

**Change History**  
- 2025-10-30 – v1.0 – Created