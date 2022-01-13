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
];

export const themeContext = createContext<Theme>(themes[0]);
