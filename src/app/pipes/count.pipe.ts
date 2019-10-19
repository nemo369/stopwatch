import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
  pure: true
})

export class CountPipe implements PipeTransform {

  transform(millis: number, args: string) {
    let res: string;
    switch (args) {

      case 'mil':
        const mili = ((millis % 60000) / 1000).toString();
        res = mili.slice(mili.lastIndexOf('.') + 1).substring(0, 2);
        if (res.length === 1) res += '0';
        break;

      case 'sec':
        const seconds = Math.floor((millis % 60000) / 1000);

        res = this.padding(seconds);
        break;
      case 'min':
        const minutes = Math.floor(millis / 60000);
        res = this.padding(minutes);
        break;

    }

    return res
  }

  private padding(time: number) {
    return `${time < 10 ? '0' : ''}${time}`;
  }

}
