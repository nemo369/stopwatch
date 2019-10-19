import { Component, OnInit } from '@angular/core';
import { faPlay, faPause, faTrashAlt, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { RecordsService } from '../../services/records.service'
import { RunnersService } from '../../services/runners.service'
import { Runner } from '../../models/Runner'

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {

  icons = { faPlay, faPause, faTrashAlt, faStopwatch }
  playpause: any;
  isRecording: boolean = false;
  interval;
  counter: number = 0;
  currentRunner: Runner;

  constructor(private recordsService: RecordsService, private runnersService: RunnersService) { }

  ngOnInit() {
    const hadRunner: Runner = this.runnersService.getRunner();
    if (hadRunner) {
      this.currentRunner = hadRunner;
      if (hadRunner.isPaused) {
        this.counter = hadRunner.isPaused;
        this.isRecording = false;
      } else {
        this.isRecording = true;
        this.counter = (Date.now() - hadRunner.currentTimeStamp) + hadRunner.counter;
        this.playCounter();
      }
    }
    this.setDisplay();

  }

  setDisplay() {
    !this.isRecording ? this.playpause = { icon: faPlay, text: 'Play' } : this.playpause = { icon: faPause, text: 'Pause' }
  }

  toglleCounter() {
    if (!this.currentRunner) {
      this.currentRunner = this.runnersService.newRunner();
    }
    this.isRecording = !this.isRecording
    this.setDisplay();
    this.isRecording ? this.playCounter() : this.pauseCounter();
  }

  playCounter() {
    const now = Date.now();
    const startTime = now - (this.counter || 0);
    this.interval = setInterval(() => {
      this.counter = Date.now() - startTime;
    }, 7);
    this.currentRunner.isPaused = null;
    this.currentRunner.currentTimeStamp = now;
    this.currentRunner.counter = this.counter;
    this.currentRunner.pauses.push(now);
    this.runnersService.updateRunner(this.currentRunner)
  }

  pauseCounter() {
    this.currentRunner.isPaused = this.counter;
    clearInterval(this.interval);
    this.runnersService.updateRunner(this.currentRunner)
  }

  setRecord() {
    this.recordsService.newRecord(this.counter);
  }

  clearCounter() {
    this.currentRunner = null;
    this.recordsService.deleteRecords();
    clearInterval(this.interval);
    this.isRecording = false;
    this.setDisplay();
    this.counter = 0;
    this.runnersService.deleteRunner();
  }

}
