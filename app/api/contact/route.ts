import { z } from "zod";

const customerTypes = [
  "Open-end spinning unit",
  "Textile manufacturer",
  "Exporter",
  "Other",
] as const;

const productValues = [
  "recycled-cotton-hard-waste",
  "recycled-clipping-waste",
  "processed-fibres",
  "recycled-yarn",
  "cotton-yarn",
  "coloured-yarn",
  "poly-cotton-yarn",
  "other",
] as const;

const productLabels: Record<(typeof productValues)[number], string> = {
  "recycled-cotton-hard-waste": "Recycled Cotton Hard Waste",
  "recycled-clipping-waste": "Recycled Clipping Waste",
  "processed-fibres": "Processed Fibres",
  "recycled-yarn": "Recycled Yarn",
  "cotton-yarn": "Cotton Yarn",
  "coloured-yarn": "Coloured Yarn",
  "poly-cotton-yarn": "Poly-Cotton Yarn",
  other: "Other requirement",
};

const optionalText = (maximum: number) =>
  z
    .string()
    .trim()
    .max(maximum, "This field is too long.")
    .optional()
    .transform((value) => value || undefined);

const phonePattern = /^\+[1-9][0-9\s().-]{6,24}$/;

const enquirySchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(100, "Your name is too long."),
    companyName: z
      .string()
      .trim()
      .min(2, "Enter your company name.")
      .max(140, "The company name is too long."),
    businessEmail: z
      .string()
      .trim()
      .email("Enter a valid business email address.")
      .max(254, "The email address is too long.")
      .transform((value) => value.toLowerCase()),
    phone: optionalText(30).refine(
      (value) => !value || phonePattern.test(value),
      "Include a country code, for example +91 98765 43210.",
    ),
    country: optionalText(100).refine(
      (value) => !value || value.length >= 2,
      "Enter a valid country name.",
    ),
    customerType: z
      .union([z.enum(customerTypes), z.literal("")], {
        error: "Choose a valid customer type.",
      })
      .optional()
      .transform((value) => value || undefined),
    product: z.enum(productValues, {
      error: "Choose the product you require.",
    }),
    quantity: z
      .string()
      .trim()
      .min(1, "Enter your quantity requirement.")
      .max(160, "The quantity requirement is too long."),
    details: z
      .string()
      .trim()
      .min(10, "Add a little more detail about your requirement.")
      .max(4000, "Requirement details must be 4,000 characters or fewer."),
    fibreType: optionalText(120),
    blend: optionalText(120),
    colour: optionalText(120),
    yarnCount: optionalText(80),
    grade: optionalText(120),
    consent: z.boolean().refine((value) => value, {
      message: "Consent is required so we can respond to your enquiry.",
    }),
    website: z.string().max(200).optional().default(""),
    turnstileToken: z.string().max(2048).optional().default(""),
  })
  .strict();

type Enquiry = z.infer<typeof enquirySchema>;

type TurnstileResult = {
  success?: boolean;
  action?: string;
};

function json(
  body: Record<string, unknown>,
  status: number,
): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function configuredValue(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function developmentWarning(message: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[contact] ${message}`);
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function normaliseSubjectPart(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function enquiryRows(enquiry: Enquiry): Array<[string, string]> {
  const rows: Array<[string, string]> = [
    ["Full name", enquiry.fullName],
    ["Company", enquiry.companyName],
    ["Business email", enquiry.businessEmail],
    ["Phone", enquiry.phone ?? ""],
    ["Country", enquiry.country ?? ""],
    ["Customer type", enquiry.customerType ?? ""],
    ["Product", productLabels[enquiry.product]],
    ["Quantity", enquiry.quantity],
    ["Fibre type", enquiry.fibreType ?? ""],
    ["Blend", enquiry.blend ?? ""],
    ["Colour", enquiry.colour ?? ""],
    ["Yarn count", enquiry.yarnCount ?? ""],
    ["Grade", enquiry.grade ?? ""],
    ["Requirement details", enquiry.details],
    ["Consent", "Provided"],
  ];
  return rows.filter(([, value]) => Boolean(value));
}

function buildPlainText(enquiry: Enquiry): string {
  return enquiryRows(enquiry)
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n");
}

function buildHtml(enquiry: Enquiry): string {
  const rows = enquiryRows(enquiry)
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding:10px 16px 10px 0;text-align:left;vertical-align:top;color:#545555;font-size:13px;font-weight:600;border-bottom:1px solid #e8e5de;">${escapeHtml(label)}</th>
          <td style="padding:10px 0;vertical-align:top;color:#171717;font-size:14px;white-space:pre-wrap;border-bottom:1px solid #e8e5de;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f7f4ee;color:#171717;font-family:Arial,Helvetica,sans-serif;">
    <main style="max-width:720px;margin:0 auto;padding:32px;background:#fffdf8;border-top:4px solid #f68921;">
      <p style="margin:0 0 8px;color:#545555;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Iniya Fiber website</p>
      <h1 style="margin:0 0 24px;font-size:26px;line-height:1.2;">New quote enquiry</h1>
      <table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table>
    </main>
  </body>
</html>`;
}

async function verifyTurnstile(
  token: string,
  secret: string,
  request: Request,
): Promise<boolean> {
  const verificationBody = new URLSearchParams({
    secret,
    response: token,
  });
  const forwardedAddress =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwardedAddress) {
    verificationBody.set("remoteip", forwardedAddress);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: verificationBody,
      },
    );
    if (!response.ok) return false;
    const result = (await response.json()) as TurnstileResult;
    return result.success === true && result.action === "contact";
  } catch {
    return false;
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(
      { ok: false, error: "Send the enquiry as a JSON request." },
      415,
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 50_000) {
    return json(
      { ok: false, error: "The enquiry is too large to process." },
      413,
    );
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return json(
      { ok: false, error: "The enquiry could not be read. Please try again." },
      400,
    );
  }

  const parsed = enquirySchema.safeParse(requestBody);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return json(
      {
        ok: false,
        error: "Please review the highlighted fields.",
        fieldErrors,
      },
      422,
    );
  }

  const enquiry = parsed.data;
  if (enquiry.website.trim()) {
    return json(
      { ok: false, error: "The enquiry could not be submitted." },
      400,
    );
  }

  const resendApiKey = configuredValue("RESEND_API_KEY");
  const contactToEmail = configuredValue("CONTACT_TO_EMAIL");
  const contactFromEmail = configuredValue("CONTACT_FROM_EMAIL");
  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    developmentWarning(
      "Email delivery is not configured; no enquiry email was sent.",
    );
    return json(
      {
        ok: false,
        error:
          "The enquiry service is temporarily unavailable. Please try again later.",
      },
      503,
    );
  }

  const turnstileSiteKey = configuredValue("NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  const turnstileSecret = configuredValue("TURNSTILE_SECRET_KEY");
  const indexingEnabled =
    configuredValue("SITE_INDEXING_ENABLED")?.toLowerCase() === "true";
  if (indexingEnabled && (!turnstileSiteKey || !turnstileSecret)) {
    developmentWarning(
      "Turnstile is required when site indexing is enabled; no enquiry email was sent.",
    );
    return json(
      {
        ok: false,
        error:
          "The enquiry service is temporarily unavailable. Please try again later.",
      },
      503,
    );
  }
  if (Boolean(turnstileSiteKey) !== Boolean(turnstileSecret)) {
    developmentWarning(
      "Turnstile is only partially configured; no enquiry email was sent.",
    );
    return json(
      {
        ok: false,
        error:
          "The enquiry service is temporarily unavailable. Please try again later.",
      },
      503,
    );
  }

  if (turnstileSecret) {
    if (!enquiry.turnstileToken) {
      return json(
        {
          ok: false,
          error: "Complete the security check and try again.",
          fieldErrors: {
            turnstileToken: "Complete the security check.",
          },
        },
        422,
      );
    }
    const turnstileValid = await verifyTurnstile(
      enquiry.turnstileToken,
      turnstileSecret,
      request,
    );
    if (!turnstileValid) {
      return json(
        {
          ok: false,
          error: "The security check expired or failed. Please try again.",
          fieldErrors: {
            turnstileToken: "Complete the security check again.",
          },
        },
        422,
      );
    }
  }

  const recipients = contactToEmail
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  if (recipients.length === 0) {
    developmentWarning(
      "The contact recipient configuration is empty; no enquiry email was sent.",
    );
    return json(
      {
        ok: false,
        error:
          "The enquiry service is temporarily unavailable. Please try again later.",
      },
      503,
    );
  }

  const company = normaliseSubjectPart(enquiry.companyName);
  const product = productLabels[enquiry.product];

  try {
    const deliveryResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: recipients,
        reply_to: enquiry.businessEmail,
        subject: `Quote enquiry: ${product} — ${company}`,
        text: buildPlainText(enquiry),
        html: buildHtml(enquiry),
      }),
    });

    if (!deliveryResponse.ok) {
      developmentWarning(
        `Email delivery returned status ${deliveryResponse.status}; no success response was sent.`,
      );
      return json(
        {
          ok: false,
          error:
            "We could not send your enquiry. Please try again in a few minutes.",
        },
        502,
      );
    }
  } catch {
    developmentWarning(
      "Email delivery could not be reached; no success response was sent.",
    );
    return json(
      {
        ok: false,
        error:
          "We could not send your enquiry. Please try again in a few minutes.",
      },
      502,
    );
  }

  return json(
    {
      ok: true,
      message:
        "Your enquiry has been sent. The Iniya Fiber team will review it and respond using the details you provided.",
    },
    200,
  );
}
