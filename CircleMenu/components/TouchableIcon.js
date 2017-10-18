import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

class TouchableIcon extends Component {
    render() {
        const { icon, color, backgroundColor, onPress } = this.props;

        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View
                    style={[styles.container, {
                        backgroundColor
                    }]}
                >
                    <Icon
                        name={icon}
                        color={ color || "white" }
                        size={ICON_SIZE}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const BUTTON_SIZE = 40
const ICON_SIZE = 20;
const BORDER_RADIUS = BUTTON_SIZE / 2;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
    },
});

export default TouchableIcon;
