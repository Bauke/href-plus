// Uncomment when debugging and using Preact's DevTools WebExtension.
// import 'preact/debug';

import '@fontsource/inter/latin.css';

import {html, render} from 'htm/preact';
import {Router} from 'preact-router';

import HomePage from './pages/home.js';
import NotFoundPage from './pages/not-found.js';
import ReleasePage from './pages/release.js';
import {themeContext, themes} from './utilities/themes.js';

const savedTheme = window.localStorage.getItem('theme');
const activeTheme =
  themes.find((theme) => theme.cssClass === savedTheme) ?? themes[0];

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
