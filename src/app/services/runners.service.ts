import { Injectable } from '@angular/core';
import { Runner } from '../models/Runner'
const ls: string = 'runners-local-storge'

@Injectable()
export class RunnersService {

  constructor() { }

  // CRUD
  newRunner(): Runner {
    const newRunner: Runner = {
      initialTimeStamp: Date.now(),
      currentTimeStamp: Date.now(),
      pauses: [],
      isPaused: null,
      counter: 0
    }
    localStorage.setItem(ls, JSON.stringify(newRunner));
    return newRunner;
  }

  getRunner() {
    if (localStorage.getItem(ls) === null) {
      return null
    } else {
      return JSON.parse(
        localStorage.getItem(ls)
      )
    }
  }


  updateRunner(runner: Runner): void {
    localStorage.setItem(ls, JSON.stringify(runner));
  }

  deleteRunner(): void {
    localStorage.removeItem(ls);
  }

}
