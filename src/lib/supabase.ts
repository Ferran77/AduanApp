import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Configuración de Supabase incompleta: define NEXT_PUBLIC_SUPABASE_URL y una clave pública (NEXT_PUBLIC_SUPABASE_ANON_KEY o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) en .env.local."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

type SupabaseErrorLike = {
  message?: string;
  code?: string;
  details?: string | null;
  hint?: string | null;
};

export function formatSupabaseError(error: SupabaseErrorLike | null): string {
  if (!error) return "Error desconocido de base de datos";

  const msg = error.message ?? "Error desconocido de base de datos";

  if (msg.includes("fetch failed") || msg.includes("ENOTFOUND")) {
    return "No se pudo conectar con Supabase. Comprueba que el proyecto esté activo y que NEXT_PUBLIC_SUPABASE_URL en .env.local sea correcto.";
  }

  if (
    error.code === "PGRST205" ||
    msg.includes("Could not find the table")
  ) {
    return "Faltan las tablas en Supabase. Abre el SQL Editor del proyecto y ejecuta el archivo supabase/schema.sql de este repositorio.";
  }

  if (error.code === "42501" || msg.toLowerCase().includes("permission")) {
    return "Sin permisos en Supabase (RLS). Ejecuta supabase/schema.sql para crear las políticas de acceso.";
  }

  return msg;
}

export function logSupabaseError(
  context: string,
  error: SupabaseErrorLike | null,
): void {
  console.error(context, {
    message: error?.message,
    code: error?.code,
    details: error?.details,
    hint: error?.hint,
  });
}