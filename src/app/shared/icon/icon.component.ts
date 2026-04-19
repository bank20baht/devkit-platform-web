import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dk-icon',
  imports: [LucideAngularModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  name = input.required<string>();
  size = input<number>(16);
  strokeWidth = input<number>(1.5);
}
