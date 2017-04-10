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
  Button,
  //LayoutAnimation,
} from 'react-native';
import DataSource from '../DataSource/DataSource';
import { NavigationActions } from 'react-navigation'

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

export default class PlayOrStudyScreen extends Component {
  currentRow; //= this.props.navigation.state.params.currentRow;
  constructor(props){
    super(props);
    this.state = {
      opacityPlayButton: 1,
      opacityStudyButton: 1,
    };
  }


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
        <Button
          title={'Back'}
          onPress = {()=>{goBack();
        //console.log(state);
        //state.params.returnScreen();
      }}
        />
            ),
    }),
  };

  componentWillUnmount(){
    //console.log(this.props);
    //this.props.navigation.state.params.returnScreen();
  }

  componentDidMount(){
    //this.currentRow = this.props.navigation.state.params.currentRow;
  }

  _navigateToGameScreen(navigate,rowData){
    //this._moveScreenWhenLeaving();
    navigate('Game', {isDifficult:false, currentRow:rowData, currentRowCharacters:rowData.clone().splice(1,5), currentCharacter: (rowData[0] != 'n')?rowData[1]:rowData[3]});//, returnScreen:this._moveScreenWhenReturned.bind(this)});
    //this._moveScreenWhenReturned();
  }

  _navigateToStudyScreen(navigate,rowData){
    //this._moveScreenWhenLeaving();
    navigate('Study', {currentRow:rowData, kana: this.props.navigation.state.params.kana});//, returnScreen:this._moveScreenWhenReturned.bind(this)});
    //this._moveScreenWhenReturned();
  }

  render(){
    var that = this;
    function covertToRomaji(place:number){
      var rowData = that.props.navigation.state.params.currentRow;
      //var romaji = '';
      if (rowData[0] == 'Y' && (place == 2 || place == 4)){
        return '';
      }
      if (rowData[0] == 'W' && (place == 2 || place == 3 || place == 4)){
        return '';
      }
      if (rowData[0] == 'n' && place == 3){
        return 'n';
      }else if (rowData[0] == 'n'){
        return '';
      }

      var vowels = ['','a','i','u','e','o']

      return ((rowData[0] != 'NA')?rowData[0]:'') + vowels[place];
    }
    var rowData = this.props.navigation.state.params.currentRow
    var titleText = (
      covertToRomaji(1) + ' ' +
      covertToRomaji(2) + ' ' +
      covertToRomaji(3) + ' ' +
      covertToRomaji(4) + ' ' +
      covertToRomaji(5) + ' '
    );

    function checkForNStyling(){
      if (rowData[0] == 'n'){
         return deviceWidth * .03;
      } else return deviceWidth * .01;
    }
    var checkForNStyle = checkForNStyling();

    const { navigate } = this.props.navigation;

    return (

        <View style ={navStyles.body}>
          <Text style ={{paddingLeft: checkForNStyle}}> {titleText} </Text>

          <TouchableWithoutFeedback
            onPressIn = {()=>{
              this.setState({
                opacityPlayButton: .75,
              });
            }}
            onPress = {this._navigateToGameScreen.bind(this,navigate,rowData)}
            onPressOut = {()=>{
              this.setState({
                opacityPlayButton: 1,
              });
            }}
            >
            <View style = {navStyles.bodyItemsHighlight}>
              <View style = {[navStyles.bodyItems, {opacity: this.state.opacityPlayButton}]}>
                <Text style = {navStyles.bodyItemText}>
                    Play
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn = {()=>{
              this.setState({
                opacityStudyButton: .75,
              });
            }}
            onPress = {this._navigateToStudyScreen.bind(this,navigate,rowData)}
            onPressOut = {()=>{
              this.setState({
                opacityStudyButton: 1,
              });
            }}
            >
          <View style = {navStyles.bodyItemsHighlight2}>
            <View style = {[navStyles.bodyItems2,{opacity: this.state.opacityStudyButton}]}>
              <Text style = {navStyles.bodyItemText2}>
                  Study
              </Text>
            </View>
          </View>
          </TouchableWithoutFeedback>
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
    justifyContent: 'flex-start',//'center',
    alignItems: 'center',
    backgroundColor: 'beige',
    height: deviceHeight - deviceHeight * .06,
  },
  bodyItems:{
    backgroundColor: 'peru',//'peru',
    height: deviceHeight * .2 - 20,
    width: deviceWidth * .8 - 20,
    //marginTop: deviceHeight * .15,
    alignItems:'center',
    //borderWidth: 1,
    justifyContent: 'center',
  },
  bodyItemsHighlight:{
    borderWidth: 2,
    borderColor: 'darkgray',
    backgroundColor: 'white',
    height: deviceHeight * .2,
    width: deviceWidth * .8,
    marginTop: deviceHeight * .15,
    alignItems:'center',
    justifyContent: 'center',
  },
  bodyItemText:{
    fontSize: 50,
    color: 'white',
    textShadowColor: 'gray',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
  },
  bodyItems2:{
    backgroundColor: 'white',
    height: deviceHeight * .2 - 20,
    width: deviceWidth * .8 - 20,
    //marginTop: deviceHeight * .15,
    alignItems:'center',
    //borderWidth: 1,
    justifyContent: 'center',
  },
  bodyItemsHighlight2:{
    borderWidth: 2,
    borderColor: 'lightgray',
    backgroundColor: 'seagreen',
    height: deviceHeight * .2,
    width: deviceWidth * .8,
    marginTop: deviceHeight * .15,
    alignItems:'center',
    justifyContent: 'center',
  },
  bodyItemText2:{
    fontSize: 50,
    color: 'seagreen',
    textShadowColor: 'gray',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
  }




});
