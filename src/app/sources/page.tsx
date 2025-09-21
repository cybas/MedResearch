import SourcesView from './view';

export default function SourcesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const get = (k: string, d = '') =>
    (Array.isArray(searchParams[k]) ? search-params[k]?.[0] : searchParams[k]) ?? d;

  const seed = {
    drawer: get('drawer'),
    id: get('id'),
  };

  return <SourcesView drawer={seed.drawer} sourceId={seed.id} />;
}
