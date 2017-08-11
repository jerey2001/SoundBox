import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';

import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

export default class SoundButton extends React.Component {

    playSound = () => {
        try {
	  console.log('Trying to play ',this.props.sound.url);
          ReactNativeAudioStreaming.play(this.props.sound.url, {});
        } catch (e) {
            console.log('cannot play the sound file', e);
        }
    };

    render() {
        return (
            <View>
                <Button title={this.props.sound.label} onPress={this.playSound} />
            </View>
        );
    }
}

