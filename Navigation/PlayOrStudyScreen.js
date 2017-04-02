import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  Animated,
  TouchableOpacity,
  //LayoutAnimation,
} from 'react-native';
import DataSource from '../DataSource/DataSource';
import { NavigationActions } from 'react-navigation'

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

export default class PlayOrStudyScreen extends Component {
  static navigationOptions = {
    title: ({ state }) => `${
      state.params.currentRow[1] + ' ' +
      state.params.currentRow[2] + ' ' +
      state.params.currentRow[3] + ' ' +
      state.params.currentRow[4] + ' ' +
      state.params.currentRow[5]
    }`,
    header: ({goBack, state})=>({
      visible: true,
      style: navStyles.header,
      titleStyle: navStyles.letterHeader,
      tintColor: 'tomato',
      left: (
        <Text onPress = {()=>{goBack();
        console.log(state);
        state.params.returnScreen();
      }}
          >
          Back
        </Text>
            ),
    }),
  };

  render(){
    return (
      <View style ={navStyles.body}>
        <View style = {navStyles.bodyItems}>
          <Text style = {navStyles.bodyItemText}>Play</Text>
        </View>
        <View style = {navStyles.bodyItems}>
          <Text style = {navStyles.bodyItemText}>Study</Text>
        </View>

      </View>
    );
  }

}


const navStyles = StyleSheet.create({
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
  body:{
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'beige',
    height: deviceHeight - deviceHeight * .06,
  },
  bodyItems:{
    height: deviceHeight * .2,
    marginTop: deviceHeight * .15,
  },
  bodyItemText:{
    fontSize: 100,
  }

});
