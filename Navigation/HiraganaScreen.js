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
  TouchableWithoutFeedback,
  //LayoutAnimation,
} from 'react-native';
import DataSource from '../DataSource/DataSource';
import { NavigationActions } from 'react-navigation'

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

var hiragana = (new DataSource()).hiragana;

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
  //borderWidth =
  //pressed = false;
  constructor(props){
    super(props);
    this.state = {
      pressed : new Animated.Value(0),
      borderRightWidth: StyleSheet.flatten(styles.chartBody).borderRightWidth,//new Animated.Value(0),
      borderBottomWidth: StyleSheet.flatten(styles.chartBody).borderBottomWidth,//new Animated.Value(0),
      marginTop: 0,//StyleSheet.flatten(styles.chartBody).,
    };
  }

  _onPressIn(){

    //console.log('_onPressIn()');
    this.setState({
      pressed: 1,
      borderRightWidth: 2,
      borderBottomWidth: 0,
      marginTop: 1,
    });
    /*Animated.timing(                            // Animate value over time
      this.state.pressed,                      // The value to drive
      {
        toValue: 1,
        duration:0,                             // Animate to final value of 1
      }
    ).start();
    */
  }

  _onPressOut(){
    var that = this;
    setTimeout( () =>{
      that.setState({
        pressed: 0,
        borderRightWidth:StyleSheet.flatten(styles.chartBody).borderRightWidth,
        borderBottomWidth:StyleSheet.flatten(styles.chartBody).borderBottomWidth,
        marginTop: 0,
      });
    }, 300);
  }

  _onPress(){
    this.props.onPress()
/*
    this.setState({
      pressed: 1,
      borderRightWidth: 2,
      borderBottomWidth: 0,
      marginTop: 1,
    });
    var that = this;

    setTimeout( () =>{
      that.setState({
        pressed: 0,
        borderRightWidth:StyleSheet.flatten(styles.chartBody).borderRightWidth,
        borderBottomWidth:StyleSheet.flatten(styles.chartBody).borderBottomWidth,
        marginTop: 0,
      });
    }, 300);
    */
  }

  componentDidMount(){/*
    this.state.borderRightWidth = this.state.pressed.interpolate({
      inputRange: [0, 1],
      outputRange: [StyleSheet.flatten(styles.chartBody).borderRightWidth, 0],
    });
    this.state.borderBottomWidth = this.state.pressed.interpolate({
      inputRange: [0, 1],
      outputRange: [StyleSheet.flatten(styles.chartBody).borderBottomWidth, 0],
    });*/
  }

  render(){
    var leftAxis = this.props.rowData[0] == 'NA' ? '' : this.props.rowData[0];




    return (
      <TouchableWithoutFeedback
        onPressIn = {this._onPressIn.bind(this)}
        onPress = {this._onPress.bind(this)}
        onPressOut = {this._onPressOut.bind(this)}
        >
        <View style = {styles.row}>
          <View style = {{alignSelf: 'center', width: 17}}>
            <Text>{leftAxis}</Text>
          </View>
          <Animated.View style = {[styles.chartBodyHighlight, {marginTop:this.state.marginTop, paddingLeft: this.state.marginTop}] }>
            <Animated.View style = {[styles.chartBody, {borderRightWidth: this.state.borderRightWidth, borderBottomWidth: this.state.borderBottomWidth}]}>
              <View style = {[styles.rowElement]}>
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
              <View style = {[styles.rowElement]}>
                <Text style = {styles.letter}> {this.props.rowData[5]} </Text>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class HiraganaScreen extends Component {
  //katakana = (new DataSource()).katakana;
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      position : new Animated.Value(0),
      dataSource: ds.cloneWithRows(hiragana),
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
      label: 'Hiragana',
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
    var swipeRightText = '>>> Swipe Right for Katakana   or   Scroll Down for more ^^^';

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
              //this._moveScreenWhenLeaving();
              navigate('PlayOrStudy', {currentRow:rowData, kana:'Hiragana', returnScreen:this._moveScreenWhenReturned.bind(this)});

            }}
          />
        }
        />
        <View style = {{justifyContent: 'center', height: deviceHeight * .10}}>
          <Text style = {styles.swipe}> {swipeRightText} </Text>
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
    width: deviceWidth/6,
    height: 20,
  },
  chartBody:{
    //flex: 1,
    //justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'lightgray',//'gray',//'lightblue',
    //borderRadius: 5,
    borderWidth: 3,
    borderTopWidth: 1,
    //borderBottomWidth: 0,
    //borderRightWidth: 3,
    borderLeftWidth: 1,
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    width: 5*deviceWidth/6,
    //height: 20,
  },
  chartBodyHighlight:{
    margin: 2,
    //flex: 1,
    justifyContent: 'center',//'flex-end',
    flexDirection: 'row',
    //shadowColor: 'black',
    //shadowOffset: {width:0, height:1},
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderColor: 'gray',//'lightblue',//'gray',
    //borderBottomColor: 'gray',
    borderRadius: 2,//7,
    //borderBottomRightRadius: 5,
    //borderWidth: 1,
    borderTopWidth: 0,
    //borderBottomWidth: 0,
    //borderRightWidth: 1,
    borderLeftWidth: 0,
    borderWidth: 1,
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    width: 5*deviceWidth/6,
    //height: 20,
  },
  rowElement:{
    backgroundColor: 'transparent',
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
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
