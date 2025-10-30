---
layout: default
title: Restore Technitium DNS from Backup
parent: Runbooks
nav_order: 12
permalink: /runbooks/technitium-restore/
---

# Restore Technitium DNS from Backup

**Purpose**  
Recover DNS zones and settings from a known good backup.

**Use When**  
Misconfiguration, data loss, or migration.

**Prerequisites/Access**  
- Admin access to Technitium Web Console
- Latest backup archive (`.zip`) accessible

**Impact/Risk**  
Restored zones overwrite current state; check deltas first.

---

## Steps
1. **Pre‑snapshot current state**
   - Export current zones (Settings → Backup → Export)
2. **Restore from backup**
   - Settings → Backup → **Restore** → choose backup `.zip` → Confirm
3. **Verify forwarders/ACLs** (Settings → DNS → Forwarders/Access Control)

## Validate
- `nslookup` or `dig` queries resolve expected records
- Authoritative zones present, SOA serial increased appropriately

## Rollback
- Re‑import the pre‑snapshot export taken in Step 1

## References
- Backup location: `<path or S3 bucket>`

**Change History**  
- 2025-10-30 – v1.0 – Created