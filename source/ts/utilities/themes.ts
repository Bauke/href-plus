import {createContext} from 'preact';

type Theme = {
  cssClass: string;
  name: string;
};

export const defaultTheme: Theme = {
  cssClass: 'love-dark',
  name: 'Love Dark',
};

export const themes: Theme[] = [
  defaultTheme,
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
  {
    cssClass: 'high-contrast-black',
    name: 'High Contrast Black',
  },
  {
    cssClass: 'high-contrast-white',
    name: 'High Contrast White',
  },
].sort((a, b) => a.name.localeCompare(b.name));

export const themeContext = createContext<Theme>(defaultTheme);

export function getThemeByCssClass(cssClass: string): Theme {
  return themes.find((theme) => theme.cssClass === cssClass) ?? defaultTheme;
}

export function setTheme(theme: Theme): void {
  document.body.classList.value = theme.cssClass;
  window.localStorage.setItem('theme', theme.cssClass);
}
