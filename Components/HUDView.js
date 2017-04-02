import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

export default class HUDView extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }



  render(){
    var letterToDisplay; //= 'あ';

    return (
      <View style = {styles.hudView}>
        <Text style = {styles.text}>
          {letterToDisplay || this.props.currentCharacter}
        </Text>
        <View style = {{paddingTop: deviceHeight * .025}}>
          <View style = {styles.scoreView}>
            <Text style = {[styles.text, styles.math, styles.count ]}>
              Score:
            </Text>
          </View>
          <View style = {styles.scoreView}>
            <Text style = {[styles.text, styles.math, styles.count ]}>
              {this.props.scoreCount}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  hudView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',//'flex-start',//'center',
    //backgroundColor: "transparent",//'#F5FCFF',
    height: deviceHeight * .15,
    width: deviceWidth,
    top: 0,

  },
  text: {
    fontSize: (deviceHeight - deviceWidth) / 4,//100,
    color: 'ghostwhite',
    textAlign: 'right',
    width: deviceWidth/2,
    margin: deviceWidth / 25,//0,
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {
      width: 0,
      height: 1,
    }
  },
  math: {
    color: 'gold',//'goldenrod',
    fontWeight: 'bold',
  },
  times: {
    fontSize: (deviceHeight - deviceWidth) / 12,
    textShadowRadius: 1,
  },
  scoreView:{
    marginRight:deviceWidth * .2,
    width: deviceWidth / 3,
    height: deviceHeight * .07,
  },
  count: {
    //flex: 0,
    //flexDirection: 'column',
    //justifyContent: 'center',
    //backgroundColor: 'blue',
    margin: 0,
    width: deviceWidth / 2,
    height: deviceHeight * .1,
    fontSize: (deviceHeight - deviceWidth) / 8,
    textAlign: 'center',
  },
});
