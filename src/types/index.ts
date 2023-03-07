export enum conferencePhrases {
   '(Child noises in the background)',
   'Hello, hello?',
   'I need to jump-in another call',
   'can everyone mute go on mute',
   'could you please get closer to the mic?',
   '(loud painful echo / feedback)',
   'Next slide, please',
   'can we take this offline?',
   'is ____ on the call?',
   'Could you share this slides afterwards?',
   'can someone grant presenter rights?',
   'can you email that to everyone?',
   'free play',
   'sorry, I had problems logging in',
   '(animal noises in the background)',
   'sorry, i didn`t found the conference id',
   'I was having connection issues',
   'Ill have to get back to you',
   'who just joined?',
   'sorry, something ____ with my calendar',
   'do you see my screen?',
   'lets wait for ____',
   'you will send the minutes?',
   'sorry, i was on mute',
   'can you repeat, please?',
}

export interface Player {
   name: string;
   numbersCalled: number[];
   bingoCount: BingoPattern[];
}

export interface BingoPattern {
   type: 'row' | 'column' | 'diag1' | 'diag2';
   index: number;
   player?: Player;
}


export interface BingoBoardConfig {
   rows: number[][];
   columns: number[][];
   diag1: number[];
   diag2: number[];
 }