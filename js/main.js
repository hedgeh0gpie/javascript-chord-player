"use strict";

const startNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

const startNoteSelector = document.querySelector('#start-note');
const octaveSelector = document.querySelector('#octave');
const buttons = document.querySelector('.buttons');

let selectedStartNote;
let selectedOctave;

const chordEntries = Tonal.ChordType.all();

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
      console.log(event.target);
    });
  },
  createElement(elementName, content) {
    let element = document.createElement(elementName);
    element.innerHTML = content;
    return element;
  }
};

app.init();


