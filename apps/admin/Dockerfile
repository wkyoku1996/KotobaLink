FROM node:22-alpine AS build

WORKDIR /workspace

ARG VITE_API_BASE_URL=http://localhost:8000/api/v1
ARG VITE_MEDIA_BASE_URL=http://localhost:8000

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_MEDIA_BASE_URL=$VITE_MEDIA_BASE_URL

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
