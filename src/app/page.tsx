"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Metrics = { revenue: number; orders: number; conversionRate: number; repeatRate: number };
type DashboardData = { source: string; syncedAt: string; metrics: Metrics };

const initialData: DashboardData = {
  source: "JSONPlaceholder", syncedAt: new Date().toISOString(),
  metrics: { revenue: 137540, orders: 1984, conversionRate: 3.42, repeatRate: 29.0 },
};

const auditItems = [
  { severity: "Critical", title: "Purchase event missing server-side deduplication", detail: "Browser pixel and CAPI use no shared event_id. Revenue can be double-counted when both fire.", owner: "Growth + Engineering" },
  { severity: "High", title: "UTM parameters drop at checkout handoff", detail: "Landing page stores UTMs only in the URL; redirect to checkout does not persist them in order metadata.", owner: "Engineering" },
  { severity: "High", title: "Subscription rebills are not attributed", detail: "Initial Purchase fires, but rebills have no source, campaign, or first-touch join key.", owner: "Data" },
  { severity: "Medium", title: "Checkout error monitoring has no alert", detail: "Payment failures appear only in provider logs. No threshold or Slack alert exists for a spike.", owner: "Operations" },
];

const funnel = [
  { label: "Sessions", value: "58,420", percent: 100, note: "Paid + organic" },
  { label: "Product views", value: "21,742", percent: 74, note: "37.2% of sessions" },
  { label: "Checkout started", value: "4,134", percent: 48, note: "19.0% of views" },
  { label: "Orders", value: "1,984", percent: 29, note: "48.0% checkout CVR" },
];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function Home() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  async function refreshData() {
    setLoading(true);
    try {
      const response = await fetch("/api/metrics", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to refresh metrics");
      setData(await response.json());
    } finally { setLoading(false); }
  }

  const { revenue, orders, conversionRate, repeatRate } = data.metrics;
  return <main className={styles.shell}>
    <aside className={styles.sidebar}>
      <div className={styles.brand}><span className={styles.mark}>V</span><span>Vision Ops</span></div>
      <nav aria-label="Dashboard sections">
        <a className={styles.active} href="#overview"><span>â–¦</span>Overview</a><a href="#funnel"><span>â†—</span>Acquisition</a><a href="#retention"><span>â†»</span>Retention</a><a href="#audit"><span>â—ˆ</span>Tracking audit</a>
      </nav>
      <div className={styles.sidebarFooter}><span className={styles.liveDot} />Data workspace<br /><small>Source of truth prototype</small></div>
    </aside>
    <section className={styles.content}>
      <header className={styles.header}><div><p className={styles.eyebrow}>Growth command center</p><h1>Revenue, retention, and leaks â€” in one view.</h1></div><button className={styles.refresh} onClick={refreshData} disabled={loading}><span>â†»</span> {loading ? "Syncingâ€¦" : "Refresh live data"}</button></header>
      <div className={styles.statusRow}><span><i className={styles.liveDot} />Live mock API: {data.source}</span><span>Last sync: {new Date(data.syncedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span></div>
      <section id="overview" className={styles.metricGrid} aria-label="Key business metrics">
        <Metric label="Revenue" value={money.format(revenue)} delta="+14.8%" direction="up" context="vs. prior 30 days" /><Metric label="Orders" value={orders.toLocaleString("en-US")} delta="+9.2%" direction="up" context="vs. prior 30 days" /><Metric label="Blended conversion" value={`${conversionRate}%`} delta="+0.38 pts" direction="up" context="target: 3.5%" /><Metric label="Repeat purchase rate" value={`${repeatRate}%`} delta="-1.6 pts" direction="down" context="target: 32.0%" />
      </section>
      <section className={styles.gridTwo}>
        <article id="funnel" className={styles.panel}><div className={styles.panelHead}><div><p className={styles.panelKicker}>Acquisition</p><h2>Conversion funnel</h2></div><span className={styles.period}>Last 30 days</span></div><div className={styles.funnelList}>{funnel.map((step) => <div className={styles.funnelStep} key={step.label}><div className={styles.funnelLabel}><strong>{step.label}</strong><span>{step.note}</span></div><div className={styles.track}><div className={styles.bar} style={{ width: `${step.percent}%` }} /></div><strong>{step.value}</strong></div>)}</div><Insight><strong>Largest leak:</strong> 81.0% of product viewers do not start checkout. Test sticky offer CTA and faster product-page load before increasing ad spend.</Insight></article>
        <article id="retention" className={styles.panel}><div className={styles.panelHead}><div><p className={styles.panelKicker}>Subscription health</p><h2>Retention signal</h2></div><span className={styles.statusTag}>Watch</span></div><div className={styles.retentionNumber}><span>Projected 90-day LTV</span><strong>$147</strong><em>+$11 from offer test</em></div><div className={styles.cohort}><div><span>Month 0</span><b style={{ width: "100%" }}>100%</b></div><div><span>Month 1</span><b style={{ width: "69%" }}>69%</b></div><div><span>Month 2</span><b style={{ width: "51%" }}>51%</b></div><div><span>Month 3</span><b style={{ width: "40%" }}>40%</b></div></div><Insight><strong>Priority:</strong> Month 1 retention is strong; a dunning flow and failed-payment alert should protect Month 2 revenue.</Insight></article>
      </section>
      <section id="audit" className={`${styles.panel} ${styles.auditPanel}`}><div className={styles.panelHead}><div><p className={styles.panelKicker}>Checkout sample audit</p><h2>Tracking & integration risk register</h2><p className={styles.subcopy}>Audit scope: landing page â†’ checkout â†’ subscription rebill. Built as a pre-launch checklist for a direct-response stack.</p></div><div className={styles.score}><span>Audit score</span><strong>58<span>/100</span></strong></div></div><div className={styles.auditList}>{auditItems.map((item) => <article className={styles.auditItem} key={item.title}><span className={`${styles.severity} ${styles[item.severity.toLowerCase()]}`}>{item.severity}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div><span className={styles.owner}>{item.owner}</span></article>)}</div><div className={styles.auditFooter}><span><strong>Expected outcome:</strong> trustworthy blended ROAS and LTV by channel.</span><span>Next action: wire event schema + order metadata contract</span></div></section>
    </section>
  </main>;
}

function Insight({ children }: { children: React.ReactNode }) { return <div className={styles.insight}><span>âœ¦</span><p>{children}</p></div>; }
function Metric({ label, value, delta, direction, context }: { label: string; value: string; delta: string; direction: "up" | "down"; context: string }) { return <article className={styles.metricCard}><p>{label}</p><strong>{value}</strong><div><span className={direction === "up" ? styles.positive : styles.negative}>{direction === "up" ? "â†‘" : "â†“"} {delta}</span><small>{context}</small></div></article>; }

