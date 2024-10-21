import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value) || value < 0) {
      return '';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    let timeString = '';

    if (hours > 0) {
      timeString += `${hours} hr`;
      if (minutes > 0) {
        timeString += ` ${minutes} min`;
      }
    } else if (minutes > 0) {
      timeString += `${minutes} min`;
    }

    return timeString;
  }
}
