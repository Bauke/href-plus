import {Component, html} from 'htm/preact';

import ExternalAnchor from '../components/external-anchor.js';
import SearchBar from '../components/search-bar.js';
import SharedFooter from '../components/shared-footer.js';

export default class HomePage extends Component {
  render() {
    document.title = 'href+';

    const links = {
      contribute: html`
        <${ExternalAnchor}
          text="anyone can do"
          url="https://musicbrainz.org/doc/How_to_Contribute"
        />
      `,
      musicbrainz: html`
        <${ExternalAnchor}
          text="MusicBrainz database"
          url="https://musicbrainz.org"
        />
      `,
      mbid: html`
        <${ExternalAnchor}
          text="MusicBrainz Identifier (mbid)"
          url="https://musicbrainz.org/doc/MusicBrainz_Identifier"
        />
      `,
    };

    return html`
      <div class="home-page">
        <header>
          <h1>href+</h1>
        </header>

        <main>
          <${SearchBar} />

          <div class="explainer">
            <h2>What is this all about?</h2>

            <p>
              href+ is a website that hopes to make sharing links to music
              easier. By using the data from the ${links.musicbrainz} (an open
              encyclopedia for music metadata) we can provide an easy way to
              share a single link to all the platforms a song or album is
              available on, as long as someone has added those platforms to
              MusicBrainz, which ${links.contribute}.
            </p>

            <p>
              To share a link you can either use the search bar above and find
              what you're looking for, or if you have a ${links.mbid} from
              somewhere else already, head to${' '}
              <code>${location.host}/release/${'<mbid>'}</code> directly.
            </p>
          </div>
        </main>

        <${SharedFooter} />
      </div>
    `;
  }
}
