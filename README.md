# Vision Ops — Growth Command Center

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

## Português

### Objetivo

Vision Ops é um protótipo de teste técnico para uma operação de ecommerce DTC com assinaturas. Mostra como um dashboard interno pode transformar dados fragmentados e tracking pouco confiável em sinais operacionais visíveis e acionáveis.

### O que inclui

- Painel de aquisição com receita, pedidos, conversão blended e taxa de recompra.
- Funil de conversão de sessões até pedidos, com identificação do maior vazamento.
- Visão de saúde da assinatura, LTV projetado para 90 dias e coortes de retenção.
- Registro de riscos de tracking e integrações, priorizado por gravidade e responsável.
- Botão de atualização conectado a uma rota de API do Next.js, que consulta a API mock pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/) e deriva métricas do painel.
- Resposta de fallback para manter o painel utilizável caso a API mock fique indisponível.

### Escopo da auditoria

A auditoria de checkout é uma checklist ilustrativa de pré-lançamento para uma stack de direct response. Ela aponta falhas comuns e críticas para o negócio:

1. Eventos de compra no browser e no servidor sem `event_id` compartilhado para deduplicação.
2. UTMs perdidas na passagem da landing page para o checkout.
3. Rebills de assinatura sem vínculo com a origem de aquisição inicial.
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

### Build de produção

```bash
npm run build
```

## Notes

This repository intentionally uses mock data and an illustrative checkout audit. It does not process customer, payment, or production analytics data.
