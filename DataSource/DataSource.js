

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

function createChartData(array){
  var vowelsArray = ['a', 'i', 'u', 'e', 'o'];
  var tempObject = {
    'a':array[0],
    'i':array[1],
    'u':array[2],
    'e':array[3],
    'o':array[4],
  };
  //for (var i = 0; i < array.length; i++){}

  return tempObject;
}

export default class DataSource{
  that = this;

  soundFiles = [];
  correctLetterSoundFiles = [];
  wrongLetterSoundFiles = [];
  currentStudySound:Sound;
  currentLetter = '';
  letterArray = ['A','O','U']; // change in this and GameLogic

  hiragana = [//Monographs only
    //a, i, u, e, o
    ['∅','あ', 'い', 'う', 'え', 'お'],
    ['K','か', 'き', 'く', 'け', 'こ'],
    ['G','が', 'ぎ', 'ぐ', 'げ', 'ご'],
    ['S','さ', 'し', 'す', 'せ', 'そ'],
    ['Z','ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
    ['T','タ', 'チ', 'ツ', 'テ', 'ト'],
    ['D','ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
    ['N','ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['H','ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['B','バ', 'ビ', 'ブ', 'ベ', 'ボ'],
    ['P','パ', 'ピ', 'プ', 'ペ', 'ポ'],
    ['M','マ', 'ミ', 'ム', 'メ', 'モ'],
    ['Y','ヤ', '', 'ユ', '', 'ヨ'],
    ['R','ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['W','ワ', '', '', '', 'ヲ'],
    ['n','','','ン','',''],
  ];

  katakana = [//Monographs only
    //a, i, u, e, o
    ['∅','ア', 'イ', 'ウ', 'エ', 'オ'],
    ['K','カ', 'キ', 'ク', 'ケ', 'コ'],
    ['G','ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
    ['S','サ', 'シ', 'ス', 'セ', 'ソ'],
    ['Z','ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
    ['T','タ', 'チ', 'ツ', 'テ', 'ト'],
    ['D','ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
    ['N','ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['H','ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['B','バ', 'ビ', 'ブ', 'ベ', 'ボ'],
    ['P','パ', 'ピ', 'プ', 'ペ', 'ポ'],
    ['M','マ', 'ミ', 'ム', 'メ', 'モ'],
    ['Y','ヤ', '', 'ユ', '', 'ヨ'],
    ['R','ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['W','ワ', '', '', '', 'ヲ'],
    ['n','','','ン','',''],
  ];

  /*
  katakana = {//Monographs only
    //a, i, u, e, o
    '∅':createChartData(['ア', 'イ', 'ウ', 'エ', 'オ']),
    'K':createChartData(['カ', 'キ', 'ク', 'ケ', 'コ']),
    'G':createChartData(['ガ', 'ギ', 'グ', 'ゲ', 'ゴ']),
    'S':createChartData(['サ', 'シ', 'ス', 'セ', 'ソ']),
    'Z':createChartData(['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ']),
    'T':createChartData(['タ', 'チ', 'ツ', 'テ', 'ト']),
    'D':createChartData(['ダ', 'ヂ', 'ヅ', 'デ', 'ド']),
    'N':createChartData(['ナ', 'ニ', 'ヌ', 'ネ', 'ノ']),
    'H':createChartData(['ハ', 'ヒ', 'フ', 'ヘ', 'ホ']),
    'B':createChartData(['バ', 'ビ', 'ブ', 'ベ', 'ボ']),
    'P':createChartData(['パ', 'ピ', 'プ', 'ペ', 'ポ']),
    'M':createChartData(['マ', 'ミ', 'ム', 'メ', 'モ']),
    'Y':createChartData(['ヤ', '', 'ユ', '', 'ヨ']),
    'R':createChartData(['ラ', 'リ', 'ル', 'レ', 'ロ']),
    'W':createChartData(['ワ', '', '', '', 'ヲ']),
    'n':{'∅':'ン'},
  }
  */

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
