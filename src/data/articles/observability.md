---
title: A Practical Guide to Observability for Spring Boot in Production
date: May 20, 2022
---

> “I added Micrometer, Prometheus, Loki… and suddenly my app needs five more containers?” If this sounds familiar — welcome to your first real observability confusion.

When developers first learn observability, the setup feels unnecessarily complicated:
- Prometheus?
- Loki?
- Promtail?
- Grafana?
- Docker everywhere?

And the biggest question: **Do I need to run all of these inside my application in production?**

Short answer: **No.**

Let’s demystify observability the way production systems actually work.

## The Biggest Misconception

Many developers think: “If my Spring Boot app uses Prometheus and Loki, I must install them along with my app.”

Your application is not responsible for monitoring itself.

Instead:
- Application → emits telemetry
- Observability platform → collects & analyzes telemetry

## What Your Spring Boot App Should Actually Do

Your app has only two responsibilities.
1. Expose Metrics (Micrometer + Prometheus)
  - Add Micrometer: `micrometer-registry-prometheus`
  - Spring Boot automatically exposes: `/actuator/prometheus`
2. Produce Structured Logs
  - Your app simply writes logs: stdout (containers) or log files
  - Prefer JSON logs for production: Logback + Logstash Encoder

## Add image here

Monitoring tools are shared infrastructure


## Option A
You run ONE monitoring stack for all services. Every application connects to it.

```
5 microservices
    ↓
ONE Prometheus
ONE Loki
ONE Grafana
```

## Option B
When systems grow, teams move to Kubernetes.

Instead of configuring monitoring manually:
- Services auto-discovered
- Logs auto-collected
- Metrics auto-scraped

You install monitoring once using Helm, and the cluster handles the rest.

This is powerful — but comes with complexity.

## Final Thoughts

The Golden Rule of Observability
> Applications emit telemetry. Infrastructure collects telemetry.

Happy shipping 🚀
