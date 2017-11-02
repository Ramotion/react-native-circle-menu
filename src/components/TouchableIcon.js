import React, { Component, PropTypes, } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Platform } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

class TouchableIcon extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      animation: new Animated.Value(0),
    };
  }
  render() {
    const { icon, color, buttonSize, iconSize, backgroundColor, onPress, duration, afterAnimation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{
          position: 'relative',
          width: buttonSize,
          height: buttonSize,
        }}
        onPress={() => {
          onPress();
          if (Platform.OS === 'ios') {
            Animated.timing(
              this.state.animation,
              {
                duration,
                toValue: 1,
              }
            ).start(() => {
              this.state.animation.setValue(0);
              afterAnimation();
            });
          } else {
            afterAnimation();
          }
        }}
      >
        <Animated.View
          ref={ref => { this.burger = ref; }}
          style={[styles.container, {
            backgroundColor: 'transparent',
            borderColor: '#fff',
            position: 'absolute',
            top: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -buttonSize / 2]
            }),
            left: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -buttonSize / 2]
            }),
            borderWidth: this.state.animation.interpolate({
              inputRange: [0, 0.1, 1],
              outputRange: [0, buttonSize / 2, 0]
            }),
            width: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [buttonSize, buttonSize * 2]
            }),
            height: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [buttonSize, buttonSize * 2]
            }),
            borderRadius: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [buttonSize / 2, buttonSize]
            }),
          }]}
        >
          <View style={[styles.container, {
            backgroundColor,
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize,
          }]}>
            <Icon
              name={icon}
              color={ color || "white" }
              size={iconSize}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

TouchableIcon.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  afterAnimation: PropTypes.func,
  duration: PropTypes.number,
  buttonSize: PropTypes.number,
  iconSize: PropTypes.number,
};

TouchableIcon.defaultProps = {
  onPress: () => {},
  afterAnimation: () => {},
  duration: 250,
  buttonSize: 40,
  iconSize: 20,
  backgroundColor: '#fff',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TouchableIcon;
