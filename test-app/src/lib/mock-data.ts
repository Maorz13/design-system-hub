import type {
  Workspace,
  User,
  Site,
  Library,
  LibraryInstallation,
  Variable,
  DesignComponent,
  Asset,
} from "@/types/database";

export const MOCK_WORKSPACE: Workspace = {
  id: "ws-001",
  name: "Acme Corp",
  plan: "enterprise",
};

export const MOCK_USERS: User[] = [
  {
    id: "user-001",
    email: "alex@acme.com",
    name: "Alex Morgan",
    avatar_url: "",
    workspace_id: "ws-001",
    role: "owner",
  },
  {
    id: "user-002",
    email: "sam@acme.com",
    name: "Sam Chen",
    workspace_id: "ws-001",
    role: "designer",
  },
  {
    id: "user-003",
    email: "jordan@acme.com",
    name: "Jordan Lee",
    workspace_id: "ws-001",
    role: "marketer",
  },
  {
    id: "user-004",
    email: "taylor@acme.com",
    name: "Taylor Kim",
    workspace_id: "ws-001",
    role: "admin",
  },
];

export const MOCK_CURRENT_USER = MOCK_USERS[0];

export const MOCK_SITES: Site[] = [
  {
    id: "site-002",
    workspace_id: "ws-001",
    name: "Marketing Website",
    type: "consumer",
    created_at: "2025-12-01T09:00:00Z",
    updated_at: "2026-02-10T11:00:00Z",
  },
  {
    id: "site-003",
    workspace_id: "ws-001",
    name: "Support Portal",
    type: "consumer",
    created_at: "2026-01-05T08:00:00Z",
    updated_at: "2026-02-12T16:45:00Z",
  },
  {
    id: "site-004",
    workspace_id: "ws-001",
    name: "Company Blog",
    type: "consumer",
    created_at: "2026-01-15T10:00:00Z",
    updated_at: "2026-02-14T09:20:00Z",
  },
];

export const MOCK_LIBRARIES: Library[] = [
  {
    id: "lib-001",
    source_site_id: "",
    name: "Acme Brand",
    version: 5,
    description:
      "Complete design system with brand tokens, UI primitives, marketing sections, and content blocks for all Acme web properties.",
    created_at: "2025-11-01T10:00:00Z",
    updated_at: "2026-02-15T14:30:00Z",
  },
];

export const MOCK_INSTALLATIONS: LibraryInstallation[] = [
  {
    id: "inst-001",
    library_id: "lib-001",
    consumer_site_id: "site-002",
    installed_version: 4,
    installed_at: "2025-12-01T09:30:00Z",
  },
  {
    id: "inst-002",
    library_id: "lib-001",
    consumer_site_id: "site-003",
    installed_version: 5,
    installed_at: "2026-01-05T08:30:00Z",
  },
  {
    id: "inst-003",
    library_id: "lib-001",
    consumer_site_id: "site-004",
    installed_version: 3,
    installed_at: "2026-01-15T11:00:00Z",
  },
];

export const MOCK_VARIABLES: Variable[] = [
  { id: "var-001", library_id: "lib-001", key: "brand-primary", value_default: "#0055FF", value_dark: "#88CCFF", type: "color" },
  { id: "var-002", library_id: "lib-001", key: "brand-secondary", value_default: "#6B21A8", value_dark: "#C084FC", type: "color" },
  { id: "var-003", library_id: "lib-001", key: "text-primary", value_default: "#111827", value_dark: "#F9FAFB", type: "color" },
  { id: "var-004", library_id: "lib-001", key: "text-muted", value_default: "#6B7280", value_dark: "#9CA3AF", type: "color" },
  { id: "var-005", library_id: "lib-001", key: "surface-bg", value_default: "#FFFFFF", value_dark: "#1F2937", type: "color" },
  { id: "var-006", library_id: "lib-001", key: "surface-border", value_default: "#E5E7EB", value_dark: "#374151", type: "color" },
  { id: "var-007", library_id: "lib-001", key: "action-success", value_default: "#059669", value_dark: "#34D399", type: "color" },
  { id: "var-008", library_id: "lib-001", key: "action-danger", value_default: "#DC2626", value_dark: "#F87171", type: "color" },
  { id: "var-009", library_id: "lib-001", key: "font-heading", value_default: "Inter", value_dark: null, type: "font" },
  { id: "var-010", library_id: "lib-001", key: "font-body", value_default: "Inter", value_dark: null, type: "font" },
  { id: "var-011", library_id: "lib-001", key: "spacing-xs", value_default: "4px", value_dark: null, type: "size" },
  { id: "var-012", library_id: "lib-001", key: "spacing-sm", value_default: "8px", value_dark: null, type: "size" },
  { id: "var-013", library_id: "lib-001", key: "spacing-md", value_default: "16px", value_dark: null, type: "size" },
  { id: "var-014", library_id: "lib-001", key: "spacing-lg", value_default: "24px", value_dark: null, type: "size" },
  { id: "var-015", library_id: "lib-001", key: "spacing-xl", value_default: "48px", value_dark: null, type: "size" },
  { id: "var-016", library_id: "lib-001", key: "radius-sm", value_default: "4px", value_dark: null, type: "size" },
  { id: "var-017", library_id: "lib-001", key: "radius-md", value_default: "8px", value_dark: null, type: "size" },
  { id: "var-018", library_id: "lib-001", key: "radius-lg", value_default: "12px", value_dark: null, type: "size" },
];

export const MOCK_COMPONENTS: DesignComponent[] = [
  {
    id: "comp-001",
    library_id: "lib-001",
    name: "Primary Button",
    html_structure: '<button class="btn btn-primary"><slot name="label">Click me</slot></button>',
    css_styles: ".btn { padding: 12px 24px; border-radius: var(--radius-md); font-weight: 600; } .btn-primary { background: var(--brand-primary); color: #fff; }",
    props_schema: {
      label: { type: "text", default: "Click me", label: "Button Label" },
      show_icon: { type: "boolean", default: false, label: "Show Icon" },
    },
    created_at: "2025-11-05T10:00:00Z",
    updated_at: "2026-02-10T14:00:00Z",
  },
  {
    id: "comp-007",
    library_id: "lib-001",
    name: "Secondary Button",
    html_structure: '<button class="btn btn-secondary"><slot name="label">Learn more</slot></button>',
    css_styles: ".btn { padding: 12px 24px; border-radius: var(--radius-md); font-weight: 600; } .btn-secondary { background: var(--brand-secondary); color: #fff; } .btn-secondary.outline { background: transparent; border: 1.5px solid var(--brand-primary); color: var(--brand-primary); }",
    props_schema: {
      label: { type: "text", default: "Learn more", label: "Button Label" },
      show_icon: { type: "boolean", default: false, label: "Show Icon" },
      variant: { type: "text", default: "filled", label: "Variant (filled / outline)" },
    },
    created_at: "2025-11-05T10:00:00Z",
    updated_at: "2026-02-10T14:00:00Z",
  },
  {
    id: "comp-002",
    library_id: "lib-001",
    name: "Navigation Bar",
    html_structure: '<nav class="navbar"><div class="nav-logo"><slot name="logo">Logo</slot></div><div class="nav-links" data-slot="nav-content"></div></nav>',
    css_styles: ".navbar { display: flex; align-items: center; justify-content: space-between; padding: var(--spacing-md) var(--spacing-lg); border-bottom: 1px solid var(--surface-border); }",
    props_schema: {
      logo_text: { type: "text", default: "Acme", label: "Logo Text" },
      show_cta: { type: "boolean", default: true, label: "Show CTA Button" },
    },
    created_at: "2025-11-06T10:00:00Z",
    updated_at: "2026-01-20T16:00:00Z",
  },
  {
    id: "comp-003",
    library_id: "lib-001",
    name: "Card",
    html_structure: '<div class="card"><div class="card-header" data-slot="header"></div><div class="card-body" data-slot="body"></div></div>',
    css_styles: ".card { border: 1px solid var(--surface-border); border-radius: var(--radius-lg); background: var(--surface-bg); }",
    props_schema: {
      title: { type: "text", default: "Card Title", label: "Title" },
      subtitle: { type: "text", default: "Card subtitle", label: "Subtitle" },
      show_image: { type: "boolean", default: true, label: "Show Image" },
    },
    created_at: "2025-11-08T10:00:00Z",
    updated_at: "2026-02-05T11:00:00Z",
  },
  {
    id: "comp-004",
    library_id: "lib-001",
    name: "Hero Section",
    html_structure: '<section class="hero"><h1 class="hero-title"><slot name="title">Welcome</slot></h1><p class="hero-subtitle"><slot name="subtitle">Description</slot></p></section>',
    css_styles: ".hero { text-align: center; padding: var(--spacing-xl) var(--spacing-lg); } .hero-title { font-size: 3rem; font-weight: 700; }",
    props_schema: {
      title: { type: "text", default: "Welcome to Acme", label: "Headline" },
      subtitle: { type: "text", default: "Build something amazing.", label: "Subheadline" },
      show_cta: { type: "boolean", default: true, label: "Show CTA" },
      cta_text: { type: "text", default: "Get Started", label: "CTA Text" },
    },
    created_at: "2025-12-10T09:00:00Z",
    updated_at: "2026-02-01T10:00:00Z",
  },
  {
    id: "comp-005",
    library_id: "lib-001",
    name: "Pricing Table",
    html_structure: '<div class="pricing"><div class="pricing-header"><slot name="plan">Pro</slot></div><div class="pricing-body" data-slot="features"></div></div>',
    css_styles: ".pricing { border: 1px solid var(--surface-border); border-radius: var(--radius-lg); padding: var(--spacing-lg); }",
    props_schema: {
      plan_name: { type: "text", default: "Pro Plan", label: "Plan Name" },
      price: { type: "text", default: "$29/mo", label: "Price" },
      show_badge: { type: "boolean", default: false, label: "Show Popular Badge" },
    },
    created_at: "2025-12-15T14:00:00Z",
    updated_at: "2026-01-28T09:00:00Z",
  },
  {
    id: "comp-006",
    library_id: "lib-001",
    name: "Testimonial Block",
    html_structure: '<blockquote class="testimonial"><p class="quote"><slot name="quote">Great product!</slot></p><cite class="author"><slot name="author">Jane Doe</slot></cite></blockquote>',
    css_styles: ".testimonial { padding: var(--spacing-lg); border-left: 4px solid var(--brand-primary); }",
    props_schema: {
      quote: { type: "text", default: "This product changed everything for us.", label: "Quote" },
      author: { type: "text", default: "Jane Doe, CEO", label: "Author" },
      show_avatar: { type: "boolean", default: true, label: "Show Avatar" },
    },
    created_at: "2025-12-18T10:00:00Z",
    updated_at: "2026-01-15T13:00:00Z",
  },
  {
    id: "comp-008",
    library_id: "lib-001",
    name: "Feature Row",
    html_structure: '<section class="feature-row"><div class="feature-text"></div><div class="feature-visual"></div></section>',
    css_styles: ".feature-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl); padding: var(--spacing-xl); align-items: center; }",
    props_schema: {
      step_number: { type: "text", default: "1", label: "Step Number" },
      title: { type: "text", default: "Feature title", label: "Title" },
      description: { type: "text", default: "Feature description goes here.", label: "Description" },
      image_right: { type: "boolean", default: true, label: "Image on Right" },
      show_step: { type: "boolean", default: true, label: "Show Step Number" },
    },
    created_at: "2026-01-10T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "comp-009",
    library_id: "lib-001",
    name: "Stats Section",
    html_structure: '<section class="stats"><div class="stats-grid" data-slot="stats"></div></section>',
    css_styles: ".stats { padding: var(--spacing-xl); background: var(--brand-primary); } .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-lg); }",
    props_schema: {
      stat_1_value: { type: "text", default: "134%", label: "Stat 1 Value" },
      stat_1_label: { type: "text", default: "increase in traffic", label: "Stat 1 Label" },
      stat_2_value: { type: "text", default: "10x", label: "Stat 2 Value" },
      stat_2_label: { type: "text", default: "faster deployments", label: "Stat 2 Label" },
      stat_3_value: { type: "text", default: "99.9%", label: "Stat 3 Value" },
      stat_3_label: { type: "text", default: "uptime guaranteed", label: "Stat 3 Label" },
    },
    created_at: "2026-01-12T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "comp-010",
    library_id: "lib-001",
    name: "CTA Banner",
    html_structure: '<section class="cta-banner"><h2></h2><p></p><button></button></section>',
    css_styles: ".cta-banner { text-align: center; padding: var(--spacing-xl); background: linear-gradient(var(--brand-primary), var(--brand-secondary)); }",
    props_schema: {
      title: { type: "text", default: "Ready to get started?", label: "Headline" },
      subtitle: { type: "text", default: "Join thousands of teams using our platform.", label: "Subtitle" },
      cta_text: { type: "text", default: "Start Free Trial", label: "Button Text" },
      show_secondary_cta: { type: "boolean", default: true, label: "Show Secondary Button" },
    },
    created_at: "2026-01-14T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "comp-011",
    library_id: "lib-001",
    name: "Footer",
    html_structure: '<footer class="footer"><div class="footer-grid"></div><div class="footer-bottom"></div></footer>',
    css_styles: ".footer { padding: var(--spacing-xl); background: var(--text-primary); color: var(--surface-bg); }",
    props_schema: {
      company_name: { type: "text", default: "Acme", label: "Company Name" },
      tagline: { type: "text", default: "Build something amazing.", label: "Tagline" },
      show_social: { type: "boolean", default: true, label: "Show Social Links" },
    },
    created_at: "2026-01-16T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "comp-012",
    library_id: "lib-001",
    name: "Features Grid",
    html_structure: '<section class="features-grid"><div data-slot="features"></div></section>',
    css_styles: ".features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-lg); padding: var(--spacing-xl); }",
    props_schema: {
      title: { type: "text", default: "Why choose us", label: "Section Title" },
      subtitle: { type: "text", default: "Everything you need to scale.", label: "Section Subtitle" },
      card_1_title: { type: "text", default: "Lightning Fast", label: "Card 1 Title" },
      card_1_desc: { type: "text", default: "Deploy globally in seconds with our edge network.", label: "Card 1 Description" },
      card_2_title: { type: "text", default: "Enterprise Security", label: "Card 2 Title" },
      card_2_desc: { type: "text", default: "SOC 2 compliant with end-to-end encryption.", label: "Card 2 Description" },
      card_3_title: { type: "text", default: "Team Collaboration", label: "Card 3 Title" },
      card_3_desc: { type: "text", default: "Real-time editing and review workflows.", label: "Card 3 Description" },
    },
    created_at: "2026-01-18T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
];

export const MOCK_ASSETS: Asset[] = [
  { id: "asset-001", library_id: "lib-001", name: "acme-logo.svg", storage_path: "/assets/logos/acme-logo.svg", folder: "logos", file_type: "image/svg+xml", file_size: 4200, created_at: "2025-11-01T10:00:00Z" },
  { id: "asset-002", library_id: "lib-001", name: "acme-logo-dark.svg", storage_path: "/assets/logos/acme-logo-dark.svg", folder: "logos", file_type: "image/svg+xml", file_size: 4500, created_at: "2025-11-01T10:00:00Z" },
  { id: "asset-003", library_id: "lib-001", name: "icon-arrow.svg", storage_path: "/assets/icons/icon-arrow.svg", folder: "icons", file_type: "image/svg+xml", file_size: 800, created_at: "2025-11-02T10:00:00Z" },
  { id: "asset-004", library_id: "lib-001", name: "icon-check.svg", storage_path: "/assets/icons/icon-check.svg", folder: "icons", file_type: "image/svg+xml", file_size: 620, created_at: "2025-11-02T10:00:00Z" },
  { id: "asset-005", library_id: "lib-001", name: "hero-bg.jpg", storage_path: "/assets/images/hero-bg.jpg", folder: "images", file_type: "image/jpeg", file_size: 245000, created_at: "2025-11-10T10:00:00Z" },
  { id: "asset-006", library_id: "lib-001", name: "pattern-dots.png", storage_path: "/assets/patterns/pattern-dots.png", folder: "patterns", file_type: "image/png", file_size: 18000, created_at: "2025-12-12T10:00:00Z" },
];

export function getLibraryById(id: string): Library | undefined {
  return MOCK_LIBRARIES.find((lib) => lib.id === id);
}

export function getSiteById(id: string): Site | undefined {
  return MOCK_SITES.find((site) => site.id === id);
}

export function getVariablesByLibrary(libraryId: string): Variable[] {
  return MOCK_VARIABLES.filter((v) => v.library_id === libraryId);
}

export function getComponentsByLibrary(libraryId: string): DesignComponent[] {
  return MOCK_COMPONENTS.filter((c) => c.library_id === libraryId);
}

export function getAssetsByLibrary(libraryId: string): Asset[] {
  return MOCK_ASSETS.filter((a) => a.library_id === libraryId);
}

export function getInstallationsByLibrary(libraryId: string): LibraryInstallation[] {
  return MOCK_INSTALLATIONS.filter((i) => i.library_id === libraryId);
}

export function getInstallationsBySite(siteId: string): LibraryInstallation[] {
  return MOCK_INSTALLATIONS.filter((i) => i.consumer_site_id === siteId);
}

export function getSourceSiteForLibrary(libraryId: string): Site | undefined {
  const lib = getLibraryById(libraryId);
  if (!lib) return undefined;
  return getSiteById(lib.source_site_id);
}

export function getComponentById(id: string): DesignComponent | undefined {
  return MOCK_COMPONENTS.find((c) => c.id === id);
}

export interface SectionInstance {
  instanceId: string;
  componentId: string;
  propOverrides: Record<string, string | boolean>;
}

export type SitePageLayout = SectionInstance[];

export const MOCK_SITE_LAYOUTS: Record<string, SitePageLayout> = {
  "site-002": [
    {
      instanceId: "sec-mkt-01",
      componentId: "comp-002",
      propOverrides: { logo_text: "Acme", show_cta: true },
    },
    {
      instanceId: "sec-mkt-02",
      componentId: "comp-004",
      propOverrides: {
        title: "Ship faster with Acme",
        subtitle: "The all-in-one platform for modern teams. Build, deploy, and scale your products with confidence.",
        show_cta: true,
        cta_text: "Start Free Trial",
      },
    },
    {
      instanceId: "sec-mkt-03",
      componentId: "comp-008",
      propOverrides: {
        step_number: "1",
        title: "Attract more leads with omnichannel campaigns",
        description: "Create, publish, and measure marketing campaigns across social, email, and ads — all from one centralized workspace. Drive awareness with tools that meet your audience where they are.",
        image_right: true,
        show_step: true,
      },
    },
    {
      instanceId: "sec-mkt-04",
      componentId: "comp-008",
      propOverrides: {
        step_number: "2",
        title: "Convert visitors into qualified leads",
        description: "Personalized experiences create brand loyalty. Use smart forms, contextual CTAs, and dynamic content to capture high-quality leads that convert into customers.",
        image_right: false,
        show_step: true,
      },
    },
    {
      instanceId: "sec-mkt-05",
      componentId: "comp-008",
      propOverrides: {
        step_number: "3",
        title: "Maximize your impact with analytics",
        description: "Visualize metrics like contacts generated, budget allocation, and ROI effortlessly. Use advancement reporting to map the customer journey and optimize every touchpoint.",
        image_right: true,
        show_step: true,
      },
    },
    {
      instanceId: "sec-mkt-06",
      componentId: "comp-009",
      propOverrides: {
        stat_1_value: "134%",
        stat_1_label: "increase in website traffic in 12 months",
        stat_2_value: "10x",
        stat_2_label: "faster deployment times",
        stat_3_value: "99.9%",
        stat_3_label: "uptime guaranteed",
      },
    },
    {
      instanceId: "sec-mkt-07",
      componentId: "comp-012",
      propOverrides: {
        title: "Why teams choose Acme",
        subtitle: "Everything you need to build, deploy, and scale — without the complexity.",
        card_1_title: "Lightning Fast",
        card_1_desc: "Deploy globally in seconds with our edge network and automatic CDN distribution.",
        card_2_title: "Enterprise Security",
        card_2_desc: "SOC 2 compliant with end-to-end encryption and role-based access controls.",
        card_3_title: "Team Collaboration",
        card_3_desc: "Real-time editing, branching, and review workflows built for modern teams.",
      },
    },
    {
      instanceId: "sec-mkt-08",
      componentId: "comp-006",
      propOverrides: {
        quote: "Acme cut our deployment time from hours to minutes. Our engineering team couldn't be happier with the results.",
        author: "Sarah Chen, CTO at Velocity",
        show_avatar: true,
      },
    },
    {
      instanceId: "sec-mkt-09",
      componentId: "comp-010",
      propOverrides: {
        title: "Ready to grow your business?",
        subtitle: "Join 10,000+ teams already using Acme to attract, convert, and retain customers.",
        cta_text: "Start Free Trial",
        show_secondary_cta: true,
      },
    },
    {
      instanceId: "sec-mkt-10",
      componentId: "comp-011",
      propOverrides: { company_name: "Acme", tagline: "The all-in-one platform for modern teams.", show_social: true },
    },
  ],

  "site-003": [
    {
      instanceId: "sec-sup-01",
      componentId: "comp-002",
      propOverrides: { logo_text: "Acme Support", show_cta: false },
    },
    {
      instanceId: "sec-sup-02",
      componentId: "comp-004",
      propOverrides: {
        title: "How can we help?",
        subtitle: "Search our knowledge base or browse common topics below to find the answers you need.",
        show_cta: true,
        cta_text: "Search Docs",
      },
    },
    {
      instanceId: "sec-sup-03",
      componentId: "comp-012",
      propOverrides: {
        title: "Browse by topic",
        subtitle: "Find guides, tutorials, and documentation for every feature.",
        card_1_title: "Getting Started",
        card_1_desc: "Quick-start guides, onboarding tutorials, and first-steps documentation to get you up and running.",
        card_2_title: "Account & Billing",
        card_2_desc: "Manage your subscription, update payment methods, view invoices, and configure team settings.",
        card_3_title: "API Reference",
        card_3_desc: "Complete REST API docs, SDKs, webhooks, and integration guides for developers.",
      },
    },
    {
      instanceId: "sec-sup-04",
      componentId: "comp-008",
      propOverrides: {
        step_number: "1",
        title: "Submit a support request",
        description: "Can't find what you're looking for? Our support team is available 24/7 via live chat, email, or phone. Most tickets are resolved within 4 hours.",
        image_right: true,
        show_step: false,
      },
    },
    {
      instanceId: "sec-sup-05",
      componentId: "comp-009",
      propOverrides: {
        stat_1_value: "< 4hr",
        stat_1_label: "average response time",
        stat_2_value: "98%",
        stat_2_label: "customer satisfaction",
        stat_3_value: "24/7",
        stat_3_label: "support availability",
      },
    },
    {
      instanceId: "sec-sup-06",
      componentId: "comp-010",
      propOverrides: {
        title: "Still need help?",
        subtitle: "Our team is here to assist you with any questions or issues.",
        cta_text: "Open a Ticket",
        show_secondary_cta: true,
      },
    },
    {
      instanceId: "sec-sup-07",
      componentId: "comp-011",
      propOverrides: { company_name: "Acme", tagline: "Support that scales with you.", show_social: false },
    },
  ],

  "site-004": [
    {
      instanceId: "sec-blog-01",
      componentId: "comp-002",
      propOverrides: { logo_text: "Acme Blog", show_cta: true },
    },
    {
      instanceId: "sec-blog-02",
      componentId: "comp-004",
      propOverrides: {
        title: "Insights & Updates",
        subtitle: "Engineering deep-dives, product news, and design thinking from the Acme team.",
        show_cta: false,
        cta_text: "Subscribe",
      },
    },
    {
      instanceId: "sec-blog-03",
      componentId: "comp-012",
      propOverrides: {
        title: "Latest articles",
        subtitle: "Stay up to date with the latest from our engineering and design teams.",
        card_1_title: "Introducing Acme v5",
        card_1_desc: "A look at our biggest release yet — redesigned dashboard, new API, and 3x faster builds.",
        card_2_title: "Design Systems at Scale",
        card_2_desc: "How our team manages shared libraries across 30+ consumer sites without breaking things.",
        card_3_title: "The Future of CSS Tokens",
        card_3_desc: "Why design tokens are replacing hardcoded values — and how to migrate your existing codebase.",
      },
    },
    {
      instanceId: "sec-blog-04",
      componentId: "comp-008",
      propOverrides: {
        step_number: "1",
        title: "Subscribe to our newsletter",
        description: "Get the latest articles, product updates, and engineering insights delivered straight to your inbox every week. No spam, unsubscribe anytime.",
        image_right: false,
        show_step: false,
      },
    },
    {
      instanceId: "sec-blog-05",
      componentId: "comp-006",
      propOverrides: {
        quote: "The Acme blog is my go-to resource for staying current on design systems and frontend architecture. Highly recommended.",
        author: "Marcus Williams, VP Design at Outline",
        show_avatar: true,
      },
    },
    {
      instanceId: "sec-blog-06",
      componentId: "comp-010",
      propOverrides: {
        title: "Never miss an update",
        subtitle: "Join 5,000+ developers and designers who read our newsletter.",
        cta_text: "Subscribe Now",
        show_secondary_cta: false,
      },
    },
    {
      instanceId: "sec-blog-07",
      componentId: "comp-011",
      propOverrides: { company_name: "Acme", tagline: "Engineering and design insights.", show_social: true },
    },
  ],
};

export function getSiteLayout(siteId: string): SitePageLayout {
  return MOCK_SITE_LAYOUTS[siteId] || [];
}
