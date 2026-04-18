import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dk-icon',
  imports: [LucideAngularModule],
  template: `<lucide-icon [name]="name()" [size]="size()" [strokeWidth]="strokeWidth()" style="display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;" />`,
})
export class IconComponent {
  name = input.required<string>();
  size = input<number>(16);
  strokeWidth = input<number>(1.5);
}
