import { AllocationChart } from "@/components/AllocationChart";
import { HoldingsTable } from "@/components/HoldingsTable";
import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { cash, holdings, performanceHistory } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function Page() {
  const enriched = holdings.map((h) => ({ ...h, value: h.shares * h.price }));
  const invested = enriched.reduce((s, h) => s + h.value, 0);
  const netWorth = invested + cash;
  const allocation = enriched.map((h) => ({ name: h.ticker, value: h.value }));

  const monthAgo = performanceHistory[performanceHistory.length - 2].value;
  const change = netWorth - monthAgo;
  const changePct = (change / monthAgo) * 100;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Investments</h1>
        <p className="mt-1 text-sm text-neutral-400">Personal portfolio · demo</p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Net worth"
          value={formatCurrency(netWorth)}
          hint={`${change >= 0 ? "+" : ""}${formatCurrency(change)} (${changePct.toFixed(1)}%) MoM`}
        />
        <MetricCard
          label="Invested"
          value={formatCurrency(invested)}
          hint={`${enriched.length} holdings`}
        />
        <MetricCard label="Cash" value={formatCurrency(cash)} />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
          <h2 className="mb-4 text-sm font-medium text-neutral-300">Portfolio value</h2>
          <PerformanceChart data={performanceHistory} />
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
          <h2 className="mb-4 text-sm font-medium text-neutral-300">Allocation</h2>
          <AllocationChart data={allocation} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-sm font-medium text-neutral-300">Holdings</h2>
        <HoldingsTable holdings={enriched} />
      </section>
    </main>
  );
}
