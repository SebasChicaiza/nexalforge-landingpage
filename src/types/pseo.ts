export interface IndustryGrammar {
  display_name: string;
  gender: "m" | "f";
  number: "s" | "p";
  article_def: string;
  preposition_phrase: string;
}

export interface UseCaseGrammar {
  display_name: string;
  gender: "m" | "f";
  number: "s" | "p";
  article_def: string;
}

export interface IndustryMetrics {
  time_saved: string;
  cost_reduction: string;
  revenue_impact: string;
  satisfaction_rate: string;
  default_tasks_per_month: number;
  default_minutes_per_task: number;
  default_hourly_cost: number;
}

export interface BeforeAfterRow {
  dimension: string;
  before: string;
  after: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
  icon_name: string;
}

export interface MicroTestimonial {
  quote: string;
  author_name: string;
  author_role: string;
  company: string;
  city?: string;
}

export interface IntegrationItem {
  name: string;
  description: string;
  icon_name: string;
}

export interface RelatedPage {
  industry_slug: string;
  use_case_slug: string;
  link_text: string;
}

export interface PSEOPageData {
  industry_slug: string;
  use_case_slug: string;
  title: string;
  description: string;
  hero_title: string;
  hero_subtitle: string;
  pain_points: string[];
  benefits: string[];
  industry_grammar: IndustryGrammar;
  use_case_grammar: UseCaseGrammar;
  target_keywords: string[];
  metrics: IndustryMetrics;
  before_after: BeforeAfterRow[];
  how_it_works: HowItWorksStep[];
  faqs: FaqItem[];
  testimonials: MicroTestimonial[];
  integrations: IntegrationItem[];
  related_pages: RelatedPage[];
  cta_primary_text: string;
  cta_whatsapp_text: string;
}
