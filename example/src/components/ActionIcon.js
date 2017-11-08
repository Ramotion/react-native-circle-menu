import React, {Component, PropTypes} from 'react'
import {View, Animated, TouchableOpacity} from 'react-native'

import * as Progress from 'react-native-progress'
import TouchableIcon from './TouchableIcon'

import constants from '../constants'

const styles = {
  actionButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 2,
    position: 'absolute'
  },
  circle: {
    alignItems: 'center',
    backgroundColor: '#0E1329',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  leftWrap: {
    overflow: 'hidden',
    position: 'absolute'
  },
  rightWrap: {
    position: 'absolute'
  },
  loader: {
    borderRadius: 1000,
    left: 0,
    position: 'absolute',
    top: 0
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1
  },
  actionContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 0
  }
};

export default class extends Component {
  static propTypes = {
    afterPress: PropTypes.func,
    angle: PropTypes.number,
    buttonColor: PropTypes.string,
    duration: PropTypes.number,
    icon: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    radius: PropTypes.number,
    size: PropTypes.number,
    style: View.propTypes.style
  };

  static defaultProps = {
    afterPress() {},
    duration: 500,
    onPress() {}
  };

  constructor(props) {
    super(props);

    this.radius = (props.radius / 2 + props.size / 2);

    this.state = {
      isActive: false,
      startDeg: (props.angle * 180 / Math.PI) + 90,
      progress: 0,
      circleWidth: props.size
    };

    this.animation = new Animated.Value(0);
    this.closeAnimation = new Animated.Value(0);

    this.animation.addListener(({value}) => {
      this.move(value);
      this.setState({progress: value});
    });
  }

  move(value) {
    const angle = this.props.angle + Math.PI * 2 * value;

    this.btn.setNativeProps({
      style: {
        transform: [
          {translateY: this.radius * Math.sin(angle)},
          {translateX: this.radius * Math.cos(angle)}
        ]
      }
    })
  }

  startAnimation = () => {
    this.setState({isActive: true});

    const left = (this.props.size - constants.BUTTON_SIZE - 10) / 2 + 5;
    const size = this.props.radius + this.props.size * 4;
    const position = -(this.props.radius + this.props.size) / 2;

    this.wraper.setNativeProps({
      style: [this.props.style, {
        alignItems: 'center',
        height: size,
        justifyContent: 'center',
        left: position - left - this.props.size,
        overflow: 'visible',
        top: position - this.props.size,
        width: size,
        zIndex: 1000
      }]
    });

    this.animation.setValue(0);

    Animated.timing(this.animation, {
      duration: this.props.duration,
      toValue: 1
    }).start(this.startClose)
  };

  startClose = () => {
    this.wraper.setNativeProps({
      style: [this.props.style, {
        backgroundColor: this.props.bgColor
      }]
    });

    Animated.timing(this.closeAnimation, {
      duration: 300,
      toValue: 1
    }).start(() => {
      this.closeAnimation.setValue(0);
      this.props.onPress()
    })
  };

  render() {
    const radius = this.props.radius + this.props.size;
    const outRadius = radius * 2;
    const border = (this.props.size - 50) / 2 + 5;

    return <Animated.View
      style={[this.props.style]}
      ref={(ref) => this.wraper = ref}
    >
      <Animated.View style={{
        alignItems: 'center',
        display: this.state.isActive ? 'flex' : 'none',
        height: outRadius + this.props.size * 2,
        justifyContent: 'center',
        opacity: this.closeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, .3]
        }),
        position: 'absolute',
        top: -this.props.radius / 2,
        transform: [{rotate: this.state.startDeg + 'deg'}]
      }}>
        <Progress.Circle
            animated={false}
            borderColor="rgba(0, 0, 0, 0)"
            borderWidth={border}
            color={this.props.buttonColor}
            progress={this.state.progress}
            size={this.props.radius + (border * 2) + 2 + this.state.circleWidth * 2}
            strokeCap="round"
            thickness={this.state.circleWidth + 4}
        />
      </Animated.View>

      <Animated.View
        ref={ref => this.btn = ref}
        style={[{
          height: this.props.size,
          opacity: this.closeAnimation.interpolate({
            inputRange: [0, 0.1],
            outputRange: [1, 0]
          }),
          transform: [
            {scale: this.props.animation.interpolate({
              inputRange: [0, 0.3, .75, 1],
              outputRange: [.1, .1, 1.2, 1]
            })},
            {translateX: this.radius * Math.cos(this.props.angle)},
            {translateY: this.radius * Math.sin(this.props.angle)}
          ],
          width: this.props.size,
          zIndex: 100
        }]}
      >
        <TouchableOpacity
          activeOpacity={this.props.activeOpacity || .85}
          onPress={this.startAnimation}
          style={{flex:1}}
        >
          <View style={[styles.actionButton, {
            backgroundColor: this.props.buttonColor,
            borderRadius: this.props.size / 2,
            height: this.props.size,
            width: this.props.size
          }]}>
            <TouchableIcon
              afterAnimation={this.startAnimation}
              backgroundColor={this.props.buttonColor}
              buttonSize={this.props.size - 2}
              color="#FFF"
              iconSize={27}
              icon={this.props.icon}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  }
}