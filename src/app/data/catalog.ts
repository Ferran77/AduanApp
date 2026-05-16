export const catalog = [
  {
    name: "Laptop",
    keywords: ["laptop", "computadora", "notebook"],

    fracciones: [
      {
        code: "84713001.00",

        general: {
          descripcion:
            "Máquinas automáticas portátiles para procesamiento de datos",
          categoria: "Electrónicos",
          material: "Plástico y aluminio",
          uso: "Procesamiento de datos",
          unidad: "Pieza",
          nico: "00",
        },

        comercio: {
          pais_origen: "China",
          tratados: ["T-MEC"],
          forma_aplicacion: [
            "Factura comercial",
            "Certificado de origen",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-019"],
          nom_info: ["NOM-024"],
          permisos: [],
          identificadores: ["NM"],
        },

        impuestos: {
          igi: "0%",
          iva: "16%",
          dta: "8 al millar",
          otros: [],
        },

        pedimento: {
          clave: "A1",
          unidad_ligie: "Pza",
        },

        legales: {
          fundamento: "Reglas Generales 1 y 6",
          notas:
            "Clasificación determinada por función principal de procesamiento de datos.",
        },

        alertas: {
          clasificacion:
            "Verificar si incluye accesorios sujetos a clasificación independiente.",

          reconocimiento:
            "La autoridad puede solicitar encendido físico del equipo.",
        },

        keywords: ["laptop", "computadora", "notebook"],

        confidence_base: 90,
      },
    ],
  },

  {
    name: "Luminaria LED",
    keywords: ["luminaria", "luz", "led", "foco"],

    fracciones: [
      {
        code: "94054099.99",

        general: {
          descripcion: "Luminarias eléctricas LED",
          categoria: "Iluminación",
          material: "Metal y policarbonato",
          uso: "Iluminación interior/exterior",
          unidad: "Pieza",
          nico: "99",
        },

        comercio: {
          pais_origen: "China",
          tratados: ["T-MEC"],
          forma_aplicacion: [
            "Factura comercial",
            "Certificación NOM",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-003"],
          nom_info: [],
          permisos: [],
          identificadores: [],
        },

        impuestos: {
          igi: "15%",
          iva: "16%",
          dta: "8 al millar",
          otros: [],
        },

        pedimento: {
          clave: "A1",
          unidad_ligie: "Pza",
        },

        legales: {
          fundamento: "Regla General 1",
          notas:
            "Clasificación basada en función de iluminación eléctrica.",
        },

        alertas: {
          clasificacion:
            "Puede confundirse con partes de lámparas decorativas.",

          reconocimiento:
            "La autoridad puede verificar especificaciones eléctricas.",
        },

        keywords: ["luminaria", "luz", "led", "foco"],

        confidence_base: 88,
      },
    ],
  },

  {
    name: "Vainilla",
    keywords: ["vainilla", "vaina", "extracto", "polvo"],

    fracciones: [
      {
        code: "09051099.01",

        general: {
          descripcion: "Vainilla natural en vaina",
          categoria: "Frutas y hortalizas",
          material: "Producto vegetal",
          uso: "Consumo alimenticio",
          unidad: "Kg",
          nico: "01",
        },

        comercio: {
          pais_origen: "México",
          tratados: ["T-MEC"],
          forma_aplicacion: ["Factura comercial"],
        },

        regulaciones: {
          nom_seguridad: [],
          nom_info: [],
          permisos: [
            "Certificado fitosanitario SENASICA",
          ],
          identificadores: [],
        },

        impuestos: {
          igi: "0%",
          iva: "0%",
          dta: "8 al millar",
          otros: [],
        },

        pedimento: {
          clave: "A1",
          unidad_ligie: "Kg",
        },

        legales: {
          fundamento: "Regla General 1",
          notas:
            "Clasificación determinada por estado natural del producto.",
        },

        alertas: {
          clasificacion:
            "Verificar si el producto contiene azúcares o conservadores.",

          reconocimiento:
            "La autoridad puede solicitar inspección fitosanitaria.",
        },

        keywords: ["vainilla", "vaina"],

        confidence_base: 85,
      },

      {
        code: "09052099.99",

        general: {
          descripcion: "Vainilla en polvo o extracto",
          categoria: "Alimentos procesados",
          material: "Producto vegetal procesado",
          uso: "Ingrediente alimenticio",
          unidad: "Kg",
          nico: "99",
        },

        comercio: {
          pais_origen: "México",
          tratados: ["T-MEC"],
          forma_aplicacion: ["Factura comercial"],
        },

        regulaciones: {
          nom_seguridad: [],
          nom_info: ["NOM-051"],
          permisos: [],
          identificadores: [],
        },

        impuestos: {
          igi: "5%",
          iva: "16%",
          dta: "8 al millar",
          otros: [],
        },

        pedimento: {
          clave: "A1",
          unidad_ligie: "Kg",
        },

        legales: {
          fundamento: "Reglas Generales 1 y 6",
          notas:
            "Clasificación por transformación y presentación comercial.",
        },

        alertas: {
          clasificacion:
            "Puede clasificarse diferente dependiendo de concentración.",

          reconocimiento:
            "La autoridad puede solicitar ficha técnica.",
        },

        keywords: ["vainilla", "polvo", "extracto"],

        confidence_base: 82,
      },
    ],

    questions: [
      {
        question: "¿En qué presentación viene?",
        options: ["vaina", "polvo", "extracto"],
      },
    ],
  },

  {
    name: "Joyería de oro",
    keywords: ["oro", "joyería", "anillo", "cadena"],

    fracciones: [
      {
        code: "71131999",

        general: {
          descripcion: "Artículos de joyería de oro",
          categoria: "Metales preciosos",
          material: "Oro",
          uso: "Accesorio personal",
          unidad: "Gramo / Pieza",
          nico: "99",
        },

        comercio: {
          pais_origen: "Italia",
          tratados: ["TLCUEM"],
          forma_aplicacion: [
            "Factura comercial",
            "Certificado EUR1",
          ],
        },

        regulaciones: {
          nom_seguridad: [],
          nom_info: ["NOM-050"],
          permisos: [
            "Operación vulnerable",
          ],
          identificadores: ["OV", "NM"],
        },

        impuestos: {
          igi: "15%",
          iva: "0%",
          dta: "8 al millar",
          otros: [],
        },

        pedimento: {
          clave: "A1",
          unidad_ligie: "g",
        },

        legales: {
          fundamento: "Reglas Generales 1 y 6",
          notas:
            "Clasificación determinada por composición predominante de oro.",
        },

        alertas: {
          clasificacion:
            "Puede confundirse con bisutería chapada.",

          reconocimiento:
            "La autoridad puede solicitar análisis metalúrgico.",
        },

        keywords: ["oro", "joyería", "anillo", "cadena"],

        confidence_base: 92,
      },
    ],
  },

  {
    name: "Llanta automotriz",
    keywords: ["llanta", "neumático", "rin", "tire"],

    fracciones: [
      {
        code: "40111001",

        general: {
          descripcion:
            "Neumáticos nuevos de caucho para automóviles",
          categoria: "Automotriz",
          material: "Caucho",
          uso: "Vehículos automotores",
          unidad: "Pieza",
          nico: "00",
        },

        comercio: {
          pais_origen: "Estados Unidos",
          tratados: ["T-MEC"],
          forma_aplicacion: [
            "Factura comercial",
            "Certificado de origen",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-086"],
          nom_info: [],
          permisos: [],
          identificadores: ["NM"],
        },

        impuestos: {
          igi: "10%",
          iva: "16%",
          dta: "8 al millar",
          otros: ["IEPS variable"],
        },

        pedimento: {
          clave: "A1",
          unidad_ligie: "Pza",
        },

        legales: {
          fundamento: "Regla General 1",
          notas:
            "Clasificación basada en tipo y uso automotriz del neumático.",
        },

        alertas: {
          clasificacion:
            "Verificar si se trata de neumático renovado o usado.",

          reconocimiento:
            "La autoridad puede inspeccionar medidas y marcajes.",
        },

        keywords: ["llanta", "neumático", "tire"],

        confidence_base: 89,
      },
    ],
  },
];