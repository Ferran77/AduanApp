export const catalog = [
  {
    name: "Laptop",
    keywords: ["laptop", "computadora", "notebook"],

    fracciones: [
      {
        code: "84713001.00",

        general: {
          descripcion: "Máquinas automáticas para procesamiento de datos portátiles",
          categoria: "Electrónicos",
          unidad: "Pieza",
          nico: "00"
        },

        comercio: {
          pais_origen: "China",
          tratado: "T-MEC",
          forma_aplicacion: ["Certificado de origen", "Factura comercial"]
        },

        regulaciones: {
          nom: ["NOM-019", "NOM-024"],
          permisos: [],
          identificadores: []
        },

        impuestos: {
          igi: "0%",
          iva: "16%",
          dta: "0.8%"
        },

        legales: {
          resumen: "Clasificación por función de procesamiento de datos"
        },

        keywords: ["laptop", "computadora", "notebook"],
        confidence_base: 80
      }
    ]
  },

  {
    name: "Luminaria LED",
    keywords: ["luminaria", "luz", "led"],

    fracciones: [
      {
        code: "94054099.99",

        general: {
          descripcion: "Luminarias eléctricas LED",
          categoria: "Iluminación",
          unidad: "Pieza",
          nico: "99"
        },

        comercio: {
          pais_origen: "China",
          tratado: "T-MEC",
          forma_aplicacion: ["Certificación NOM", "Factura"]
        },

        regulaciones: {
          nom: ["NOM-003"],
          permisos: [],
          identificadores: []
        },

        impuestos: {
          igi: "15%",
          iva: "16%",
          dta: "0.8%"
        },

        legales: {
          resumen: "Clasificación por tipo de luminaria eléctrica"
        },

        keywords: ["luminaria", "luz", "led"],
        confidence_base: 80
      }
    ]
  },

  {
    name: "Vainilla",
    keywords: ["vainilla"],

    fracciones: [
      {
        code: "09051099.01",

        general: {
          descripcion: "Vainilla natural en vaina",
          categoria: "Alimentos",
          unidad: "Kilogramo",
          nico: "01"
        },

        comercio: {
          pais_origen: "México",
          tratado: "T-MEC",
          forma_aplicacion: ["Factura"]
        },

        regulaciones: {
          nom: [],
          permisos: [],
          identificadores: []
        },

        impuestos: {
          igi: "0%",
          iva: "0%",
          dta: "0.8%"
        },

        legales: {
          resumen: "Clasificación por producto agrícola natural"
        },

        keywords: ["vainilla", "vaina"],
        confidence_base: 80
      },
      {
        code: "09052099.99",

        general: {
          descripcion: "Vainilla en polvo o extracto",
          categoria: "Alimentos procesados",
          unidad: "Kilogramo",
          nico: "99"
        },

        comercio: {
          pais_origen: "México",
          tratado: "T-MEC",
          forma_aplicacion: ["Factura"]
        },

        regulaciones: {
          nom: ["NOM-139"],
          permisos: [],
          identificadores: []
        },

        impuestos: {
          igi: "5%",
          iva: "16%",
          dta: "0.8%"
        },

        legales: {
          resumen: "Clasificación por presentación procesada"
        },

        keywords: ["vainilla", "polvo", "extracto"],
        confidence_base: 75
      }
    ],

    questions: [
      {
        question: "¿En qué presentación viene?",
        options: ["vaina", "polvo", "extracto"]
      }
    ]
  },

  {
    name: "Joyería de oro",
    keywords: ["oro", "joyería", "metal precioso"],

    fracciones: [
      {
        code: "71131999",

        general: {
          descripcion: "Artículos de joyería de oro",
          categoria: "Metales preciosos",
          unidad: "Gramo / Pieza",
          nico: "99"
        },

        comercio: {
          pais_origen: "Francia",
          tratado: "TLCUE",
          forma_aplicacion: [
            "Factura menor a 6000 USD",
            "Certificado EUR1"
          ]
        },

        regulaciones: {
          nom: ["NOM-050-SCFI-2004"],
          permisos: ["Operación vulnerable (OV)"],
          identificadores: ["NM", "OV"]
        },

        impuestos: {
          igi: "15%",
          iva: "0%",
          dta: "0.8%"
        },

        legales: {
          resumen: "Clasificación basada en reglas generales TIGIE"
        },

        keywords: ["oro", "joyería", "metal"],
        confidence_base: 95
      }
    ]
  }
];