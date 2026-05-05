"use client";

import { useState, useEffect, startTransition } from "react";
import CameraCapture from "@/components/CameraCapture";
import { searchProduct } from "@/lib/search";
import { generateExportable, generatePDF } from "@/lib/export";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type SearchResult = ReturnType<typeof searchProduct>[number];

type SearchHistoryRow = {
  selected_fraccion: string | null;
  id?: string;
  query: string;
  created_at?: string;
  results?: unknown;
};

type LearningDataRow = {
  id?: string;
  query: string;
  selected_fraccion: string | null;
  created_at?: string;
};

/** Compatible con `<input type="file">` y el evento sintético de `CameraCapture`. */
type ImageFileChange = {
  target: { files?: FileList | readonly File[] | null };
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<SearchHistoryRow[]>([]);
  const [lastSearchId, setLastSearchId] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [learningData, setLearningData] = useState<LearningDataRow[]>([]);

  useEffect(() => {
    const loadLearning = async () => {
      const { data } = await supabase.from("learning_data").select("*");

      console.log("📦 learning cargado:", data);

      setLearningData((data as LearningDataRow[] | null) ?? []);
    };

    loadLearning();
  }, []);

  const loadHistory = async () => {
    const { data } = await supabase
      .from("search_history")
      .select("*")
      .order("created_at", { ascending: false });

    setHistory(data ?? []);
  };

  const runSearch = (input: string, dataOverride?: LearningDataRow[]) => {
    const res = searchProduct(input, dataOverride || learningData);
    setResults(res);
    return res;
  };

  const handleSearch = async () => {
    const res = runSearch(query);

    const { data } = await supabase
      .from("search_history")
      .insert([
        {
          query,
          results: res,
        },
      ])
      .select()
      .single();

    if (data) {
      setLastSearchId(data.id);
    }
  };

  const handleImageUpload = async (e: ImageFileChange) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Imagen seleccionada:", file.name);
    setImageName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log("RAW DATA:", data);

      const desc = data.description?.toLowerCase().trim();

      console.log("IA detectó:", desc);

      // 🚫 PROTECCIÓN
      if (!desc || desc === "desconocido") {
        setResults([]);
        setQuery("");
        return;
      }

      setQuery(desc);

      const resSearch = runSearch(desc);

      // 👉 GUARDA IGUAL QUE handleSearch
      const { data: insertData } = await supabase
        .from("search_history")
        .insert([
          {
            query: desc,
            results: resSearch,
          },
        ])
        .select()
        .single();

      if (insertData) {
        setLastSearchId(insertData.id);
      }
    } catch (err) {
      console.error("Error con IA:", err);
    }
  };

  const handleSelect = async (item: SearchResult) => {
    if (!lastSearchId) {
      console.log("❌ No hay lastSearchId");
      return;
    }

    // ✔ actualizar historial
    await supabase
      .from("search_history")
      .update({ selected_fraccion: item.fraccion })
      .eq("id", lastSearchId);

    // 🔥 🔥 🔥 AQUI ESTABA EL BUG — INSERTAR APRENDIZAJE
    await supabase.from("learning_data").insert([
      {
        query,
        selected_fraccion: item.fraccion,
      },
    ]);

    console.log("🧠 Aprendizaje guardado:", query, item.fraccion);

    // 🔥 ahora sí obtenemos todo actualizado
    const { data: newLearning } = await supabase
      .from("learning_data")
      .select("*");

    console.log("🧠 NUEVO learning:", newLearning);

    // 🔥 recalculamos con datos reales
    const res = searchProduct(query, (newLearning as LearningDataRow[] | null) ?? []);
    setResults(res);

    setLearningData((newLearning as LearningDataRow[] | null) ?? []);

    await loadHistory();

    alert("Fracción seleccionada guardada");
  };

  useEffect(() => {
    void supabase
      .from("search_history")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        startTransition(() => {
          setHistory(data ?? []);
        });
      });
  }, []);

  return (
    <main className="p-10">
      <div className="flex items-center gap-3 mb-4">
  <Image
    src="/logo.png"
    alt="ClasifIAduana"
    width={170}
    height={170}
  />
</div>
      {imageName && (
        <div className="mb-2">
          <p className="text-sm text-gray-500">
            Imagen seleccionada: {imageName}
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Describe tu producto..."
          className="border p-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Buscar
        </button>

        <label className="border p-2 cursor-pointer bg-blue-900 hover:bg-gray-200">
          📸 Subir imagen
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <CameraCapture
          onCapture={(file) => {
            // reutilizamos tu lógica existente 👇
            const fakeEvent = {
              target: { files: [file] },
            };

            handleImageUpload(fakeEvent);
          }}
        />
      </div>
      <div className="mt-6">
        {results.length === 0 && (
          <p className="text-gray-500">
            No se encontró una clasificación clara. Intenta describir mejor el
            producto.
          </p>
        )}
        {results.map((item, index) => (
          <div key={index} className="border p-4 mb-4">
            <p>
              <strong>Fracción:</strong> {item.fraccion}
            </p>
            <p>
              <strong>Confianza:</strong> {item.confidence}%
            </p>

            <p>
              <strong>Descripción:</strong> {item.descripcion}
            </p>
            <p>
              <strong>IGI:</strong> {item.igi} | <strong>IVA:</strong>{" "}
              {item.iva}
            </p>

            {item.nom?.length > 0 && (
              <p>
                <strong>NOM:</strong> {item.nom.join(", ")}
              </p>
            )}

            {item.recommended && (
              <span className="text-xs bg-yellow-300 px-2 py-1 mt-2 inline-block rounded">
                🔥 Recomendado
              </span>
            )}

            {/* 👇 AQUÍ VA EL MODO EXPERTO */}
            {item.explanation && (
              <div className="mt-3 p-2 bg-gray-900 rounded text-sm text-gray-300">
                <p className="font-semibold">🧠 ¿Por qué?</p>
                <ul className="list-disc ml-5">
                  {item.explanation.map((exp: string, i: number) => (
                    <li key={i}>{exp}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className="bg-green-500 text-white px-3 py-1 mt-3"
              onClick={() => handleSelect(item)}
            >
              Elegir esta fracción
            </button>
            <button
              className="bg-purple-600 text-white px-3 py-1 mt-2 ml-2"
              onClick={() => generateExportable(item)}
            >
              📄 Exportar dictamen
            </button>

            <button 
            className="bg-blue-900 text-white px-3 py-1 mt-2 ml-2"
            onClick={() => generatePDF(item)}>📄 Exportar PDF</button>
          </div>
        ))}
        <div className="mt-10">
          <h2 className="text-xl font-bold">Historial</h2>

          {history.map((item, index) => (
            <div key={index} className="border p-2 mt-2">
              <p>
                <strong>Búsqueda:</strong> {item.query}
              </p>

              <p>
                <strong>Elegida:</strong>{" "}
                {item.selected_fraccion ? (
                  <span className="text-green-600 font-semibold">
                    {item.selected_fraccion}
                  </span>
                ) : (
                  <span className="text-gray-400">Sin seleccionar</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
