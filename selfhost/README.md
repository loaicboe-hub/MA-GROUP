# MA GROUP — Hostinger VPS Backend Deployment Guide

Instructions to run the MA GROUP database and Node.js application on a Hostinger VPS.

## 1. Prepare the VPS
- Ubuntu 22.04+ LTS
- PostgreSQL 15+ installed
- Node.js 20+ LTS installed
- Nginx and Let's Encrypt SSL

## 2. Initialize the Database
```bash
psql "postgresql://postgres:<PASSWORD>@localhost:5432/postgres" -f schema.sql
```

## 3. Deploy the Application
1. Copy the build output or deploy using Docker / Node.
2. Set environment variables from `env.example`.
3. Start the application with PM2 or systemd:
   ```bash
   pm2 start node_modules/.bin/vite -- preview --port 3000
   ```
