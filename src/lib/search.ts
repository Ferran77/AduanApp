import { catalog } from "@/app/data/catalog";

export function searchProduct(query: string) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalize = (text: string) =>
    text.toLowerCase().replace(/[^\w\s]/g, "").trim();

  const cleanQuery = normalize(query);
  const queryWords = cleanQuery.split(" ");

  let results: any[] = [];

  catalog.forEach((item) => {
    item.fracciones.forEach((fraccion) => {
      let score = 0;

      fraccion.keywords.forEach((keyword) => {
        const cleanKeyword = normalize(keyword);

        queryWords.forEach((word) => {
          if (word === cleanKeyword) {
            score += 3; // match fuerte
          }
        });
      });

      // 👉 NUEVO FILTRO INTELIGENTE
      if (score > 0) {
        const maxScore = fraccion.keywords.length * 3;

        const confidence = Math.min(
          Math.round((score / maxScore) * 100),
          100
        );

        results.push({
          producto: item.name,
          fraccion: fraccion.code,
          noms: fraccion.noms,
          confidence,
          questions: item.questions || []
        });
      }
    });
  });

  // 👉 FILTRO FINAL (CLAVE)
  const filtered = results.filter((r) => r.confidence >= 30);

  return filtered
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}