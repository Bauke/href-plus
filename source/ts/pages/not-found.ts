import {Component, html} from 'htm/preact';

import SharedFooter from '../components/shared-footer.js';

export default class NotFoundPage extends Component {
  render() {
    document.title = 'Page Not Found';

    return html`
      <div class="not-found-page">
        <main>
          <h1>Page Not Found</h1>
          <a href="/">← Home</a>
        </main>

        <${SharedFooter} page="not-found" />
      </div>
    `;
  }
}
