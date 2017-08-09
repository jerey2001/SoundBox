
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

import SoundButton from './SoundButton';

const REQUEST_URL = 'https://raw.githubusercontent.com/jerey2001/LfSoundBox/master/sounds.json';

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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderSound}
                style={styles.listView}
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
        return <SoundButton sound={sound} />;
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCF0',
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#FFFFFF',
    },
    rightContainer: {
        flex: 1,
    }
});

AppRegistry.registerComponent('SoundBox', () => SoundBox);
