// Because the MusicBrainz API doesn't return a name or label for a link, like
// for example {"name": "Bandcamp", "url": "https://bandcamp.com/..."}, we have
// to figure out a name for each link. So all the known links are simply saved
// in a JSON file where we have a regular expression to test for and a
// replacement name to use instead. And whenever a link isn't matched to any we
// can just use the host name of the URL like "bandcamp.com".

import knownLinks from './known-links.json';

type KnownLink = {
  icon: string | undefined;
  regex: RegExp;
  text: string;
};

const known: KnownLink[] = knownLinks.map((data: Record<string, unknown>) => ({
  icon: data.icon as string | undefined,
  regex: new RegExp(data.regex as string),
  text: data.text as string,
}));

export default class RelationLink {
  public readonly icon: string | undefined;
  public readonly isKnown: boolean;
  public readonly link: URL;
  public readonly original: string;
  public readonly text: string;

  constructor(relationUrl: string) {
    this.original = relationUrl;
    this.link = new URL(relationUrl);

    const knownLink = known.find(({regex}) => regex.test(this.link.host));
    this.icon = knownLink?.icon;
    this.isKnown = knownLink !== undefined;
    this.text = knownLink?.text ?? this.link.host;
  }
}
