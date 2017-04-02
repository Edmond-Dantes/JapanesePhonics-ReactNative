

'use strict';

import Sound from 'react-native-sound';

function randomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNewRandomInt(min, max, previousRandomNumber){
  var randomNumber = randomInt(min, max)
  while (randomNumber == previousRandomNumber) {
    randomNumber = randomInt(min, max)
  }
  return randomNumber
}

export default class DataSource{
  that = this;

  soundFiles = [];
  correctLetterSoundFiles = [];
  wrongLetterSoundFiles = [];
  currentStudySound:Sound;
  currentLetter = '';

  letterArray = ['A','O','U'];

  constructor(){

    this.loadSoundFiles();
  }

  loadCorrectSound(){
    //load wrong letter sound
    var correctLetterSound = ['NiceJob.mp3','Wonderful.mp3','Yep.mp3'];
    for (var i =0; i < correctLetterSound.length; i++){
      var correctSound = new Sound(correctLetterSound[i], Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      // loaded successfully
      console.log('duration in seconds: ' + correctSound.getDuration() + 'number of channels: ' + correctSound.getNumberOfChannels());
      });
      this.correctLetterSoundFiles.push(correctSound);
    }
  }

  loadWrongSound(){
    //load wrong letter sound
    var wrongLetterSound = ['mistakeSound.mp3']
    for (var i =0; i < wrongLetterSound.length; i++){
      var wrongSound = new Sound(wrongLetterSound[i], Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      // loaded successfully
      console.log('duration in seconds: ' + wrongSound.getDuration() + 'number of channels: ' + wrongSound.getNumberOfChannels());
      });
      this.wrongLetterSoundFiles.push(wrongSound);
    }
  }

  loadSoundFiles(){
    this.loadCorrectSound();
    this.loadWrongSound();

    //load letter sounds

    var aSounds = ['aSound1.mp3','aSound2.mp3','aSound3.mp3'];
    var oSounds = ['oSound1.mp3','oSound2.mp3','oSound3.mp3'];
    var uSounds = ['uSound1.mp3','uSound2.mp3','uSound3.mp3'];
/*
//Use this instead of arrays
for (var key in p) {
  if (p.hasOwnProperty(key)) {
    console.log(key + " -> " + p[key]);
  }
}
*/

    var sounds = [aSounds, oSounds, uSounds];
    for (var i =0; i < sounds.length; i++){
      var tempArray = [];
      for (var j =0; j < sounds[i].length; j++){
        var newSound = new Sound(sounds[i][j], Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        // loaded successfully
        console.log('duration in seconds: ' + newSound.getDuration() + 'number of channels: ' + newSound.getNumberOfChannels());
        });
        tempArray.push(newSound);
      }
      this.soundFiles.push(tempArray);
    }
  }

  playStudyLetterSound(letter, reset?:bool){
    if (this.currentStudySound && reset){
      this.currentStudySound.stop();
    }
    var soundConvert = {'A':0, 'O':1, 'U':2};
    var soundIndex = soundConvert[letter];
    var randomSoundVersion = randomInt(0, this.soundFiles[soundIndex].length - 1);
    //play the sound
    this.soundFiles[soundIndex][randomSoundVersion].play();
    this.currentStudySound = this.soundFiles[soundIndex][randomSoundVersion];
  }

  playLetterSound(soundIndex){
    var randomSoundVersion = randomInt(0, this.soundFiles[soundIndex].length - 1);
    //play the sound
    this.soundFiles[soundIndex][randomSoundVersion].play();
  }


}
