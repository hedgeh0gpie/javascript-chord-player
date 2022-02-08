"use strict";

const startNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

const startNoteSelector = document.querySelector('#start-note');

const app = {
  setupStartNotes() {
    startNotes.forEach(noteName =>{
      let noteNameOption = this.createElement('option', noteName);
      startNoteSelector.appendChild(noteNameOption);
    });
  },
  createElement(elementName, content) {
    let element = document.createElement(elementName);
    element.innerHTML = content;
    return element;
  }
};

app.setupStartNotes();
