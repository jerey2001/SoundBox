import React, {
    Component,
} from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

import GridView from 'react-native-easy-gridview'; // 1.0.2
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming'; // 2.3.2

const REQUEST_URL = 'https://raw.githubusercontent.com/jerey2001/SoundBox/master/sounds.json';


class SoundButton extends React.Component {
  // right padding s with c to a total of n chars
    padding_right(s, c, n) {
      if (! s || ! c || s.length >= n) {
        return s;
      }
      var max = (n - s.length)/c.length;
      for (var i = 0; i < max; i++) {
        s += c;
      }
      return s;
    }
    
    formatString(s) {
      return this.padding_right(s,'-',30).substring(0,30);
    }
    
    playSound = () => {
    try {
	        console.log('Trying to play ',this.props.sound.url);
          ReactNativeAudioStreaming.play(this.props.sound.url, {});
        } catch (e) {
          console.log('cannot play the sound file', e);
        }
    };
    
    render() {
     // var stringFormated = this.formatString(this.props.sound.label);
      return (
        <View>
          <Button color="#088A60" title={this.props.sound.label} onPress={this.playSound} />
        </View>
        );
    }
}


export default class SoundBox extends Component {
  constructor(props) {
    super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
      };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
           this.setState({
             dataSource: this.state.dataSource.cloneWithRows(responseData.sounds),
             loaded: true,
           });
        })
        .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.listContainer}>
         <GridView
           dataSource={this.state.dataSource}
           renderRow={this.renderSound}
           numberOfItemsPerRow={3}
           removeClippedSubviews={false}
           initialListSize={1}
           pageSize={3}
	       />
      </View>
    );
  }


  renderLoadingView = () => {
    return (
      <View style={styles.container}>
        <Text>
          Chargement en cours.... (alors ferme là et attends)
        </Text>
      </View>
    );
  };

  renderSound = (sound) => {
    return (
      <View style={styles.item}>
        <SoundButton sound={sound} />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1, 
    backgroundColor: '#ffffff'
  },
  item: {
    backgroundColor: '#ffffff', 
    margin: 3, 
    paddingVertical: 1, 
    borderWidth: 1, 
    borderColor: '#ffffff', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#ffffff',
  }
});

AppRegistry.registerComponent('SoundBox', () => SoundBox);

