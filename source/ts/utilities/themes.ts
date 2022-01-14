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
];

export const themeContext = createContext<Theme>(themes[0]);
