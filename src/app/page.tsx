"use client";

import { useState, useEffect, startTransition } from "react";
import CameraCapture from "@/components/CameraCapture";
import {
  searchProduct,
  type LearningDataRow,
  type SearchResult,
} from "@/lib/search";
import { generateExportable, generatePDF } from "@/lib/export";
import {
  formatSupabaseError,
  logSupabaseError,
  supabase,
} from "@/lib/supabase";
import Image from "next/image";

type SearchHistoryRow = {
  selected_fraccion: string | null;
  id?: string;
  query: string;
  created_at?: string;
  results?: unknown;
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
  const [dbError, setDbError] = useState<string | null>(null);
  const [isSavingSearch, setIsSavingSearch] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const loadLearning = async () => {
    const { data, error } = await supabase.from("learning_data").select("*");
    if (error) {
      logSupabaseError("Error cargando aprendizaje", error);
      setDbError(formatSupabaseError(error));
      return;
    }
    setLearningData(data ?? []);
  };

  const loadHistory = async () => {
    const { data, error } = await supabase
      .from("search_history")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      logSupabaseError("Error cargando historial", error);
      setDbError(formatSupabaseError(error));
      return;
    }

    setHistory(data ?? []);
  };

  const saveSearchSession = async (
    searchQuery: string,
    searchResults: SearchResult[],
  ): Promise<string | null> => {
    const { data, error } = await supabase
      .from("search_history")
      .insert([
        {
          query: searchQuery,
          results: searchResults,
        },
      ])
      .select("id")
      .single();

    if (error) {
      logSupabaseError("Error guardando búsqueda", error);
      setDbError(formatSupabaseError(error));
      return null;
    }

    setDbError(null);
    return data?.id ?? null;
  };

  useEffect(() => {
    const init = async () => {
      await loadLearning();
    };
    void init();
  }, []);

  const runSearch = (input: string, dataOverride?: LearningDataRow[]) => {
    const res = searchProduct(input, dataOverride || learningData);
    setResults(res);
    return res;
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSavingSearch(true);
    const res = runSearch(query);
    const id = await saveSearchSession(query, res);
    setIsSavingSearch(false);

    if (id) {
      setLastSearchId(id);
      await loadHistory();
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

      setIsSavingSearch(true);
      const resSearch = runSearch(desc);
      const id = await saveSearchSession(desc, resSearch);
      setIsSavingSearch(false);

      if (id) {
        setLastSearchId(id);
        await loadHistory();
      }
    } catch (err) {
      console.error("Error con IA:", err);
    }
  };

  const handleSelect = async (item: SearchResult) => {
    if (!query.trim()) {
      alert("No hay una búsqueda activa para asociar esta fracción.");
      return;
    }

    setIsSelecting(true);

    let searchId = lastSearchId;

    if (!searchId) {
      const { data, error } = await supabase
        .from("search_history")
        .insert([
          {
            query,
            results,
            selected_fraccion: item.fraccion,
          },
        ])
        .select("id")
        .single();

      if (error) {
        logSupabaseError("Error creando registro de historial", error);
        setDbError(formatSupabaseError(error));
        setIsSelecting(false);
        alert(`No se pudo guardar la selección: ${formatSupabaseError(error)}`);
        return;
      }

      searchId = data?.id ?? null;
      setLastSearchId(searchId);
    } else {
      const { error } = await supabase
        .from("search_history")
        .update({ selected_fraccion: item.fraccion })
        .eq("id", searchId);

      if (error) {
        logSupabaseError("Error actualizando historial", error);
        setDbError(formatSupabaseError(error));
        setIsSelecting(false);
        alert(`No se pudo guardar la selección: ${formatSupabaseError(error)}`);
        return;
      }
    }

    const { error: learnError } = await supabase.from("learning_data").insert([
      {
        query,
        selected_fraccion: item.fraccion,
      },
    ]);

    if (learnError) {
      logSupabaseError("Error guardando aprendizaje", learnError);
      setDbError(formatSupabaseError(learnError));
      setIsSelecting(false);
      alert(
        `No se pudo guardar el aprendizaje: ${formatSupabaseError(learnError)}`,
      );
      return;
    }

    setDbError(null);

    const { data: newLearning, error: reloadError } = await supabase
      .from("learning_data")
      .select("*");

    if (reloadError) {
      logSupabaseError("Error recargando aprendizaje", reloadError);
      setDbError(formatSupabaseError(reloadError));
    } else {
      setLearningData(newLearning ?? []);
      setResults(searchProduct(query, newLearning ?? []));
    }

    await loadHistory();
    setIsSelecting(false);

    alert("Fracción seleccionada guardada");
  };

  useEffect(() => {
    startTransition(() => {
      void loadHistory();
    });
  }, []);

  return (
    <main className="p-10">
      {dbError && (
        <div
          role="alert"
          className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800"
        >
          {dbError}
        </div>
      )}

      {isSavingSearch && (
        <p className="mb-2 text-sm text-gray-500">Guardando búsqueda…</p>
      )}

      <div className="flex items-center gap-3 mb-4">
        <Image src="/logo.png" alt="ClasifIAduana" width={170} height={170} />
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
          onClick={() => void handleSearch()}
          disabled={isSavingSearch}
          className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
        >
          {isSavingSearch ? "Buscando…" : "Buscar"}
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

            {item.nom_seguridad?.length > 0 && (
              <p>
                <strong>NOM:</strong> {item.nom_seguridad.join(", ")}
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
                <details className="mt-3 bg-gray-950 p-3 rounded">
                  <summary className="cursor-pointer font-semibold text-cyan-400">
                  📋 Ver dictamen técnico
                  </summary>

                  <div className="mt-3 text-sm space-y-2">
                    <p>
                      <strong>Categoría:</strong> {item.categoria}
                    </p>

                    <p>
                      <strong>Material:</strong> {item.material}
                    </p>

                    <p>
                      <strong>Uso:</strong> {item.uso}
                    </p>

                    <p>
                      <strong>NICO:</strong> {item.nico}
                    </p>

                    <p>
                      <strong>País origen:</strong> {item.pais_origen}
                    </p>

                    <p>
                      <strong>Tratados:</strong> {item.tratados?.join(", ")}
                    </p>

                    <p>
                      <strong>DTA:</strong> {item.dta}
                    </p>

                    <p>
                      <strong>Clave pedimento:</strong> {item.clave_pedimento}
                    </p>

                    <p>
                      <strong>Unidad LIGIE:</strong> {item.unidad_ligie}
                    </p>

                    <p>
                      <strong>Fundamento:</strong> {item.fundamento}
                    </p>

                    <p>
                      <strong>Notas legales:</strong> {item.notas_legales}
                    </p>

                    {item.nom_seguridad?.length > 0 && (
                      <p>
                        <strong>NOM Seguridad:</strong>{" "}
                        {item.nom_seguridad.join(", ")}
                      </p>
                    )}

                    {item.nom_info?.length > 0 && (
                      <p>
                        <strong>NOM Info:</strong> {item.nom_info.join(", ")}
                      </p>
                    )}

                    {item.permisos?.length > 0 && (
                      <p>
                        <strong>Permisos:</strong> {item.permisos.join(", ")}
                      </p>
                    )}

                    {item.identificadores?.length > 0 && (
                      <p>
                        <strong>Identificadores:</strong>{" "}
                        {item.identificadores.join(", ")}
                      </p>
                    )}

                    <div className="mt-3 p-2 bg-yellow-950 rounded">
                      <p>⚠️ {item.alerta_clasificacion}</p>

                      <p className="mt-2">🔍 {item.alerta_reconocimiento}</p>
                    </div>
                    {/* 🧠 EXPLICACIÓN IA */}
                    <div className="mt-4 p-3 bg-gray-900 rounded">
                      <p className="font-semibold text-pink-400 mb-2">
                        🧠 Explicación IA
                      </p>

                      <ul className="list-disc ml-5 text-gray-300">
                        {item.explanation.map((exp: string, i: number) => (
                          <li key={i}>{exp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              </div>
            )}

            <button
              className="bg-green-500 text-white px-3 py-1 mt-3 disabled:opacity-50"
              disabled={isSavingSearch || isSelecting || !query.trim()}
              onClick={() => void handleSelect(item)}
            >
              {isSelecting ? "Guardando…" : "Elegir esta fracción"}
            </button>
            <button
              className="bg-purple-600 text-white px-3 py-1 mt-2 ml-2"
              onClick={() => generateExportable(item)}
            >
              📄 Exportar dictamen
            </button>

            <button
              className="bg-blue-900 text-white px-3 py-1 mt-2 ml-2"
              onClick={() => generatePDF(item)}
            >
              📄 Exportar PDF
            </button>
          </div>
        ))}
        <div className="mt-10">
          <h2 className="text-xl font-bold">Historial</h2>

          {history.length === 0 && !dbError && (
            <p className="mt-2 text-sm text-gray-500">
              Aún no hay búsquedas guardadas.
            </p>
          )}

          {history.map((item) => (
            <div key={item.id ?? item.created_at} className="border p-2 mt-2">
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
