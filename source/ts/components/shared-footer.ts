import {Component, html} from 'htm/preact';

import ExternalAnchor from './external-anchor.js';

type Props = {
  page: string;
};

export default class SharedFooter extends Component<Props> {
  render() {
    const {page} = this.props;

    const homeLink =
      page === 'home' || page === 'not-found'
        ? undefined
        : html`<a href="/">Home</a>${' '}`;

    const settingsLink =
      page === 'settings'
        ? undefined
        : html`<a href="/settings">Settings</a>${' '}`;

    const githubUrl = 'https://github.com/Bauke/href-plus';
    const versionText = `v${hrefPlusVersion}/${hrefPlusCommitHash}`;
    const versionUrl = `${githubUrl}/tree/${hrefPlusCommitHash}`;

    return html`
      <footer class="shared-footer">
        ${homeLink}${settingsLink}
        <${ExternalAnchor} text="GitHub" url=${githubUrl} />
        ${' '}
        <${ExternalAnchor} text=${versionText} url=${versionUrl} />
      </footer>
    `;
  }
}
