import {Component, html} from 'htm/preact';

import ExternalAnchor from '../components/external-anchor.js';
import SharedFooter from '../components/shared-footer.js';
import {isDebugEnabled} from '../utilities/debug.js';
import {
  defaultTheme,
  getThemeByCssClass,
  setTheme,
  themes,
} from '../utilities/themes.js';

type Props = Record<string, unknown>;

type State = {
  debugChecked: boolean;
  selectedTheme: string;
};

export default class SettingsPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      debugChecked: isDebugEnabled(),
      selectedTheme:
        window.localStorage.getItem('theme') ?? defaultTheme.cssClass,
    };
  }

  onDebugChange = (event: Event) => {
    const checked = (event.target as HTMLInputElement).checked;
    window.localStorage.setItem('debug', checked.toString());
  };

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

        <section class="setting">
          <h2>Debug</h2>

          <input
            checked=${this.state.debugChecked}
            id="debug-checkbox"
            name="debug-checkbox"
            onChange=${this.onDebugChange}
            type="checkbox"
          />
          <label for="debug-checkbox">
            Log debug information to the console.
          </label>
        </section>

        <${SharedFooter} page="settings" />
      </div>
    `;
  }
}
