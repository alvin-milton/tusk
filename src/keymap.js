'use strict';
const {globalShortcut} = require('electron');
const {shortcutKeys} = require('./config');
const win = require('./win');

const {log} = console;

class Keymap {
  setAcc(custom, predefined) {
    if (Object.prototype.hasOwnProperty.call(shortcutKeys, custom)) {
      return shortcutKeys[custom];
    }
    return predefined;
  }

  registerGlobal() {
    const toggleTusk = globalShortcut.register(
      this.setAcc('global-toggle-tusk', 'Shift+Alt+A'), () => {
        win.toggle();
      });

    const searchNote = globalShortcut.register(
      this.setAcc('global-search', 'Shift+Alt+F'), () => {
        win.appear();
        win.activate('search');
      });

    const createNote = globalShortcut.register(
      this.setAcc('global-new-note', 'Shift+Alt+C'), () => {
        win.appear();
        win.activate('new-note');
      });

    if (toggleTusk && searchNote && createNote) {
      log('Successfully registered global shortcut keys');
    } else {
      log('Global shortcut keys registration failed');
    }
  }
}

module.exports = new Keymap();
