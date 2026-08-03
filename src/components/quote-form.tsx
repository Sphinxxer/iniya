"use client";

import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  getProductBySlug,
  products,
  type ProductSlug,
} from "@/src/data/products";
import styles from "./quote-form.module.css";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      "timeout-callback": () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const customerTypes = [
  "Open-end spinning unit",
  "Textile manufacturer",
  "Exporter",
  "Other",
] as const;

const productOptions = [
  ...products.map((product) => ({
    value: product.slug,
    label: product.name,
  })),
  { value: "other", label: "Other requirement" },
];

const validCustomerTypes = new Set<string>(customerTypes);
const validProducts = new Set<string>(
  productOptions.map((product) => product.value),
);

const optionalSpecificationFields = [
  { key: "fibreType", label: "Fibre type", maxLength: 120, placeholder: undefined },
  { key: "blend", label: "Blend", maxLength: 120, placeholder: undefined },
  { key: "colour", label: "Colour", maxLength: 120, placeholder: undefined },
  {
    key: "yarnCount",
    label: "Yarn count",
    maxLength: 80,
    placeholder: "For example, 20s",
  },
  { key: "grade", label: "Grade", maxLength: 120, placeholder: undefined },
] as const;

type OptionalSpecificationKey =
  (typeof optionalSpecificationFields)[number]["key"];

type FormValues = {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  country: string;
  customerType: string;
  product: string;
  quantity: string;
  details: string;
  fibreType: string;
  blend: string;
  colour: string;
  yarnCount: string;
  grade: string;
  consent: boolean;
  website: string;
};

type ErrorKey = keyof FormValues | "turnstileToken";
type FormErrors = Partial<Record<ErrorKey, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

type ApiResponse = {
  ok?: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
};

function initialValues(initialProduct?: ProductSlug): FormValues {
  return {
    fullName: "",
    companyName: "",
    businessEmail: "",
    phone: "",
    country: "",
    customerType: "",
    product: initialProduct ?? "",
    quantity: "",
    details: "",
    fibreType: "",
    blend: "",
    colour: "",
    yarnCount: "",
    grade: "",
    consent: false,
    website: "",
  };
}

function getOptionalFieldsForProduct(productSlug: string) {
  if (productSlug === "other") return optionalSpecificationFields;

  const selectedProduct = getProductBySlug(productSlug);

  if (!selectedProduct) return [];

  return optionalSpecificationFields.filter((field) =>
    selectedProduct.enquiryFields.includes(field.label),
  );
}

function validateForm(
  values: FormValues,
  requiresTurnstile: boolean,
  turnstileToken: string,
): FormErrors {
  const errors: FormErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (values.companyName.trim().length < 2) {
    errors.companyName = "Enter your company name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.businessEmail.trim())) {
    errors.businessEmail = "Enter a valid business email address.";
  }
  if (!/^\+[1-9][0-9\s().-]{6,24}$/.test(values.phone.trim())) {
    errors.phone = "Include a country code, for example +91 98765 43210.";
  }
  if (values.country.trim().length < 2) {
    errors.country = "Enter your country.";
  }
  if (!validCustomerTypes.has(values.customerType)) {
    errors.customerType = "Choose a customer type.";
  }
  if (!validProducts.has(values.product)) {
    errors.product = "Choose the product you require.";
  }
  if (!values.quantity.trim()) {
    errors.quantity = "Enter your quantity requirement.";
  }
  if (values.details.trim().length < 10) {
    errors.details = "Add a little more detail about your requirement.";
  }
  if (!values.consent) {
    errors.consent = "Consent is required so we can respond to your enquiry.";
  }
  if (requiresTurnstile && !turnstileToken) {
    errors.turnstileToken = "Complete the security check.";
  }

  return errors;
}

function RequiredMarker() {
  return (
    <>
      <span className={styles.required} aria-hidden="true">
        *
      </span>
      <span className={styles.srOnly}> (required)</span>
    </>
  );
}

function FieldError({
  field,
  errors,
}: {
  field: ErrorKey;
  errors: FormErrors;
}) {
  const message = errors[field];
  return message ? (
    <p className={styles.fieldError} id={`quote-${field}-error`}>
      {message}
    </p>
  ) : null;
}

export function QuoteForm({
  initialProduct,
  turnstileSiteKey,
}: {
  initialProduct?: ProductSlug;
  turnstileSiteKey?: string;
}) {
  const [values, setValues] = useState<FormValues>(() =>
    initialValues(initialProduct),
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (!turnstileSiteKey) return;

    let cancelled = false;
    const scriptSelector = 'script[data-iniya-turnstile="true"]';
    let script = document.querySelector<HTMLScriptElement>(scriptSelector);

    const setTurnstileError = () => {
      setTurnstileToken("");
      setErrors((current) => ({
        ...current,
        turnstileToken:
          "The security check could not load. Refresh the page and try again.",
      }));
    };

    const renderWidget = () => {
      if (
        cancelled ||
        turnstileWidgetId.current ||
        !turnstileContainerRef.current ||
        !window.turnstile
      ) {
        return;
      }

      try {
        turnstileWidgetId.current = window.turnstile.render(
          turnstileContainerRef.current,
          {
            sitekey: turnstileSiteKey,
            action: "contact",
            callback: (token) => {
              setTurnstileToken(token);
              setErrors((current) => {
                const next = { ...current };
                delete next.turnstileToken;
                return next;
              });
            },
            "expired-callback": () => setTurnstileToken(""),
            "timeout-callback": () => setTurnstileToken(""),
            "error-callback": setTurnstileError,
          },
        );
      } catch {
        setTurnstileError();
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else if (script) {
      script.addEventListener("load", renderWidget);
      script.addEventListener("error", setTurnstileError);
    } else {
      script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.iniyaTurnstile = "true";
      script.addEventListener("load", renderWidget);
      script.addEventListener("error", setTurnstileError);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", renderWidget);
      script?.removeEventListener("error", setTurnstileError);
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [turnstileSiteKey]);

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    if (status === "error") {
      setStatus("idle");
      setFormMessage("");
    }
  }

  function updateProduct(value: string) {
    const availableFields = new Set(
      getOptionalFieldsForProduct(value).map((field) => field.key),
    );

    setValues((current) => {
      const next = { ...current, product: value };
      optionalSpecificationFields.forEach((field) => {
        if (!availableFields.has(field.key)) {
          next[field.key] = "";
        }
      });
      return next;
    });

    if (errors.product) {
      setErrors((current) => {
        const next = { ...current };
        delete next.product;
        return next;
      });
    }
    if (status === "error") {
      setStatus("idle");
      setFormMessage("");
    }
  }

  function validateField(field: ErrorKey) {
    const message = validateForm(
      values,
      Boolean(turnstileSiteKey),
      turnstileToken,
    )[field];
    setErrors((current) => {
      const next = { ...current };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function focusFirstError() {
    window.requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>(
          '[aria-invalid="true"], [data-invalid="true"]',
        )
        ?.focus();
    });
  }

  function resetTurnstile() {
    setTurnstileToken("");
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validateForm(
      values,
      Boolean(turnstileSiteKey),
      turnstileToken,
    );
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setFormMessage("Please correct the highlighted fields and try again.");
      focusFirstError();
      return;
    }

    setStatus("submitting");
    setFormMessage("");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken }),
      });
      const payload = (await response.json().catch(() => ({}))) as ApiResponse;

      if (!response.ok || !payload.ok) {
        const serverErrors: FormErrors = {};
        if (payload.fieldErrors) {
          for (const [field, message] of Object.entries(payload.fieldErrors)) {
            if (typeof message === "string") {
              serverErrors[field as ErrorKey] = message;
            }
          }
        }
        setErrors(serverErrors);
        setStatus("error");
        setFormMessage(
          payload.error ??
            "We could not send your enquiry. Please try again shortly.",
        );
        resetTurnstile();
        focusFirstError();
        return;
      }

      setStatus("success");
      setFormMessage(
        payload.message ??
          "Your enquiry has been sent. The Iniya Fiber team will review it and respond using the details you provided.",
      );
    } catch {
      setStatus("error");
      setFormMessage(
        "We could not reach the enquiry service. Check your connection and try again.",
      );
      resetTurnstile();
    }
  }

  function startAnotherEnquiry() {
    setValues(initialValues(initialProduct));
    setErrors({});
    setStatus("idle");
    setFormMessage("");
    resetTurnstile();
  }

  const controlClass = (field: ErrorKey) =>
    `${styles.control}${errors[field] ? ` ${styles.controlError}` : ""}`;
  const describedBy = (field: ErrorKey, hintId?: string) =>
    [hintId, errors[field] ? `quote-${field}-error` : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
  const visibleOptionalFields = getOptionalFieldsForProduct(values.product);

  return (
    <section className={styles.section} aria-labelledby="quote-form-heading">
      <div className={`shell ${styles.layout}`}>
        <aside className={styles.intro}>
          <p className={styles.kicker}>A clear brief helps us respond</p>
          <h2 id="quote-form-heading">Request a tailored quote.</h2>
          <p>
            Tell us what material you need and the specification you are working
            toward. Optional fibre, blend, colour, count, and grade details can
            be included where they apply.
          </p>
          <ul className={styles.guide}>
            <li>Choose the required product.</li>
            <li>Share quantity and specification details.</li>
            <li>Provide your business contact information.</li>
          </ul>
        </aside>

        {status === "success" ? (
          <div
            className={styles.success}
            ref={successRef}
            role="status"
            tabIndex={-1}
          >
            <span className={styles.successMark} aria-hidden="true">
              ✓
            </span>
            <p className={styles.statusLabel}>Enquiry sent</p>
            <h3>Thank you for sharing your requirement.</h3>
            <p>{formMessage}</p>
            <button
              className={`button ${styles.secondaryButton}`}
              type="button"
              onClick={startAnotherEnquiry}
            >
              Send another enquiry <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : (
          <form
            className={styles.form}
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={status === "submitting"}
          >
            <div className={styles.formHeader}>
              <div>
                <p className={styles.statusLabel}>Quote enquiry</p>
                <h3>Production requirement</h3>
              </div>
              <p>
                Fields marked <span aria-hidden="true">*</span> are required.
              </p>
            </div>

            {status === "error" && formMessage ? (
              <div className={styles.formAlert} role="alert">
                {formMessage}
              </div>
            ) : null}

            <fieldset className={styles.fieldset}>
              <legend>Business details</legend>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label htmlFor="quote-fullName">
                    Full name <RequiredMarker />
                  </label>
                  <input
                    className={controlClass("fullName")}
                    id="quote-fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    value={values.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    onBlur={() => validateField("fullName")}
                    required
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={describedBy("fullName")}
                  />
                  <FieldError field="fullName" errors={errors} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="quote-companyName">
                    Company name <RequiredMarker />
                  </label>
                  <input
                    className={controlClass("companyName")}
                    id="quote-companyName"
                    name="companyName"
                    type="text"
                    autoComplete="organization"
                    maxLength={140}
                    value={values.companyName}
                    onChange={(event) =>
                      updateField("companyName", event.target.value)
                    }
                    onBlur={() => validateField("companyName")}
                    required
                    aria-invalid={Boolean(errors.companyName)}
                    aria-describedby={describedBy("companyName")}
                  />
                  <FieldError field="companyName" errors={errors} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="quote-businessEmail">
                    Business email <RequiredMarker />
                  </label>
                  <input
                    className={controlClass("businessEmail")}
                    id="quote-businessEmail"
                    name="businessEmail"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={254}
                    value={values.businessEmail}
                    onChange={(event) =>
                      updateField("businessEmail", event.target.value)
                    }
                    onBlur={() => validateField("businessEmail")}
                    required
                    aria-invalid={Boolean(errors.businessEmail)}
                    aria-describedby={describedBy("businessEmail")}
                  />
                  <FieldError field="businessEmail" errors={errors} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="quote-phone">
                    Phone number with country code <RequiredMarker />
                  </label>
                  <input
                    className={controlClass("phone")}
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={30}
                    placeholder="+91 98765 43210"
                    value={values.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    onBlur={() => validateField("phone")}
                    required
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={describedBy(
                      "phone",
                      "quote-phone-hint",
                    )}
                  />
                  <p className={styles.hint} id="quote-phone-hint">
                    Start with + and your international dialling code.
                  </p>
                  <FieldError field="phone" errors={errors} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="quote-country">
                    Country <RequiredMarker />
                  </label>
                  <input
                    className={controlClass("country")}
                    id="quote-country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    maxLength={100}
                    value={values.country}
                    onChange={(event) =>
                      updateField("country", event.target.value)
                    }
                    onBlur={() => validateField("country")}
                    required
                    aria-invalid={Boolean(errors.country)}
                    aria-describedby={describedBy("country")}
                  />
                  <FieldError field="country" errors={errors} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="quote-customerType">
                    Customer type <RequiredMarker />
                  </label>
                  <select
                    className={`${controlClass("customerType")} ${styles.select}`}
                    id="quote-customerType"
                    name="customerType"
                    value={values.customerType}
                    onChange={(event) =>
                      updateField("customerType", event.target.value)
                    }
                    onBlur={() => validateField("customerType")}
                    required
                    aria-invalid={Boolean(errors.customerType)}
                    aria-describedby={describedBy("customerType")}
                  >
                    <option value="">Select customer type</option>
                    {customerTypes.map((customerType) => (
                      <option key={customerType} value={customerType}>
                        {customerType}
                      </option>
                    ))}
                  </select>
                  <FieldError field="customerType" errors={errors} />
                </div>
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>Requirement details</legend>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label htmlFor="quote-product">
                    Product required <RequiredMarker />
                  </label>
                  <select
                    className={`${controlClass("product")} ${styles.select}`}
                    id="quote-product"
                    name="product"
                    value={values.product}
                    onChange={(event) => updateProduct(event.target.value)}
                    onBlur={() => validateField("product")}
                    required
                    aria-invalid={Boolean(errors.product)}
                    aria-describedby={describedBy("product")}
                  >
                    <option value="">Select a product</option>
                    {productOptions.map((product) => (
                      <option key={product.value} value={product.value}>
                        {product.label}
                      </option>
                    ))}
                  </select>
                  <FieldError field="product" errors={errors} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="quote-quantity">
                    Quantity requirement <RequiredMarker />
                  </label>
                  <input
                    className={controlClass("quantity")}
                    id="quote-quantity"
                    name="quantity"
                    type="text"
                    maxLength={160}
                    placeholder="Share the amount and unit"
                    value={values.quantity}
                    onChange={(event) =>
                      updateField("quantity", event.target.value)
                    }
                    onBlur={() => validateField("quantity")}
                    required
                    aria-invalid={Boolean(errors.quantity)}
                    aria-describedby={describedBy("quantity")}
                  />
                  <FieldError field="quantity" errors={errors} />
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label htmlFor="quote-details">
                    Requirement details <RequiredMarker />
                  </label>
                  <textarea
                    className={`${controlClass("details")} ${styles.textarea}`}
                    id="quote-details"
                    name="details"
                    rows={6}
                    maxLength={4000}
                    placeholder="Describe the material, target specification, or other production requirements."
                    value={values.details}
                    onChange={(event) =>
                      updateField("details", event.target.value)
                    }
                    onBlur={() => validateField("details")}
                    required
                    aria-invalid={Boolean(errors.details)}
                    aria-describedby={describedBy("details")}
                  />
                  <FieldError field="details" errors={errors} />
                </div>
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>
                Relevant optional details <span>Include only what applies</span>
              </legend>
              {visibleOptionalFields.length > 0 ? (
                <div className={styles.grid}>
                  {visibleOptionalFields.map((field) => (
                    <div className={styles.field} key={field.key}>
                      <label htmlFor={`quote-${field.key}`}>{field.label}</label>
                      <input
                        className={styles.control}
                        id={`quote-${field.key}`}
                        name={field.key}
                        type="text"
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        value={values[field.key]}
                        onChange={(event) =>
                          updateField(
                            field.key as OptionalSpecificationKey,
                            event.target.value,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.optionalNotice}>
                  Select a product above to see the optional details that are
                  relevant to it.
                </p>
              )}
            </fieldset>

            <div hidden aria-hidden="true">
              <input
                id="quote-website"
                name="website"
                type="text"
                autoComplete="new-password"
                tabIndex={-1}
                value={values.website}
                onChange={(event) =>
                  updateField("website", event.target.value)
                }
              />
            </div>

            <div className={styles.consentField}>
              <input
                id="quote-consent"
                name="consent"
                type="checkbox"
                checked={values.consent}
                onChange={(event) =>
                  updateField("consent", event.target.checked)
                }
                onBlur={() => validateField("consent")}
                required
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={describedBy("consent")}
              />
              <div>
                <label htmlFor="quote-consent">
                  I consent to Iniya Fiber using these details to respond to my
                  enquiry. See the <Link href="/privacy">privacy policy</Link>.
                  <RequiredMarker />
                </label>
                <FieldError field="consent" errors={errors} />
              </div>
            </div>

            {turnstileSiteKey ? (
              <fieldset
                className={styles.turnstile}
                data-invalid={errors.turnstileToken ? "true" : undefined}
                aria-describedby={describedBy("turnstileToken")}
                tabIndex={-1}
              >
                <legend className={styles.srOnly}>Security check</legend>
                <div ref={turnstileContainerRef} />
                <FieldError field="turnstileToken" errors={errors} />
              </fieldset>
            ) : null}

            <div className={styles.submitRow}>
              <button
                className={`button ${styles.submitButton}`}
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending enquiry…" : "Send enquiry"}
                <span aria-hidden="true">→</span>
              </button>
              <p aria-live="polite">
                {status === "submitting"
                  ? "Your enquiry is being securely sent."
                  : "Your details are used only to respond to this enquiry."}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
