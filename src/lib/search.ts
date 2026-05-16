import { catalog } from "@/app/data/catalog";

type CatalogFraccion = (typeof catalog)[number]["fracciones"][number];

type CatalogQuestion = {
  question: string;
  options: string[];
};

export type SearchResult = {
  producto: string;
  fraccion: string;
  data: CatalogFraccion;
  descripcion?: string;
  categoria?: string;
  material?: string;
  uso?: string;
  unidad?: string;
  nico?: string;
  pais_origen?: string;
  tratados: string[];
  forma_aplicacion: string[];
  igi?: string;
  iva?: string;
  dta?: string;
  otros_impuestos: string[];
  nom_seguridad: string[];
  nom_info: string[];
  permisos: string[];
  identificadores: string[];
  clave_pedimento?: string;
  unidad_ligie?: string;
  fundamento?: string;
  notas_legales?: string;
  alerta_clasificacion?: string;
  alerta_reconocimiento?: string;
  confidence: number;
  questions: CatalogQuestion[];
  recommended: boolean;
  explanation: string[];
};

export type LearningDataRow = {
  id?: string;
  query: string;
  selected_fraccion: string | null;
  created_at?: string;
};

export function searchProduct(
  query: string,
  learningData: LearningDataRow[] = []
) {
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(" ").filter(Boolean);

  const results: SearchResult[] = [];

  // 🧠 normaliza string
  const normalize = (str: string) =>
    String(str).toLowerCase().trim();

  // 🔥 conteo de aprendizaje por fracción
  function getLearningBoost(fraccionCode: string, data: LearningDataRow[]) {
    const current = normalize(fraccionCode);

    const count = data.filter(
      (l) =>
        l.selected_fraccion != null &&
        normalize(l.selected_fraccion) === current
    ).length;

    return count;
  }

  catalog.forEach((item) => {
    item.fracciones.forEach((fraccion) => {
      let baseScore = 0;
      let learningScore = 0;

      const explanation: string[] = [];

      // 🔹 MATCH BASE (keywords)
      (fraccion.keywords || []).forEach((keyword: string) => {
        const k = normalize(keyword);

        if (lowerQuery.includes(k)) {
          baseScore += 3;
          explanation.push(`Coincidió con "${keyword}"`);
        } else {
          queryWords.forEach((word) => {
            if (word === k) {
              baseScore += 2;
              explanation.push(`Coincidencia parcial "${keyword}"`);
            }
          });
        }
      });

      // 🔥 FILTRAR APRENDIZAJE RELEVANTE
      const relevantLearning = learningData.filter((learn) => {
        const learnedQuery = normalize(learn.query);

        return (
          lowerQuery.includes(learnedQuery) ||
          learnedQuery.includes(lowerQuery) ||
          queryWords.some((word) => learnedQuery.includes(word))
        );
      });

      // 🔥 BOOST POR USO
      const learningBoost = getLearningBoost(
        fraccion.code,
        relevantLearning
      );

      if (learningBoost > 0) {
        learningScore += learningBoost * 5;
        explanation.push(
          `Usada ${learningBoost} vez(es) en búsquedas similares`
        );
      }

      // 🔥 SCORE FINAL
      const score = baseScore + learningScore;

      if (score > 0) {
        explanation.push(`Score base: ${baseScore}`);
        explanation.push(`Boost aprendizaje: +${learningScore}`);

        const confidence = Math.min(Math.round(score * 10), 100);

        results.push({
          producto: item.name,
          fraccion: fraccion.code,

          // 🔥 NUEVO: DATOS COMPLETOS
          data: fraccion,

          // 👇 accesos rápidos para UI
          descripcion: fraccion.general?.descripcion,
          categoria: fraccion.general?.categoria,
          material: fraccion.general?.material,
          uso: fraccion.general?.uso,
          unidad: fraccion.general?.unidad,
          nico: fraccion.general?.nico,
          
          pais_origen: fraccion.comercio?.pais_origen,
          tratados: fraccion.comercio?.tratados || [],
          forma_aplicacion:
            fraccion.comercio?.forma_aplicacion || [],
          
          igi: fraccion.impuestos?.igi,
          iva: fraccion.impuestos?.iva,
          dta: fraccion.impuestos?.dta,
          otros_impuestos:
            fraccion.impuestos?.otros || [],
          
          nom_seguridad:
            fraccion.regulaciones?.nom_seguridad || [],
          
          nom_info:
            fraccion.regulaciones?.nom_info || [],
          
          permisos:
            fraccion.regulaciones?.permisos || [],
          
          identificadores:
            fraccion.regulaciones?.identificadores || [],
          
          clave_pedimento:
            fraccion.pedimento?.clave,
          
          unidad_ligie:
            fraccion.pedimento?.unidad_ligie,
          
          fundamento:
            fraccion.legales?.fundamento,
          
          notas_legales:
            fraccion.legales?.notas,
          
          alerta_clasificacion:
            fraccion.alertas?.clasificacion,
          
          alerta_reconocimiento:
            fraccion.alertas?.reconocimiento,

          confidence,
          questions: item.questions || [],
          recommended: learningBoost > 0,

          explanation,
        });
      }
    });
  });

  return results
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}