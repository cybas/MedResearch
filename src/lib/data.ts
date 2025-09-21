export type Article = {
  id: string;
  source: {
    name: string;
    logoUrl: string;
    logoHint: string;
  };
  publishedDate: string;
  access: 'Free' | 'Paywalled';
  title: string;
  summary: string;
  tags: string[];
  trialId?: string;
};

export type SavedMemoryItem = {
    id: string;
    title: string;
    source: {
        name: string;
        logoUrl: string;
        logoHint: string;
    };
    savedDate: string;
    summary: string;
}

export const articles: Article[] = [
  {
    id: '1',
    source: {
      name: 'NEJM',
      logoUrl: 'https://picsum.photos/seed/nejm-logo/24/24',
      logoHint: 'letter N'
    },
    publishedDate: '3d ago',
    access: 'Free',
    title: 'Nanopolymer Carriers Improve Delivery of Doxorubicin in Solid Tumors',
    summary: 'A randomized Phase II study reports that amphiphilic nanopolymers enhanced intratumoral drug concentration by 35% versus liposomal formulations, with comparable safety profiles...',
    tags: ['Polymer Drug Delivery', 'Oncology', 'Phase II'],
  },
  {
    id: '2',
    source: {
      name: 'ClinicalTrials.gov',
      logoUrl: 'https://picsum.photos/seed/ct-logo/24/24',
      logoHint: 'letter C'
    },
    publishedDate: '1d ago',
    access: 'Free',
    title: 'PEG-PLA Nanoparticle Doxorubicin vs Standard of Care in Metastatic Breast Cancer',
    summary: 'Primary endpoint is PFS at 6 months; secondary endpoints include ORR and cardiotoxicity. Enrollment 240; sites across US/EU...',
    tags: ['Clinical Trial', 'Breast Cancer', 'Doxorubicin'],
    trialId: 'NCT0123456',
  },
  {
    id: '3',
    source: {
      name: 'The Lancet',
      logoUrl: 'https://picsum.photos/seed/lancet-logo/24/24',
      logoHint: 'letter L'
    },
    publishedDate: '5d ago',
    access: 'Paywalled',
    title: 'A new CAR-T therapy shows promise in preclinical models of pancreatic cancer',
    summary: 'Researchers developed a novel CAR-T cell targeting a unique glycan on pancreatic tumor cells. In vivo studies showed significant tumor regression and improved survival in mouse models.',
    tags: ['CAR-T', 'Oncology', 'Pancreatic Cancer'],
  },
  {
    id: '4',
    source: {
        name: 'Nature Medicine',
        logoUrl: 'https://picsum.photos/seed/nature-logo/24/24',
        logoHint: 'letter M'
    },
    publishedDate: '1w ago',
    access: 'Free',
    title: 'AI-driven drug discovery pipeline identifies three novel kinase inhibitors for glioblastoma',
    summary: 'Using a combination of genomic screening and a proprietary deep learning model, a team has identified and validated three new compounds that cross the blood-brain barrier and show efficacy against glioblastoma cell lines.',
    tags: ['AI in Medicine', 'Glioblastoma', 'Drug Discovery'],
  }
];

export const savedMemoryItems: SavedMemoryItem[] = [
    {
        id: 'mem1',
        title: 'Biodegradable Polymers for Targeted Oncology (Review, 2024)',
        source: {
            name: 'PubMed',
            logoUrl: 'https://picsum.photos/seed/pubmed-logo/24/24',
            logoHint: 'letter P'
        },
        savedDate: '2w ago',
        summary: 'A comprehensive review on the latest advancements in biodegradable polymeric nanoparticles for cancer therapy...',
    },
    {
        id: 'mem2',
        title: 'Comparative Toxicity: PEGylated vs Non-PEGylated Carriers (2023)',
        source: {
            name: 'NEJM',
            logoUrl: 'https://picsum.photos/seed/nejm-logo/24/24',
            logoHint: 'letter N'
        },
        savedDate: '1mo ago',
        summary: 'This study compares the long-term toxicity profiles of PEGylated liposomes against newer non-PEGylated alternatives...',
    }
]
