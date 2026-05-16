import jsPDF from "jspdf";
import type { SearchResult } from "@/lib/search";

// 🧾 JSON EXPORT
export function generateExportable(item: SearchResult) {
  const exportData = {
    producto: item.producto,
    fraccion: item.fraccion,

    general: {
      descripcion: item.descripcion,
      categoria: item.categoria,
      material: item.material,
      uso: item.uso,
      unidad: item.unidad,
      nico: item.nico,
    },

    comercio: {
      pais_origen: item.pais_origen,
      tratados: item.tratados,
      forma_aplicacion: item.forma_aplicacion,
    },

    impuestos: {
      igi: item.igi,
      iva: item.iva,
      dta: item.dta,
      otros: item.otros_impuestos,
    },

    regulaciones: {
      nom_seguridad: item.nom_seguridad,
      nom_info: item.nom_info,
      permisos: item.permisos,
      identificadores: item.identificadores,
    },

    pedimento: {
      clave: item.clave_pedimento,
      unidad_ligie: item.unidad_ligie,
    },

    legales: {
      fundamento: item.fundamento,
      notas: item.notas_legales,
    },

    alertas: {
      clasificacion: item.alerta_clasificacion,
      reconocimiento: item.alerta_reconocimiento,
    },

    explicacion_ia: item.explanation,

    fecha: new Date().toLocaleString(),
  };

  const blob = new Blob(
    [JSON.stringify(exportData, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `dictamen_${item.fraccion}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

// 🖼️ IMAGE → BASE64
async function loadImageAsBase64(
  url: string
): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () =>
      resolve(reader.result as string);

    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
}

// 🔗 QR
function getQRUrl(text: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    text
  )}`;
}

export async function generatePDF(item: SearchResult) {
  const doc = new jsPDF();

  // 🎨 MARCA
  const brand = {
    primary: [15, 23, 42],
    accent: [59, 130, 246],
    text: [0, 0, 0],
  } as const;

  // 🖼️ assets
  const logoBase64 = await loadImageAsBase64(
    "/logo.png"
  );

  const signatureBase64 =
    await loadImageAsBase64(
      "/signature.png"
    );

  // 🔗 QR
  const qrContent = JSON.stringify({
    producto: item.producto,
    fraccion: item.fraccion,
    fecha: new Date().toISOString(),
  });

  const qrBase64 = await loadImageAsBase64(
    getQRUrl(qrContent)
  );

  let y = 15;

  const pageHeight = 280;

function checkPageBreak(extraSpace = 20) {
  if (y + extraSpace > pageHeight) {
    doc.addPage();
    y = 20;
  }
}

  // 🟦 HEADER
  doc.setFillColor(...brand.primary);
  doc.rect(0, 0, 210, 28, "F");

  checkPageBreak(60);

  // 🖼️ LOGO
  doc.addImage(
    logoBase64,
    "PNG",
    10,
    5,
    35,
    18
  );

  // 🏷️ TITULO
  doc.setTextColor(255, 255, 255);

  doc.setFontSize(16);
  doc.text(
    "DICTAMEN ARANCELARIO",
    60,
    14
  );

  doc.setFontSize(10);
  doc.text(
    "ClasifIAduana • Sistema Inteligente",
    60,
    21
  );

  // reset
  doc.setTextColor(...brand.text);

  y = 40;

  // 🆔 FOLIO
  const folio = `DICT-${Date.now()
    .toString()
    .slice(-6)}`;

  doc.setFontSize(10);

  doc.text(`Folio: ${folio}`, 10, y);
  y += 6;

  doc.text(
    `Fecha: ${new Date().toLocaleString()}`,
    10,
    y
  );

  y += 12;

  // =========================
  // 📦 PRODUCTO
  // =========================

  checkPageBreak(30);

  section(doc, "1. IDENTIFICACIÓN", y);
  y += 8;

  text(doc, `Producto: ${item.producto}`, y);
  y += 6;

  text(
    doc,
    `Descripción: ${item.descripcion}`,
    y
  );
  y += 6;

  text(
    doc,
    `Categoría: ${item.categoria}`,
    y
  );
  y += 6;

  text(doc, `Material: ${item.material}`, y);
  y += 6;

  text(doc, `Uso: ${item.uso}`, y);
  y += 10;

  // =========================
  // ⚖️ CLASIFICACIÓN
  // =========================
  checkPageBreak(30);

  section(
    doc,
    "2. DETERMINACIÓN ARANCELARIA",
    y
  );

  y += 8;

  text(
    doc,
    `Fracción: ${item.fraccion}`,
    y
  );

  y += 6;

  text(doc, `NICO: ${item.nico}`, y);

  y += 6;

  text(
    doc,
    `Confianza IA: ${item.confidence}%`,
    y
  );

  y += 6;

  text(
    doc,
    `Fundamento: ${item.fundamento}`,
    y
  );

  y += 10;

  // =========================
  // 📜 RRNA
  // =========================
  checkPageBreak(40);

  section(doc, "3. REGULACIONES", y);

  y += 8;

  text(
    doc,
    `NOM Seguridad: ${item.nom_seguridad?.join(", ") || "N/A"}`,
    y
  );

  y += 6;

  text(
    doc,
    `NOM Información: ${item.nom_info?.join(", ") || "N/A"}`,
    y
  );

  y += 6;

  text(
    doc,
    `Permisos: ${item.permisos?.join(", ") || "N/A"}`,
    y
  );

  y += 6;

  text(
    doc,
    `Identificadores: ${item.identificadores?.join(", ") || "N/A"}`,
    y
  );

  y += 10;

  // =========================
  // 💸 IMPUESTOS
  // =========================

  checkPageBreak(40);

  section(doc, "4. CONTRIBUCIONES", y);

  y += 8;

  text(doc, `IGI: ${item.igi}`, y);
  y += 6;

  text(doc, `IVA: ${item.iva}`, y);
  y += 6;

  text(doc, `DTA: ${item.dta}`, y);
  y += 6;

  text(
    doc,
    `Otros: ${item.otros_impuestos?.join(", ") || "N/A"}`,
    y
  );

  y += 10;

  // =========================
  // 🚛 PEDIMENTO
  // =========================

  checkPageBreak(30);

  section(doc, "5. PEDIMENTO", y);

  y += 8;

  text(
    doc,
    `Clave: ${item.clave_pedimento}`,
    y
  );

  y += 6;

  text(
    doc,
    `Unidad LIGIE: ${item.unidad_ligie}`,
    y
  );

  y += 10;

  // =========================
  // 🌎 COMERCIO
  // =========================

  checkPageBreak(30);

  section(doc, "6. COMERCIO EXTERIOR", y);

  y += 8;

  text(
    doc,
    `País origen: ${item.pais_origen}`,
    y
  );

  y += 6;

  text(
    doc,
    `Tratados: ${item.tratados?.join(", ") || "N/A"}`,
    y
  );

  y += 10;

  // =========================
  // ⚠️ ALERTAS
  // =========================

  checkPageBreak(40);

  section(doc, "7. ALERTAS", y);

  y += 8;

  multiline(
    doc,
    `[ALERTA] ${item.alerta_clasificacion}`,
    y
  );
  
  y += 12;
  
  multiline(
    doc,
    `[RECONOCIMIENTO] ${item.alerta_reconocimiento}`,
    y
  );

  y += 15;

  // =========================
  // 🧠 IA
  // =========================

  checkPageBreak(50);

  section(
    doc,
    "8. EXPLICACIÓN IA",
    y
  );

  y += 8;

  item.explanation?.forEach((exp) => {
    multiline(doc, `• ${exp}`, y);
    y += 6;
  });

  checkPageBreak(60);

  // 🔗 QR
  doc.addImage(
    qrBase64,
    "PNG",
    155,
    230,
    35,
    35
  );
  
  checkPageBreak(60);
  // ✍️ FIRMA
  doc.addImage(
    signatureBase64,
    "PNG",
    10,
    240,
    50,
    20
  );

  doc.setFontSize(9);

  doc.text(
    "Firma responsable",
    10,
    265
  );

  // 💾 SAVE
  doc.save(
    `dictamen_${item.fraccion}.pdf`
  );
}

// =========================
// HELPERS
// =========================


function section(
  doc: jsPDF,
  title: string,
  y: number
) {
  doc.setFillColor(230, 230, 230);

  doc.rect(10, y - 5, 190, 8, "F");

  doc.setFontSize(12);

  doc.text(title, 12, y);
}

function text(
  doc: jsPDF,
  value: string,
  y: number
) {
  doc.setFontSize(10);

  doc.text(value, 12, y);
}

function multiline(
  doc: jsPDF,
  value: string,
  y: number
) {
  doc.setFontSize(10);

  const lines = doc.splitTextToSize(
    value,
    180
  );

  doc.text(lines, 12, y);
}