# Admin Deployment Notes

This file documents the current production deployment approach for the admin frontend on EC2.

## Recommended topology

- Backend keeps running on `127.0.0.1:8000`
- Admin frontend runs as a static site container on `127.0.0.1:8080`
- Host nginx serves the public domain and routes:
  - `/` -> admin frontend
  - `/api/` -> backend
  - `/media/` -> backend static files
  - `/health` -> backend health check
  - `/docs` and `/redoc` -> backend docs

This keeps the admin and API on the same origin, so the current backend CORS settings do not need to change.

## Build and run on EC2

Assumptions:

- Code lives at `/home/ec2-user/KotobaLink`
- Public URL is `http://YOUR_DOMAIN_OR_EC2_IP`

Build the production image:

```bash
cd /home/ec2-user/KotobaLink/apps/admin
sudo docker build \
  -t kotobalink-admin:latest \
  --build-arg VITE_API_BASE_URL=http://YOUR_DOMAIN_OR_EC2_IP/api/v1 \
  --build-arg VITE_MEDIA_BASE_URL=http://YOUR_DOMAIN_OR_EC2_IP .
```

Run the container:

```bash
sudo docker rm -f kotobalink-admin || true
sudo docker run -d \
  --name kotobalink-admin \
  --restart unless-stopped \
  -p 127.0.0.1:8080:80 \
  kotobalink-admin:latest
```

Verify:

```bash
curl --fail --silent http://127.0.0.1:8080/
```

## Nginx reverse proxy

The repo includes an updated nginx template:

- `infra/nginx/kotobalink.conf`

Install or refresh it on EC2:

```bash
sudo cp /home/ec2-user/KotobaLink/infra/nginx/kotobalink.conf /etc/nginx/conf.d/kotobalink.conf
sudo nginx -t
sudo systemctl reload nginx
```

## Update flow

After pulling new code on EC2:

```bash
cd /home/ec2-user/KotobaLink/apps/admin
sudo docker build \
  -t kotobalink-admin:latest \
  --build-arg VITE_API_BASE_URL=http://YOUR_DOMAIN_OR_EC2_IP/api/v1 \
  --build-arg VITE_MEDIA_BASE_URL=http://YOUR_DOMAIN_OR_EC2_IP .
sudo docker rm -f kotobalink-admin || true
sudo docker run -d \
  --name kotobalink-admin \
  --restart unless-stopped \
  -p 127.0.0.1:8080:80 \
  kotobalink-admin:latest
```

## Optional GitHub Actions automation

The repo now includes an admin deploy workflow:

- `.github/workflows/deploy-admin.yml`

It runs on pushes to `main` when admin or nginx files change.

If you want to use it, the EC2 host also needs:

- Docker installed and usable by the deploy user
- nginx already configured once
- The same repository path used by backend deploy

Required GitHub repository secrets:

- `EC2_HOST`
- `EC2_USER`
- `EC2_APP_DIR`
- `EC2_SSH_PRIVATE_KEY`
- `ADMIN_PUBLIC_URL`: for example `http://aegislinks.site`

The workflow will:

- pull the latest `main`
- rebuild the admin image with the configured public URL
- restart the `kotobalink-admin` container
- refresh nginx config and reload nginx

If you later switch to HTTPS, update `ADMIN_PUBLIC_URL` to `https://...` and trigger the workflow again so the frontend is rebuilt with the new URL values.
