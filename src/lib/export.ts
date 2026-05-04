import jsPDF from "jspdf";

// 🧾 JSON EXPORT
export function generateExportable(item: any) {
  const exportData = {
    producto: item.producto,
    fraccion: item.fraccion,
    descripcion: item.descripcion,
    categoria: item.categoria,

    impuestos: {
      igi: item.igi,
      iva: item.iva,
    },

    regulaciones: {
      nom: item.nom,
    },

    explicacion: item.explanation,

    fecha: new Date().toLocaleString(),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `dictamen_${item.fraccion}.json`;
  a.click();

  URL.revokeObjectURL(url);
}


// 📄 PDF EXPORT
export function generatePDF(item: any) {
  const doc = new jsPDF();

  let y = 10;

  doc.setFontSize(16);
  doc.text("DICTAMEN DE CLASIFICACIÓN ARANCELARIA", 10, y);

  y += 10;

  doc.setFontSize(12);

  doc.text(`Producto: ${item.producto}`, 10, y); y += 7;
  doc.text(`Fracción: ${item.fraccion}`, 10, y); y += 7;
  doc.text(`Descripción: ${item.descripcion}`, 10, y); y += 10;

  doc.text("Impuestos:", 10, y); y += 7;
  doc.text(`IGI: ${item.igi}`, 15, y); y += 7;
  doc.text(`IVA: ${item.iva}`, 15, y); y += 10;

  if (item.nom?.length > 0) {
    doc.text("Regulaciones:", 10, y); y += 7;
    doc.text(`NOM: ${item.nom.join(", ")}`, 15, y); y += 10;
  }

  if (item.explanation?.length > 0) {
    doc.text("Justificación:", 10, y); y += 7;

    item.explanation.forEach((exp: string) => {
      doc.text(`- ${exp}`, 15, y);
      y += 6;
    });

    y += 5;
  }

  doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, y);

  doc.save(`dictamen_${item.fraccion}.pdf`);
}