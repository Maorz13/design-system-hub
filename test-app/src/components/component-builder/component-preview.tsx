"use client";

import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  Globe,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import type { DesignComponent } from "@/types/database";
import { getVariablesByLibrary } from "@/lib/mock-data";

type PropOverrides = Record<string, string | boolean>;
type ElementBindings = Record<string, { content: string | null; visibility: string | null }>;

interface ComponentPreviewProps {
  component: DesignComponent;
  scale?: "sm" | "md";
  propOverrides?: PropOverrides;
  seamless?: boolean;
  selectedElementId?: string | null;
  onElementSelect?: (elementId: string) => void;
  elementBindings?: ElementBindings;
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
  selectedElementId,
  onElementSelect,
  elementBindings,
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
      {renderPreview(component, scale, props, seamless, selectedElementId, onElementSelect, elementBindings)}
    </div>
  );
}

function SelectableElement({
  elementId,
  selectedId,
  onSelect,
  label,
  children,
}: {
  elementId: string;
  selectedId: string | null | undefined;
  onSelect: ((id: string) => void) | undefined;
  label: string;
  children: React.ReactNode;
}) {
  if (!onSelect) return <>{children}</>;

  const isSelected = elementId === selectedId;

  return (
    <div
      className={`relative transition-all ${
        isSelected
          ? "rounded-sm outline outline-2 outline-offset-2 outline-blue-500"
          : "cursor-pointer rounded-sm hover:outline hover:outline-1 hover:outline-offset-1 hover:outline-blue-400/50"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(elementId);
      }}
    >
      {isSelected && (
        <span className="absolute -top-5 left-1 z-10 flex items-center gap-1 whitespace-nowrap rounded bg-blue-500 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

interface PreviewProps {
  scale: "sm" | "md";
  props: PropOverrides;
  sid: string | null | undefined;
  sel: ((id: string) => void) | undefined;
  bindings?: ElementBindings;
}

function resolveContent(
  elementId: string,
  fallback: string,
  bindings: ElementBindings | undefined,
  props: PropOverrides,
): string {
  const key = bindings?.[elementId]?.content;
  if (key && props[key] !== undefined) return String(props[key]);
  return fallback;
}

function resolveVisible(
  elementId: string,
  fallback: boolean,
  bindings: ElementBindings | undefined,
  props: PropOverrides,
): boolean {
  const key = bindings?.[elementId]?.visibility;
  if (key && props[key] !== undefined) return Boolean(props[key]);
  return fallback;
}

function renderPreview(
  component: DesignComponent,
  scale: "sm" | "md",
  props: PropOverrides,
  seamless: boolean,
  sid?: string | null,
  sel?: (id: string) => void,
  bindings?: ElementBindings,
) {
  const p: PreviewProps = { scale, props, sid, sel, bindings };
  switch (component.id) {
    case "comp-002":
      return <NavigationBarPreview {...p} />;
    case "comp-004":
      return <HeroSectionPreview {...p} />;
    case "comp-008":
      return <FeatureRowPreview {...p} />;
    case "comp-009":
      return <StatsSectionPreview {...p} />;
    case "comp-010":
      return <CTABannerPreview {...p} />;
    case "comp-011":
      return <FooterPreview {...p} />;
    case "comp-012":
      return <FeaturesGridPreview {...p} />;
    default:
      return <GenericPreview name={component.name} />;
  }
}

function NavigationBarPreview({ scale, props, sid, sel, bindings }: PreviewProps) {
  const rc = (id: string, fb: string) => resolveContent(id, fb, bindings, props);
  const rv = (id: string, fb: boolean) => resolveVisible(id, fb, bindings, props);
  const logoText = rc("el-nav-logo", String(props.logo_text || "Acme"));
  const showCta = rv("el-nav-cta", props.show_cta as boolean);
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";
  const initial = logoText.charAt(0).toUpperCase();

  const navItems = [
    { name: "Products", id: "el-nav-products" },
    { name: "Solutions", id: "el-nav-solutions" },
    { name: "Pricing", id: "el-nav-pricing" },
    { name: "Resources", id: "el-nav-resources" },
  ];

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
          <SelectableElement elementId="el-nav-logo" selectedId={sid} onSelect={sel} label="Logo Text">
            <span className={`font-semibold ${textSize}`} style={{ color: "var(--preview-text)" }}>
              {logoText}
            </span>
          </SelectableElement>
        </div>
        <div className="flex items-center gap-5">
          {navItems.map(({ name, id }) => (
            <SelectableElement key={id} elementId={id} selectedId={sid} onSelect={sel} label={`Nav: ${name}`}>
              <span className={textSize} style={{ color: "var(--preview-muted)" }}>
                {rc(id, name)}
              </span>
            </SelectableElement>
          ))}
          {showCta && (
            <SelectableElement elementId="el-nav-cta" selectedId={sid} onSelect={sel} label="CTA Button">
              <button
                className={`rounded-md px-3 py-1.5 font-medium text-white ${textSize}`}
                style={{
                  backgroundColor: "var(--preview-primary)",
                  borderRadius: "var(--preview-radius)",
                }}
              >
                {rc("el-nav-cta", "Get Started")}
              </button>
            </SelectableElement>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroSectionPreview({ scale, props, sid, sel, bindings }: PreviewProps) {
  const rc = (id: string, fb: string) => resolveContent(id, fb, bindings, props);
  const rv = (id: string, fb: boolean) => resolveVisible(id, fb, bindings, props);
  const title = rc("el-hero-title", String(props.title || "Welcome to Acme"));
  const subtitle = rc("el-hero-subtitle", String(props.subtitle || "Build something amazing."));
  const showCta = rv("el-hero-cta", props.show_cta as boolean);
  const ctaText = rc("el-hero-cta", String(props.cta_text || "Get Started"));
  const headingSize = scale === "sm" ? "text-xl" : "text-3xl";
  const textSize = scale === "sm" ? "text-[10px]" : "text-sm";

  return (
    <div className="w-full py-16 text-center">
      <div className="mx-auto max-w-lg space-y-5 px-6">
        <SelectableElement elementId="el-hero-badge" selectedId={sid} onSelect={sel} label="Badge">
          <span
            className={`inline-block rounded-full px-3 py-1 font-medium ${scale === "sm" ? "text-[10px]" : "text-xs"}`}
            style={{
              backgroundColor: "color-mix(in srgb, var(--preview-primary) 10%, transparent)",
              color: "var(--preview-primary)",
            }}
          >
            {rc("el-hero-badge", "New Release")}
          </span>
        </SelectableElement>

        <SelectableElement elementId="el-hero-title" selectedId={sid} onSelect={sel} label="Heading Large">
          <h2
            className={`font-bold leading-tight tracking-tight ${headingSize}`}
            style={{ color: "var(--preview-text)" }}
          >
            {title}
          </h2>
        </SelectableElement>

        <SelectableElement elementId="el-hero-subtitle" selectedId={sid} onSelect={sel} label="Paragraph">
          <p className={`mx-auto max-w-md leading-relaxed ${textSize}`} style={{ color: "var(--preview-muted)" }}>
            {subtitle}
          </p>
        </SelectableElement>

        {showCta && (
          <div className="flex items-center justify-center gap-3 pt-2">
            <SelectableElement elementId="el-hero-cta" selectedId={sid} onSelect={sel} label="Primary Button">
              <button
                className={`px-5 py-2.5 font-semibold text-white ${scale === "sm" ? "text-xs" : "text-sm"}`}
                style={{
                  backgroundColor: "var(--preview-primary)",
                  borderRadius: "var(--preview-radius)",
                }}
              >
                {ctaText}
              </button>
            </SelectableElement>

            <SelectableElement elementId="el-hero-secondary" selectedId={sid} onSelect={sel} label="Secondary Button">
              <button
                className={`px-5 py-2.5 font-semibold ${scale === "sm" ? "text-xs" : "text-sm"}`}
                style={{
                  color: "var(--preview-text)",
                  border: "1px solid var(--preview-border)",
                  borderRadius: "var(--preview-radius)",
                }}
              >
                {rc("el-hero-secondary", "Learn More")}
              </button>
            </SelectableElement>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureRowPreview({ scale, props, sid, sel, bindings }: PreviewProps) {
  const rc = (id: string, fb: string) => resolveContent(id, fb, bindings, props);
  const rv = (id: string, fb: boolean) => resolveVisible(id, fb, bindings, props);
  const stepNumber = rc("el-feat-step", String(props.step_number || "1"));
  const title = rc("el-feat-title", String(props.title || "Feature title"));
  const description = rc("el-feat-desc", String(props.description || "Feature description goes here."));
  const imageRight = props.image_right as boolean;
  const showStep = rv("el-feat-step", props.show_step as boolean);
  const textSize = scale === "sm" ? "text-[10px]" : "text-sm";
  const headingSize = scale === "sm" ? "text-sm" : "text-xl";

  const textContent = (
    <div className="space-y-3 px-6">
      {showStep && (
        <SelectableElement elementId="el-feat-step" selectedId={sid} onSelect={sel} label="Step Badge">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 font-semibold ${scale === "sm" ? "text-[10px]" : "text-xs"}`}
            style={{
              backgroundColor: "color-mix(in srgb, var(--preview-primary) 10%, transparent)",
              color: "var(--preview-primary)",
            }}
          >
            Step {stepNumber}
          </span>
        </SelectableElement>
      )}

      <SelectableElement elementId="el-feat-title" selectedId={sid} onSelect={sel} label="Feature Title">
        <h3 className={`font-bold ${headingSize}`} style={{ color: "var(--preview-text)" }}>
          {title}
        </h3>
      </SelectableElement>

      <SelectableElement elementId="el-feat-desc" selectedId={sid} onSelect={sel} label="Description">
        <p className={`leading-relaxed ${textSize}`} style={{ color: "var(--preview-muted)" }}>
          {description}
        </p>
      </SelectableElement>

      <SelectableElement elementId="el-feat-link" selectedId={sid} onSelect={sel} label="Learn More Link">
        <div className="flex items-center gap-1.5 pt-1">
          <span
            className={`font-semibold ${scale === "sm" ? "text-[10px]" : "text-xs"}`}
            style={{ color: "var(--preview-primary)" }}
          >
            {rc("el-feat-link", "Learn more")}
          </span>
          <ArrowRight className="size-3" style={{ color: "var(--preview-primary)" }} />
        </div>
      </SelectableElement>
    </div>
  );

  const visualContent = (
    <SelectableElement elementId="el-feat-image" selectedId={sid} onSelect={sel} label="Feature Image">
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
    </SelectableElement>
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

function FeaturesGridPreview({ scale, props, sid, sel, bindings }: PreviewProps) {
  const rc = (id: string, fb: string) => resolveContent(id, fb, bindings, props);
  const sectionTitle = rc("el-grid-title", String(props.title || "Why choose us"));
  const sectionSubtitle = rc("el-grid-subtitle", String(props.subtitle || "Everything you need to scale."));
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";
  const headingSize = scale === "sm" ? "text-sm" : "text-xl";

  const cards = [
    { title: rc("el-grid-c1-title", String(props.card_1_title)), desc: rc("el-grid-c1-desc", String(props.card_1_desc)), icon: Zap, titleId: "el-grid-c1-title", descId: "el-grid-c1-desc" },
    { title: rc("el-grid-c2-title", String(props.card_2_title)), desc: rc("el-grid-c2-desc", String(props.card_2_desc)), icon: Shield, titleId: "el-grid-c2-title", descId: "el-grid-c2-desc" },
    { title: rc("el-grid-c3-title", String(props.card_3_title)), desc: rc("el-grid-c3-desc", String(props.card_3_desc)), icon: Users, titleId: "el-grid-c3-title", descId: "el-grid-c3-desc" },
  ];

  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-lg space-y-2 px-6 pb-8 text-center">
        <SelectableElement elementId="el-grid-title" selectedId={sid} onSelect={sel} label="Section Title">
          <h3 className={`font-bold ${headingSize}`} style={{ color: "var(--preview-text)" }}>
            {sectionTitle}
          </h3>
        </SelectableElement>

        <SelectableElement elementId="el-grid-subtitle" selectedId={sid} onSelect={sel} label="Section Subtitle">
          <p className={textSize} style={{ color: "var(--preview-muted)" }}>
            {sectionSubtitle}
          </p>
        </SelectableElement>
      </div>

      <div className="grid grid-cols-3 gap-4 px-6">
        {cards.map((card) => (
          <div
            key={card.titleId}
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

            <SelectableElement elementId={card.titleId} selectedId={sid} onSelect={sel} label={card.title}>
              <h4
                className={`font-semibold ${scale === "sm" ? "text-[10px]" : "text-sm"}`}
                style={{ color: "var(--preview-text)" }}
              >
                {card.title}
              </h4>
            </SelectableElement>

            <SelectableElement elementId={card.descId} selectedId={sid} onSelect={sel} label="Description">
              <p className={`leading-relaxed ${textSize}`} style={{ color: "var(--preview-muted)" }}>
                {card.desc}
              </p>
            </SelectableElement>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsSectionPreview({ scale, props, sid, sel, bindings }: PreviewProps) {
  const rc = (id: string, fb: string) => resolveContent(id, fb, bindings, props);
  const textSize = scale === "sm" ? "text-[10px]" : "text-xs";
  const stats = [
    { value: rc("el-stat-1-val", String(props.stat_1_value)), label: rc("el-stat-1-lbl", String(props.stat_1_label)), valId: "el-stat-1-val", lblId: "el-stat-1-lbl" },
    { value: rc("el-stat-2-val", String(props.stat_2_value)), label: rc("el-stat-2-lbl", String(props.stat_2_label)), valId: "el-stat-2-val", lblId: "el-stat-2-lbl" },
    { value: rc("el-stat-3-val", String(props.stat_3_value)), label: rc("el-stat-3-lbl", String(props.stat_3_label)), valId: "el-stat-3-val", lblId: "el-stat-3-lbl" },
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
          <div key={stat.valId} className="space-y-1">
            <SelectableElement elementId={stat.valId} selectedId={sid} onSelect={sel} label={`${stat.value}`}>
              <p className={`font-bold text-white ${scale === "sm" ? "text-xl" : "text-3xl"}`}>
                {stat.value}
              </p>
            </SelectableElement>

            <SelectableElement elementId={stat.lblId} selectedId={sid} onSelect={sel} label="Stat Label">
              <p className={`text-white/75 ${textSize}`}>{stat.label}</p>
            </SelectableElement>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTABannerPreview({ scale, props, sid, sel, bindings }: PreviewProps) {
  const rc = (id: string, fb: string) => resolveContent(id, fb, bindings, props);
  const rv = (id: string, fb: boolean) => resolveVisible(id, fb, bindings, props);
  const title = rc("el-cta-title", String(props.title || "Ready to get started?"));
  const subtitle = rc("el-cta-subtitle", String(props.subtitle || "Join thousands of teams using our platform."));
  const ctaText = rc("el-cta-btn", String(props.cta_text || "Start Free Trial"));
  const showSecondary = rv("el-cta-secondary", props.show_secondary_cta as boolean);
  const headingSize = scale === "sm" ? "text-lg" : "text-2xl";
  const textSize = scale === "sm" ? "text-[10px]" : "text-sm";

  return (
    <div
      className="w-full py-16 text-center"
      style={{ backgroundColor: "color-mix(in srgb, var(--preview-primary) 6%, white)" }}
    >
      <div className="mx-auto max-w-md space-y-4 px-6">
        <SelectableElement elementId="el-cta-title" selectedId={sid} onSelect={sel} label="Headline">
          <h3 className={`font-bold ${headingSize}`} style={{ color: "var(--preview-text)" }}>
            {title}
          </h3>
        </SelectableElement>

        <SelectableElement elementId="el-cta-subtitle" selectedId={sid} onSelect={sel} label="Subtitle">
          <p className={textSize} style={{ color: "var(--preview-muted)" }}>
            {subtitle}
          </p>
        </SelectableElement>

        <div className="flex items-center justify-center gap-3 pt-2">
          <SelectableElement elementId="el-cta-btn" selectedId={sid} onSelect={sel} label="Primary Button">
            <button
              className={`px-5 py-2.5 font-semibold text-white ${scale === "sm" ? "text-xs" : "text-sm"}`}
              style={{
                backgroundColor: "var(--preview-primary)",
                borderRadius: "var(--preview-radius)",
              }}
            >
              {ctaText}
            </button>
          </SelectableElement>

          {showSecondary && (
            <SelectableElement elementId="el-cta-secondary" selectedId={sid} onSelect={sel} label="Secondary Button">
              <button
                className={`px-5 py-2.5 font-semibold ${scale === "sm" ? "text-xs" : "text-sm"}`}
                style={{
                  color: "var(--preview-text)",
                  border: "1px solid var(--preview-border)",
                  borderRadius: "var(--preview-radius)",
                }}
              >
                {rc("el-cta-secondary", "Contact Sales")}
              </button>
            </SelectableElement>
          )}
        </div>
      </div>
    </div>
  );
}

function FooterPreview({ scale, props, sid, sel, bindings }: PreviewProps) {
  const rc = (id: string, fb: string) => resolveContent(id, fb, bindings, props);
  const rv = (id: string, fb: boolean) => resolveVisible(id, fb, bindings, props);
  const companyName = rc("el-footer-name", String(props.company_name || "Acme"));
  const tagline = rc("el-footer-tagline", String(props.tagline || "Build something amazing."));
  const showSocial = rv("el-footer-social", props.show_social as boolean);
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
              <SelectableElement elementId="el-footer-name" selectedId={sid} onSelect={sel} label="Company Name">
                <span className={`font-semibold text-white ${textSize}`}>{companyName}</span>
              </SelectableElement>
            </div>

            <SelectableElement elementId="el-footer-tagline" selectedId={sid} onSelect={sel} label="Tagline">
              <p className={`leading-relaxed text-white/50 ${textSize}`}>{tagline}</p>
            </SelectableElement>

            {showSocial && (
              <SelectableElement elementId="el-footer-social" selectedId={sid} onSelect={sel} label="Social Links">
                <div className="flex gap-3 pt-1">
                  {[Twitter, Github, Linkedin, Globe].map((Icon, i) => (
                    <Icon key={i} className="size-3.5 text-white/40" />
                  ))}
                </div>
              </SelectableElement>
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

function GenericPreview({ name }: { name: string }) {
  return (
    <div className="flex h-24 w-full items-center justify-center">
      <p className="text-sm text-muted-foreground">{name}</p>
    </div>
  );
}
