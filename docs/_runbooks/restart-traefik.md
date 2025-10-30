---
layout: default
title: Restart Traefik Safely
parent: Runbooks
nav_order: 10
permalink: /runbooks/restart-traefik/
---

# Restart Traefik Safely

**Purpose**  
Restore routing if 4xx/5xx spike or routers show unhealthy

**Use When**  
- Health checks failing >2 minutes
- Dashboard shows red for routers

**Prerequisites/Access**  
- SSH to `dmz-proxy01` (or appropriate host)
- Docker/Compose permissions

**Impact/Risk**  
Brief (<10s) 502s while containers restart

---

## Steps
1. **Check state**
    {% raw %}
   ```bash
   ssh dmz-proxy01
   docker ps --format "table {{.Names}}\t{{.Status}}"
   docker logs traefik --tail=200
   ```
   {% endraw %}
2. **Drain traffic** (if behind LB): set weight=0 or disable node
3. **Restart Traefik**
   ```bash
   docker compose -f /srv/traefik/docker-compose.yml restart traefik
   ```
4. **Watch logs**
   ```bash
   docker logs -f traefik | grep -E "Server configured|certificate obtained|error"
   ```

## Validate
- `curl -I https://portainer.home.domain.internal` returns `200/302`
- Dashboard routers green for 2 minutes
- No new errors in logs

## Rollback
```bash
docker compose -f /srv/traefik/docker-compose.yml rollback || \
  docker compose -f /srv/traefik/docker-compose.yml up -d traefik:previous
```

## Escalation
- Primary: 
- Secondary: 

## References
- Traefik dashboard: <url>
- ACME logs: `/var/lib/traefik/acme.json`

**Change History**  
- 2025-10-30 – v1.0 – Created
