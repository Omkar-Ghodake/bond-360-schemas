# Backend Mongoose Schemas

This repository contains **Mongoose schemas** and **backend guidelines** for a testing, bug tracking, and team performance system.

The focus is on:
- Clean data modeling
- Role-based access control
- Historical accuracy (no hard deletes)
- Metrics and analytics support
- Production-ready backend practices

---

## What’s Included

- Core schemas for employees, teams, products, sessions, bugs, metrics, media, and audit logs
- Clear separation between execution roles and governance roles
- Backend rules for authorization, validation, transactions, and concurrency
- Documentation to guide API implementation

---

## How to Use

1. Import the schemas into your backend project
2. Follow the guideline documents before writing APIs
3. Enforce authorization, validation, and transactions consistently
4. Use aggregation queries for dashboards and analytics

---

## Notes

- This repository contains schemas and guidelines only (no controllers)
- All deletes are soft deletes
- History and auditability are first-class concerns

---

**Hou De Kharcha.**