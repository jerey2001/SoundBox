
import React, {
    Component,
} from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    View,
    Text
} from 'react-native';

import GridView from 'react-native-easy-gridview';
import SoundButton from './SoundButton';

const REQUEST_URL = 'https://raw.githubusercontent.com/jerey2001/SoundBox/master/sounds.json';

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
	      numberOfItemsPerRow={2}
              removeClippedSubviews={false}
              initialListSize={1}
              pageSize={2}
	    />
          />
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
        backgroundColor: 'powderblue'
    },
    item: {
        backgroundColor: 'navajowhite', 
        margin: 3, 
        paddingVertical: 7, 
        borderWidth: 4, 
        borderColor: 'orange', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCF0',
    }
});

AppRegistry.registerComponent('SoundBox', () => SoundBox);
