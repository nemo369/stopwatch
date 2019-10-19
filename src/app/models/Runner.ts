export class Runner {
    initialTimeStamp: number;
    currentTimeStamp: number;
    pauses: number[];
    isPaused: number | null;
    counter: number;
}

// 6. The state of the app must be saved in browser’s memory (information about the counter
//     and records). In case if to click on “Play” button and close the page and open it after 5
//     minutes it must show 5 minutes on screen.