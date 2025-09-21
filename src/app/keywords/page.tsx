import KeywordsView from './view';

export default function KeywordsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const get = (k: string, d = '') =>
    (Array.isArray(searchParams[k]) ? searchParams[k]?.[0] : searchParams[k]) ?? d;

  const seed = {
    drawer: get('drawer'),
    id: get('id'),
  };

  return <KeywordsView drawer={seed.drawer} keywordId={seed.id} />;
}
