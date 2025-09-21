export type KeywordMatch = 'exact' | 'phrase' | 'semantic' | 'boolean';
export type AlertFrequency = 'realtime' | 'daily' | 'weekly';
export type KeywordStatus = 'active' | 'paused';
export type SourceScope = 'all' | 'selected';

export type Keyword = {
  id: string;
  label: string;
  match: KeywordMatch;
  semanticThreshold?: number;
  group: string;
  weight: 1 | 2 | 3 | 4 | 5;
  includePaywalled: boolean;
  sources: string[];
  sourceScope: SourceScope;
  excludeSources: string[];
  synonyms: { term: string; expansions: string; weight: number }[];
  stopwords: string[];
  stats: { matches7d: number; lastFetch: string; };
  status: KeywordStatus;
  language: string[];
  caseSensitive: boolean;
  regexPattern?: string;
  autoTags?: string[];
  alerts: {
    frequency: AlertFrequency;
    threshold: number;
    channels: {
        inApp: boolean;
        email?: string;
        webhook?: string;
    }
  };
};

export const keywords: Keyword[] = [
  {
    id: 'kw-1',
    label: "polymer drug delivery",
    match: 'phrase',
    group: 'Oncology',
    weight: 5,
    includePaywalled: false,
    sources: ['PubMed', 'NEJM'],
    sourceScope: 'selected',
    excludeSources: [],
    synonyms: [],
    stopwords: [],
    stats: { matches7d: 11, lastFetch: '2h ago' },
    status: 'active',
    language: ['English'],
    caseSensitive: false,
    alerts: { frequency: 'daily', threshold: 5, channels: { inApp: true } },
  },
  {
    id: 'kw-2',
    label: 'doxorubicin AND (nanopolymer OR nanoparticle)',
    match: 'boolean',
    group: 'Oncology',
    weight: 4,
    includePaywalled: true,
    sources: [],
    sourceScope: 'all',
    excludeSources: [],
    synonyms: [{ term: 'doxorubicin', expansions: 'adriamycin', weight: 1 }],
    stopwords: [],
    stats: { matches7d: 6, lastFetch: '1d ago' },
    status: 'active',
    language: ['English'],
    caseSensitive: false,
    alerts: { frequency: 'weekly', threshold: 10, channels: { inApp: true, email: 'dr.rao@med.org' } },
  },
  {
    id: 'kw-3',
    label: 'PEG-PLA',
    match: 'exact',
    group: 'Nanopolymers',
    weight: 3,
    includePaywalled: false,
    sources: ['PubMed', 'ClinicalTrials.gov'],
    sourceScope: 'selected',
    excludeSources: [],
    synonyms: [],
    stopwords: [],
    stats: { matches7d: 4, lastFetch: '8h ago' },
    status: 'active',
    language: ['English'],
    caseSensitive: false,
    alerts: { frequency: 'daily', threshold: 3, channels: { inApp: true } },
  },
  {
    id: 'kw-4',
    label: '"CAR-T polymer scaffold"',
    match: 'phrase',
    group: 'Oncology',
    weight: 3,
    includePaywalled: false,
    sources: [],
    sourceScope: 'all',
    excludeSources: [],
    synonyms: [],
    stopwords: [],
    stats: { matches7d: 1, lastFetch: '3d ago' },
    status: 'paused',
    language: ['English'],
    caseSensitive: true,
    alerts: { frequency: 'weekly', threshold: 1, channels: { inApp: true } },
  },
  {
    id: 'kw-5',
    label: 'biodegradable polymer',
    match: 'semantic',
    semanticThreshold: 0.78,
    group: 'Nanopolymers',
    weight: 4,
    includePaywalled: true,
    sources: [],
    sourceScope: 'all',
    excludeSources: ['cosmetic.com'],
    synonyms: [],
    stopwords: ['review', 'overview'],
    stats: { matches7d: 9, lastFetch: '5h ago' },
    status: 'active',
    language: ['English', 'German'],
    caseSensitive: false,
    alerts: { frequency: 'daily', threshold: 5, channels: { inApp: true } },
  },
  {
    id: 'kw-6',
    label: 'NCT0123456',
    match: 'exact',
    group: 'Clinical Trials',
    weight: 5,
    includePaywalled: false,
    sources: ['ClinicalTrials.gov'],
    sourceScope: 'selected',
    excludeSources: [],
    synonyms: [],
    stopwords: [],
    stats: { matches7d: 2, lastFetch: '1h ago' },
    status: 'active',
    language: ['English'],
    caseSensitive: false,
    alerts: { frequency: 'realtime', threshold: 1, channels: { inApp: true } },
  },
];

export const keywordGroups = [
    { 
        name: 'Oncology', 
        count: 12, 
        color: 'bg-blue-500', 
        defaults: { 
            sources: ['PubMed', 'NEJM'], 
            alerts: 'Weekly' 
        } 
    },
    { 
        name: 'Nanopolymers', 
        count: 9, 
        color: 'bg-green-500', 
        defaults: { 
            sources: ['PubMed', 'ClinicalTrials.gov'], 
            alerts: 'Daily' 
        } 
    },
    { 
        name: 'Clinical Trials', 
        count: 7, 
        color: 'bg-purple-500', 
        defaults: { 
            sources: ['ClinicalTrials.gov'], 
            alerts: 'Realtime' 
        } 
    },
];

export const allSources = [
    'PubMed', 'NEJM', 'The Lancet', 'ClinicalTrials.gov', 'Nature Medicine'
];

export const synonymSuggestions = [
    { term: 'doxorubicin', expansion: 'adriamycin' },
    { term: 'polyethylene glycol', expansion: 'PEG' },
    { term: 'paclitaxel', expansion: 'taxol' },
];

export const globalStopwords = ['cosmetic', 'skincare', 'marketing', 'advertisement'];
