import {createContext} from 'preact';

type Theme = {
  cssClass: string;
  name: string;
};

export const themes: Theme[] = [
  {
    cssClass: 'love-dark',
    name: 'Love Dark',
  },
  {
    cssClass: 'love-light',
    name: 'Love Light',
  },
  {
    cssClass: 'solarized-dark',
    name: 'Solarized Dark',
  },
  {
    cssClass: 'solarized-light',
    name: 'Solarized Light',
  },
  {
    cssClass: 'dracula',
    name: 'Dracula',
  },
  {
    cssClass: 'monokai',
    name: 'Monokai',
  },
];

export const themeContext = createContext<Theme>(themes[0]);

export function getThemeByCssClass(cssClass: string): Theme {
  return themes.find((theme) => theme.cssClass === cssClass) ?? themes[0];
}

export function setTheme(theme: Theme): void {
  document.body.classList.value = theme.cssClass;
  window.localStorage.setItem('theme', theme.cssClass);
}
