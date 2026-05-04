import { catalog } from "@/app/data/catalog";

export function searchProduct(query: string, learningData: any[] = []) {
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(" ").filter(Boolean);

  const results: any[] = [];

  // 🧠 normaliza string
  const normalize = (str: string) =>
    String(str).toLowerCase().trim();

  // 🔥 conteo de aprendizaje por fracción
  function getLearningBoost(fraccionCode: string, data: any[]) {
    const current = normalize(fraccionCode);

    const count = data.filter(
      (l) => normalize(l.selected_fraccion) === current
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
          unidad: fraccion.general?.unidad,

          igi: fraccion.impuestos?.igi,
          iva: fraccion.impuestos?.iva,

          nom: fraccion.regulaciones?.nom || [],

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