# Vision Ops â€” Growth Command Center

Live demo: [vision-growth-dashboard.vercel.app](https://vision-growth-dashboard.vercel.app)

## English

### Purpose

Vision Ops is a technical-test prototype for a DTC ecommerce and subscription operation. It shows how a single internal dashboard can turn fragmented performance data and unreliable tracking into visible, actionable operating signals.

### What it includes

- Acquisition dashboard with revenue, orders, blended conversion rate, and repeat-purchase rate.
- Conversion funnel from sessions to orders, including a clear highest-impact leak.
- Subscription-health view with projected 90-day LTV and retention cohorts.
- Checkout tracking and integration risk register, prioritized by severity and owner.
- Live refresh button backed by a Next.js API route that reads from the public [JSONPlaceholder](https://jsonplaceholder.typicode.com/) mock API and derives dashboard metrics.
- Safe fallback response so the dashboard remains usable if the upstream mock API is temporarily unavailable.

### Audit scope

The included checkout audit is an illustrative pre-launch checklist for a direct-response stack. It flags common, business-critical failures:

1. Browser and server purchase events without a shared `event_id` for deduplication.
2. UTM parameters lost between landing page and checkout.
3. Subscription rebills not joined to the original acquisition source.
4. Payment-error monitoring with no operational alert.

### Stack

- TypeScript
- Next.js 16 / React 19
- Next.js Route Handlers
- CSS Modules
- Vercel

### Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
```

## PortuguÃªs

### Objetivo

Vision Ops Ã© um protÃ³tipo de teste tÃ©cnico para uma operaÃ§Ã£o de ecommerce DTC com assinaturas. Mostra como um dashboard interno pode transformar dados fragmentados e tracking pouco confiÃ¡vel em sinais operacionais visÃ­veis e acionÃ¡veis.

### O que inclui

- Painel de aquisiÃ§Ã£o com receita, pedidos, conversÃ£o blended e taxa de recompra.
- Funil de conversÃ£o de sessÃµes atÃ© pedidos, com identificaÃ§Ã£o do maior vazamento.
- VisÃ£o de saÃºde da assinatura, LTV projetado para 90 dias e coortes de retenÃ§Ã£o.
- Registro de riscos de tracking e integraÃ§Ãµes, priorizado por gravidade e responsÃ¡vel.
- BotÃ£o de atualizaÃ§Ã£o conectado a uma rota de API do Next.js, que consulta a API mock pÃºblica [JSONPlaceholder](https://jsonplaceholder.typicode.com/) e deriva mÃ©tricas do painel.
- Resposta de fallback para manter o painel utilizÃ¡vel caso a API mock fique indisponÃ­vel.

### Escopo da auditoria

A auditoria de checkout Ã© uma checklist ilustrativa de prÃ©-lanÃ§amento para uma stack de direct response. Ela aponta falhas comuns e crÃ­ticas para o negÃ³cio:

1. Eventos de compra no browser e no servidor sem `event_id` compartilhado para deduplicaÃ§Ã£o.
2. UTMs perdidas na passagem da landing page para o checkout.
3. Rebills de assinatura sem vÃ­nculo com a origem de aquisiÃ§Ã£o inicial.
4. Monitoramento de erro de pagamento sem alerta operacional.

### Tecnologias

- TypeScript
- Next.js 16 / React 19
- Route Handlers do Next.js
- CSS Modules
- Vercel

### Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Build de produÃ§Ã£o

```bash
npm run build
```

## Notes

This repository intentionally uses mock data and an illustrative checkout audit. It does not process customer, payment, or production analytics data.

