---
title: Portainer behind Traefik (Docker Compose)
tags: [portainer, docker, traefik, template]
nav_order: 10
parent: Templates Index
---

```yaml
services:
  portainer:
    image: portainer/portainer-ce
    ports: []  # No direct ports when behind Traefik
    labels:
      - traefik.http.routers.portainer.rule=Host(`portainer.example.tld`)
      - traefik.http.routers.portainer.entrypoints=websecure
      - traefik.http.routers.portainer.tls.certresolver=letsencrypt
      - traefik.http.routers.portainer.middlewares=secure,ratelimit
```
