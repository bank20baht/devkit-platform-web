import { Injectable, signal, effect } from '@angular/core';
import { TOOLS, Tool } from './tools';

export interface Tweaks {
  density: 'compact' | 'comfy';
  grouped: boolean;
  showDesc: boolean;
  showRecent: boolean;
  theme: 'light' | 'dark';
}

const LS = {
  active: 'devkit.activeTool',
  recent: 'devkit.recentTools',
  collapsed: 'devkit.sidebarCollapsed',
  tweaks: 'devkit.tweaks',
};

function loadLS<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    if (v == null) return fallback;
    return JSON.parse(v) as T;
  } catch { return fallback; }
}

function saveLS<T>(key: string, v: T): void {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
}

const TWEAK_DEFAULTS: Tweaks = {
  density: 'comfy',
  grouped: true,
  showDesc: true,
  showRecent: true,
  theme: 'light',
};

@Injectable({ providedIn: 'root' })
export class TweaksService {
  activeTool = signal<string | null>(loadLS<string | null>(LS.active, null));
  recentTools = signal<string[]>(loadLS<string[]>(LS.recent, []));
  sidebarCollapsed = signal<boolean>(loadLS<boolean>(LS.collapsed, false));
  tweaks = signal<Tweaks>({ ...TWEAK_DEFAULTS, ...loadLS<Partial<Tweaks>>(LS.tweaks, {}) });

  constructor() {
    effect(() => saveLS(LS.active, this.activeTool()));
    effect(() => saveLS(LS.recent, this.recentTools()));
    effect(() => saveLS(LS.collapsed, this.sidebarCollapsed()));
    effect(() => saveLS(LS.tweaks, this.tweaks()));
  }

  pickTool(id: string): void {
    this.activeTool.set(id);
    this.recentTools.update(prev => [id, ...prev.filter(x => x !== id)].slice(0, 6));
  }

  setTweak<K extends keyof Tweaks>(key: K, value: Tweaks[K]): void {
    this.tweaks.update(prev => ({ ...prev, [key]: value }));
  }

  getActiveTool(): Tool | null {
    const id = this.activeTool();
    return TOOLS.find(t => t.id === id) ?? null;
  }
}
