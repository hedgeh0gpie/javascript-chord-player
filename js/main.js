"use strict";

const startNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

const startNoteSelector = document.querySelector('#start-note');
const octaveSelector = document.querySelector('#octave');
const buttons = document.querySelector('.buttons');
const intervalsInChord = document.querySelector('.intervals-in-chord');
const notesInChord = document.querySelector('.notes-in-chord');

let selectedStartNote = 'C';
let selectedOctave = '1';
let selectedChord;

const chordEntries = Tonal.ChordType.all();

const sound = new Howl({
  src: ['assets/pianosprite.mp3'],
  onload() {
    console.log('Sound file has been loaded. Do something here!');
    soundEngine.init();
  },
  onloaderror(e) {
    console.log('Error', e, msg);
  }
});

const app = {
  init() {
    this.setupStartNotes();
    this.setupOctaves();
    this.setupButtons();
    this.setupEventListeners();
  },
  setupStartNotes() {
    startNotes.forEach(noteName =>{
      let noteNameOption = this.createElement('option', noteName);
      startNoteSelector.appendChild(noteNameOption);
    });
  },
  setupOctaves() {
    for (let i = 1; i <= 7; i++) {
      let octaveNumber = this.createElement('option', i);
      octaveSelector.appendChild(octaveNumber);
    }
  },
  setupButtons() {
    const chordNames = chordEntries.map(entry => {
      return entry.aliases[0];
    });
    chordNames.forEach(chordName => {
      let chordButton = this.createElement('button', chordName);
      buttons.appendChild(chordButton);
    });
  },
  setupEventListeners() {
    startNoteSelector.addEventListener('change', () => {
      selectedStartNote = startNoteSelector.value;
      console.log(selectedStartNote);
    });
    octaveSelector.addEventListener('change', () => {
      selectedOctave = octaveSelector.value;
      console.log(selectedOctave);
    });
    buttons.addEventListener('click', (event) => {
      if (event.target.classList.contains('buttons')) {
        return;
      }
      selectedChord = event.target.innerText;
      this.displayChordInfo(selectedChord);
    });
  },
  displayChordInfo(selectedChord) {
    let chordIntervals = Tonal.Chord.getChord(selectedChord).intervals;
    intervalsInChord.innerText = chordIntervals.join(' - ');

    const startNoteWithOctave = selectedStartNote + selectedOctave;
    let chordNotes = chordIntervals.map(val => {
      return Tonal.transpose(startNoteWithOctave, val);
    });
    notesInChord.innerText = chordNotes.join(' - ');

    console.log(chordNotes);
    console.log(startNoteWithOctave);
  },
  createElement(elementName, content) {
    let element = document.createElement(elementName);
    element.innerHTML = content;
    return element;
  }
};

const soundEngine = {
  init() {
    const lengthOfNote = 2400;
    let timeIndex = 0;

    for (let i = 24; i <= 96; i++) {
      sound['_sprite'][i] = [timeIndex, lengthOfNote];
      timeIndex += lengthOfNote;
    }
    sound.play('');
  }
}

app.init();


