import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-heat-display',
  templateUrl: './heat-display.component.html',
  styleUrls: ['./heat-display.component.css'],
  standalone: true,
  imports: [
    NgStyle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatDisplayComponent {

  @Input() min!: number;
  @Input() max!: number;
  @Input() set current(value: number) {
    this._current = this.defineCurrentArrowPosition(value);
  }

  private _current = 0;
  nullPosition = 45;

  get current(): number {
    return this._current;
  }

  get scale(): number {
    return (360 - this.nullPosition * 2) / (this.max - this.min);
  }

  getRotationStyles(grad: number): {transform: string} {
    return {transform: 'rotate(' + grad + 'deg)'};
  }

  defineCurrentArrowPosition(value: number): number {
    if (this.min === undefined || this.max === undefined) {
      // handle error
    }
    if (value > this.max || value < this.min) {
      // handle error
    }
    const position = Math.abs(value - this.min);
    return (position * this.scale) + this.nullPosition;
  }
}
