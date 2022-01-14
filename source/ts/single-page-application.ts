// Uncomment when debugging and using Preact's DevTools WebExtension.
// import 'preact/debug';

import '@fontsource/inter/latin.css';

import {html, render} from 'htm/preact';
import {Router} from 'preact-router';

import HomePage from './pages/home.js';
import NotFoundPage from './pages/not-found.js';
import ReleasePage from './pages/release.js';
import {getThemeByCssClass, themeContext} from './utilities/themes.js';

const activeTheme = getThemeByCssClass(
  window.localStorage.getItem('theme') ?? '',
);

document.body.classList.value = activeTheme.cssClass;

render(
  html`
    <${themeContext.Provider} value=${activeTheme}>
      <${Router}>
        <${HomePage} path="/" />
        <${ReleasePage} path="/release/:mbid" />
        <${NotFoundPage} default />
      <//>
    <//>
  `,
  document.body,
);
