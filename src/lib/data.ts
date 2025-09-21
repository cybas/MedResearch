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
    title:string;
    source: {
        name: string;
        logoUrl: string;
        logoHint: string;
    };
    savedDate: string;
    summary: string;
    access: 'Free' | 'Paywalled';
    tags?: string[];
    isPinned?: boolean;
    isHighlighted?: boolean;
    hasNotes?: boolean;
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
        title: 'Nanopolymer Carriers Improve Delivery of Doxorubicin in Solid Tumors',
        source: { name: 'NEJM', logoUrl: 'https://picsum.photos/seed/nejm-logo/24/24', logoHint: 'letter N' },
        savedDate: '3d ago',
        access: 'Free',
        summary: 'A randomized Phase II study reports that amphiphilic nanopolymers enhanced intratumoral drug concentration by 35% versus liposomal formulations, with comparable safety profiles...',
        tags: ['Polymer Drug Delivery', 'Oncology', 'Phase II'],
        isPinned: true,
        hasNotes: true,
    },
    {
        id: 'mem2',
        title: 'PEG-PLA Nanoparticle Doxorubicin vs Standard of Care (NCT0123456)',
        source: { name: 'ClinicalTrials.gov', logoUrl: 'https://picsum.photos/seed/ct-logo/24/24', logoHint: 'letter C' },
        savedDate: '1d ago',
        access: 'Free',
        summary: 'Primary endpoint is PFS at 6 months; secondary endpoints include ORR and cardiotoxicity. Enrollment 240; sites across US/EU...',
        tags: ['Clinical Trial', 'Breast Cancer', 'Doxorubicin'],
        hasNotes: true,
    },
    {
        id: 'mem3',
        title: 'CAR-T therapy persistence via scaffold in pancreatic cancer',
        source: { name: 'The Lancet', logoUrl: 'https://picsum.photos/seed/lancet-logo/24/24', logoHint: 'letter L' },
        savedDate: '5d ago',
        access: 'Paywalled',
        summary: 'Preclinical data suggest scaffold-assisted CAR-T persistence improves tumor infiltration...',
        tags: ['Oncology', 'CAR-T', 'Preclinical'],
    },
     {
        id: 'mem4',
        title: 'Biodegradable Polymers for Targeted Oncology: A 2024 Review',
        source: { name: 'PubMed', logoUrl: 'https://picsum.photos/seed/pubmed-logo/24/24', logoHint: 'letter P' },
        savedDate: '2h ago',
        access: 'Free',
        summary: 'Survey of PLA/PLGA, PEGylation strategies, toxicity profiles, and clinical translation hurdles...',
        tags: ['Review', 'Biodegradable Polymers'],
        isHighlighted: true,
        hasNotes: true,
    },
    {
        id: 'mem5',
        title: 'Self-assembling peptide-polymers for precision drug delivery',
        source: { name: 'nature.com', logoUrl: 'https://picsum.photos/seed/nature-logo/24/24', logoHint: 'letter M' },
        savedDate: '6h ago',
        access: 'Open',
        summary: 'Hybrid peptide–polymer systems demonstrate programmable payload release and improved stability…',
        tags: ['Nanomedicine', 'Polymers'],
    },
    {
        id: 'mem6',
        title: 'PEGylated vs Non-PEGylated Carriers: Comparative Toxicity',
        source: { name: 'Dr Anita Rao', logoUrl: 'https://picsum.photos/seed/user-avatar/24/24', logoHint: 'person' },
        savedDate: '2w ago',
        access: 'Open',
        summary: 'This study compares the long-term toxicity profiles of PEGylated liposomes against newer non-PEGylated alternatives...',
        tags: ['Toxicity', 'PEG', 'Oncology'],
    }
]
