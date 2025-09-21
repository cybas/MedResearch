export type SourceType = 'Journal' | 'Domain' | 'Author' | 'Feed' | 'Trials';
export type SourceStatus = 'Active' | 'Paused';
export type SourceHealth = 'OK' | 'Warning' | 'Error';
export type SourceMethod = 'API' | 'Crawler';
export type CrawlSchedule = 'Realtime' | 'Hourly' | 'Daily' | 'Weekly' | 'Paused';
export type AuthMethod = 'None' | 'Login' | 'API Key';

export type Source = {
  id: string;
  name: string;
  logo: string;
  type: SourceType;
  scope: string[];
  method: SourceMethod;
  schedule: CrawlSchedule;
  lastFetch: string;
  items7d: number;
  health: SourceHealth;
  status: SourceStatus;
  auth: AuthMethod;
};

export const sources: Source[] = [
    {
        id: 'src-1',
        name: 'NEJM',
        logo: 'https://picsum.photos/seed/nejm-logo/24/24',
        type: 'Journal',
        scope: ['Oncology'],
        method: 'API',
        schedule: 'Daily',
        lastFetch: '3h ago',
        items7d: 18,
        health: 'OK',
        status: 'Active',
        auth: 'None',
    },
    {
        id: 'src-2',
        name: 'The Lancet',
        logo: 'https://picsum.photos/seed/lancet-logo/24/24',
        type: 'Journal',
        scope: ['Oncology'],
        method: 'Crawler',
        schedule: 'Daily',
        lastFetch: '5h ago',
        items7d: 22,
        health: 'OK',
        status: 'Active',
        auth: 'None',
    },
    {
        id: 'src-3',
        name: 'PubMed',
        logo: 'https://picsum.photos/seed/pubmed-logo/24/24',
        type: 'Journal',
        scope: ['All'],
        method: 'API',
        schedule: 'Hourly',
        lastFetch: '12m ago',
        items7d: 140,
        health: 'OK',
        status: 'Active',
        auth: 'API Key',
    },
    {
        id: 'src-4',
        name: 'ClinicalTrials.gov',
        logo: 'https://picsum.photos/seed/ct-logo/24/24',
        type: 'Trials',
        scope: ['Clinical Trials'],
        method: 'API',
        schedule: 'Daily',
        lastFetch: '1h ago',
        items7d: 45,
        health: 'OK',
        status: 'Active',
        auth: 'None',
    },
    {
        id: 'src-5',
        name: 'nature.com',
        logo: 'https://picsum.photos/seed/nature-logo/24/24',
        type: 'Domain',
        scope: ['All'],
        method: 'Crawler',
        schedule: 'Daily',
        lastFetch: '2h ago',
        items7d: 30,
        health: 'Warning',
        status: 'Active',
        auth: 'None',
    },
    {
        id: 'src-6',
        name: 'dr-anita-rao',
        logo: 'https://picsum.photos/seed/user-avatar/24/24',
        type: 'Author',
        scope: ['All'],
        method: 'Crawler',
        schedule: 'Weekly',
        lastFetch: '3d ago',
        items7d: 2,
        health: 'OK',
        status: 'Active',
        auth: 'None',
    },
    {
        id: 'src-7',
        name: 'acmepharma.com/blog',
        logo: 'https://picsum.photos/seed/acme-logo/24/24',
        type: 'Domain',
        scope: ['All'],
        method: 'Crawler',
        schedule: 'Weekly',
        lastFetch: '6d ago',
        items7d: 4,
        health: 'OK',
        status: 'Paused',
        auth: 'None',
    },
];

export const crawlHealthData = {
    kpis: [
        { name: 'Success rate (7d)', value: '96%' },
        { name: 'Avg items/day', value: '38' },
        { name: 'Avg parse time', value: '420 ms' },
        { name: 'Dedup rate', value: '31%' },
    ],
    chartData: [
        { date: '2024-07-01', API: 15, Crawler: 25 },
        { date: '2024-07-02', API: 18, Crawler: 22 },
        { date: '2024-07-03', API: 20, Crawler: 30 },
        { date: '2024-07-04', API: 22, Crawler: 28 },
        { date: '2024-07-05', API: 25, Crawler: 26 },
        { date: '2024-07-06', API: 23, Crawler: 32 },
        { date: '2024-07-07', API: 28, Crawler: 35 },
        { date: '2024-07-08', API: 30, Crawler: 33 },
        { date: '2024-07-09', API: 29, Crawler: 38 },
        { date: '2024-07-10', API: 32, Crawler: 36 },
        { date: '2024-07-11', API: 35, Crawler: 34 },
        { date: '2024-07-12', API: 33, Crawler: 40 },
        { date: '2024-07-13', API: 38, Crawler: 38 },
        { date: '2024-07-14', API: 40, Crawler: 37 },
    ],
};

export const recentErrorsData = [
    { id: 'err-1', code: '403 Forbidden (Paywall)', source: 'NEJM', time: '2h ago' },
    { id: 'err-2', code: 'Timeout', source: 'nature.com', time: '5h ago' },
    { id: 'err-3', code: '429 Rate Limited', source: 'PubMed API', time: '1d ago' },
    { id: 'err-4', code: 'Parser Error', source: 'The Lancet', time: '2d ago' },
    { id: 'err-5', code: '404 Not Found', source: 'acmepharma.com', time: '3d ago' },
];
