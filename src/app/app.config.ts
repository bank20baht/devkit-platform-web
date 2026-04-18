import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import {
  ArrowLeftRight, Binary, Braces, CalendarClock, CaseSensitive, Clock, CodeXml,
  DatabaseZap, Earth, FileCode, FileText, FingerprintPattern, Gauge, GitCompare,
  Globe, Hash, History, Key, KeyRound, Link, Lock, Moon, Network, Palette,
  PanelLeftClose, PanelLeftOpen, Pilcrow, Pipette, QrCode, Regex, Search,
  Shapes, Share2, ShieldCheck, SquareTerminal, Sun, Table2, Terminal,
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        ArrowLeftRight, Binary, Braces, CalendarClock, CaseSensitive, Clock, CodeXml,
        DatabaseZap, Earth, FileCode, FileText, FingerprintPattern, Gauge, GitCompare,
        Globe, Hash, History, Key, KeyRound, Link, Lock, Moon, Palette,
        PanelLeftClose, PanelLeftOpen, Pilcrow, Pipette, QrCode, Regex, Search,
        Shapes, Share2, ShieldCheck, SquareTerminal, Sun, Table2, Terminal,
      }),
    },
  ]
};
