import { catalog } from "@/app/data/catalog";

export function searchProduct(query: string, learningData: any[] = []) {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(" ");

  const results: any[] = [];

  console.log("🧠 learningData:", learningData);

  function getLearningBoost(fraccionCode: string, learningData: any[]) {
    let count = 0;

    learningData.forEach((learn) => {
      const learned = String(learn.selected_fraccion).trim();
      const current = String(fraccionCode).trim();

      if (learned === current) {
        count++;
      }
    });

    return count;
  }

  catalog.forEach((item) => {
    item.fracciones.forEach((fraccion) => {
      let score = 0;

      // 🔹 MATCH BASE
      fraccion.keywords.forEach((keyword: string) => {
        const lowerKeyword = keyword.toLowerCase();

        if (lowerQuery.includes(lowerKeyword)) {
          score += 3;
        } else {
          queryWords.forEach((word) => {
            if (word === lowerKeyword) score += 2;
          });
        }
      });

      // 🔥 APRENDIZAJE
      learningData.forEach((learn) => {
        const learnedQuery = learn.query.toLowerCase();

        const similarity =
          lowerQuery.includes(learnedQuery) ||
          learnedQuery.includes(lowerQuery) ||
          queryWords.some((word) => learnedQuery.includes(word));

        if (similarity) {
          if (learn.selected_fraccion === fraccion.code) {
            console.log("🔥 MATCH LEARNING:", learnedQuery, fraccion.code);
            score += 5;
          }
        }
      });

      if (score > 0) {
        const learningBoost = getLearningBoost(fraccion.code, learningData);

        score += learningBoost * 3; // 🔥 peso ajustable

        const confidence = Math.min(Math.round(score * 10), 100);

        results.push({
          producto: item.name,
          fraccion: fraccion.code,
          noms: fraccion.noms,
          confidence,
          questions: item.questions || [],
          recommended: learningBoost > 0,
        });
      }
    });
  });

  return results
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}