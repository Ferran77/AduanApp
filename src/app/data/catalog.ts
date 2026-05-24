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
  {
    name: "Smartphone",
    keywords: [
      "smartphone",
      "celular",
      "telefono",
      "iphone",
      "android",
    ],

    fracciones: [
      {
        code: "85171301",

        general: {
          descripcion:
            "Teléfonos inteligentes móviles",
          categoria: "Electrónicos",
          material: "Plástico y aluminio",
          uso: "Comunicación móvil",
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
          nom_seguridad: ["NOM-001"],
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
            "Clasificación basada en función principal de telecomunicación móvil.",
        },

        alertas: {
          clasificacion:
            "Verificar si el dispositivo incluye accesorios separados.",

          reconocimiento:
            "La autoridad puede solicitar verificación de IMEI.",
        },

        keywords: [
          "smartphone",
          "celular",
          "telefono",
          "teléfono",
          "telefono movil",
          "teléfono móvil",
          "mobile phone",
          "iphone",
          "android",
        ],

        confidence_base: 92,
      },
    ],
  },

  {
    name: "Smartwatch",
    keywords: [
      "smartwatch",
      "reloj inteligente",
      "watch",
      "reloj digital",
    ],

    fracciones: [
      {
        code: "85176299",

        general: {
          descripcion:
            "Dispositivos electrónicos inteligentes portátiles",
          categoria: "Electrónicos",
          material: "Aluminio y polímeros",
          uso: "Monitoreo y conectividad",
          unidad: "Pieza",
          nico: "99",
        },

        comercio: {
          pais_origen: "China",
          tratados: ["T-MEC"],
          forma_aplicacion: [
            "Factura comercial",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-001"],
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
          fundamento: "Regla General 1",
          notas:
            "Clasificación determinada por capacidades electrónicas y conectividad.",
        },

        alertas: {
          clasificacion:
            "Puede confundirse con relojería convencional.",

          reconocimiento:
            "La autoridad puede validar conectividad Bluetooth/WiFi.",
        },

        keywords: [
          "smartwatch",
          "reloj inteligente",
          "watch",
          "reloj digital",
        ],

        confidence_base: 89,
      },
    ],
  },

  {
    name: "Audífonos Bluetooth",
    keywords: [
      "audifonos",
      "audífonos",
      "headphones",
      "bluetooth",
      "sony",
      "earbuds",
    ],

    fracciones: [
      {
        code: "85183099",

        general: {
          descripcion:
            "Auriculares y audífonos inalámbricos",
          categoria: "Electrónicos",
          material: "Plástico y componentes electrónicos",
          uso: "Reproducción de audio",
          unidad: "Pieza",
          nico: "99",
        },

        comercio: {
          pais_origen: "Vietnam",
          tratados: ["TIPAT"],
          forma_aplicacion: [
            "Factura comercial",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-001"],
          nom_info: ["NOM-024"],
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
          fundamento: "Reglas Generales 1 y 6",
          notas:
            "Clasificación basada en función principal de audio.",
        },

        alertas: {
          clasificacion:
            "Verificar si el producto incluye micrófono integrado.",

          reconocimiento:
            "La autoridad puede revisar compatibilidad inalámbrica.",
        },

        keywords: [
          "audifonos",
          "audífonos",
          "headphones",
          "bluetooth",
          "sony",
          "earbuds",
        ],

        confidence_base: 90,
      },
    ],
  },

  {
    name: "Cámara digital",
    keywords: [
      "camara",
      "cámara",
      "camera",
      "canon",
      "nikon",
      "fotografia",
    ],

    fracciones: [
      {
        code: "85258999",

        general: {
          descripcion:
            "Cámaras digitales electrónicas",
          categoria: "Electrónicos",
          material: "Aluminio y plástico",
          uso: "Captura de imagen digital",
          unidad: "Pieza",
          nico: "99",
        },

        comercio: {
          pais_origen: "Japón",
          tratados: ["TIPAT"],
          forma_aplicacion: [
            "Factura comercial",
            "Certificado de origen",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-001"],
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
            "Clasificación determinada por capacidad de captura digital.",
        },

        alertas: {
          clasificacion:
            "Puede confundirse con videocámaras profesionales.",

          reconocimiento:
            "La autoridad puede validar resolución y accesorios incluidos.",
        },

        keywords: [
          "camara",
          "cámara",
          "camera",
          "canon",
          "nikon",
          "fotografia",
        ],

        confidence_base: 91,
      },
    ],
  },
  {
    name: "Café tostado",
    keywords: [
      "cafe",
      "café",
      "coffee",
      "grano",
      "espresso",
    ],

    fracciones: [
      {
        code: "09012101",

        general: {
          descripcion:
            "Café tostado sin descafeinar",
          categoria: "Alimentos",
          material: "Producto vegetal",
          uso: "Consumo humano",
          unidad: "Kg",
          nico: "00",
        },

        comercio: {
          pais_origen: "México",
          tratados: ["T-MEC", "TLCUEM"],
          forma_aplicacion: [
            "Certificado fitosanitario",
            "Factura comercial",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-251"],
          nom_info: ["NOM-051"],
          permisos: ["SENASICA"],
          identificadores: ["AF"],
        },

        impuestos: {
          igi: "20%",
          iva: "0%",
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
            "Clasificación determinada por producto vegetal tostado destinado al consumo.",
        },

        alertas: {
          clasificacion:
            "Verificar si contiene mezclas o saborizantes.",

          reconocimiento:
            "La autoridad puede solicitar inspección fitosanitaria.",
        },

        keywords: [
          "cafe",
          "café",
          "coffee",
          "grano",
          "espresso",
        ],

        confidence_base: 90,
      },
    ],
  },

  {
    name: "Miel natural",
    keywords: [
      "miel",
      "honey",
      "abeja",
      "miel organica",
    ],

    fracciones: [
      {
        code: "04090001",

        general: {
          descripcion:
            "Miel natural de abeja",
          categoria: "Alimentos",
          material: "Producto apícola",
          uso: "Consumo humano",
          unidad: "Kg",
          nico: "00",
        },

        comercio: {
          pais_origen: "México",
          tratados: ["T-MEC"],
          forma_aplicacion: [
            "Certificado sanitario",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-251"],
          nom_info: ["NOM-051"],
          permisos: ["COFEPRIS"],
          identificadores: [],
        },

        impuestos: {
          igi: "15%",
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
            "Clasificación conforme a productos naturales de origen animal.",
        },

        alertas: {
          clasificacion:
            "Verificar pureza y contenido de azúcares añadidos.",

          reconocimiento:
            "Puede requerir análisis sanitario.",
        },

        keywords: [
          "miel",
          "honey",
          "abeja",
          "miel organica",
        ],

        confidence_base: 88,
      },
    ],
  },

  {
    name: "Mermelada",
    keywords: [
      "mermelada",
      "jam",
      "conserva",
      "fruta procesada",
    ],

    fracciones: [
      {
        code: "20079999",

        general: {
          descripcion:
            "Preparaciones alimenticias tipo mermelada",
          categoria: "Alimentos",
          material: "Fruta procesada",
          uso: "Consumo humano",
          unidad: "Kg",
          nico: "99",
        },

        comercio: {
          pais_origen: "España",
          tratados: ["TLCUEM"],
          forma_aplicacion: [
            "Factura comercial",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-251"],
          nom_info: ["NOM-051"],
          permisos: [],
          identificadores: [],
        },

        impuestos: {
          igi: "20%",
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
            "Clasificación determinada por preparación alimenticia procesada.",
        },

        alertas: {
          clasificacion:
            "Verificar porcentaje de fruta natural.",

          reconocimiento:
            "La autoridad puede revisar etiquetado nutrimental.",
        },

        keywords: [
          "mermelada",
          "jam",
          "conserva",
          "fruta procesada",
        ],

        confidence_base: 87,
      },
    ],
  },

  {
    name: "Aguacate Hass",
    keywords: [
      "aguacate",
      "avocado",
      "hass",
      "palta",
    ],

    fracciones: [
      {
        code: "08044001",

        general: {
          descripcion:
            "Aguacates frescos tipo Hass",
          categoria: "Alimentos",
          material: "Producto vegetal",
          uso: "Consumo humano",
          unidad: "Kg",
          nico: "00",
        },

        comercio: {
          pais_origen: "México",
          tratados: ["T-MEC"],
          forma_aplicacion: [
            "Certificado fitosanitario",
            "Factura comercial",
          ],
        },

        regulaciones: {
          nom_seguridad: [],
          nom_info: ["NOM-051"],
          permisos: ["SENASICA"],
          identificadores: ["AF"],
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
            "Clasificación conforme a frutos frescos destinados al consumo.",
        },

        alertas: {
          clasificacion:
            "Verificar si el producto está refrigerado o procesado.",

          reconocimiento:
            "La autoridad puede solicitar revisión fitosanitaria.",
        },

        keywords: [
          "aguacate",
          "avocado",
          "hass",
          "palta",
        ],

        confidence_base: 91,
      },
    ],
  },
  {
    name: "Playera algodón",
    keywords: [
      "playera",
      "camiseta",
      "tshirt",
      "t-shirt",
      "ropa",
      "algodon",
      "algodón",
    ],

    fracciones: [
      {
        code: "61091001",

        general: {
          descripcion:
            "Playeras de algodón de punto",
          categoria: "Textil",
          material: "Algodón",
          uso: "Vestimenta",
          unidad: "Pieza",
          nico: "00",
        },

        comercio: {
          pais_origen: "Bangladesh",
          tratados: ["T-MEC"],
          forma_aplicacion: [
            "Factura comercial",
            "Certificado de origen",
          ],
        },

        regulaciones: {
          nom_seguridad: [],
          nom_info: ["NOM-004"],
          permisos: [],
          identificadores: ["TL"],
        },

        impuestos: {
          igi: "25%",
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
            "Clasificación determinada por composición predominante de algodón.",
        },

        alertas: {
          clasificacion:
            "Verificar porcentaje de fibras sintéticas.",

          reconocimiento:
            "La autoridad puede validar etiquetado textil NOM-004.",
        },

        keywords: [
          "playera",
          "camiseta",
          "tshirt",
          "t-shirt",
          "ropa",
          "algodon",
          "algodón",
        ],

        confidence_base: 89,
      },
    ],
  },

  {
    name: "Tenis deportivos",
    keywords: [
      "tenis",
      "sneakers",
      "zapatos",
      "calzado",
      "nike",
      "adidas",
    ],

    fracciones: [
      {
        code: "64041199",

        general: {
          descripcion:
            "Calzado deportivo con suela de caucho",
          categoria: "Textil / Moda",
          material: "Textil y caucho",
          uso: "Calzado deportivo",
          unidad: "Par",
          nico: "99",
        },

        comercio: {
          pais_origen: "Vietnam",
          tratados: ["TIPAT"],
          forma_aplicacion: [
            "Factura comercial",
          ],
        },

        regulaciones: {
          nom_seguridad: [],
          nom_info: ["NOM-020"],
          permisos: [],
          identificadores: ["CF"],
        },

        impuestos: {
          igi: "30%",
          iva: "16%",
          dta: "8 al millar",
          otros: [],
        },

        pedimento: {
          clave: "A1",
          unidad_ligie: "Par",
        },

        legales: {
          fundamento: "Reglas Generales 1 y 6",
          notas:
            "Clasificación determinada por uso deportivo y composición.",
        },

        alertas: {
          clasificacion:
            "Puede confundirse con calzado casual.",

          reconocimiento:
            "La autoridad puede revisar composición de la suela.",
        },

        keywords: [
          "tenis",
          "sneakers",
          "zapatos",
          "calzado",
          "nike",
          "adidas",
          "zapatos deportivos",
          "zapato deportivo",
          "zapatillas deportivas"
        ],

        confidence_base: 90,
      },
    ],
  },

  {
    name: "Mochila",
    keywords: [
      "mochila",
      "backpack",
      "bag",
      "bolsa",
      "maleta",
    ],

    fracciones: [
      {
        code: "42029204",

        general: {
          descripcion:
            "Mochilas y bolsas similares",
          categoria: "Textil / Moda",
          material: "Poliéster",
          uso: "Transportar objetos",
          unidad: "Pieza",
          nico: "00",
        },

        comercio: {
          pais_origen: "China",
          tratados: ["T-MEC"],
          forma_aplicacion: [
            "Factura comercial",
          ],
        },

        regulaciones: {
          nom_seguridad: [],
          nom_info: ["NOM-004"],
          permisos: [],
          identificadores: [],
        },

        impuestos: {
          igi: "20%",
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
            "Clasificación determinada por función de contenedor portátil.",
        },

        alertas: {
          clasificacion:
            "Verificar si incluye compartimentos electrónicos.",

          reconocimiento:
            "La autoridad puede revisar materiales predominantes.",
        },

        keywords: [
          "mochila",
          "backpack",
          "bag",
          "bolsa",
          "maleta",
        ],

        confidence_base: 88,
      },
    ],
  },
  {
    name: "Batería automóvil",
    keywords: [
      "bateria",
      "batería",
      "acumulador",
      "car battery",
      "automovil",
      "automóvil",
    ],

    fracciones: [
      {
        code: "85071099",

        general: {
          descripcion:
            "Acumuladores eléctricos para vehículos automóviles",
          categoria: "Automotriz",
          material: "Plomo y polímeros",
          uso: "Suministro eléctrico automotriz",
          unidad: "Pieza",
          nico: "99",
        },

        comercio: {
          pais_origen: "China",
          tratados: ["T-MEC"],
          forma_aplicacion: [
            "Factura comercial",
            "Hoja de seguridad",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-001"],
          nom_info: [],
          permisos: [
            "SEMARNAT",
          ],
          identificadores: ["HAZ"],
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
          fundamento:
            "Reglas Generales 1 y 6",
          notas:
            "Clasificación determinada por función de acumulación eléctrica.",
        },

        alertas: {
          clasificacion:
            "Verificar composición química y capacidad.",

          reconocimiento:
            "La autoridad puede solicitar hoja de seguridad por materiales peligrosos.",
        },

        keywords: [
          "bateria",
          "batería",
          "acumulador",
          "car battery",
          "automovil",
          "automóvil",
        ],

        confidence_base: 91,
      },
    ],
  },

  {
    name: "Faro LED automotriz",
    keywords: [
      "faro",
      "faro led",
      "headlight",
      "luz automotriz",
      "foco automotriz",
      "automovil",
      "automóvil",
    ],

    fracciones: [
      {
        code: "85122099",

        general: {
          descripcion:
            "Dispositivos de alumbrado para vehículos automóviles",
          categoria: "Automotriz / Electrónicos",
          material: "Polímeros y LED",
          uso: "Iluminación automotriz",
          unidad: "Pieza",
          nico: "99",
        },

        comercio: {
          pais_origen: "Taiwán",
          tratados: ["TIPAT"],
          forma_aplicacion: [
            "Factura comercial",
          ],
        },

        regulaciones: {
          nom_seguridad: ["NOM-001"],
          nom_info: [],
          permisos: [],
          identificadores: [],
        },

        impuestos: {
          igi: "20%",
          iva: "16%",
          dta: "8 al millar",
          otros: [],
        },

        pedimento: {
          clave: "A1",
          unidad_ligie: "Pza",
        },

        legales: {
          fundamento:
            "Reglas Generales 1 y 6",
          notas:
            "Clasificación basada en función de iluminación automotriz.",
        },

        alertas: {
          clasificacion:
            "Puede confundirse con luminarias LED domésticas.",

          reconocimiento:
            "La autoridad puede verificar compatibilidad vehicular.",
        },

        keywords: [
          "faro",
          "faro led",
          "headlight",
          "luz automotriz",
          "foco automotriz",
          "automovil",
          "automóvil",
        ],

        confidence_base: 89,
      },
    ],
  },
];