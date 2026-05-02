import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ description: "desconocido" });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Describe el objeto principal en máximo 2 palabras. Si no sabes, responde: desconocido.",
              },
              {
                type: "input_image",
                image_url: `data:${file.type};base64,${base64}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("OPENAI RAW:", JSON.stringify(data, null, 2));

    const description =
      data.output_text ||
      data.output?.[0]?.content?.find((c: any) => c.type === "output_text")?.text ||
      "desconocido";

    return NextResponse.json({ description });
  } catch (error) {
    console.error("ERROR EN API:", error);
    return NextResponse.json({ description: "desconocido" });
  }
}