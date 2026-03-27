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

## GitHub Actions auto deploy

The repo includes a production deploy workflow:

- `.github/workflows/deploy-backend.yml`

This workflow runs on pushes to `main` when backend files change.

It first runs backend tests in GitHub Actions:

```bash
cd apps/backend
pip install -e .[dev]
pytest
```

Only if the test job passes does it SSH into EC2 and run:

```bash
cd /home/ec2-user/KotobaLink
git fetch origin main
git reset --hard origin/main
cd apps/backend
python3 -m venv .venv   # only if missing
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -e .
.venv/bin/alembic upgrade head
sudo systemctl restart kotobalink-backend
curl --fail --silent http://127.0.0.1:8000/health
```

The workflow also runs `alembic upgrade head` in CI before the backend test suite so schema migrations are validated before deployment.

For legacy EC2 databases that were created before Alembic was introduced, the deploy workflow will first detect whether application tables already exist without an `alembic_version` table. In that one-time bootstrap case it runs `alembic stamp head` before the normal upgrade step so the existing schema can be brought under Alembic management safely.

Required GitHub repository secrets:

- `EC2_HOST`: public server host or domain
- `EC2_USER`: SSH user, for example `ec2-user`
- `EC2_APP_DIR`: absolute repo path on EC2, for example `/home/ec2-user/KotobaLink`
- `EC2_SSH_PRIVATE_KEY`: private key content for the deploy user

Recommended EC2 sudoers rule so the deploy user can restart the backend non-interactively:

```bash
sudo visudo -f /etc/sudoers.d/kotobalink-deploy
```

Add:

```text
ec2-user ALL=(ALL) NOPASSWD:/bin/systemctl restart kotobalink-backend,/bin/systemctl is-active kotobalink-backend
```

If your EC2 host uses a different service name or user, adjust both the workflow and the sudoers entry together.

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
