import { Component, computed, inject } from '@angular/core';
import { TweaksService } from '../../core/tweaks.service';
import { dkTheme } from '../../core/theme';
import { TOOLS, CAT_ORDER, Tool } from '../../core/tools';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'dk-platform-landing',
  imports: [IconComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  private svc = inject(TweaksService);
  private T = computed(() => dkTheme(this.svc.tweaks().theme));

  hovered: string | null = null;

  readonly byCat: Record<string, Tool[]> = {};
  readonly visibleCats: string[] = [];
  readonly totalTools = TOOLS.length;

  constructor() {
    TOOLS.forEach(t => {
      (this.byCat[t.cat] = this.byCat[t.cat] ?? []).push(t);
    });
    this.visibleCats = [
      ...CAT_ORDER.filter(c => this.byCat[c]),
      ...Object.keys(this.byCat).filter(c => !CAT_ORDER.includes(c)),
    ];
  }

  pick(tool: Tool) {
    this.svc.pickTool(tool.id);
  }

  pageStyle = computed(() => ({
    padding: '40px 48px',
    maxWidth: '960px',
    margin: '0 auto',
    fontFamily: "'Geist','Inter',sans-serif",
    color: this.T().fg,
  }));

  headerStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '40px',
  }));

  logoStyle = computed(() => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: this.T().brand,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '700',
    fontFamily: "'JetBrains Mono',monospace",
    flexShrink: '0',
  }));

  titleStyle = computed(() => ({
    margin: '0',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '-0.03em',
    color: this.T().fg,
  }));

  subtitleStyle = computed(() => ({
    margin: '2px 0 0',
    fontSize: '13px',
    color: this.T().fgSubtle,
    fontFamily: "'JetBrains Mono',monospace",
  }));

  catLabelStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: this.T().fgSubtle,
    marginBottom: '10px',
  }));

  gridStyle = computed(() => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '8px',
  }));

  cardStyle(id: string) {
    const active = this.hovered === id;
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 14px',
      borderRadius: '8px',
      border: `1px solid ${active ? this.T().brand : this.T().border}`,
      background: active ? this.T().brandBg : this.T().surface,
      cursor: 'pointer',
      transition: 'border-color 120ms, background 120ms',
      width: '100%',
    };
  }

  cardIconStyle = computed(() => ({
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: this.T().brandBg,
    color: this.T().brand,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
  }));

  cardNameStyle = computed(() => ({
    fontSize: '13px',
    fontWeight: '600',
    color: this.T().fg,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }));

  cardDescStyle = computed(() => ({
    fontSize: '11px',
    color: this.T().fgSubtle,
    marginTop: '2px',
    fontFamily: "'JetBrains Mono',monospace",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }));

  arrowStyle = computed(() => ({
    color: this.T().fgSubtle,
    flexShrink: '0',
    opacity: '0.6',
  }));
}
