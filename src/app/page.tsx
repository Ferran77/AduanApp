"use client";

import { useState, useEffect, startTransition } from "react";
import CameraCapture from "@/components/CameraCapture";
import Navbar from "@/components/Navbar";
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
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

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
  const [hasSearched, setHasSearched] = useState(false);
  const [history, setHistory] = useState<SearchHistoryRow[]>([]);
  const [lastSearchId, setLastSearchId] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
    setHasSearched(true);
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
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    setIsAnalyzing(true);


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
      setHasSearched(true);
      const resSearch = runSearch(desc);
      const id = await saveSearchSession(desc, resSearch);
      setIsSavingSearch(false);

      if (id) {
        setLastSearchId(id);
        await loadHistory();
      }
    } catch (err) {
      console.error("Error con IA:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelect = async (item: SearchResult) => {
    if (!query.trim()) {
      toast.error("No hay una búsqueda activa para asociar esta fracción.");
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
        toast.error(`No se pudo guardar la selección: ${formatSupabaseError(error)}`);
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
        toast.error(`No se pudo guardar la selección: ${formatSupabaseError(error)}`);
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
      toast.error(
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

    toast.success("Fracción seleccionada guardada");
  };

  useEffect(() => {
    startTransition(() => {
      void loadHistory();
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl p-6 md:p-10">
        <Toaster position="top-right" />
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

        {imagePreview && (
          <div
            className="
      mb-4
      flex
      items-center
      gap-4
      rounded-2xl
      border
      border-slate-800
      bg-slate-950/80
      p-3
    "
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="
        h-20
        w-20
        rounded-xl
        object-cover
        border
        border-slate-700
      "
            />

            <div className="flex-1">
              <p className="text-sm text-slate-300">
                {imageName}
              </p>

              {isAnalyzing && (
                <div className="mt-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="
                h-full
                w-full
                animate-pulse
                bg-cyan-400
              "
                    />
                  </div>

                  <p className="mt-1 text-xs text-cyan-300">
                    Analizando imagen con IA...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className="
    mb-6
    flex
    flex-col
    gap-4
    rounded-3xl
    border
    border-slate-800
    bg-slate-950/80
    p-5
    shadow-xl
    shadow-black/30
    backdrop-blur
  "
        >

          {/* 🔍 INPUT */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Describe tu mercancía o producto..."
              className="
        w-full
        rounded-2xl
        border
        border-slate-700
        bg-slate-900
        px-5
        py-4
        text-lg
        text-white
        outline-none
        transition-all
        duration-200
        placeholder:text-slate-500
        focus:border-cyan-400
        focus:ring-2
        focus:ring-cyan-500/20
      "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void handleSearch();
                }
              }}
            />

            <span
              className="
        pointer-events-none
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-slate-500
      "
            >
              🔍
            </span>
          </div>

          {/* 🚀 ACTIONS */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* 🔎 BUSCAR */}
            <button
              onClick={() => void handleSearch()}
              disabled={isSavingSearch}
              className="
       w-full
  rounded-2xl
  bg-cyan-500
  py-3
  font-semibold
  text-slate-950
  transition-all
  duration-200
  hover:bg-cyan-400
  hover:scale-[1.02]
  disabled:opacity-50
      "
            >
              {isSavingSearch ? "Buscando…" : "Buscar"}
            </button>

            {/* 📸 SUBIR */}
            <label
              className="
         flex
  w-full
  cursor-pointer
  items-center
  justify-center
  gap-2
  rounded-2xl
  border
  border-slate-700
  bg-slate-900
  py-3
  font-medium
  text-white
  transition-all
  duration-200
  hover:border-cyan-500
  hover:bg-slate-800
      "
            >
              📸 Subir imagen

              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* 🎥 CÁMARA */}
            <div
              className="
            w-full
          "
            >
              <CameraCapture
                onCapture={(file) => {
                  const fakeEvent = {
                    target: { files: [file] },
                  };

                  handleImageUpload(fakeEvent);
                }}
              />
            </div>
          </div>
        </div>
        <Link
          href="/history"
          className="
    mb-1
    inline-flex
    items-center
    gap-2
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
          📚 Ver historial
        </Link>
        <div className="mt-6">
          {hasSearched && results.length === 0 && (
            <p className="text-gray-500">
              No se encontró una clasificación clara. Intenta describir mejor el
              producto.
            </p>
          )}
          {results.map((item, index) => (
            <div
              key={index}
              className="
            mb-4
            rounded-2xl
            border
            border-slate-800
            bg-slate-950
            p-6
            shadow-lg
            shadow-black/30
            transition-all
            duration-300
            hover:border-cyan-500/40
          "
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {item.fraccion}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.descripcion}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="
        rounded-full
        bg-cyan-500/20
        px-3
        py-1
        text-sm
        font-semibold
        text-cyan-300
      "
                  >
                    {item.confidence}% confianza
                  </span>

                  {item.recommended && (
                    <span
                      className="
          rounded-full
          bg-amber-400/20
          px-3
          py-1
          text-sm
          font-semibold
          text-amber-300
        "
                    >
                      🔥 Recomendado
                    </span>
                  )}
                </div>
              </div>

              <p>
                <strong>Descripción:</strong> {item.descripcion}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300">
                  IGI {item.igi}
                </span>

                <span className="rounded-full bg-violet-500/20 px-3 py-1 text-sm text-violet-300">
                  IVA {item.iva}
                </span>

                {item.nom_seguridad?.map((nom: string) => (
                  <span
                    key={nom}
                    className="
        rounded-full
        bg-emerald-500/20
        px-3
        py-1
        text-sm
        text-emerald-300
      "
                  >
                    {nom}
                  </span>
                ))}
              </div>

              {item.nom_seguridad?.length > 0 && (
                <p>
                  <strong>NOM:</strong> {item.nom_seguridad.join(", ")}
                </p>
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
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="rounded-xl
  bg-emerald-500
  px-4
  py-2
  font-semibold
  text-white
  transition-all
  duration-200
  hover:bg-emerald-400"
                  disabled={isSavingSearch || isSelecting || !query.trim()}
                  onClick={() => void handleSelect(item)}
                >
                  {isSelecting ? "Guardando…" : "Elegir esta fracción"}
                </button>
                <button
                  className="rounded-xl
  bg-fuchsia-600
  px-4
  py-2
  font-semibold
  text-white
  transition-all
  duration-200
  hover:bg-fuchsia-500"
                  onClick={() => generateExportable(item)}
                >
                  📄 Exportar dictamen
                </button>

                <button
                  className="rounded-xl
  bg-cyan-900
  px-4
  py-2
  font-semibold
  text-white
  transition-all
  duration-200
  hover:bg-cyan-800"
                  onClick={() => generatePDF(item)}
                >
                  📄 Exportar PDF
                </button>
              </div>
            </div>
          ))}

        </div>
      </main>
    </>
  );
}
