//@flow

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
//import Sound from 'react-native-sound';
//import LetterView from './LetterView';
//import HUDView from "./HUDView";

//var Sound = require('react-native-sound');
import Sound from 'react-native-sound';
import DataSource from '../DataSource/DataSource';


var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

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

export default class GameLogic{
  data:DataSource;
  previousRandomLetterIndex: number;
  randomLetterIndex: number;
  randomCorrectSoundIndex:number;
  previousCorrectSoundIndex:number;
  positionToShow: number;
  previousRandomNumber: number;
  previousRandomDelayDelta: number;
  previousRandomDelay: number;
  scoreCount: number;
  randomLetterRevealStartTimer;
  letterRevealTimer;

  that = this;
  constructor(){
    this.previousRandomLetterIndex = -1;
    this.randomLetterIndex = 0;
    this.positionToShow = 0;
    this.previousRandomNumber = 0;
    this.previousRandomDelayDelta = 0;
    this.previousRandomDelay = 0;
    this.randomCorrectSoundIndex = 0;
    this.previousCorrectSoundIndex = 0;
    this.scoreCount = 0;
    this.data = new DataSource();

    //this.loadSoundFiles();

  }

  randomLetterRevealUpdate(averageLetterDisplayTime:number, renderUpdate = ()=>{}, activeScoreTouchUpdate = ()=>{}){
      var randomNumber = getNewRandomInt(1, 4, this.previousRandomNumber)
      var randomDisplayDelta = getNewRandomInt(0, (averageLetterDisplayTime / 100), this.previousRandomDelayDelta) * 100 - averageLetterDisplayTime/2

      this.positionToShow = randomNumber;
      this.previousRandomNumber = randomNumber;
      this.previousRandomDelayDelta = randomDisplayDelta;
      this.previousRandomLetterIndex = this.randomLetterIndex;
      renderUpdate();

      this.letterRevealTimer = setTimeout( () => {
        this.positionToShow = 0;
        renderUpdate();
        activeScoreTouchUpdate();
      }, averageLetterDisplayTime + randomDisplayDelta);
  }

  startRandomLetterReveal(renderUpdate, activeScoreTouchUpdate, willRestart:bool = false, revealReliefTime:number){
    var that = this;
    var averageLetterDisplayTime = 1000; //range = 50% to 150%
    var averageTimerInterval = 2000; //range = 75% to 125%
    if (willRestart){
      setTimeout(()=>{
        this.positionToShow = 0;
        activeScoreTouchUpdate();
        renderUpdate();
        call();
      }, revealReliefTime);
      //this.positionToShow = 0;
      this.previousRandomLetterIndex = this.randomLetterIndex;
      this.previousRandomNumber = this.positionToShow

    }else{
      call();
    }
    function call(){

      (function setTimeoutTimer(){
        var randomDelay = averageTimerInterval + (averageTimerInterval / 8) * getNewRandomInt(0, 4, that.previousRandomDelay) - averageLetterDisplayTime/4;
        that.randomLetterRevealStartTimer = setTimeout( ()=>{
          that.randomLetterIndex = getNewRandomInt(0, that.data.currentRowCharacters.length - 1, that.previousRandomLetterIndex);
          //var randomLetterIndex = that.randomLetterIndex;
          if (that.data.currentRowCharacters[that.randomLetterIndex] === that.data.currentCharacter){
            that.randomCorrectSoundIndex = getNewRandomInt(0, that.data.correctCharacterSoundFiles.length - 1, that.previousCorrectSoundIndex);
            that.previousCorrectSoundIndex = that.randomCorrectSoundIndex;
          }

          that.randomLetterRevealUpdate(averageLetterDisplayTime, renderUpdate, activeScoreTouchUpdate);
          that.previousRandomDelay = randomDelay;
          that.data.playCharacterSound(that.randomLetterIndex);
          renderUpdate();
          setTimeoutTimer();
        }, randomDelay);
      })();
    }
  }

  stopRandomLetterReveal(){
    //var that = this;
    //this.stopSounds();
    clearTimeout(this.letterRevealTimer);
    clearTimeout(this.randomLetterRevealStartTimer);
    //clearInterval();
  }

  getThis(){
    var that = this;
    return that
  }

  

}
