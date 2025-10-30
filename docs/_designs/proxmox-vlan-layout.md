---
title: Proxmox VLAN Layout & Bridging (with UniFi trunk)
tags: [proxmox, vlan, networking, unifi, design]
nav_order: 25
parent: Designs
---

## Goals
- Single **trunk** uplink from each Proxmox node to the switch.
- **VLAN-aware** Linux bridge so VMs/LXCs get VLAN tagging on their NIC.
- Host management lives on **MGMT VLAN** (tagged).

## Proposed VLAN map (adjust IDs)
| Segment | VLAN | CIDR | Domain |
|---|---:|---|---|
| Management | `<11>` | `10.11.0.0/24` | `mgmt.domain.internal` |
| Physical servers | `<20>` | `10.20.0.0/22` | `pserver.domain.internal` |
| Virtual servers | `<30>` | `10.30.0.0/22` | `vserver.domain.internal` |
| Storage | `<40>` | `10.40.0.0/24` | `storage.domain.internal` |
| Services | `<50>` | `10.50.0.0/24` | `services.domain.internal` |
| DMZ | `<4>` | `192.168.4.0/24` | `dmz.domain.internal` |
| IoT | `<102>` | `192.168.2.0/24` | `iot.domain.internal` |
| Guests | `<103>` | `192.168.3.0/24` | `guest.domain.internal` |
| Cameras | `<1xx>` | `192.168.x.0/24` | `ispy.domain.internal` |

> Choose IDs that fit your switch/UniFi scheme; update firewall rules accordingly.

## Proxmox network (Linux bridge)
`/etc/network/interfaces` (example — **edit placeholders** before using):

```bash
auto lo
iface lo inet loopback

# Physical uplink
auto eno1
iface eno1 inet manual

# VLAN-aware bridge carrying all VLANs (trunk to switch)
auto vmbr0
iface vmbr0 inet manual
    bridge-ports eno1
    bridge-stp off
    bridge-fd 0
    bridge-vlan-aware yes
    bridge-vids 2-4094

# Put the host (PVE) mgmt on the MGMT VLAN (e.g., 11)
auto vmbr0.<MGMT_VLAN_ID>
iface vmbr0.<MGMT_VLAN_ID> inet static
    address <MGMT_IP/CIDR>
    gateway <MGMT_GW>
```

### VM/LXC settings
- In Proxmox VM → **Hardware → Network Device**: set **Bridge**=`vmbr0`, **VLAN Tag**=`<VLAN-ID>`.
- For LXC: in container **Network** tab, set VLAN tag similarly.

### Switch (UniFi) side
- Uplink port to Proxmox: **Trunk** allowing the VLANs above.  
- No untagged/native VLAN on the uplink (or ensure it’s not used by PVE).

### Notes
- If you don’t see traffic, double‑check the switch trunk and the VM’s VLAN Tag.  
- The PVE host uses `vmbr0.<id>` for its own IP; guests use **tags**.  
- Storage VLAN: keep jumbo frames consistent end‑to‑end if enabled.

