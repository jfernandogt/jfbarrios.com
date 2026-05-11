import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre es demasiado largo."),
  email: z.string().email("Por favor ingresa un correo electrónico válido."),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(5000, "El mensaje es demasiado largo."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];

    if (!apiKey) {
      console.error(
        "[send-email] RESEND_API_KEY environment variable is not set."
      );
      throw new Error("El servicio de correo no está configurado.");
    }

    const payload = {
      from: "Contacto Web <onboarding@resend.dev>",

      to: ["fer.b.1990@gmail.com"],
      reply_to: data.email,
      subject: `Nuevo mensaje de contacto de ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e;">Nuevo mensaje de contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 80px;">Nombre:</td>
              <td style="padding: 8px 0;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>
              </td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <h3 style="color: #555; margin-bottom: 8px;">Mensaje:</h3>
          <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      `,
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `[send-email] Resend API error (${res.status}):`,
        errorBody
      );
      // Surface the actual Resend error in dev so it's easy to diagnose.
      if (process.env["NODE_ENV"] === "development") {
        throw new Error(`Resend error ${res.status}: ${errorBody}`);
      }
      throw new Error("No se pudo enviar el mensaje. Inténtalo de nuevo.");
    }

    return { success: true };
  });

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
