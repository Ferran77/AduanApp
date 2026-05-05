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

// 👇 convierte imagen (ruta pública) a base64
async function loadImageAsBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// 👇 genera QR usando API pública (rápida para MVP)
function getQRUrl(text: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
}

export async function generatePDF(item: any) {
  const doc = new jsPDF();

  // 🎨 COLORES DE MARCA (puedes cambiarlos dinámicamente)
  const brand = {
    primary: [30, 41, 59],   // azul oscuro
    accent: [99, 102, 241],  // violeta
    text: [0, 0, 0],
  };

  // 🖼️ LOGO (coloca tu archivo en /public/logo.png)
  const logoBase64 = await loadImageAsBase64("/logo.png");

  // ✍️ FIRMA (coloca /public/signature.png)
  const signatureBase64 = await loadImageAsBase64("/signature.png");

  // 🔗 QR (validación simple con JSON serializado)
  const qrContent = JSON.stringify({
    fraccion: item.fraccion,
    producto: item.producto,
    fecha: new Date().toISOString(),
  });

  const qrBase64 = await loadImageAsBase64(getQRUrl(qrContent));

  let y = 15;

  // 🟥 HEADER
  doc.setFillColor(...brand.primary);
  doc.rect(0, 0, 210, 25, "F");

  // 🖼️ LOGO
  doc.addImage(logoBase64, "PNG", 10, 5, 30, 15);

  // 🏷️ NOMBRE EMPRESA
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  
  doc.setFontSize(10);
  doc.text("Dictamen de Clasificación Arancelaria", 120, 14);

  // reset color
  doc.setTextColor(...brand.text);

  y = 35;

  // 🧾 TÍTULO
  doc.setFontSize(16);
  doc.text("DICTAMEN", 10, y);
  y += 10;

  // 🆔 FOLIO
  const folio = `DICT-${Date.now().toString().slice(-6)}`;
  doc.setFontSize(10);
  doc.text(`Folio: ${folio}`, 10, y);
  y += 8;

  // 📦 DATOS
  doc.setFontSize(12);
  doc.text("Datos del Producto", 10, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(`Producto: ${item.producto}`, 10, y); y += 6;
  doc.text(`Fracción: ${item.fraccion}`, 10, y); y += 6;
  doc.text(`Descripción: ${item.descripcion}`, 10, y); y += 10;

  // 💸 IMPUESTOS
  doc.setFontSize(12);
  doc.text("Impuestos", 10, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(`IGI: ${item.igi}`, 10, y); y += 6;
  doc.text(`IVA: ${item.iva}`, 10, y); y += 10;

  // 📜 REGULACIONES
  if (item.nom?.length > 0) {
    doc.setFontSize(12);
    doc.text("Regulaciones", 10, y);
    y += 6;

    doc.setFontSize(10);
    doc.text(`NOM: ${item.nom.join(", ")}`, 10, y);
    y += 10;
  }

  // 🧠 JUSTIFICACIÓN
  if (item.explanation?.length > 0) {
    doc.setFontSize(12);
    doc.text("Justificación de Clasificación", 10, y);
    y += 6;

    doc.setFontSize(10);

    item.explanation.forEach((exp: string) => {
      doc.text(`• ${exp}`, 10, y);
      y += 5;
    });

    y += 5;
  }

  // 📅 FECHA
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, y);

  // 🔗 QR (lado derecho)
  doc.addImage(qrBase64, "PNG", 150, 60, 40, 40);

  // ✍️ FIRMA
  y += 20;
  doc.addImage(signatureBase64, "PNG", 10, y, 50, 20);

  y += 25;
  doc.text("Firma responsable", 10, y);

  // 💾 SAVE
  doc.save(`dictamen_${item.fraccion}.pdf`);
}