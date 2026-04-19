import { Component, input, output, computed, signal, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Tool } from '../../core/tools';
import { ThemePalette } from '../../core/theme';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'dk-platform-sidebar',
  imports: [IconComponent, NgTemplateOutlet],
  template: `
    <aside [style]="wrapStyle()">
      @if (collapsed()) {
        <!-- Rail mode -->
        <div [style]="brandRailStyle()">
          <div [style]="logoBoxStyle()">dk</div>
        </div>
        <button (click)="toggleCollapse.emit()" title="Expand sidebar" [style]="railBtnStyle()">
          <dk-icon name="panel-left-open" [size]="16" />
        </button>
        <div style="flex:1;overflow:auto;padding:6px 0;display:flex;flex-direction:column;">
          @for (t of tools(); track t.id) {
            <button (click)="toolPick.emit(t.id)" [title]="t.name" [style]="railItemStyle(t.id === activeId())">
              <dk-icon [name]="t.ic" [size]="18" [strokeWidth]="1.5" />
              @if (t.id === activeId()) {
                <span [style]="railBarStyle()"></span>
              }
            </button>
          }
        </div>
        <div [style]="footStyle()">
          <span [style.color]="T().brand">●</span>
        </div>
      } @else {
        <!-- Expanded mode -->
        <div [style]="brandStyle()">
          <div [style]="logoBoxStyle()">dk</div>
          <span [style]="brandNameStyle()">devkit</span>
          <span [style]="brandVerStyle()">v1.0.3</span>
          <button (click)="toggleCollapse.emit()" title="Collapse sidebar" [style]="collapseBtnStyle()">
            <dk-icon name="panel-left-close" [size]="14" />
          </button>
        </div>
        <div [style]="searchWrapStyle()">
          <span style="position:absolute;left:22px;top:50%;transform:translateY(-50%);display:flex;align-items:center;" [style.color]="T().fgSubtle">
            <dk-icon name="search" [size]="13" />
          </span>
          <input
            #searchInput
            [style]="searchInputStyle()"
            placeholder="Search tools…"
            [value]="query()"
            (input)="query.set($any($event.target).value)"
            (keydown)="onSearchKey($event)"
          />
          <span [style]="searchKbdStyle()">/</span>
        </div>
        <div style="flex:1;overflow:auto;">
          @if (!grouped() || query().trim()) {
            <div style="padding:6px 8px;">
              @if (query().trim()) {
                <div [style]="catLabelStyle()">{{ flatOrder().length }} result{{ flatOrder().length === 1 ? '' : 's' }}</div>
              }
              @for (t of flatOrder(); track t.id; let i = $index) {
                <ng-container *ngTemplateOutlet="toolRow; context: { t, i }" />
              }
              @if (flatOrder().length === 0) {
                <div style="padding:24px 12px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:11px;" [style.color]="T().fgSubtle">
                  No tools match <code>{{ query() }}</code>.
                </div>
              }
            </div>
          } @else {
            <div style="padding:6px 8px;">
              @if (showRecent() && recent().length > 0) {
                <div style="margin-bottom:12px;">
                  <div [style]="catLabelStyle()" style="display:flex;align-items:center;gap:6px;">
                    <dk-icon name="history" [size]="10" />
                    <span>Recent</span>
                  </div>
                  @for (id of recent().slice(0,3); track id) {
                    @if (toolById(id); as t) {
                      <ng-container *ngTemplateOutlet="toolRow; context: { t, i: recentIdx(id) }" />
                    }
                  }
                </div>
              }
              @for (cat of visibleCats(); track cat) {
                <div style="margin-bottom:10px;">
                  <div [style]="catLabelStyle()">{{ cat }}</div>
                  @for (t of toolsByCat(cat); track t.id; let i = $index) {
                    <ng-container *ngTemplateOutlet="toolRow; context: { t, i: catFlatIdx(cat, i) }" />
                  }
                </div>
              }
            </div>
          }
        </div>
        <div [style]="footStyle()">
          <span style="display:flex;align-items:center;gap:6px;">
            <span [style.color]="T().brand">●</span> 100% offline
          </span>
          <span style="opacity:.7">{{ tools().length }} tools</span>
        </div>
      }
    </aside>

    <ng-template #toolRow let-t="t" let-i="i">
      <div
        (click)="toolPick.emit(t.id)"
        (mouseenter)="focusIdx.set(i)"
        [style]="rowStyle(t.id === activeId(), i === focusIdx())"
      >
        <span [style]="rowIconStyle(t.id === activeId())">
          <dk-icon [name]="t.ic" [size]="16" [strokeWidth]="1.5" />
        </span>
        <div style="flex:1;min-width:0;">
          <div [style]="rowNameStyle(t.id === activeId())">{{ t.name }}</div>
          @if (showDesc()) {
            <div [style]="rowDescStyle()">{{ t.desc }}</div>
          }
        </div>
      </div>
    </ng-template>
  `,
})
export class SidebarComponent {
  activeId = input<string | null>(null);
  collapsed = input<boolean>(false);
  density = input<'compact' | 'comfy'>('comfy');
  showDesc = input<boolean>(true);
  grouped = input<boolean>(true);
  showRecent = input<boolean>(true);
  recent = input<string[]>([]);
  T = input.required<ThemePalette>();

  tools = input<Tool[]>([]);
  catOrder = input<string[]>([]);

  toolPick = output<string>();
  toggleCollapse = output<void>();

  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;

  query = signal('');
  focusIdx = signal(0);

  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.tools();
    return this.tools().filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.cat.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q)
    );
  });

  flatOrder = computed(() => {
    if (!this.grouped() || this.query().trim()) return this.filtered();
    const byCat: Record<string, Tool[]> = {};
    this.filtered().forEach(t => { (byCat[t.cat] = byCat[t.cat] || []).push(t); });
    const out: Tool[] = [];
    this.catOrder().forEach(c => { if (byCat[c]) out.push(...byCat[c]); });
    Object.keys(byCat).forEach(c => { if (!this.catOrder().includes(c)) out.push(...byCat[c]); });
    return out;
  });

  visibleCats = computed(() => {
    const byCat: Record<string, Tool[]> = {};
    this.filtered().forEach(t => { (byCat[t.cat] = byCat[t.cat] || []).push(t); });
    return [...this.catOrder().filter(c => byCat[c]), ...Object.keys(byCat).filter(c => !this.catOrder().includes(c))];
  });

  toolById(id: string): Tool | undefined {
    return this.tools().find(t => t.id === id);
  }

  toolsByCat(cat: string): Tool[] {
    return this.filtered().filter(t => t.cat === cat);
  }

  recentIdx(id: string): number {
    return this.flatOrder().findIndex(t => t.id === id);
  }

  catFlatIdx(cat: string, localIdx: number): number {
    const allTools = this.flatOrder();
    const catTools = this.toolsByCat(cat);
    if (catTools.length === 0) return -1;
    return allTools.findIndex(t => t.id === catTools[localIdx]?.id);
  }

  onSearchKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); this.focusIdx.update(i => Math.min(i + 1, this.flatOrder().length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this.focusIdx.update(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { const t = this.flatOrder()[this.focusIdx()]; if (t) this.toolPick.emit(t.id); }
    else if (e.key === 'Escape') { this.query.set(''); (e.target as HTMLElement).blur(); }
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKey(e: KeyboardEvent) {
    const tag = (document.activeElement as HTMLElement)?.tagName;
    if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
      e.preventDefault();
      this.searchInputRef?.nativeElement.focus();
    }
  }

  // Styles
  wrapStyle = computed(() => ({
    flexShrink: '0',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: this.collapsed() ? '56px' : '260px',
    transition: 'width 160ms cubic-bezier(.2,.7,.2,1)',
    background: this.T().sidebarBg,
    borderRight: `1px solid ${this.T().border}`,
  }));

  logoBoxStyle = computed(() => ({
    width: '22px',
    height: '22px',
    borderRadius: '5px',
    background: this.T().brand,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '700',
    fontFamily: "'JetBrains Mono',monospace",
    flexShrink: '0',
  }));

  brandRailStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    borderBottom: `1px solid ${this.T().border}`,
  }));

  brandStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 14px',
    borderBottom: `1px solid ${this.T().border}`,
    color: this.T().fg,
  }));

  brandNameStyle = computed(() => ({
    fontFamily: "'Geist','Inter',sans-serif",
    fontWeight: '700',
    fontSize: '15px',
    letterSpacing: '-0.02em',
    color: this.T().fg,
  }));

  brandVerStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    color: this.T().fgSubtle,
  }));

  collapseBtnStyle = computed(() => ({
    width: '24px',
    height: '24px',
    border: '0',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    color: this.T().fgMuted,
    marginLeft: 'auto',
  }));

  railBtnStyle = computed(() => ({
    width: '100%',
    height: '40px',
    border: '0',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: this.T().fgMuted,
    borderBottom: `1px solid ${this.T().border}`,
  }));

  railItemStyle(active: boolean) {
    return {
      position: 'relative',
      width: '100%',
      height: '40px',
      border: '0',
      background: active ? this.T().brandBg : 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: active ? this.T().brand : this.T().fgMuted,
    };
  }

  railBarStyle = computed(() => ({
    position: 'absolute',
    left: '0',
    top: '8px',
    bottom: '8px',
    width: '2px',
    borderRadius: '0 2px 2px 0',
    background: this.T().brand,
  }));

  searchWrapStyle = computed(() => ({
    position: 'relative',
    padding: '10px 12px',
    borderBottom: `1px solid ${this.T().border}`,
  }));

  searchInputStyle = computed(() => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: '6px 32px 6px 28px',
    borderRadius: '6px',
    fontFamily: "'Geist','Inter',sans-serif",
    fontSize: '13px',
    outline: 'none',
    background: this.T().inputBg,
    color: this.T().fg,
    border: `1px solid ${this.T().borderInput}`,
  }));

  searchKbdStyle = computed(() => ({
    position: 'absolute',
    right: '22px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    borderBottom: '2px solid',
    borderRadius: '4px',
    padding: '0 5px',
    color: this.T().fgMuted,
    background: this.T().inputBg,
    border: `1px solid ${this.T().borderInput}`,
  }));

  catLabelStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    padding: '6px 8px 4px',
    color: this.T().fgSubtle,
  }));

  rowStyle(active: boolean, focused: boolean) {
    const pad = this.density() === 'compact' ? '4px 8px' : '7px 8px';
    const mb = this.density() === 'compact' ? '2px' : '3px';
    return {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      borderRadius: '6px',
      cursor: 'pointer',
      padding: pad,
      marginBottom: mb,
      background: active ? this.T().brandBg : focused ? this.T().rowHover : 'transparent',
      color: active ? this.T().brand : this.T().fg,
      outline: focused && !active ? `1px solid ${this.T().border}` : 'none',
      transition: 'background 90ms linear',
    };
  }

  rowIconStyle(active: boolean) {
    return {
      width: '22px',
      height: '22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: active ? this.T().brand : this.T().fgMuted,
    };
  }

  rowNameStyle(active: boolean) {
    return {
      fontFamily: "'Geist','Inter',sans-serif",
      fontSize: '13px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: active ? this.T().brandStrong : this.T().fg,
    };
  }

  rowDescStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '1px',
    color: this.T().fgSubtle,
  }));

  footStyle = computed(() => ({
    padding: '10px 14px',
    display: 'flex',
    justifyContent: this.collapsed() ? 'center' : 'space-between',
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    color: this.T().fgMuted,
    borderTop: `1px solid ${this.T().border}`,
  }));
}
