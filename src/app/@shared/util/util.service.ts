import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any',
})
export class UtilService {
  constructor() {}

  convertToInternationalCurrencySystem(labelValue: number) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
      : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
        ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
        : // Three Zeroes for Thousands
          Math.abs(Number(labelValue)) >= 1.0e3
          ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
          : Math.abs(Number(labelValue));
  }

  convertToLocaleString(value: number): string {
    if (!value) return '-';
    if (typeof value === 'string') {
      return Number(value).toLocaleString();
    }
    return value.toLocaleString();
  }

  chunkArray<T>(array: T[], perChunk: number) {
    return array.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
  }
}

declare global {
  // to access the global type String
  interface String {
    toTitleCase(): string;
  }
}

// then the actual code
String.prototype.toTitleCase = function () {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  lowers = [
    'A',
    'An',
    'The',
    'And',
    'But',
    'Or',
    'For',
    'Nor',
    'As',
    'At',
    'By',
    'For',
    'From',
    'In',
    'Into',
    'Near',
    'Of',
    'On',
    'Onto',
    'To',
    'With',
  ];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), function (txt: string) {
      return txt.toLowerCase();
    });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), uppers[i].toUpperCase());

  return str;
};
