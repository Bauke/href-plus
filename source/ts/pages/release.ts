import {Component, html} from 'htm/preact';

import ExternalAnchor from '../components/external-anchor.js';
import Release from '../utilities/release.js';

type Props = {
  mbid: string;
};

type State = {
  loading: 'calling-api' | 'invalid-id' | 'unknown-release' | 'finished';
  release: Release | undefined;
};

export default class ReleasePage extends Component<Props, State> {
  constructor(props: Props) {
    props.mbid = encodeURIComponent(props.mbid);

    super(props);

    this.state = {
      loading: 'calling-api',
      release: undefined,
    };
  }

  validateMbid(mbid: string): boolean {
    return mbid.length === 36 && mbid.split('-').length === 5;
  }

  async componentDidMount() {
    const {mbid} = this.props;

    if (!this.validateMbid(mbid)) {
      this.setState({loading: 'invalid-id'});
      return;
    }

    try {
      this.setState({
        loading: 'finished',
        release: await Release.fromMbid(mbid),
      });
    } catch (error: unknown) {
      console.error(error);
      this.setState({loading: 'unknown-release'});
    }
  }

  render() {
    const {mbid} = this.props;
    const {loading, release} = this.state;

    if (loading === 'calling-api') {
      return html`Loading MBID: ${mbid}`;
    }

    if (loading === 'invalid-id') {
      return html`Invalid MBID: ${mbid}`;
    }

    if (loading === 'unknown-release') {
      return html`No release found with MBID: ${mbid}`;
    }

    if (loading === 'finished' && release !== undefined) {
      document.title = release.display();

      const image =
        release.image === undefined
          ? undefined
          : html`<img class="cover-art" src="${release.image}" />`;

      const urls = release.links.map((link) => {
        let linkImage;
        if (link.icon !== undefined) {
          linkImage = html`<img src="/assets/icons/${link.icon}" />`;
        }

        return html`
          <li class="release-link">
            <a href="${link.original}" rel="noopener noreferrer">
              ${linkImage} ${link.text}
            </a>
          </li>
        `;
      });

      const releaseUrl = `https://musicbrainz.org/release/${mbid}`;
      if (urls.length === 0) {
        const editUrl = `${releaseUrl}/edit`;
        urls.push(
          html`
            <li class="no-links">
              <p>
                There are no links for this release yet, consider${' '}
                <${ExternalAnchor} url="${editUrl}" text="adding some" />?
              </p>
            </li>
          `,
        );
      } else {
        urls.push(
          html`<li class="divider"></li>`,
          html`
            <li class="release-link">
              <${ExternalAnchor} url="${releaseUrl}" text="MusicBrainz" />
            </li>
          `,
        );
      }

      return html`
        <div class="release">
          <header class="release-header">
            ${image}
            <h1>${release.artist}<br />${release.title}</h1>
          </header>

          <main class="release-main">
            <ul class="release-links">
              ${urls}
            </ul>
          </main>
        </div>
      `;
    }
  }
}
