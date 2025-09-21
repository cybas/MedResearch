import MemoryView from './view';

export default function MemoryPage({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const get = (k: string, d = '') =>
    (Array.isArray(searchParams[k]) ? searchParams[k]?.[0] : searchParams[k]) ?? d;

  const seed = {
    q: get('q'),
    collections: get('collections', 'All'),
    tags: get('tags', ''),
    type: get('type', 'all'),
    access: get('access', 'all'),
    sort: get('sort', 'recent'),
    page: Number(get('page', '1')),
    drawer: get('drawer', ''),
    id: get('id', ''),
    compare: get('compare', ''),
  };

  return <MemoryView seed={seed} />;
}
