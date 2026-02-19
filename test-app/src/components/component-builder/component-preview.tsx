"use client";

import {
  ArrowRight,
  Check,
  ChevronRight,
  Zap,
  Shield,
  Users,
  Star,
  Globe,
  Mail,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import type { DesignComponent } from "@/types/database";
import { getVariablesByLibrary } from "@/lib/mock-data";

type PropOverrides = Record<string, string | boolean>;

interface ComponentPreviewProps {
  component: DesignComponent;
  scale?: "sm" | "md";
  propOverrides?: PropOverrides;
  seamless?: boolean;
}

function useTokens(libraryId: string) {
  const vars = getVariablesByLibrary(libraryId);
  const tokens: Record<string, string> = {};
  vars.forEach((v) => {
    tokens[v.key] = v.value_default;
  });
  return tokens;
}

function resolveProps(component: DesignComponent, overrides?: PropOverrides): PropOverrides {
  const resolved: PropOverrides = {};
  Object.entries(component.props_schema).forEach(([key, schema]) => {
    resolved[key] = overrides?.[key] ?? schema.default;
  });
  return resolved;
}

export function ComponentPreview({
  component,
  scale = "md",
  propOverrides,
  seamless = false,
}: ComponentPreviewProps) {
  const tokens = useTokens(component.library_id);
  const props = resolveProps(component, propOverrides);

  const wrapperClass = seamless
    ? "w-full bg-white"
    : `flex items-center justify-center rounded-lg border bg-white ${scale === "sm" ? "p-4" : "p-6"}`;

  return (
    <div
      className={wrapperClass}
      style={
        {
          "--preview-primary": tokens["brand-primary"] || "#0055FF",
          "--preview-secondary": tokens["brand-secondary"] || "#6B21A8",
          "--preview-text": tokens["text-primary"] || "#111827",
          "--preview-muted": tokens["text-muted"] || "#6B7280",
          "--preview-bg": tokens["surface-bg"] || "#FFFFFF",
          "--preview-border": tokens["surface-border"] || "#E5E7EB",
          "--preview-success": tokens["action-success"] || "#059669",
          "--preview-danger": tokens["action-danger"] || "#DC2626",
          "--preview-radius": tokens["radius-md"] || "8px",
        } as React.CSSProperties
      }
    >
      {renderPreview(component, scale, props, seamless)}
    </div>
  );
}

function renderPreview(component: DesignComponent, scale: "sm" | "md", props: PropOverrides, seamless: boolean) {
  switch (component.id) {
    case "comp-001":
      return <PrimaryButtonPreview scale={scale} props={props} seamless={seamless} />;
    case "comp-002":
      return <NavigationBarPreview scale={scale} props={props} />;
    case "comp-003":
      return <CardPreview scale={scale} props={props} seamless={seamless} />;
    case "comp-004":
      return <HeroSectionPreview scale={scale} props={props} />;
    case "comp-005":
      return <PricingTablePreview scale={scale} props={props} seamless={seamless} />;
    case "comp-006":
      return <TestimonialBlockPreview scale={scale} props={props} seamless={seamless} />;
    case "comp-007":
      return <SecondaryButtonPreview scale={scale} props={props} seamless={seamless} />;
    case "comp-008":
      return <FeatureRowPreview scale={scale} props={props} />;
    case "comp-009":
      return <StatsSectionPreview scale={scale} props={props} />;
    case "comp-010":
      return <CTABannerPreview scale={scale} props={props} />;
    case "comp-011":
      return <FooterPreview scale={scale} props={props} />;
    case "comp-012":
      return <FeaturesGridPreview scale={scale} props={props} />;
    default:
      return <GenericPreview name={component.name} />;
  }
}

interface PreviewProps {
  scale: "sm" | "md";
  props: PropOverrides;
  seamless?: boolean;
}

function PrimaryButtonPreview({ scale, props, seamless }: PreviewProps) {
  const label = String(props.label || "Click me");
  const showIcon = props.show_icon as boolean;
  const size = scale === "sm" ? "py-2 px-5 text-xs" : "py-2.5 px-6 text-sm";
  return (
    <div className={seamless ? "flex justify-center py-8" : ""}>
      <button
        className={`inline-flex items-center gap-2 font-semibold text-white transition-opacity hover:opacity-90 ${size}`}
        style={{
          backgroundColor: "var(--preview-primary)",
          borderRadius: "var(--preview-radius)",
        }}
      >
        {label}
        {showIcon && <ArrowRight className="size-3.5" />}
      </button>
    </div>
  );
}

function SecondaryButtonPreview({ scale, props, seamless }: PreviewProps) {
  const label = String(props.label || "Learn more");
  const showIcon = props.show_icon as boolean;
  const variant = String(props.variant || "filled");
  const size = scale === "sm" ? "py-2 px-5 text-xs" : "py-2.5 px-6 text-sm";
  const isFilled = variant === "filled";

  return (
    <div className={seamless ? "flex justify-center py-8" : ""}>
      <button
        className={`inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-90 ${size}`}
        style={
          isFilled
            ? {
                backgroundColor: "var(--preview-secondary)",
                color: "#fff",
                borderRadius: "var(--preview-radius)",
              }
            : {
                color: "var(--preview-primary)",
                border: "1.5px solid var(--preview-primary)",
                borderRadius: "var(--preview-radius)",
                backgroundColor: "transparent",
              }
        }
      >
        {label}
        {showIcon && <ArrowRight className="size-3.5" />}
      </button>
    </div>
  );
}

function NavigationBarPreview({ scale, props }: PreviewProps) {
  const logoText = String(props.logo_text || "Acme");
  const showCta = props.show_cta as boolean;
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";
  const initial = logoText.charAt(0).toUpperCase();
  return (
    <div className="w-full">
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ borderBottom: "1px solid var(--preview-border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex size-7 items-center justify-center rounded-md font-bold text-white"
            style={{ backgroundColor: "var(--preview-primary)", fontSize: "10px" }}
          >
            {initial}
          </div>
          <span className={`font-semibold ${textSize}`} style={{ color: "var(--preview-text)" }}>
            {logoText}
          </span>
        </div>
        <div className="flex items-center gap-5">
          {["Products", "Solutions", "Pricing", "Resources"].map((item) => (
            <span key={item} className={textSize} style={{ color: "var(--preview-muted)" }}>
              {item}
            </span>
          ))}
          {showCta && (
            <button
              className={`rounded-md px-3 py-1.5 font-medium text-white ${textSize}`}
              style={{
                backgroundColor: "var(--preview-primary)",
                borderRadius: "var(--preview-radius)",
              }}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroSectionPreview({ scale, props }: PreviewProps) {
  const title = String(props.title || "Welcome to Acme");
  const subtitle = String(props.subtitle || "Build something amazing.");
  const showCta = props.show_cta as boolean;
  const ctaText = String(props.cta_text || "Get Started");
  const headingSize = scale === "sm" ? "text-xl" : "text-3xl";
  const textSize = scale === "sm" ? "text-[10px]" : "text-sm";
  return (
    <div className="w-full py-16 text-center">
      <div className="mx-auto max-w-lg space-y-5 px-6">
        <span
          className={`inline-block rounded-full px-3 py-1 font-medium ${scale === "sm" ? "text-[10px]" : "text-xs"}`}
          style={{
            backgroundColor: "color-mix(in srgb, var(--preview-primary) 10%, transparent)",
            color: "var(--preview-primary)",
          }}
        >
          New Release
        </span>
        <h2
          className={`font-bold leading-tight tracking-tight ${headingSize}`}
          style={{ color: "var(--preview-text)" }}
        >
          {title}
        </h2>
        <p className={`mx-auto max-w-md leading-relaxed ${textSize}`} style={{ color: "var(--preview-muted)" }}>
          {subtitle}
        </p>
        {showCta && (
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              className={`px-5 py-2.5 font-semibold text-white ${scale === "sm" ? "text-xs" : "text-sm"}`}
              style={{
                backgroundColor: "var(--preview-primary)",
                borderRadius: "var(--preview-radius)",
              }}
            >
              {ctaText}
            </button>
            <button
              className={`px-5 py-2.5 font-semibold ${scale === "sm" ? "text-xs" : "text-sm"}`}
              style={{
                color: "var(--preview-text)",
                border: "1px solid var(--preview-border)",
                borderRadius: "var(--preview-radius)",
              }}
            >
              Learn More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureRowPreview({ scale, props }: PreviewProps) {
  const stepNumber = String(props.step_number || "1");
  const title = String(props.title || "Feature title");
  const description = String(props.description || "Feature description goes here.");
  const imageRight = props.image_right as boolean;
  const showStep = props.show_step as boolean;
  const textSize = scale === "sm" ? "text-[10px]" : "text-sm";
  const headingSize = scale === "sm" ? "text-sm" : "text-xl";

  const textContent = (
    <div className="space-y-3 px-6">
      {showStep && (
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 font-semibold ${scale === "sm" ? "text-[10px]" : "text-xs"}`}
          style={{
            backgroundColor: "color-mix(in srgb, var(--preview-primary) 10%, transparent)",
            color: "var(--preview-primary)",
          }}
        >
          Step {stepNumber}
        </span>
      )}
      <h3 className={`font-bold ${headingSize}`} style={{ color: "var(--preview-text)" }}>
        {title}
      </h3>
      <p className={`leading-relaxed ${textSize}`} style={{ color: "var(--preview-muted)" }}>
        {description}
      </p>
      <div className="flex items-center gap-1.5 pt-1">
        <span
          className={`font-semibold ${scale === "sm" ? "text-[10px]" : "text-xs"}`}
          style={{ color: "var(--preview-primary)" }}
        >
          Learn more
        </span>
        <ArrowRight className="size-3" style={{ color: "var(--preview-primary)" }} />
      </div>
    </div>
  );

  const visualContent = (
    <div
      className="mx-6 aspect-[4/3] rounded-lg"
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, var(--preview-primary) 15%, transparent), color-mix(in srgb, var(--preview-secondary) 15%, transparent))`,
        border: "1px solid var(--preview-border)",
      }}
    >
      <div className="flex h-full flex-col items-center justify-center gap-2 p-4 opacity-40">
        <div className="h-2 w-3/4 rounded" style={{ backgroundColor: "var(--preview-primary)" }} />
        <div className="h-2 w-1/2 rounded" style={{ backgroundColor: "var(--preview-muted)" }} />
        <div className="mt-2 h-8 w-8 rounded-full" style={{ backgroundColor: "var(--preview-primary)" }} />
      </div>
    </div>
  );

  return (
    <div className="w-full py-12">
      <div className="grid grid-cols-2 items-center gap-8">
        {imageRight ? (
          <>
            {textContent}
            {visualContent}
          </>
        ) : (
          <>
            {visualContent}
            {textContent}
          </>
        )}
      </div>
    </div>
  );
}

function FeaturesGridPreview({ scale, props }: PreviewProps) {
  const sectionTitle = String(props.title || "Why choose us");
  const sectionSubtitle = String(props.subtitle || "Everything you need to scale.");
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";
  const headingSize = scale === "sm" ? "text-sm" : "text-xl";

  const cards = [
    { title: String(props.card_1_title), desc: String(props.card_1_desc), icon: Zap },
    { title: String(props.card_2_title), desc: String(props.card_2_desc), icon: Shield },
    { title: String(props.card_3_title), desc: String(props.card_3_desc), icon: Users },
  ];

  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-lg space-y-2 px-6 pb-8 text-center">
        <h3 className={`font-bold ${headingSize}`} style={{ color: "var(--preview-text)" }}>
          {sectionTitle}
        </h3>
        <p className={textSize} style={{ color: "var(--preview-muted)" }}>
          {sectionSubtitle}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 px-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="space-y-3 rounded-lg p-5"
            style={{
              border: "1px solid var(--preview-border)",
              backgroundColor: "var(--preview-bg)",
            }}
          >
            <div
              className="flex size-9 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "color-mix(in srgb, var(--preview-primary) 10%, transparent)",
              }}
            >
              <card.icon className="size-4" style={{ color: "var(--preview-primary)" }} />
            </div>
            <h4
              className={`font-semibold ${scale === "sm" ? "text-[10px]" : "text-sm"}`}
              style={{ color: "var(--preview-text)" }}
            >
              {card.title}
            </h4>
            <p className={`leading-relaxed ${textSize}`} style={{ color: "var(--preview-muted)" }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsSectionPreview({ scale, props }: PreviewProps) {
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";
  const stats = [
    { value: String(props.stat_1_value), label: String(props.stat_1_label) },
    { value: String(props.stat_2_value), label: String(props.stat_2_label) },
    { value: String(props.stat_3_value), label: String(props.stat_3_label) },
  ];

  return (
    <div
      className="w-full py-12"
      style={{
        background: `linear-gradient(135deg, var(--preview-primary), var(--preview-secondary))`,
      }}
    >
      <div className="grid grid-cols-3 gap-6 px-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <p className={`font-bold text-white ${scale === "sm" ? "text-xl" : "text-3xl"}`}>
              {stat.value}
            </p>
            <p className={`text-white/75 ${textSize}`}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTABannerPreview({ scale, props }: PreviewProps) {
  const title = String(props.title || "Ready to get started?");
  const subtitle = String(props.subtitle || "Join thousands of teams using our platform.");
  const ctaText = String(props.cta_text || "Start Free Trial");
  const showSecondary = props.show_secondary_cta as boolean;
  const headingSize = scale === "sm" ? "text-lg" : "text-2xl";
  const textSize = scale === "sm" ? "text-[10px]" : "text-sm";

  return (
    <div
      className="w-full py-16 text-center"
      style={{ backgroundColor: "color-mix(in srgb, var(--preview-primary) 6%, white)" }}
    >
      <div className="mx-auto max-w-md space-y-4 px-6">
        <h3 className={`font-bold ${headingSize}`} style={{ color: "var(--preview-text)" }}>
          {title}
        </h3>
        <p className={textSize} style={{ color: "var(--preview-muted)" }}>
          {subtitle}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            className={`px-5 py-2.5 font-semibold text-white ${scale === "sm" ? "text-xs" : "text-sm"}`}
            style={{
              backgroundColor: "var(--preview-primary)",
              borderRadius: "var(--preview-radius)",
            }}
          >
            {ctaText}
          </button>
          {showSecondary && (
            <button
              className={`px-5 py-2.5 font-semibold ${scale === "sm" ? "text-xs" : "text-sm"}`}
              style={{
                color: "var(--preview-text)",
                border: "1px solid var(--preview-border)",
                borderRadius: "var(--preview-radius)",
              }}
            >
              Contact Sales
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FooterPreview({ scale, props }: PreviewProps) {
  const companyName = String(props.company_name || "Acme");
  const tagline = String(props.tagline || "Build something amazing.");
  const showSocial = props.show_social as boolean;
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";
  const initial = companyName.charAt(0).toUpperCase();

  const columns = [
    { title: "Product", items: ["Features", "Pricing", "Changelog", "Integrations"] },
    { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
    { title: "Resources", items: ["Documentation", "Help Center", "Community", "Status"] },
    { title: "Legal", items: ["Privacy", "Terms", "Security", "Cookies"] },
  ];

  return (
    <div className="w-full" style={{ backgroundColor: "var(--preview-text)" }}>
      <div className="space-y-8 px-6 py-10">
        <div className="grid grid-cols-5 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className="flex size-6 items-center justify-center rounded-md text-[9px] font-bold text-white"
                style={{ backgroundColor: "var(--preview-primary)" }}
              >
                {initial}
              </div>
              <span className={`font-semibold text-white ${textSize}`}>{companyName}</span>
            </div>
            <p className={`leading-relaxed text-white/50 ${textSize}`}>{tagline}</p>
            {showSocial && (
              <div className="flex gap-3 pt-1">
                {[Twitter, Github, Linkedin, Globe].map((Icon, i) => (
                  <Icon key={i} className="size-3.5 text-white/40" />
                ))}
              </div>
            )}
          </div>
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <p className={`font-semibold text-white/70 ${textSize}`}>{col.title}</p>
              <div className="space-y-2">
                {col.items.map((item) => (
                  <p key={item} className={`text-white/40 ${textSize}`}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex items-center justify-between border-t pt-6"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className={`text-white/30 ${textSize}`}>
            &copy; 2026 {companyName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <span key={item} className={`text-white/30 ${textSize}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardPreview({ scale, props, seamless }: PreviewProps) {
  const title = String(props.title || "Card Title");
  const subtitle = String(props.subtitle || "Card subtitle");
  const showImage = props.show_image as boolean;
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";
  return (
    <div className={seamless ? "flex justify-center px-6 py-6" : ""}>
      <div
        className={`overflow-hidden ${seamless ? "w-full max-w-sm" : "w-full max-w-[280px]"}`}
        style={{
          border: "1px solid var(--preview-border)",
          borderRadius: "var(--preview-radius)",
          backgroundColor: "var(--preview-bg)",
        }}
      >
        {showImage && (
          <div
            className="h-32"
            style={{
              background: `linear-gradient(135deg, var(--preview-primary), var(--preview-secondary))`,
              opacity: 0.85,
            }}
          />
        )}
        <div className="space-y-2 p-4">
          <p
            className={`font-semibold ${scale === "sm" ? "text-xs" : "text-sm"}`}
            style={{ color: "var(--preview-text)" }}
          >
            {title}
          </p>
          <p className={`leading-relaxed ${textSize}`} style={{ color: "var(--preview-muted)" }}>
            {subtitle}
          </p>
          <div className="flex items-center gap-1 pt-1">
            <ChevronRight className="size-3" style={{ color: "var(--preview-primary)" }} />
            <span className={`font-medium ${textSize}`} style={{ color: "var(--preview-primary)" }}>
              Learn more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingTablePreview({ scale, props, seamless }: PreviewProps) {
  const planName = String(props.plan_name || "Pro Plan");
  const price = String(props.price || "$29/mo");
  const showBadge = props.show_badge as boolean;
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";
  const features = ["10 projects", "5GB storage", "Priority support", "API access"];

  const priceParts = price.match(/^([^/]+)(\/.*)?$/);
  const priceAmount = priceParts?.[1] || price;
  const pricePeriod = priceParts?.[2] || "";

  return (
    <div className={seamless ? "flex justify-center px-6 py-6" : ""}>
      <div
        className={`space-y-4 p-5 ${seamless ? "w-full max-w-xs" : "w-full max-w-[240px]"}`}
        style={{
          border: showBadge ? "2px solid var(--preview-primary)" : "1px solid var(--preview-border)",
          borderRadius: "var(--preview-radius)",
          backgroundColor: "var(--preview-bg)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className={`font-bold ${scale === "sm" ? "text-xs" : "text-sm"}`}
            style={{ color: "var(--preview-text)" }}
          >
            {planName}
          </span>
          {showBadge && (
            <span
              className={`rounded-full px-2 py-0.5 font-medium text-white ${textSize}`}
              style={{ backgroundColor: "var(--preview-primary)", fontSize: "9px" }}
            >
              Popular
            </span>
          )}
        </div>
        <div>
          <span className="text-3xl font-bold" style={{ color: "var(--preview-text)" }}>
            {priceAmount}
          </span>
          {pricePeriod && (
            <span className={textSize} style={{ color: "var(--preview-muted)" }}>
              {pricePeriod}
            </span>
          )}
        </div>
        <div className="space-y-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="size-3.5" style={{ color: "var(--preview-success)" }} />
              <span className={textSize} style={{ color: "var(--preview-text)" }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
        <button
          className={`w-full rounded-md py-2 font-semibold text-white ${textSize}`}
          style={{
            backgroundColor: "var(--preview-primary)",
            borderRadius: "var(--preview-radius)",
          }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

function TestimonialBlockPreview({ scale, props, seamless }: PreviewProps) {
  const quote = String(props.quote || "This product changed everything for us.");
  const author = String(props.author || "Jane Doe, CEO");
  const showAvatar = props.show_avatar as boolean;
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";

  const authorParts = author.split(",").map((s) => s.trim());
  const authorName = authorParts[0] || author;
  const authorRole = authorParts.slice(1).join(", ");
  const authorInitial = authorName.charAt(0).toUpperCase();

  return (
    <div className={seamless ? "flex justify-center px-6 py-10" : ""}>
      <div className={`space-y-3 ${seamless ? "w-full max-w-md" : "w-full max-w-[300px]"}`}>
        <div
          className="space-y-3 p-4"
          style={{
            borderLeft: "3px solid var(--preview-primary)",
            backgroundColor: "color-mix(in srgb, var(--preview-primary) 4%, transparent)",
            borderRadius: "0 var(--preview-radius) var(--preview-radius) 0",
          }}
        >
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="size-3.5"
                fill="var(--preview-primary)"
                style={{ color: "var(--preview-primary)" }}
              />
            ))}
          </div>
          <p
            className={`italic leading-relaxed ${textSize}`}
            style={{ color: "var(--preview-text)" }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </div>
        <div className="flex items-center gap-3 px-1">
          {showAvatar && (
            <div
              className="flex size-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: "var(--preview-secondary)" }}
            >
              {authorInitial}
            </div>
          )}
          <div>
            <p className={`font-semibold ${textSize}`} style={{ color: "var(--preview-text)" }}>
              {authorName}
            </p>
            {authorRole && (
              <p style={{ color: "var(--preview-muted)", fontSize: "10px" }}>{authorRole}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericPreview({ name }: { name: string }) {
  return (
    <div className="flex h-24 w-full items-center justify-center">
      <p className="text-sm text-muted-foreground">{name}</p>
    </div>
  );
}
