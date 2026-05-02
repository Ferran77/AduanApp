export const catalog = [
  {
    name: "Laptop",
    fracciones: [
      {
        code: "84713001.00",
        keywords: ["laptop", "computadora", "notebook"],
        noms: ["NOM-019", "NOM-024"],
        confidence_base: 80
      }
    ]
  },
    {
      name: "Luminaria LED",
      fracciones: [
        {
          code: "94054099.99",
          keywords: ["luminaria", "luz", "led"],
          noms: ["NOM-003"],
          confidence_base: 80
        }
      ]
    },
    {
      name: "Vainilla",
      fracciones: [
        {
          code: "09051099.01",
          keywords: ["vainilla", "vaina"],
          noms: [],
          confidence_base: 80
        },
        {
          code: "09052099.99",
          keywords: ["vainilla", "polvo"],
          noms: ["NOM-139"],
          confidence_base: 75
        }
      ],
      questions: [
        {
          question: "¿En qué presentación viene?",
          options: ["vaina", "polvo", "extracto"]
        }
      ]
    }
  ];