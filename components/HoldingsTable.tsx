import { Holding } from "@/lib/data";
import { formatCurrencyPrecise } from "@/lib/utils";

type Props = { holdings: (Holding & { value: number })[] };

export function HoldingsTable({ holdings }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800">
      <table className="w-full">
        <thead className="bg-neutral-900/50 text-left text-xs uppercase tracking-wider text-neutral-400">
          <tr>
            <th className="px-6 py-3">Ticker</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3 text-right">Shares</th>
            <th className="px-6 py-3 text-right">Price</th>
            <th className="px-6 py-3 text-right">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {holdings.map((h) => (
            <tr key={h.ticker} className="hover:bg-neutral-900/30">
              <td className="px-6 py-3 font-medium">{h.ticker}</td>
              <td className="px-6 py-3 text-neutral-400">{h.name}</td>
              <td className="px-6 py-3 text-right tabular-nums">{h.shares}</td>
              <td className="px-6 py-3 text-right tabular-nums">{formatCurrencyPrecise(h.price)}</td>
              <td className="px-6 py-3 text-right tabular-nums font-medium">
                {formatCurrencyPrecise(h.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
