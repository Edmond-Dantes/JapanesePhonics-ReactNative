import React, { Component } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TabNavigator, TabView } from 'react-navigation';

import GameView from "./Components/GameView";
import KatakanaScreen from "./Navigation/KatakanaScreen";
import HiraganaScreen from "./Navigation/HiraganaScreen";
import PlayOrStudyScreen from "./Navigation/PlayOrStudyScreen";
import StudyScreen from "./Navigation/StudyScreen";


export default class JapanesePhonics extends Component {




  render() {
    return (
      <App/>
    );
  }
}

Array.prototype.clone = function() {
  var clone = [];
  for (i = 0; i<this.length; i++){
    clone.push(this[i]);
  }
	return clone;
};

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');


const styles = StyleSheet.create({
  card:{
    backgroundColor: 'yellow',
  },
  letterHeader: {
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
  },
  header: {
    backgroundColor: 'beige',
  },

});

const MainTabScreen = TabNavigator(
  {
    KatakanaTab: { screen: KatakanaScreen },
    HiraganaTab: { screen: HiraganaScreen }
  },
  {
    //tabBarComponent: TabView.TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      style: {backgroundColor: 'beige'},
      labelStyle: [styles.letterHeader, {fontSize: 20}],
    }

  }
);

//const PlayOrStudyScreen = StackNavigator


const App = StackNavigator({
  Main: { screen: MainTabScreen },
  PlayOrStudy: {screen: PlayOrStudyScreen},
  Study: {screen: StudyScreen},
  Game: { screen: GameView },
},
  {
  initialRouteName: 'Main',
  //initialRouteParams: {letterArr: ['A','O','U']},
  navigationOptions: {
    header: {
      visible: false,
      style: styles.header,
      titleStyle: styles.letter,
      tintColor: 'tomato',
    },
  },
  mode: 'card',
  headerMode: 'screen',
  onTransitionStart: ()=>console.log('HUH'),
  //cardStyle: styles.card,

},
);





AppRegistry.registerComponent('JapanesePhonics', ()=> JapanesePhonics);
