# EC2 Deployment Notes

This file covers the current lightweight deployment target for the backend on EC2 before HTTPS and domain setup.

## Current assumptions

- Code lives at `/home/ec2-user/KotobaLink`
- Backend lives at `/home/ec2-user/KotobaLink/apps/backend`
- Python virtualenv lives at `/home/ec2-user/KotobaLink/apps/backend/.venv`
- Backend binds to `0.0.0.0:8000`
- PostgreSQL is reachable from `DATABASE_URL` in `apps/backend/.env`

## Local service file

The repo includes a ready-to-install systemd unit:

- `apps/backend/kotobalink-backend.service`

Install steps on EC2:

```bash
sudo cp /home/ec2-user/KotobaLink/apps/backend/kotobalink-backend.service /etc/systemd/system/kotobalink-backend.service
sudo systemctl daemon-reload
sudo systemctl enable --now kotobalink-backend
sudo systemctl status kotobalink-backend
```

Useful commands:

```bash
sudo systemctl restart kotobalink-backend
sudo journalctl -u kotobalink-backend -n 100 --no-pager
sudo journalctl -u kotobalink-backend -f
```

## Nginx reverse proxy

The repo also includes an HTTP reverse proxy template:

- `infra/nginx/kotobalink.conf`

Install steps on EC2:

```bash
sudo dnf install -y nginx
sudo cp /home/ec2-user/KotobaLink/infra/nginx/kotobalink.conf /etc/nginx/conf.d/kotobalink.conf
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
```

This proxies:

- `http://<server>/` -> `http://127.0.0.1:8000/`
- `http://<server>/health` -> `http://127.0.0.1:8000/health`

Useful commands:

```bash
sudo systemctl status nginx --no-pager
sudo journalctl -u nginx -n 100 --no-pager
sudo nginx -t
```

## Miniapp API target

Current default miniapp API base URL:

- `http://35.77.66.112:8000/api/v1`

The miniapp config also supports a runtime override via storage key:

- `kotobalink_api_base_url`

That makes it easy to switch environments later without changing every request callsite.
