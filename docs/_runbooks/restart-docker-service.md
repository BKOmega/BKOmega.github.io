---
layout: default
title: Restart a Dockerised Service
parent: Runbooks
nav_order: 11
permalink: /runbooks/restart-docker-service/
---

# Restart a Dockerised Service

**Purpose**  
Bounce a single app container cleanly

**Use When**  
Service is unresponsive, failing health checks, or after config change

**Prerequisites/Access**  
- SSH to host, compose file path known

**Impact/Risk**  
Short outage for the service only

---

## Steps
1. **Identify container name**
    {% raw %}
   ```bash
   docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
   ```
   {% endraw %}
2. **Restart service** (compose)
   ```bash
   cd /srv/<stack>
   docker compose restart <service>
   ```
   Or with Docker alone:
   ```bash
   docker restart <container>
   ```
3. **Tail logs**
   ```bash
   docker logs -f <container>
   ```

## Validate
- Health endpoint returns 200
- No errors in last 100 log lines

## Rollback
```bash
docker compose up -d <service>:previous
```

## References
- Portainer: <url>

**Change History**  
- 2025-10-30 – v1.0 – Created