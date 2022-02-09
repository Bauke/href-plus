import {debug} from './debug.js';

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

export const searchLimit = 25;

export default async function searchReleases(
  query: string,
  offset?: number,
): Promise<SearchResult[]> {
  query = encodeURIComponent(query);
  let url = `https://musicbrainz.org/ws/2/release?query=${query}&limit=${searchLimit}`;
  if (offset !== undefined) {
    url += `&offset=${offset}`;
  }

  const response = await window.fetch(url, {
    headers: {
      accept: 'application/json',
      'user-agent': hrefPlusUserAgent,
    },
  });

  if (!response.ok) {
    throw new Error(`Search API returned ${response.status}`);
  }

  const data = (await response.json()) as ApiSearchData;
  debug(data);

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
