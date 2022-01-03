type ApiSearchData = {
  releases: Array<{
    'artist-credit': Array<{
      joinphrase?: string;
      name: string;
    }>;
    disambiguation?: string;
    id: string;
    title: string;
  }>;
};

export type SearchResult = {
  artist: string;
  disambiguation?: string;
  id: string;
  title: string;
};

export default async function searchReleases(
  query: string,
): Promise<SearchResult[]> {
  query = encodeURIComponent(query);
  const url = `https://musicbrainz.org/ws/2/release?query=${query}`;
  const response = await window.fetch(url, {
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Search API returned ${response.status}`);
  }

  const data = (await response.json()) as ApiSearchData;
  const results: SearchResult[] = [];

  for (const release of data.releases) {
    const artist = release['artist-credit']
      .map(({name, joinphrase}) => `${name}${joinphrase ?? ''}`)
      .join('');

    results.push({
      artist,
      disambiguation: release.disambiguation,
      id: release.id,
      title: release.title,
    });
  }

  return results;
}
