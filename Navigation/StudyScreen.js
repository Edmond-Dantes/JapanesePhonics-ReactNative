import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  Image,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import DataSource from '../DataSource/DataSource';
import GameLogic from '../GameLogic/GameLogic';
import Sound from 'react-native-sound';

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');



export default class StudyScreen extends Component {
  gameLogic:GameLogic;
  cloneRow = this.props.navigation.state.params.currentRow.clone();
  constructor(props) {
    super(props);
    this.gameLogic = new GameLogic();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.cloneRow.splice(1,5))
    };
  }


  static navigationOptions = {
      /*title: 'Main Menu',
      header: {
        visible: true,
      },
      */
      header: ({goBack, state})=>({
        visible: true,
        style: {backgroundColor:'beige'},
        //titleStyle: navStyles.letterHeader,
        //tintColor: 'tomato',
        left: (
          <Button
            title={'Back'}
            onPress = {()=>{
              goBack();
              //console.log(state);
            //state.params.returnScreen();
            }
          }
          />
              ),
      }),
    };

  componentDidMount(){
    var currentRow = this.props.navigation.state.params.currentRow;
    var cloneRow = currentRow.clone().splice(1,5);
    this.gameLogic.data.loadRowCharacterSounds(currentRow[0], cloneRow);
  }


  render() {
    const { navigate } = this.props.navigation;
    var currentRow = this.props.navigation.state.params.currentRow;
    var kana = this.props.navigation.state.params.kana;
    //console.log(this.props.navigation.state.key);
    //var letterArr = this.props.navigation.state.params.letterArr;
    return (
      <View style = {styles.container}>
        <ListView contentContainerStyle = {styles.listViewStyle}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <View style = {{height: deviceHeight * .13, /*backgroundColor:'green'*/}}>
              <View style = {{height: deviceHeight * .11, /*backgroundColor:'blue'*/}}>
                <TouchableWithoutFeedback style = {{height: deviceHeight * .05}}
                  onPress = {this.gameLogic.data.playStudyCharacterSound.bind(this.gameLogic.data.that, kana, currentRow[0],rowData,true)}
                  >
                  <View style = {styles.letterRow}>
                    <Text style = {styles.letter}>
                      {rowData}
                    </Text>
                    <Image
                      style = {{width: 40, height: 35}}
                      source = {(rowData == '')?null:require('../img/soundIcon.png')}/>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
      )}
        />
      </View>


    );
  }
}




const styles = StyleSheet.create({
  listViewStyle:{
    width: deviceWidth,
    alignItems: 'center',
  },
  container:{
    justifyContent: 'center',
    backgroundColor: 'beige',//'green',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    height: deviceHeight,
    width: deviceWidth,
    paddingTop: deviceHeight / 2 - deviceWidth * .75,
  },
  letter: {
    alignSelf: 'center',
    fontSize: 50,
    color: 'seagreen',//'ghostwhite',//'transparent'//'darkslategray'//'black'//"beige",
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
  letterRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',//'space-around',
    width: deviceWidth * .5,
    height: deviceHeight * .05,
  },

});
