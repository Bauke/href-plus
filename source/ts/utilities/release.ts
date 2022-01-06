import RelationLink from './relation-link.js';

type ApiReleaseData = {
  'artist-credit': Array<{
    name: string;
    joinphrase: string;
  }>;
  'cover-art-archive': {
    front: boolean;
  };
  id: string;
  relations: Array<{
    url: {
      resource: string;
    };
  }>;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IRelease {
  artist: string;
  image: string | undefined;
  links: RelationLink[];
  title: string;
}

export default interface Release extends IRelease {}

export default class Release {
  public static async fromMbid(mbid: string): Promise<Release> {
    const apiResponse = await window.fetch(this.apiUrl(mbid), {
      headers: {
        accept: 'application/json',
        'user-agent': hrefPlusUserAgent,
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`No release found with MBID ${mbid}`);
    }

    const data = (await apiResponse.json()) as ApiReleaseData;

    const artist = data['artist-credit']
      .map(({name, joinphrase}) => `${name}${joinphrase}`)
      .join('');

    const image = data['cover-art-archive'].front
      ? `https://coverartarchive.org/release/${mbid}/front-500`
      : undefined;

    const links = data.relations
      .map(({url}) => new RelationLink(url.resource))
      .sort((a, b) => a.text.localeCompare(b.text));

    return new Release({
      artist,
      image,
      links,
      title: data.title,
    });
  }

  private static apiUrl(mbid: string): string {
    const root = 'https://musicbrainz.org/ws/2';
    return `${root}/release/${mbid}?inc=artists+url-rels`;
  }

  constructor(release: IRelease) {
    Object.assign(this, release, {});
  }

  public display(): string {
    return `${this.artist} - ${this.title}`;
  }
}
