---
title: Inventory
nav_order: 30
---

# Inventory

## Networks
{% assign nets = site.data.networks %}
| Name | Domain | CIDR | Notes |
|---|---|---|---|
{% for n in nets %}
| {{ n.name }} | `{{ n.domain }}` | `{{ n.cidr }}` | {{ n.notes | default: "" }} |
{% endfor %}

## Services
{% assign svcs = site.data.services %}
| Service | FQDN | Network | Tags |
|---|---|---|---|
{% for s in svcs %}
| **{{ s.name }}** | `{{ s.fqdn }}` | {{ s.network | default: "—" }} | {{ s.tags | array_to_sentence_string }} |
{% endfor %}
