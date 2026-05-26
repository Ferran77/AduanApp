"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type SearchHistoryRow = {
  id?: string;
  query: string;
  selected_fraccion: string | null;
  created_at?: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<SearchHistoryRow[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const { data } = await supabase
        .from("search_history")
        .select("*")
        .order("created_at", { ascending: false });

      setHistory(data ?? []);
    };

    loadHistory();
  }, []);

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          📚 Historial de Clasificaciones
        </h1>

        <Link
          href="/"
          className="
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
            py-2
            text-white
            transition-all
            hover:border-cyan-500
          "
        >
          ← Volver
        </Link>
      </div>

      {/* LISTA */}
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-950
              p-5
              shadow-lg
              shadow-black/30
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-white">
                  {item.query}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString()
                    : "Sin fecha"}
                </p>
              </div>

              <div>
                {item.selected_fraccion ? (
                  <span
                    className="
                      rounded-full
                      bg-emerald-500/20
                      px-3
                      py-1
                      text-sm
                      font-semibold
                      text-emerald-300
                    "
                  >
                    {item.selected_fraccion}
                  </span>
                ) : (
                  <span
                    className="
                      rounded-full
                      bg-slate-800
                      px-3
                      py-1
                      text-sm
                      text-slate-400
                    "
                  >
                    Sin seleccionar
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}