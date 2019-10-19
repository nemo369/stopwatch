import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../../services/records.service'

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {

  records: number[] = [];

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.recordsService.records.subscribe(records => this.records = records)
  }

  deleteRecord(i: number): void {
    this.recordsService.deleteRecord(i)
  }

}
