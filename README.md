# WoodPilot Landing

Landing comercial do WoodPilot — site estático separado do ERP Angular.

Os CTAs de lead (WhatsApp/e-mail) e os links **Entrar / Já sou cliente / Suporte / Termos / Privacidade** apontam para o ERP configurado em `VITE_ERP_URL`.

## Desenvolvimento

```bash
cp .env.example .env
# editar VITE_ERP_URL, WhatsApp e e-mail
npm install
npm run dev
```

Abre em http://localhost:4321

## Build

```bash
npm run build
```

Saída em `dist/` — hospede em qualquer static host (Cloudflare Pages, Netlify, S3, nginx, etc.).

## Variáveis

| Variável | Uso |
|----------|-----|
| `VITE_ERP_URL` | Base do ERP (ex.: `https://app.woodpilot.com.br`) |
| `VITE_SITE_URL` | URL pública desta landing (Open Graph absoluto) |
| `VITE_SUPPORT_WHATSAPP` | Número do CTA principal (prioridade) |
| `VITE_SUPPORT_EMAIL` | Fallback do CTA se WhatsApp estiver vazio |

## Relação com o ERP

Este repositório **não** faz parte do monorepo `WoodPilot`. O produto (ERP) continua no outro repositório; esta landing só redireciona para ele.
