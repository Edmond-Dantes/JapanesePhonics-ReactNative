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

var katakana = (new DataSource()).katakana;

class ChartTitleRow extends Component{
  render(){
    var top = ['','a','i','u','e','o'];
    return (
      <View style = {styles.chartTitle}>
        <View style = {styles.chartTitleElements}>
          <Text style = {{textAlign: 'center'}}> {top[1]} </Text>
        </View>
        <View style = {styles.chartTitleElements}>
          <Text style = {{textAlign: 'center'}}> {top[2]} </Text>
        </View>
        <View style = {styles.chartTitleElements}>
          <Text style = {{textAlign: 'center'}}> {top[3]} </Text>
        </View>
        <View style = {styles.chartTitleElements}>
          <Text style = {{textAlign: 'center'}}> {top[4]} </Text>
        </View>
        <View style = {styles.chartTitleElements}>
          <Text style = {{textAlign: 'center'}}> {top[5]} </Text>
        </View>
      </View>


    );
  }
}

class Row extends Component{
  render(){
    var leftAxis = this.props.rowData[0] == 'NA' ? '' : this.props.rowData[0];
    return (
      <TouchableOpacity onPress = {this.props.onPress}>
        <View style = {styles.row}>
          <View style = {{alignSelf: 'center', width: 17}}>
            <Text>{leftAxis}</Text>
          </View>
          <View style = {[styles.rowElement,{borderLeftWidth:2}]}>
            <Text style = {styles.letter}> {this.props.rowData[1]} </Text>
          </View>
          <View style = {styles.rowElement}>
            <Text style = {styles.letter}> {this.props.rowData[2]} </Text>
          </View>
          <View style = {styles.rowElement}>
            <Text style = {styles.letter}> {this.props.rowData[3]} </Text>
          </View>
          <View style = {styles.rowElement}>
            <Text style = {styles.letter}> {this.props.rowData[4]} </Text>
          </View>
          <View style = {[styles.rowElement,{borderRightWidth:2}]}>
            <Text style = {styles.letter}> {this.props.rowData[5]} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class KatakanaScreen extends Component {
  //katakana = (new DataSource()).katakana;
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      position : new Animated.Value(0),
      dataSource: ds.cloneWithRows(katakana),
    };
  }
  static navigationOptions = {
    /*title: 'Main Menu',
    header: {
      visible: true,
    },
    */
    tabBar: {
      visible: true,
      label: 'Katakana',
    }
  };

  componentWillUnmount(){
    //console.log("UNMOUNTED MS");
  }

  _moveScreenWhenLeaving(){
    Animated.timing(
      this.state.position,
      {
        duration: 300,
        toValue: -deviceHeight * .25,
        //easing: Easing.out(Easing.ease),
      }
    ).start(/*this._moveScreenWhenReturned.bind(this)*/);
  }

  _moveScreenWhenReturned(){
    Animated.timing(
      this.state.position,
      {
        duration: 300,
        toValue: 0,
        //easing: Easing.out(Easing.ease),
      }
    ).start();
  }

  render() {
    const { navigate } = this.props.navigation;
    var swipeLeftText = '^^^ Scroll Down for more   or   Swipe Left for Hiragana <<<';

    //console.log(this.props.navigation.state.key);
    //var letterArr = this.props.navigation.state.params.letterArr;
    return (
      <Animated.View style = {[styles.container,
        {
          transform:[
            {translateX: this.state.position}
          ]
        }
        ]}
          >
        <ChartTitleRow/>
        <ListView contentContainerStyle = {styles.listViewStyle}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>

          <Row
            rowData = {rowData}
            onPress = {() => {
              this._moveScreenWhenLeaving();
              navigate('PlayOrStudy', {currentRow:rowData, kana:'Katakana', returnScreen:this._moveScreenWhenReturned.bind(this)});
              //this._moveScreenWhenReturned();
            }}
          />
        }
        />
        <View style = {{justifyContent: 'center', height: deviceHeight * .10}}>
          <Text style = {styles.swipe}> {swipeLeftText} </Text>
        </View>
      </Animated.View>


    );
  }
}




const styles = StyleSheet.create({
  listViewStyle:{
    width: deviceWidth,
    //height: deviceHeight,
  },
  container:{
    justifyContent: 'center',
    backgroundColor: 'beige',//'green',
    //alignItems: 'center',
    //alignSelf: 'center',
    //flex: 1,
    height: deviceHeight - deviceHeight * .06,
    width: deviceWidth,
    paddingTop: deviceHeight * 0.01, //- deviceWidth * .85,
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',//'center',
    paddingRight: deviceWidth/20,
    //borderWidth: 2,
    //borderColor: 'black',
    //borderStyle: 'solid',
  },
  chartTitle:{
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',//'center',
    paddingRight: deviceWidth/20,
    height: 30,
    //backgroundColor: 'blue',
  },
  chartTitleElements:{
    //flex: 1,
    //justifyContent: 'flex-end',
    //backgroundColor: 'white',
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    width: deviceWidth/6,
    height: 20,
  },
  rowElement:{
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: deviceWidth/6,
  },
  letter: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'tomato',//'ghostwhite',//'transparent'//'darkslategray'//'black'//"beige",
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    //width: deviceWidth,
    backgroundColor: 'transparent',
    margin: 10,
  },
  swipe: {
    //flex:1,
    //position: 'absolute',
    paddingLeft: deviceWidth/20,
    alignSelf: 'center',
    fontSize: 10,
    color: 'darkslategray',//'ghostwhite',//'transparent'//'darkslategray'//'black'//"beige",
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    //width: deviceWidth,
    backgroundColor: 'transparent',
  },

});
