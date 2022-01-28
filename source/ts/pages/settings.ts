import {Component, html} from 'htm/preact';

import ExternalAnchor from '../components/external-anchor.js';
import SharedFooter from '../components/shared-footer.js';
import {
  defaultTheme,
  getThemeByCssClass,
  setTheme,
  themes,
} from '../utilities/themes.js';

type Props = Record<string, unknown>;

type State = {
  selectedTheme: string;
};

export default class SettingsPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTheme:
        window.localStorage.getItem('theme') ?? defaultTheme.cssClass,
    };
  }

  onThemeChange = (event: Event) => {
    const theme = getThemeByCssClass((event.target as HTMLSelectElement).value);
    setTheme(theme);
    this.setState({selectedTheme: theme.cssClass});
  };

  render() {
    document.title = 'Settings';

    const {selectedTheme} = this.state;
    const themeOptions = themes.map(
      (theme) => html`<option value=${theme.cssClass}>${theme.name}</option>`,
    );

    const moreThemesLink = html`
      <${ExternalAnchor}
        text="more themes issue"
        url="https://github.com/Bauke/href-plus/issues/17"
      />
    `;

    return html`
      <div class="settings-page">
        <header>
          <h1>Settings</h1>
        </header>

        <section class="setting">
          <h2>Theme</h2>

          <select value=${selectedTheme} onChange=${this.onThemeChange}>
            ${themeOptions}
          </select>

          <p>
            If your favorite theme isn't in the list here, please make a request
            for it in the ${moreThemesLink}!
          </p>
        </section>

        <${SharedFooter} page="settings" />
      </div>
    `;
  }
}
