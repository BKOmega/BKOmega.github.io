---
title: Handy Regex & Grok Patterns
tags: [regex, grok, logging]
nav_order: 10
---

**Domain regex for** `homeassistant.home.racelee.co.uk` **or** `homassistant.racelee.co.uk`:

```
^(?:homeassistant\.home\.racelee\.co\.uk|homassistant\.racelee\.co\.uk)$
```

**Grok starter for Plex/NGINX-style logs** _(add fields as needed)_:

```
%{IP:client_ip} - - \[%{HTTPDATE:timestamp}\] "%{WORD:method} %{URIPATHPARAM:request} HTTP/%{NUMBER:http_version}" %{NUMBER:status} (?:%{NUMBER:bytes}|-) "%{DATA:referrer}" "%{DATA:user_agent}"
```
