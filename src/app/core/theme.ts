export interface ThemePalette {
  bg: string;
  sidebarBg: string;
  surface: string;
  fg: string;
  fgMuted: string;
  fgSubtle: string;
  border: string;
  borderInput: string;
  inputBg: string;
  brand: string;
  brandStrong: string;
  brandBg: string;
  rowHover: string;
}

export function dkTheme(mode: 'light' | 'dark'): ThemePalette {
  if (mode === 'dark') {
    return {
      bg: '#0F0F11',
      sidebarBg: '#0F0F11',
      surface: '#17171A',
      fg: '#E6E6DF',
      fgMuted: '#9A9A8E',
      fgSubtle: '#6E6E63',
      border: '#262629',
      borderInput: '#2E2E32',
      inputBg: '#17171A',
      brand: '#34E27A',
      brandStrong: '#4DD585',
      brandBg: 'rgba(52, 226, 122, 0.10)',
      rowHover: '#1A1A1D',
    };
  }
  return {
    bg: '#FAFAF7',
    sidebarBg: '#FAFAF7',
    surface: '#FFFFFF',
    fg: '#17171A',
    fgMuted: '#5B5B52',
    fgSubtle: '#9A9A8E',
    border: '#E6E6DF',
    borderInput: '#D0D0C6',
    inputBg: '#FFFFFF',
    brand: '#0AA352',
    brandStrong: '#046635',
    brandBg: '#E9FBEF',
    rowHover: '#F1F1EC',
  };
}
