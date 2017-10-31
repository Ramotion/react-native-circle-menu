import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';

import * as Progress from 'react-native-progress';
import TouchableIcon from './TouchableIcon';

export default class ActionIcon extends Component {

  constructor(props) {
    super(props);

    this.radius = (this.props.radius / 2 + this.props.size / 2);

    this.state = {
      isActive: false,
      startDeg: (this.props.angle * 180 / Math.PI) + 90,
      progress: 0,
      circleWidth: this.props.size,
    }

    this.animation = new Animated.Value(0);
    this.closeAnimation = new Animated.Value(0);

    this.animation.addListener(({ value }) => {

      this.move(value);
      this.setState({
        progress: value,
      });
    });

    this.closeAnimation.addListener(({ value }) => {

      this.setState({
        circleWidth: this.props.size + (this.props.size * value / 5),
      });
    });
  }

  move(value) {
    const angle = this.props.angle + Math.PI * 2 * value;
    this.btn.setNativeProps({
      style: {
        transform: [
          {
            translateY: this.radius * Math.sin(angle),
          },
          {
            translateX: this.radius * Math.cos(angle),
          },
        ]
      }
    });
  }

  renderCircle() {
    const radius = this.props.radius + this.props.size;
    const outRadius = radius * 2;

    const border = (this.props.size - 50) / 2 + 5;

    return (
      <Animated.View
        style={{
          display: this.state.isActive ? 'flex' : 'none',
          position: 'absolute',
          top:  -this.props.radius / 2,
          height: outRadius + this.props.size * 2,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{
            rotate: this.state.startDeg + 'deg',
          }],
          opacity: this.closeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.3],
          }),
        }}
      >
        <Progress.Circle
          size={this.props.radius + (border * 2) + this.state.circleWidth * 2}
          color={this.props.buttonColor}
          borderWidth={border}
          borderColor="rgba(0, 0, 0, 0)"
          progress={this.state.progress}
          thickness={this.state.circleWidth}
          strokeCap="round"
          animated={false}
        />
      </Animated.View>
    );
  }

  startAnimation() {
    this.setState({
      isActive: true,
    });

    const left = (this.props.size - 50) / 2 + 5;

    this.wraper.setNativeProps({
      style: [this.props.style, {
        zIndex: 1000,
        width: this.props.radius + this.props.size * 4,
        left: -(this.props.radius + this.props.size) / 2 - left - this.props.size,
        height: this.props.radius + this.props.size * 4,
        top: -(this.props.radius + this.props.size) / 2 - this.props.size,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
      }],
    });

    this.animation.setValue(0);

    Animated.timing(
      this.animation,
      {
        duration: this.props.duration,
        toValue: 1,
      }
    ).start(() => {
      this.startClose();
    });
  }

  startClose() {
    this.wraper.setNativeProps({
      style: [this.props.style, {
        backgroundColor: this.props.bgColor,
      }],
    });

    Animated.timing(
      this.closeAnimation,
      {
        toValue: 1,
        duration: 300,
      }
    ).start(() => {
      this.closeAnimation.setValue(0);
      this.props.onPress();
    });
  }

  render() {
    const yTranslateFrom = this.radius * Math.sin(this.props.angle);
    const xTranslateFrom = this.radius * Math.cos(this.props.angle);
    const yTranslateTo = (this.radius + this.props.size / 3) * Math.sin(this.props.angle);
    const xTranslateTo = (this.radius + this.props.size / 3) * Math.cos(this.props.angle);

    return (
      <Animated.View 
        style={[this.props.style]}
        ref={(ref) => this.wraper = ref}
      >
        {this.renderCircle()}
        <Animated.View
          ref={(ref) => this.btn = ref}
          style={[{
            opacity: this.props.anim,
            width: this.props.size,
            height: this.props.size,
            zIndex: 100,
            opacity: this.closeAnimation.interpolate({
              inputRange: [0, 0.01],
              outputRange: [1, 0],
            }),
            transform: [
              {
                translateY: yTranslateFrom,
              },
              {
                translateX: xTranslateFrom,
              },
              {
                scale: this.props.anim.interpolate({
                  inputRange: [0, 0.75, 1],
                  outputRange: [0, 1.2, 1],
                })
              }, 
            ]
          }]}
        >
          <TouchableOpacity
            style={{flex:1}}
            activeOpacity={this.props.activeOpacity || 0.85}
            onPress={this.startAnimation.bind(this)}>
            <View
              style={[styles.actionButton, {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
                backgroundColor: this.props.buttonColor,
              }]}
            >
              <TouchableIcon
                icon={this.props.icon} color="white" backgroundColor={this.props.buttonColor} buttonSize={this.props.size}
                afterAnimation={this.startAnimation.bind(this)}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }

}

ActionIcon.propTypes = {
  angle: PropTypes.number,
  radius: PropTypes.number,
  buttonColor: PropTypes.string,
  style: View.propTypes.style,
  onPress: PropTypes.func,
  afterPress: PropTypes.func,
  duration: PropTypes.number,
  size: PropTypes.number,
  icon: PropTypes.string.isRequired,
};

ActionIcon.defaultProps = {
  duration: 500,
  onPress: () => { },
  afterPress: () => { },
};

const styles = StyleSheet.create({
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 2,
    position: 'absolute',
  },
  circle: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E1329',
    position: 'relative',
  },
  leftWrap: {
    overflow: 'hidden',
    position: 'absolute',
  },
  rightWrap: {
    position: 'absolute',
  },
  loader: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 1000,
  },
  innerCircle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  actionContainer: {
    flexDirection: 'column',
    padding: 0,
    alignItems: 'center',
  },
});