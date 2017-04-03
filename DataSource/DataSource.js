

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

/*
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
*/

export default class DataSource{
  that = this;

  soundFiles = [];
  //soundFileNames =[];
  correctCharacterSoundFiles = [];
  wrongCharacterSoundFiles = [];
  currentStudySound:Sound;
  currentCharacter = '';
  currentRowCharacters = [];


  currentLeftAxisConsonant = '';
  characterChartLeftAxis = ['NA','K','G','S','Z','T','D','N','H','B','P','M','Y','R','W','n'];
  characterSoundFilesAvailable = {//Monographs only
    //a, i, u, e, o
    NA:['a.mp3', 'i.mp3', 'u.mp3', 'e.mp3', 'o.mp3'], //'∅'
    K:['ka.mp3', 'ki.mp3', 'ku.mp3', 'ke.mp3', 'ko.mp3'],
    G:['ga.mp3', 'gi.mp3', 'gu.mp3', 'ge.mp3', 'go.mp3'],
    S:['sa.mp3', 'shi.mp3', 'su.mp3', 'se.mp3', 'so.mp3'],
    Z:['za.mp3', 'ji.mp3', 'zu.mp3', 'ze.mp3', 'zo.mp3'],
    T:['ta.mp3', 'chi.mp3', 'tsu.mp3', 'te.mp3', 'to.mp3'],
    D:['da.mp3', 'ji.mp3', 'zu.mp3', 'de.mp3', 'do.mp3'],
    N:['na.mp3', 'ni.mp3', 'nu.mp3', 'ne.mp3', 'no.mp3'],
    H:['ha.mp3', 'hi.mp3', 'hu.mp3', 'he.mp3', 'ho.mp3'],
    B:['ba.mp3', 'bi.mp3', 'bu.mp3', 'be.mp3', 'bo.mp3'],
    P:['pa.mp3', 'pi.mp3', 'pu.mp3', 'pe.mp3', 'po.mp3'],
    M:['ma.mp3', 'mi.mp3', 'mu.mp3', 'me.mp3', 'mo.mp3'],
    Y:['ya.mp3', '', 'yu.mp3', '', 'yo.mp3'],
    R:['ra.mp3', 'ri.mp3', 'ru.mp3', 're.mp3', 'ro.mp3'],
    W:['wa.mp3', '', '', '', 'o.mp3'],
    n:['','','n.mp3','',''],
  };

  hiragana = [//Monographs only
    //a, i, u, e, o
    ['NA','あ', 'い', 'う', 'え', 'お'], //'∅'
    ['K','か', 'き', 'く', 'け', 'こ'],
    ['G','が', 'ぎ', 'ぐ', 'げ', 'ご'],
    ['S','さ', 'し', 'す', 'せ', 'そ'],
    ['Z','ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
    ['T','た', 'ち', 'つ', 'て', 'と'],
    ['D','だ', 'ぢ', 'づ', 'で', 'ど'],
    ['N','な', 'に', 'ぬ', 'ね', 'の'],
    ['H','は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['B','ば', 'び', 'ぶ', 'べ', 'ぼ'],
    ['P','ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
    ['M','ま', 'み', 'む', 'め', 'も'],
    ['Y','や', '', 'ゆ', '', 'よ'],
    ['R','ら', 'り', 'る', 'れ', 'ろ'],
    ['W','わ', '', '', '', 'を'],
    ['n','','','ん','',''],
  ];

  katakana = [//Monographs only
    //a, i, u, e, o
    ['NA','ア', 'イ', 'ウ', 'エ', 'オ'], //'∅'
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

  loadRowCharacterSounds(rowConsonant:string, characterSoundArray){ //from a single row
    this.currentLeftAxisConsonant = rowConsonant;
    var row = rowConsonant;
    if (row == ' '){
      row = 'NA';
    }
    //var sounds = [aSounds, oSounds, uSounds];
    for (var i =0; i < characterSoundArray.length; i++){
      switch (row) {
        case row == 'Y' && (i == 1 || i == 3):
          break;
        case row == 'W' && (i == 1 || i == 2 || i == 3):
          break;
        case row == 'n' && i != 2:
          break;
        default:
          console.log(this.characterSoundFilesAvailable[row][i]);
          var newSound = new Sound(this.characterSoundFilesAvailable[row][i], Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
          // loaded successfully
          //console.log('duration in seconds: ' + newSound.getDuration() + 'number of channels: ' + newSound.getNumberOfChannels());
          });
          this.soundFiles.push(newSound);
      }
    }
  }

  loadCorrectSound(){
    //load wrong letter sound
    var correctCharacterSound = ['NiceJob.mp3','Wonderful.mp3','Yep.mp3'];
    for (var i =0; i < correctCharacterSound.length; i++){
      var correctSound = new Sound(correctCharacterSound[i], Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      // loaded successfully
      //console.log('duration in seconds: ' + correctSound.getDuration() + 'number of channels: ' + correctSound.getNumberOfChannels());
      });
      this.correctCharacterSoundFiles.push(correctSound);
    }
  }

  loadWrongSound(){
    //load wrong letter sound
    var wrongCharacterSound = ['mistakeSound.mp3']
    for (var i =0; i < wrongCharacterSound.length; i++){
      var wrongSound = new Sound(wrongCharacterSound[i], Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      // loaded successfully
      //console.log('duration in seconds: ' + wrongSound.getDuration() + 'number of channels: ' + wrongSound.getNumberOfChannels());
      });
      this.wrongCharacterSoundFiles.push(wrongSound);
    }
  }

  loadSoundFiles(){
    this.loadCorrectSound();
    this.loadWrongSound();

    /*
    // can use for something
    //Use this instead of arrays
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
        console.log(key + " -> " + p[key]);
      }
    }
    */


  }

  playStudyCharacterSound(kana, consonant, character, reset?:bool){
    var kanaChart;
    if (kana == 'Katakana'){
      kanaChart = this.katakana;
    }else {
      kanaChart = this.hiragana;
    }
    var chartConsonantIndex = this.characterChartLeftAxis.indexOf(consonant);
    var soundIndex = kanaChart[chartConsonantIndex].indexOf(character) - 1;
    console.log(this.characterSoundFilesAvailable[consonant][soundIndex]);
    //play sound
    this.soundFiles[soundIndex].play();
    this.currentStudySound = this.soundFiles[soundIndex];

  }

  playCharacterSound(soundIndex){
    //console.log(soundIndex);//this.currentRowCharacters[soundIndex]);
    console.log(this.characterSoundFilesAvailable[this.currentLeftAxisConsonant][soundIndex]);

    //play the sound
    this.soundFiles[soundIndex].play();

  }


}
