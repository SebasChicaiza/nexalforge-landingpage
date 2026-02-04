# GROWTH_PLAN.md - Nexal Forge SEO & Growth Strategy

## Executive Summary

This document outlines the organic growth strategy for Nexal Forge / Nexi, focusing on:
1. Programmatic SEO (pSEO) to capture industry-specific keywords
2. Technical SEO fixes to improve Core Web Vitals
3. CRO improvements to increase demo bookings
4. Repositioning Nexi as an "Agentic OS" rather than a chatbot

---

## 1. Programmatic SEO (pSEO) Architecture

### Directory Structure

```
/src/app/soluciones/
├── [industry]/
│   ├── page.tsx              # Industry landing page
│   └── [use-case]/
│       └── page.tsx          # Use-case specific page
/src/data/
└── pSEO.json                 # Data schema for all pages
```

### Target Industries

| Slug | Industry Name | Primary Pain Point |
|------|---------------|-------------------|
| clinicas-medicas | Clínicas Médicas | Secretarias saturadas, citas perdidas |
| despachos-legales | Despachos Legales | Seguimiento manual de casos |
| e-commerce | E-commerce | Soporte al cliente 24/7 |
| inmobiliarias | Inmobiliarias | Coordinación de visitas |
| consultorias | Consultorías | Agenda fragmentada |
| startups | Startups | Recursos limitados para operaciones |

### Target Use Cases

| Slug | Use Case | Target Keyword |
|------|----------|----------------|
| automatizacion-citas | Automatización de Citas | automatizar citas [industry] |
| agente-soporte-whatsapp | Agente de Soporte WhatsApp | chatbot whatsapp [industry] |
| automatizacion-emails | Automatización de Emails | automatizar emails [industry] |
| gestion-agenda-ia | Gestión de Agenda con IA | asistente virtual agenda |

### JSON Data Schema

```json
{
  "slug": "clinicas-medicas/automatizacion-citas",
  "industry_slug": "clinicas-medicas",
  "use_case_slug": "automatizacion-citas",
  "industry_name": "Clínicas Médicas",
  "use_case": "Automatización de Citas",
  "pain_point": "Secretarias saturadas, citas perdidas, pacientes frustrados",
  "agent_capability": "Agendar, confirmar y reagendar citas 24/7 vía WhatsApp",
  "schema_type": "SoftwareApplication",
  "target_keywords": [
    "automatizar citas médicas",
    "ia para consultorio",
    "chatbot para clínicas"
  ],
  "cta_text": "Agendar demo para clínicas",
  "stats": {
    "time_saved": "15h/semana",
    "cost_reduction": "40%",
    "satisfaction_increase": "35%"
  },
  "testimonial": {
    "quote": "",
    "author": "",
    "role": "",
    "company": ""
  }
}
```

---

## 2. Technical Implementation Guide

### Master Template for pSEO Pages

```tsx
// /src/app/soluciones/[industry]/[use-case]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import pSEOData from '@/data/pSEO.json';
import JsonLd from '@/components/JsonLd';

// Types
interface PageParams {
  industry: string;
  'use-case': string;
}

interface PSEOItem {
  slug: string;
  industry_slug: string;
  use_case_slug: string;
  industry_name: string;
  use_case: string;
  pain_point: string;
  agent_capability: string;
  target_keywords: string[];
  cta_text: string;
  stats: {
    time_saved: string;
    cost_reduction: string;
  };
}

// Helper function
function findData(params: PageParams): PSEOItem | undefined {
  return pSEOData.find(
    (item: PSEOItem) =>
      item.industry_slug === params.industry &&
      item.use_case_slug === params['use-case']
  );
}

// Static params generation
export async function generateStaticParams() {
  return pSEOData.map((item: PSEOItem) => ({
    industry: item.industry_slug,
    'use-case': item.use_case_slug,
  }));
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const data = findData(params);
  if (!data) return {};

  const title = `${data.use_case} para ${data.industry_name} | Nexi - Agentic OS`;
  const description = `Automatiza ${data.pain_point.toLowerCase()} con Nexi. ${data.agent_capability}. Ahorra ${data.stats.time_saved} y reduce costos ${data.stats.cost_reduction}.`;

  return {
    title,
    description,
    keywords: data.target_keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_LA',
    },
    alternates: {
      canonical: `https://nexalforge.com/soluciones/${data.slug}`,
    },
  };
}

// Page component
export default function SolucionPage({ params }: { params: PageParams }) {
  const data = findData(params);
  if (!data) notFound();

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nexi - Agentic OS',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: `${data.use_case} para ${data.industry_name}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Demo gratuita disponible',
    },
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      {/* Page sections */}
      <HeroSection data={data} />
      <PainPointSection data={data} />
      <SolutionSection data={data} />
      <ROICalculator industry={data.industry_name} />
      <TestimonialsSection industry={data.industry_slug} />
      <ContactForm source={data.slug} />
    </>
  );
}
```

### SoftwareApplication Schema Template

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Nexi - Agentic OS",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "24"
  },
  "featureList": [
    "Automatización de citas",
    "Soporte WhatsApp 24/7",
    "Gestión de emails",
    "Integración con calendarios"
  ]
}
```

### Article Schema for Blog Posts

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "description": "{{excerpt}}",
  "image": "{{coverImage}}",
  "datePublished": "{{publishDate}}",
  "dateModified": "{{modifiedDate}}",
  "author": {
    "@type": "Organization",
    "name": "Nexal Forge"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nexal Forge",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nexalforge.com/logo.png"
    }
  }
}
```

---

## 3. Conversion Rate Optimization (CRO)

### Change 1: Add Phone Field to ContactForm

**File:** `/src/components/ContactForm.tsx`

**Rationale:** Phone is critical for LATAM demo booking. Sales team needs direct contact method.

```tsx
// Add to form schema
const formSchema = z.object({
  // ... existing fields
  telefono: z.string().min(8, 'Número de teléfono requerido'),
});

// Add input field
<div className="form-group">
  <label htmlFor="telefono">Teléfono / WhatsApp *</label>
  <input
    type="tel"
    id="telefono"
    {...register('telefono')}
    placeholder="+57 300 123 4567"
  />
  {errors.telefono && <span className="error">{errors.telefono.message}</span>}
</div>
```

### Change 2: Add Floating CTA Button for Mobile

**File:** `/src/components/FloatingCTA.tsx` (new)

**Rationale:** Reduces scroll distance to conversion on mobile. Always visible.

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <Link
        href="/contacto"
        className="block w-full bg-primary text-white text-center py-4 rounded-full font-semibold shadow-lg hover:bg-primary-dark transition-colors"
      >
        Agendar Demo Gratis
      </Link>
    </div>
  );
}
```

### Change 3: Reposition "Agentic OS" Messaging in Hero

**File:** `/src/components/HeroText.tsx`

**Current:** "Inteligencia Artificial y automatización para empresas"

**Proposed:** "Nexi: El Sistema Operativo de Agentes IA para tu Empresa"

**Subheadline:** "No es un chatbot. Es un equipo completo de agentes inteligentes que gestionan citas, emails y soporte 24/7."

---

## 4. Prioritized Roadmap

### Week 1: Foundation

| # | Task | Priority | File(s) |
|---|------|----------|---------|
| 1 | Create CLAUDE.md | ✅ Done | `/CLAUDE.md` |
| 2 | Create GROWTH_PLAN.md | ✅ Done | `/GROWTH_PLAN.md` |
| 3 | Add phone field to ContactForm | High | `/src/components/ContactForm.tsx` |
| 4 | Fix blog image optimization | High | `/src/app/blog/[slug]/page.tsx` |

### Week 2: Schema & Technical SEO

| # | Task | Priority | File(s) |
|---|------|----------|---------|
| 5 | Add SoftwareApplication schema | High | `/src/components/JsonLd.tsx` |
| 6 | Add Article schema to blog | High | `/src/app/blog/[slug]/page.tsx` |
| 7 | Implement hreflang tags | Medium | `/src/app/layout.tsx` |
| 8 | Optimize hero images to WebP | High | `/public/images/` |

### Week 3: pSEO Setup

| # | Task | Priority | File(s) |
|---|------|----------|---------|
| 9 | Create pSEO JSON data | High | `/src/data/pSEO.json` |
| 10 | Build dynamic route structure | High | `/src/app/soluciones/[industry]/[use-case]/` |
| 11 | Implement master template | High | `page.tsx` |

### Week 4: Content & CRO

| # | Task | Priority | File(s) |
|---|------|----------|---------|
| 12 | Add FloatingCTA component | Medium | `/src/components/FloatingCTA.tsx` |
| 13 | Rewrite hero messaging | High | `/src/components/HeroText.tsx` |
| 14 | Add customer testimonials | Medium | Various |
| 15 | Launch first 5 pSEO pages | High | `/src/app/soluciones/` |

---

## 5. Target Keywords by Priority

### Tier 1: High Volume (1K-10K monthly)

| Keyword | Volume | Current Rank | Target |
|---------|--------|--------------|--------|
| agentes ia para empresas | 1K-10K | Not ranking | Top 10 |
| automatización de citas | 1K-10K | Not ranking | Top 10 |
| chatbot whatsapp empresas | 1K-10K | Not ranking | Top 10 |

### Tier 2: Medium Volume (500-1K monthly)

| Keyword | Volume | Current Rank | Target |
|---------|--------|--------------|--------|
| automatización secretaria | 500-1K | Not ranking | Top 10 |
| asistente virtual empresas | 500-1K | Not ranking | Top 10 |
| ia para pymes | 500-1K | Not ranking | Top 10 |

### Tier 3: Long-tail (100-500 monthly)

| Keyword | Volume | Intent | Page |
|---------|--------|--------|------|
| automatizar citas médicas | 100-500 | Transactional | /soluciones/clinicas-medicas/automatizacion-citas |
| chatbot para consultorios | 100-500 | Transactional | /soluciones/clinicas-medicas/agente-soporte-whatsapp |
| ia para despachos legales | 100-500 | Transactional | /soluciones/despachos-legales |

---

## 6. Success Metrics

### 30-Day Targets

- [ ] CLAUDE.md and GROWTH_PLAN.md created
- [ ] Phone field added to ContactForm
- [ ] Blog images optimized
- [ ] SoftwareApplication schema implemented

### 60-Day Targets

- [ ] 5 pSEO pages live
- [ ] Floating CTA implemented
- [ ] Hero messaging updated
- [ ] First non-branded keyword in top 50

### 90-Day Targets

- [ ] 24 pSEO pages live (6 industries × 4 use cases)
- [ ] 3x increase in organic impressions
- [ ] First non-branded keyword in top 20
- [ ] Demo bookings increase 25%

---

## 7. Verification Checklist

### After Each Implementation

1. **Schema Testing:** [Google Rich Results Test](https://search.google.com/test/rich-results)
2. **PageSpeed:** Run Lighthouse audit
3. **Mobile Testing:** Test on actual devices
4. **GSC:** Submit updated pages for indexing

### Monthly Review

1. GSC Performance report
2. Keyword ranking tracking
3. Demo booking conversion rate
4. Core Web Vitals scores

---

## Appendix: hreflang Implementation

```tsx
// In /src/app/layout.tsx or page-level
export const metadata: Metadata = {
  alternates: {
    languages: {
      'es': 'https://nexalforge.com',
      'es-CO': 'https://nexalforge.com',
      'es-MX': 'https://nexalforge.com',
      'es-AR': 'https://nexalforge.com',
      'es-CL': 'https://nexalforge.com',
      'es-PE': 'https://nexalforge.com',
    },
  },
};
```

This targets all major LATAM Spanish-speaking markets while using a single domain.
