---
title: Handy Regex & Grok Patterns
tags: [regex, grok, logging]
nav_order: 10
parent: Notes Index
---

**Domain regex for** `homeassistant.home.domain.co.uk` **or** `homassistant.domain.co.uk`:

```
^(?:homeassistant\.home\.domain\.co\.uk|homassistant\.domain\.co\.uk)$
```

**Grok starter for Plex/NGINX-style logs** _(add fields as needed)_:

```
%{IP:client_ip} - - \[%{HTTPDATE:timestamp}\] "%{WORD:method} %{URIPATHPARAM:request} HTTP/%{NUMBER:http_version}" %{NUMBER:status} (?:%{NUMBER:bytes}|-) "%{DATA:referrer}" "%{DATA:user_agent}"
```
