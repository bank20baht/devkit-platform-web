import { Component, input, output, computed, signal, effect, ElementRef, ViewChild, HostListener } from '@angular/core';
import { TOOLS, Tool } from '../../core/tools';
import { ThemePalette } from '../../core/theme';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'dk-platform-palette',
  imports: [IconComponent],
  template: `
    @if (open()) {
      <div [style]="backdropStyle()" (click)="closed.emit()">
        <div [style]="panelStyle()" (click)="$event.stopPropagation()">
          <div [style]="searchRowStyle()">
            <span [style.color]="T().brand" style="font-family:'JetBrains Mono',monospace;font-weight:700;">&gt;</span>
            <input
              #searchInput
              [value]="query()"
              (input)="query.set($any($event.target).value)"
              placeholder="Search tools, actions…"
              [style]="inputStyle()"
            />
            <span [style]="escKbdStyle()">⎋</span>
          </div>
          <div style="overflow-y:auto;max-height:320px;">
            @if (showingRecent()) {
              <div [style]="sectionLabelStyle()">Recent</div>
            }
            @for (item of items(); track item.tool.id; let i = $index) {
              @if (item.showDivider) {
                <div [style]="sectionLabelStyle()">All tools</div>
              }
              <div
                (click)="pick(item.tool)"
                (mouseenter)="sel.set(i)"
                [style]="itemStyle(i === sel())"
              >
                <span [style]="itemIconStyle(i === sel())">
                  <dk-icon [name]="item.tool.ic" [size]="15" />
                </span>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:13px;" [style.color]="T().fg">{{ item.tool.name }}</div>
                  <div style="font-family:'JetBrains Mono',monospace;font-size:10px;margin-top:1px;" [style.color]="T().fgSubtle">{{ item.tool.desc }}</div>
                </div>
                <span style="font-family:'JetBrains Mono',monospace;font-size:10px;" [style.color]="T().fgSubtle">{{ item.tool.cat.toLowerCase() }}</span>
                @if (i === sel()) {
                  <span style="font-family:'JetBrains Mono',monospace;font-size:11px;margin-left:6px;" [style.color]="T().fgMuted">⏎</span>
                }
              </div>
            }
            @if (items().length === 0) {
              <div style="padding:28px;text-align:center;font-size:13px;" [style.color]="T().fgSubtle">
                No results for <code [style]="noResultCodeStyle()">{{ query() }}</code>.
              </div>
            }
          </div>
          <div [style]="footStyle()">
            <span>↑↓ navigate · ⏎ run · ⎋ close</span>
            <span>{{ items().length }} result{{ items().length === 1 ? '' : 's' }}</span>
          </div>
        </div>
      </div>
    }
  `,
})
export class PaletteComponent {
  open = input<boolean>(false);
  T = input.required<ThemePalette>();
  recent = input<string[]>([]);
  closed = output<void>();
  toolPick = output<string>();

  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;

  query = signal('');
  sel = signal(0);

  constructor() {
    effect(() => {
      if (this.open()) {
        this.query.set('');
        this.sel.set(0);
        setTimeout(() => this.searchInputRef?.nativeElement.focus(), 0);
      }
    });
    effect(() => { this.query(); this.sel.set(0); });
  }

  items = computed(() => {
    const q = this.query().trim().toLowerCase();
    const all = TOOLS;
    const recentIds = this.recent();
    let list: Tool[];

    if (!q) {
      const r = recentIds.map(id => all.find(t => t.id === id)).filter((t): t is Tool => Boolean(t));
      const rest = all.filter(t => !recentIds.includes(t.id));
      list = [...r, ...rest].slice(0, 10);
    } else {
      list = all.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.cat.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)
      ).slice(0, 10);
    }

    const recentCount = !q ? Math.min(recentIds.length, list.length) : 0;
    return list.map((tool, i) => ({
      tool,
      showDivider: !q && i === recentCount && i > 0 && recentIds.length > 0,
    }));
  });

  showingRecent = computed(() => !this.query().trim() && this.recent().length > 0);

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (!this.open()) return;
    if (e.key === 'Escape') { e.preventDefault(); this.closed.emit(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); this.sel.update(i => Math.min(i + 1, this.items().length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this.sel.update(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const item = this.items()[this.sel()];
      if (item) this.pick(item.tool);
    }
  }

  pick(tool: Tool) {
    this.toolPick.emit(tool.id);
    this.closed.emit();
  }

  backdropStyle = computed(() => ({
    position: 'fixed',
    inset: '0',
    background: 'rgba(10,10,11,.35)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '110px',
    zIndex: '50',
  }));

  panelStyle = computed(() => ({
    width: '560px',
    borderRadius: '10px',
    overflow: 'hidden',
    background: this.T().surface,
    border: `1px solid ${this.T().border}`,
    boxShadow: this.T().bg === '#0F0F11'
      ? '0 24px 48px -12px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04)'
      : '0 24px 48px -12px rgba(0,0,0,.2), 0 0 0 1px rgba(0,0,0,.03)',
  }));

  searchRowStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 14px',
    borderBottom: `1px solid ${this.T().border}`,
  }));

  inputStyle = computed(() => ({
    flex: '1',
    border: '0',
    outline: 'none',
    background: 'transparent',
    fontSize: '13px',
    color: this.T().fg,
    fontFamily: "'Geist','Inter',sans-serif",
  }));

  escKbdStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    color: this.T().fgMuted,
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
    borderRadius: '4px',
    padding: '0 5px',
  }));

  sectionLabelStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    padding: '6px 14px 4px',
    color: this.T().fgSubtle,
  }));

  itemStyle(active: boolean) {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 14px',
      cursor: 'pointer',
      background: active ? this.T().rowHover : 'transparent',
      color: this.T().fg,
    };
  }

  itemIconStyle(active: boolean) {
    return {
      width: '22px',
      height: '22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: active ? this.T().brand : this.T().fgMuted,
    };
  }

  footStyle = computed(() => ({
    padding: '10px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    color: this.T().fgSubtle,
    background: this.T().bg,
    borderTop: `1px solid ${this.T().border}`,
  }));

  noResultCodeStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    color: this.T().fg,
  }));
}
