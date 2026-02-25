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
  { id: "var-001", library_id: "lib-001", key: "Primary Color", value_default: "#E46209", value_dark: null, type: "color" },
  { id: "var-002", library_id: "lib-001", key: "Text primary", value_default: "#3A3A37", value_dark: null, type: "color" },
  { id: "var-003", library_id: "lib-001", key: "Text secondary", value_default: "#4B4B4B", value_dark: null, type: "color" },
  { id: "var-004", library_id: "lib-001", key: "Text placeholder", value_default: "#61615E", value_dark: null, type: "color" },
  { id: "var-005", library_id: "lib-001", key: "Background", value_default: "#FFFFFF", value_dark: null, type: "color" },
  { id: "var-006", library_id: "lib-001", key: "Accent background", value_default: "#F8F5EE", value_dark: null, type: "color" },
  { id: "var-007", library_id: "lib-001", key: "Light", value_default: "#FFFFFF", value_dark: null, type: "color" },
  { id: "var-008", library_id: "lib-001", key: "Dark background", value_default: "#1F1F1F", value_dark: null, type: "color" },
  { id: "var-009", library_id: "lib-001", key: "Primary Hover", value_default: "#CA3701", value_dark: null, type: "color" },
  { id: "var-010", library_id: "lib-001", key: "Accent background 2", value_default: "#FCFCFA", value_dark: null, type: "color" },
  { id: "var-011", library_id: "lib-001", key: "Inter", value_default: "Inter", value_dark: null, type: "font" },
  { id: "var-012", library_id: "lib-001", key: "Poppins", value_default: "Poppins", value_dark: null, type: "font" },
  { id: "var-013", library_id: "lib-001", key: "Heading 1", value_default: "48px", value_dark: null, type: "text_style" },
  { id: "var-014", library_id: "lib-001", key: "Heading 2", value_default: "40px", value_dark: null, type: "text_style" },
  { id: "var-015", library_id: "lib-001", key: "Heading 3", value_default: "24px", value_dark: null, type: "text_style" },
  { id: "var-016", library_id: "lib-001", key: "Heading 4", value_default: "18px", value_dark: null, type: "text_style" },
  { id: "var-017", library_id: "lib-001", key: "Heading 5", value_default: "16px", value_dark: null, type: "text_style" },
  { id: "var-018", library_id: "lib-001", key: "Heading 6", value_default: "14px", value_dark: null, type: "text_style" },
  { id: "var-019", library_id: "lib-001", key: "Paragraph 1", value_default: "18px", value_dark: null, type: "text_style" },
  { id: "var-020", library_id: "lib-001", key: "Paragraph 2", value_default: "16px", value_dark: null, type: "text_style" },
  { id: "var-021", library_id: "lib-001", key: "Paragraph 3", value_default: "14px", value_dark: null, type: "text_style" },
  { id: "var-022", library_id: "lib-001", key: "Button border-radius", value_default: "12px", value_dark: null, type: "size" },
  { id: "var-023", library_id: "lib-001", key: "Input border-radius", value_default: "100px", value_dark: null, type: "size" },
  { id: "var-024", library_id: "lib-001", key: "Checkbox border-radius", value_default: "100px", value_dark: null, type: "size" },
  { id: "var-025", library_id: "lib-001", key: "Card border-radius", value_default: "8px", value_dark: null, type: "size" },
  { id: "var-026", library_id: "lib-001", key: "Image border-radius", value_default: "24px", value_dark: null, type: "size" },
];

export const MOCK_COMPONENTS: DesignComponent[] = [
  {
    id: "comp-btn-primary",
    library_id: "lib-001",
    name: "Primary Button",
    html_structure: '<button class="btn-primary"><slot name="text">Get Started</slot></button>',
    css_styles: ".btn-primary { padding: 10px 20px; font-weight: 600; color: #FFFFFF; background: var(--Primary-Color); border-radius: var(--Button-border-radius); font-family: var(--Poppins); } .btn-primary:hover { background: var(--Primary-Hover); }",
    props_schema: {
      button_text: { type: "text", default: "Get Started", label: "Button Text" },
    },
    variants: 3,
    created_at: "2025-11-01T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "comp-002",
    library_id: "lib-001",
    name: "Navigation Bar",
    html_structure: '<nav class="navbar"><div class="nav-logo"><slot name="logo">Logo</slot></div><div class="nav-links" data-slot="nav-content"></div></nav>',
    css_styles: ".navbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; border-bottom: 1px solid #E5E7EB; font-family: var(--Poppins); } .nav-logo { font-family: var(--Inter); } .navbar button { border-radius: var(--Button-border-radius); background: var(--Primary-Color); }",
    props_schema: {
      logo_text: { type: "text", default: "Acme", label: "Logo Text" },
      show_cta: { type: "boolean", default: true, label: "Show CTA Button" },
    },
    variants: 2,
    created_at: "2025-11-06T10:00:00Z",
    updated_at: "2026-01-20T16:00:00Z",
  },
  {
    id: "comp-004",
    library_id: "lib-001",
    name: "Hero Section",
    html_structure: '<section class="hero"><h1 class="hero-title"><slot name="title">Welcome</slot></h1><p class="hero-subtitle"><slot name="subtitle">Description</slot></p></section>',
    css_styles: ".hero { text-align: center; padding: 64px 24px; font-family: var(--Poppins); } .hero-title { font-size: var(--Heading-1); font-weight: 700; font-family: var(--Inter); color: var(--Text-primary); } .hero-subtitle { font-size: var(--Paragraph-1); color: var(--Text-secondary); } .hero button { border-radius: var(--Button-border-radius); background: var(--Primary-Color); }",
    props_schema: {
      title: { type: "text", default: "Welcome to Acme", label: "Headline" },
      subtitle: { type: "text", default: "Build something amazing.", label: "Subheadline" },
      show_cta: { type: "boolean", default: true, label: "Show CTA" },
      cta_text: { type: "text", default: "Get Started", label: "CTA Text" },
    },
    variants: 3,
    created_at: "2025-12-10T09:00:00Z",
    updated_at: "2026-02-01T10:00:00Z",
  },
  {
    id: "comp-008",
    library_id: "lib-001",
    name: "Feature Row",
    html_structure: '<section class="feature-row"><div class="feature-text"></div><div class="feature-visual"></div></section>',
    css_styles: ".feature-row { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 48px; align-items: center; font-family: var(--Poppins); } .feature-text h3 { font-family: var(--Inter); font-size: var(--Heading-3); color: var(--Text-primary); } .feature-text p { font-size: var(--Paragraph-2); color: var(--Text-secondary); } .feature-visual { border-radius: var(--Image-border-radius); }",
    props_schema: {
      step_number: { type: "text", default: "1", label: "Step Number" },
      title: { type: "text", default: "Feature title", label: "Title" },
      description: { type: "text", default: "Feature description goes here.", label: "Description" },
      image_right: { type: "boolean", default: true, label: "Image on Right" },
      show_step: { type: "boolean", default: true, label: "Show Step Number" },
    },
    variants: 2,
    created_at: "2026-01-10T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "comp-009",
    library_id: "lib-001",
    name: "Stats Section",
    html_structure: '<section class="stats"><div class="stats-grid" data-slot="stats"></div></section>',
    css_styles: ".stats { padding: 48px; background: linear-gradient(135deg, var(--Primary-Color), var(--Dark-background)); font-family: var(--Poppins); } .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; } .stats h3 { font-family: var(--Inter); font-size: var(--Heading-1); }",
    props_schema: {
      stat_1_value: { type: "text", default: "134%", label: "Stat 1 Value" },
      stat_1_label: { type: "text", default: "increase in traffic", label: "Stat 1 Label" },
      stat_2_value: { type: "text", default: "10x", label: "Stat 2 Value" },
      stat_2_label: { type: "text", default: "faster deployments", label: "Stat 2 Label" },
      stat_3_value: { type: "text", default: "99.9%", label: "Stat 3 Value" },
      stat_3_label: { type: "text", default: "uptime guaranteed", label: "Stat 3 Label" },
    },
    variants: 2,
    created_at: "2026-01-12T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "comp-010",
    library_id: "lib-001",
    name: "CTA Banner",
    html_structure: '<section class="cta-banner"><h2></h2><p></p><button></button></section>',
    css_styles: ".cta-banner { text-align: center; padding: 64px; background: var(--Accent-background); font-family: var(--Poppins); } .cta-banner h2 { font-family: var(--Inter); font-size: var(--Heading-2); color: var(--Text-primary); } .cta-banner p { font-size: var(--Paragraph-2); color: var(--Text-secondary); } .cta-banner button { border-radius: var(--Button-border-radius); background: var(--Primary-Color); }",
    props_schema: {
      title: { type: "text", default: "Ready to get started?", label: "Headline" },
      subtitle: { type: "text", default: "Join thousands of teams using our platform.", label: "Subtitle" },
      cta_text: { type: "text", default: "Start Free Trial", label: "Button Text" },
      show_secondary_cta: { type: "boolean", default: true, label: "Show Secondary Button" },
    },
    variants: 3,
    created_at: "2026-01-14T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "comp-011",
    library_id: "lib-001",
    name: "Footer",
    html_structure: '<footer class="footer"><div class="footer-grid"></div><div class="footer-bottom"></div></footer>',
    css_styles: ".footer { padding: 48px; background: var(--Dark-background); color: var(--Light); font-family: var(--Poppins); } .footer h4 { font-family: var(--Inter); }",
    props_schema: {
      company_name: { type: "text", default: "Acme", label: "Company Name" },
      tagline: { type: "text", default: "Build something amazing.", label: "Tagline" },
      show_social: { type: "boolean", default: true, label: "Show Social Links" },
    },
    variants: 2,
    created_at: "2026-01-16T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "comp-012",
    library_id: "lib-001",
    name: "Features Grid",
    html_structure: '<section class="features-grid"><div data-slot="features"></div></section>',
    css_styles: ".features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 48px; font-family: var(--Poppins); } .features-grid h3 { font-family: var(--Inter); font-size: var(--Heading-3); color: var(--Text-primary); } .features-grid .card { border-radius: var(--Card-border-radius); } .features-grid p { font-size: var(--Paragraph-3); color: var(--Text-secondary); }",
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
    variants: 3,
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
  isLinked: boolean;
}

export type SitePageLayout = SectionInstance[];

export const MOCK_SITE_LAYOUTS: Record<string, SitePageLayout> = {
  "site-002": [
    {
      instanceId: "sec-mkt-01",
      componentId: "comp-002",
      propOverrides: { logo_text: "Acme", show_cta: true },
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
    },
    {
      instanceId: "sec-mkt-10",
      componentId: "comp-011",
      propOverrides: { company_name: "Acme", tagline: "The all-in-one platform for modern teams.", show_social: true },
      isLinked: true,
    },
  ],

  "site-003": [
    {
      instanceId: "sec-sup-01",
      componentId: "comp-002",
      propOverrides: { logo_text: "Acme Support", show_cta: false },
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
    },
    {
      instanceId: "sec-sup-07",
      componentId: "comp-011",
      propOverrides: { company_name: "Acme", tagline: "Support that scales with you.", show_social: false },
      isLinked: true,
    },
  ],

  "site-004": [
    {
      instanceId: "sec-blog-01",
      componentId: "comp-002",
      propOverrides: { logo_text: "Acme Blog", show_cta: true },
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
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
      isLinked: true,
    },
    {
      instanceId: "sec-blog-07",
      componentId: "comp-011",
      propOverrides: { company_name: "Acme", tagline: "Engineering and design insights.", show_social: true },
      isLinked: true,
    },
  ],
};

export function getSiteLayout(siteId: string): SitePageLayout {
  return MOCK_SITE_LAYOUTS[siteId] || [];
}

export type ElementType = "heading" | "text" | "button" | "image" | "container" | "link" | "badge";

export interface ComponentElement {
  id: string;
  label: string;
  type: ElementType;
  contentBinding: string | null;
  visibilityBinding: string | null;
}

const COMPONENT_ELEMENTS: Record<string, ComponentElement[]> = {
  "comp-btn-primary": [
    { id: "el-btn-pri-text", label: "Button Text", type: "button", contentBinding: "button_text", visibilityBinding: null },
  ],
  "comp-002": [
    { id: "el-nav-logo", label: "Logo Text", type: "heading", contentBinding: "logo_text", visibilityBinding: null },
    { id: "el-nav-products", label: "Nav Link: Products", type: "link", contentBinding: null, visibilityBinding: null },
    { id: "el-nav-solutions", label: "Nav Link: Solutions", type: "link", contentBinding: null, visibilityBinding: null },
    { id: "el-nav-pricing", label: "Nav Link: Pricing", type: "link", contentBinding: null, visibilityBinding: null },
    { id: "el-nav-resources", label: "Nav Link: Resources", type: "link", contentBinding: null, visibilityBinding: null },
    { id: "el-nav-cta", label: "CTA Button", type: "button", contentBinding: null, visibilityBinding: "show_cta" },
  ],
  "comp-004": [
    { id: "el-hero-badge", label: "Badge", type: "badge", contentBinding: null, visibilityBinding: null },
    { id: "el-hero-title", label: "Heading Large", type: "heading", contentBinding: "title", visibilityBinding: null },
    { id: "el-hero-subtitle", label: "Paragraph", type: "text", contentBinding: "subtitle", visibilityBinding: null },
    { id: "el-hero-cta", label: "Primary Button", type: "button", contentBinding: "cta_text", visibilityBinding: "show_cta" },
    { id: "el-hero-secondary", label: "Secondary Button", type: "button", contentBinding: null, visibilityBinding: "show_cta" },
  ],
  "comp-008": [
    { id: "el-feat-step", label: "Step Badge", type: "badge", contentBinding: "step_number", visibilityBinding: "show_step" },
    { id: "el-feat-title", label: "Feature Title", type: "heading", contentBinding: "title", visibilityBinding: null },
    { id: "el-feat-desc", label: "Description", type: "text", contentBinding: "description", visibilityBinding: null },
    { id: "el-feat-link", label: "Learn More Link", type: "link", contentBinding: null, visibilityBinding: null },
    { id: "el-feat-image", label: "Feature Image", type: "image", contentBinding: null, visibilityBinding: null },
  ],
  "comp-009": [
    { id: "el-stat-1-val", label: "Stat 1 Value", type: "heading", contentBinding: "stat_1_value", visibilityBinding: null },
    { id: "el-stat-1-lbl", label: "Stat 1 Label", type: "text", contentBinding: "stat_1_label", visibilityBinding: null },
    { id: "el-stat-2-val", label: "Stat 2 Value", type: "heading", contentBinding: "stat_2_value", visibilityBinding: null },
    { id: "el-stat-2-lbl", label: "Stat 2 Label", type: "text", contentBinding: "stat_2_label", visibilityBinding: null },
    { id: "el-stat-3-val", label: "Stat 3 Value", type: "heading", contentBinding: "stat_3_value", visibilityBinding: null },
    { id: "el-stat-3-lbl", label: "Stat 3 Label", type: "text", contentBinding: "stat_3_label", visibilityBinding: null },
  ],
  "comp-010": [
    { id: "el-cta-title", label: "Headline", type: "heading", contentBinding: "title", visibilityBinding: null },
    { id: "el-cta-subtitle", label: "Subtitle", type: "text", contentBinding: "subtitle", visibilityBinding: null },
    { id: "el-cta-btn", label: "Primary Button", type: "button", contentBinding: "cta_text", visibilityBinding: null },
    { id: "el-cta-secondary", label: "Secondary Button", type: "button", contentBinding: null, visibilityBinding: "show_secondary_cta" },
  ],
  "comp-011": [
    { id: "el-footer-name", label: "Company Name", type: "heading", contentBinding: "company_name", visibilityBinding: null },
    { id: "el-footer-tagline", label: "Tagline", type: "text", contentBinding: "tagline", visibilityBinding: null },
    { id: "el-footer-social", label: "Social Links", type: "container", contentBinding: null, visibilityBinding: "show_social" },
  ],
  "comp-012": [
    { id: "el-grid-title", label: "Section Title", type: "heading", contentBinding: "title", visibilityBinding: null },
    { id: "el-grid-subtitle", label: "Section Subtitle", type: "text", contentBinding: "subtitle", visibilityBinding: null },
    { id: "el-grid-c1-title", label: "Card 1 Title", type: "heading", contentBinding: "card_1_title", visibilityBinding: null },
    { id: "el-grid-c1-desc", label: "Card 1 Description", type: "text", contentBinding: "card_1_desc", visibilityBinding: null },
    { id: "el-grid-c2-title", label: "Card 2 Title", type: "heading", contentBinding: "card_2_title", visibilityBinding: null },
    { id: "el-grid-c2-desc", label: "Card 2 Description", type: "text", contentBinding: "card_2_desc", visibilityBinding: null },
    { id: "el-grid-c3-title", label: "Card 3 Title", type: "heading", contentBinding: "card_3_title", visibilityBinding: null },
    { id: "el-grid-c3-desc", label: "Card 3 Description", type: "text", contentBinding: "card_3_desc", visibilityBinding: null },
  ],
};

export function getComponentElements(componentId: string): ComponentElement[] {
  return COMPONENT_ELEMENTS[componentId] || [];
}
