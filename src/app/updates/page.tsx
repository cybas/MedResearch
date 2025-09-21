import UpdatesView from './view';

export default function UpdatesPage({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const get = (k: string, d = '') =>
    (Array.isArray(searchParams[k]) ? searchParams[k]?.[0] : searchParams[k]) ?? d;

  const seed = {
    q: get('q'),
    timeframe: get('timeframe', '7d'),
    type: get('type', 'all'),
    access: get('access', 'all'),
    keywords: get('keywords', ''),
    sources: get('sources', ''),
    sort: get('sort', 'relevance'),
    page: Number(get('page', '1')),
  };

  return <UpdatesView seed={seed} />;
}
