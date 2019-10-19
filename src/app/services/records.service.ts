import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
const ls: string = 'records-local-storge'

@Injectable()
export class RecordsService {
  private sourceRecords: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>(this.getRecordsFromLocal())
  records: any = this.sourceRecords.asObservable();

  constructor() { }

  newRecord(record) {
    const currentRecords = this.sourceRecords.getValue();
    if (record <= 0) return;
    if (record === currentRecords[currentRecords.length - 1]) return;

    this.sourceRecords.next(currentRecords.concat([record]));
    this.saveToLocal();
  }


  deleteRecord(index) {
    const newValue = this.sourceRecords.getValue();
    newValue.splice(index, 1)
    this.sourceRecords.next(newValue);
    this.saveToLocal();
  }

  deleteRecords() {
    this.sourceRecords.next([]);
    this.saveToLocal();
  }

  getRecordsFromLocal(): number[] {
    if (localStorage.getItem(ls) === null) {
      return []
    } else {
      return JSON.parse(
        localStorage.getItem(ls)
      )
    }
  }

  saveToLocal(): void {
    localStorage.setItem(ls, JSON.stringify(this.sourceRecords.getValue()))
  }
}


