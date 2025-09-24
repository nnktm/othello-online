export type colorSetType = {
  cellBlack: string;
  cellWhite: string;
  cellCanPut: string;
  line: string;
  text: string;
  background: string;
  border: string;
  button: string;
  whiteCellBorder: string;
  pageBackground: string;
};

export const COLOR_SET_KEYS = [
  'black',
  'white',
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
];

export const colorSet: { [key: string]: colorSetType } = {
  black: {
    cellBlack: '#1A1A1A',
    cellWhite: '#F8F8F8',
    cellCanPut: '#8C8C8C',
    line: '#1A1A1A',
    text: '#FFFFFF',
    background: '#4C4C4C',
    border: '#3C3C3C',
    button: '#6C6C6C',
    pageBackground: '#4C4C4C',
    whiteCellBorder: '#1A1A1A',
  },
  white: {
    cellBlack: '#2C2C2C',
    cellWhite: '#FFFFFF',
    cellCanPut: '#6C6C6C',
    line: '#6C6C6C',
    text: '#2C2C2C',
    background: '#e0e0e0',
    border: '#6C6C6C',
    button: '#8C8C8C',
    pageBackground: '#e0e0e0',
    whiteCellBorder: '#6C6C6C',
  },
  red: {
    cellBlack: '#2C2C2C',
    cellWhite: '#FFF5F5',
    cellCanPut: '#FF5252',
    line: '#FF5252',
    text: '#2C2C2C',
    background: '#FFEBEE',
    border: '#FF5252',
    button: '#FF5252',
    pageBackground: '#FFEBEE',
    whiteCellBorder: '#2C2C2C',
  },
  blue: {
    cellBlack: '#1A237E',
    cellWhite: '#F3F8FF',
    cellCanPut: '#29B6F6',
    line: '#29B6F6',
    text: '#2C2C2C',
    background: '#E3F2FD',
    border: '#29B6F6',
    button: '#29B6F6',
    pageBackground: '#E3F2FD',
    whiteCellBorder: '#2C2C2C',
  },
  green: {
    cellBlack: '#1B5E20',
    cellWhite: '#F1F8E9',
    cellCanPut: '#4CAF50',
    line: '#4CAF50',
    text: '#2C2C2C',
    background: '#E8F5E8',
    border: '#4CAF50',
    button: '#4CAF50',
    pageBackground: '#E8F5E8',
    whiteCellBorder: '#1B5E20',
  },
  yellow: {
    cellBlack: '#F57F17',
    cellWhite: '#FFFDE7',
    cellCanPut: '#FFC107',
    line: '#FFC107',
    text: '#2C2C2C',
    background: '#FFFDE7',
    border: '#FFC107',
    button: '#FFC107',
    pageBackground: '#FFFDE7',
    whiteCellBorder: '#F57F17',
  },
  purple: {
    cellBlack: '#4A148C',
    cellWhite: '#F8F4FF',
    cellCanPut: '#9C27B0',
    line: '#9C27B0',
    text: '#2C2C2C',
    background: '#F3E5F5',
    border: '#9C27B0',
    button: '#9C27B0',
    pageBackground: '#F3E5F5',
    whiteCellBorder: '#4A148C',
  },
  orange: {
    cellBlack: '#E65100',
    cellWhite: '#FFF8E1',
    cellCanPut: '#F57C00',
    line: '#F57C00',
    text: '#2C2C2C',
    background: '#FFF3E0',
    border: '#F57C00',
    button: '#F57C00',
    pageBackground: '#FFF3E0',
    whiteCellBorder: '#E65100',
  },
};
