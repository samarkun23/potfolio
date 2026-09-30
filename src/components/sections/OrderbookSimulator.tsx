"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Play, RotateCcw, Activity, Terminal, ShieldCheck } from "lucide-react";
import { zenSound } from "@/lib/sound";

interface OrderLevel {
  price: number;
  size: number;
  total: number;
}

const initialAsks: OrderLevel[] = [
  { price: 142.60, size: 84.5, total: 245.2 },
  { price: 142.55, size: 42.1, total: 160.7 },
  { price: 142.52, size: 68.3, total: 118.6 },
  { price: 142.50, size: 50.3, total: 50.3 },
];

const initialBids: OrderLevel[] = [
  { price: 142.48, size: 62.4, total: 62.4 },
  { price: 142.45, size: 75.8, total: 138.2 },
  { price: 142.40, size: 91.2, total: 229.4 },
  { price: 142.35, size: 115.0, total: 344.4 },
];

export default function OrderbookSimulator() {
  const [asks, setAsks] = useState<OrderLevel[]>(initialAsks);
  const [bids, setBids] = useState<OrderLevel[]>(initialBids);
  const [latency, setLatency] = useState(680);
  const [matchedCount, setMatchedCount] = useState(14820);
  const [logs, setLogs] = useState<string[]>([
    "ENGINE_READY: RingBuffer capacity 65536 initialized on CPU core 3",
    "POLL: WebSocket L2 book stream listening on tokio-epoll",
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  const injectOrders = () => {
    zenSound.playBladeSheen();
    setIsSimulating(true);

    const newLatency = Math.floor(620 + Math.random() * 140);
    setLatency(newLatency);

    // Randomize order sizes
    const newAsks = asks.map((a) => ({
      ...a,
      size: Number((a.size + (Math.random() * 20 - 8)).toFixed(1)),
    }));
    const newBids = bids.map((b) => ({
      ...b,
      size: Number((b.size + (Math.random() * 20 - 8)).toFixed(1)),
    }));

    setAsks(newAsks);
    setBids(newBids);
    setMatchedCount((prev) => prev + Math.floor(80 + Math.random() * 120));

    const timestamp = new Date().toISOString().substring(11, 23);
    const newLog = `MATCH [${timestamp}]: Executed 142.5 SOL @ 142.49 [${newLatency}ns p99 | 0-alloc]`;
    setLogs((prev) => [newLog, ...prev.slice(0, 4)]);

    setTimeout(() => setIsSimulating(false), 300);
  };

  const sweepMarket = () => {
    zenSound.playBladeSheen();
    setIsSimulating(true);

    const newLatency = Math.floor(580 + Math.random() * 90);
    setLatency(newLatency);

    // Sweep top ask
    setAsks((prev) => prev.slice(1));
    setMatchedCount((prev) => prev + 450);

    const timestamp = new Date().toISOString().substring(11, 23);
    setLogs((prev) => [
      `MARKET_SWEEP [${timestamp}]: Taker consumed top ask depth (450 SOL) [${newLatency}ns]`,
      ...prev.slice(0, 4),
    ]);

    setTimeout(() => setIsSimulating(false), 300);
  };

  const resetBook = () => {
    zenSound.playBambooTap();
    setAsks(initialAsks);
    setBids(initialBids);
    setLatency(680);
    setLogs(["ENGINE_RESET: Orderbook memory buffer cleared and repinned"]);
  };

  return (
    <div className="mt-8 blade-card rounded-2xl border border-white/10 p-5 sm:p-6 overflow-hidden">
      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <div>
            <h4 className="font-serif text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span>Interactive Telemetry Simulator</span>
              <span className="font-serif text-xs text-crimson font-medium">零遅延実証</span>
            </h4>
            <p className="font-mono text-[11px] text-muted-text">
              Real-time in-memory L2 order matching engine emulation
            </p>
          </div>
        </div>

        {/* Live Metrics HUD */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-2.5 py-1 rounded bg-[#08090a] border border-white/10 flex items-center gap-1.5">
            <span className="text-muted-text text-[10px]">p99 Latency:</span>
            <span className="text-accent font-semibold">{latency}ns</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-[#08090a] border border-white/10 flex items-center gap-1.5">
            <span className="text-muted-text text-[10px]">Throughput:</span>
            <span className="text-blade">1.4M/s</span>
          </div>
          <div className="hidden sm:flex px-2.5 py-1 rounded bg-[#08090a] border border-white/10 items-center gap-1.5">
            <span className="text-muted-text text-[10px]">Alloc:</span>
            <span className="text-crimson font-semibold">0B</span>
          </div>
        </div>
      </div>

      {/* Orderbook Depth Ladder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Asks (Sell Orders) */}
        <div className="rounded-xl bg-[#08090a]/80 border border-white/5 p-3.5">
          <div className="flex items-center justify-between font-mono text-[10px] text-muted-text pb-2 border-b border-white/5 uppercase">
            <span>Price (USDC)</span>
            <span>Size (SOL)</span>
            <span>Depth</span>
          </div>
          <div className="space-y-1.5 mt-2 font-mono text-xs">
            {asks.slice(0, 4).map((ask, idx) => (
              <div
                key={idx}
                className="relative flex items-center justify-between py-0.5 px-1 rounded hover:bg-white/[0.02]"
              >
                <div
                  className="absolute right-0 top-0 bottom-0 bg-crimson/10 rounded pointer-events-none"
                  style={{ width: `${Math.min(100, (ask.size / 120) * 100)}%` }}
                />
                <span className="text-crimson font-medium relative z-10">
                  ${ask.price.toFixed(2)}
                </span>
                <span className="text-blade/80 relative z-10">{ask.size.toFixed(1)}</span>
                <span className="text-muted-text text-[10px] relative z-10">
                  {ask.total.toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="rounded-xl bg-[#08090a]/80 border border-white/5 p-3.5">
          <div className="flex items-center justify-between font-mono text-[10px] text-muted-text pb-2 border-b border-white/5 uppercase">
            <span>Price (USDC)</span>
            <span>Size (SOL)</span>
            <span>Depth</span>
          </div>
          <div className="space-y-1.5 mt-2 font-mono text-xs">
            {bids.slice(0, 4).map((bid, idx) => (
              <div
                key={idx}
                className="relative flex items-center justify-between py-0.5 px-1 rounded hover:bg-white/[0.02]"
              >
                <div
                  className="absolute right-0 top-0 bottom-0 bg-accent/10 rounded pointer-events-none"
                  style={{ width: `${Math.min(100, (bid.size / 120) * 100)}%` }}
                />
                <span className="text-accent font-medium relative z-10">
                  ${bid.price.toFixed(2)}
                </span>
                <span className="text-blade/80 relative z-10">{bid.size.toFixed(1)}</span>
                <span className="text-muted-text text-[10px] relative z-10">
                  {bid.total.toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simulator Controls & Log Stream */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-white/10">
        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={injectOrders}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent/15 border border-accent/30 text-accent hover:bg-accent hover:text-background font-mono text-xs font-medium transition-all shadow-[0_0_12px_rgba(16,185,129,0.15)] disabled:opacity-50"
          >
            <Zap size={12} />
            <span>Inject 1,000 Orders</span>
          </button>

          <button
            onClick={sweepMarket}
            disabled={isSimulating || asks.length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-crimson/15 border border-crimson/30 text-crimson hover:bg-crimson hover:text-white font-mono text-xs font-medium transition-all disabled:opacity-50"
          >
            <Play size={11} className="fill-current" />
            <span>Market Sweep</span>
          </button>

          <button
            onClick={resetBook}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 text-muted-text hover:text-white hover:border-white/20 font-mono text-xs transition-colors"
            title="Reset Orderbook State"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Trade execution ticker */}
        <div className="font-mono text-xs text-muted-text flex items-center gap-2">
          <ShieldCheck size={13} className="text-accent" />
          <span>Total Executions:</span>
          <span className="text-white font-semibold">{matchedCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Log Feed */}
      <div className="mt-4 p-2.5 rounded-lg bg-[#060709] border border-white/5 font-mono text-[11px] text-muted-text space-y-1">
        <div className="flex items-center gap-1.5 text-text-secondary/70 mb-1">
          <Terminal size={11} className="text-crimson" />
          <span className="text-[10px] uppercase tracking-wider">Engine Event Stream</span>
        </div>
        {logs.map((log, idx) => (
          <div key={idx} className="truncate text-blade/70">
            <span className="text-crimson/80">▸ </span>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
