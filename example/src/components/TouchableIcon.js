import React, {Component, PropTypes} from 'react'
import {View, TouchableWithoutFeedback, Animated, Platform} from 'react-native'
import {Ionicons as Icon} from '@expo/vector-icons'

import constants from '../constants'

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default class extends Component {
  static propTypes = {
	afterAnimation: PropTypes.func,
	backgroundColor: PropTypes.string.isRequired,
	buttonSize: PropTypes.number,
	color: PropTypes.string,
	duration: PropTypes.number,
	icon: PropTypes.string.isRequired,
	iconSize: PropTypes.number,
	onPress: PropTypes.func
  };

  static defaultProps = {
    afterAnimation() {},
    backgroundColor: '#FFF',
    buttonSize: constants.BUTTON_SIZE,
    duration: 250,
    iconSize: 25,
    onPress() {}
  };

  state = {
    animation: new Animated.Value(0)
  };

  render() {
    const {
      afterAnimation,
      backgroundColor,
      buttonSize,
      color,
      duration,
      icon,
      iconSize,
      onPress
    } = this.props;

    let size = buttonSize;

    if (Platform.OS === 'ios') {
      size += 1;
    }

    return <TouchableWithoutFeedback
      style={{
        height: buttonSize,
        position: 'relative',
        width: buttonSize
      }}
      onPress={() => {
        onPress();

        if(Platform.OS === 'ios') {
          Animated.timing(this.state.animation, {
            duration,
            toValue: 1
          }).start(() => {
            this.state.animation.setValue(0);
            afterAnimation()
          })
        } else {
          afterAnimation()
        }
      }}
    >
      <Animated.View style={[styles.container, {
        backgroundColor: 'transparent',
        borderColor: '#FFF',
        borderRadius: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [buttonSize / 2, buttonSize]
        }),
        borderWidth: this.state.animation.interpolate({
          inputRange: [0, .1, 1],
          outputRange: [0, buttonSize / 2, 0]
        }),
        height: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [buttonSize, buttonSize * 2]
        }),
        left: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -buttonSize / 2]
        }),
        position: 'absolute',
        top: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -buttonSize / 2]
        }),
        width: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [buttonSize, buttonSize * 2]
        })
      }]}>
        <View style={[styles.container, {
          backgroundColor,
          borderRadius: buttonSize,
          height: size,
          width: size,
          paddingTop: Platform.OS === 'ios' ? 2 : 0,
          paddingLeft: Platform.OS === 'ios' ? 1 : 0,
          borderColor: 'transparent'
        }]}>
          <Icon
            color={color || '#FFF'}
            name={icon}
            size={iconSize}
          />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  }
}
