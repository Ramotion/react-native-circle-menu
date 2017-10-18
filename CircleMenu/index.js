import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import {ActionButtonItem, TouchableIcon } from './components';
import constants from './constants';

const { width, height } = Dimensions.get('window');

const alignMap = {
  center: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    startDegree: 0,
    endDegree: 360,
  },

  left: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    startDegree: 270,
    endDegree: 360,
  },

  right: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    startDegree: 180,
    endDegree: 270,
  },
};

export default class CircleMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      circleColor: 'red',
      startDeg: 0,

      active: props.active,
      anim: new Animated.Value(props.active ? 1 : 0),
      isMenuOpen: false,
    };

    this.circleAnimation = new Animated.Value(0);
    this.timeout = null;

    this.circleAnimation.addListener(({ value }) => {
      const percent = value * 100;
      let leftTransformerDegree = '0deg';
      let rightTransformerDegree = '0deg';
      if (percent >= 50) {
        rightTransformerDegree = '180deg';
        leftTransformerDegree = (percent - 50) * 3.6 + 'deg';
      } else {
        rightTransformerDegree = percent * 3.6 + 'deg';
      }

      let commonStyle = [styles.loader, {
        width: this.props.radius,
        height: this.props.radius * 2,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: this.state.circleColor,
      }];

      this.rightPart.setNativeProps({
        style: [styles.loader, commonStyle, {
          left: -this.props.radius,
          transform: [{
            translateX: this.props.radius / 2,
          }, {
            rotate: rightTransformerDegree,
          }, {
            translateX: -this.props.radius / 2,
          }],
        }]
      });

      this.leftPart.setNativeProps({
        style: [styles.loader, commonStyle, {
          left: this.props.radius,
          transform: [{
            translateX: -this.props.radius / 2,
          }, {
            rotate: leftTransformerDegree,
          }, {
            translateX: this.props.radius / 2,
          }],
        }]
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getActionButtonStyle() {
    return [styles.actionBarItem, this.getButtonSize()];
  }

  getActionsStyle() {
    return [this.getButtonSize()];
  }

  getButtonSize() {
    return {
      width: constants.BUTTON_SIZE,
      height: constants.BUTTON_SIZE,
    };
  }

  openMenu = () => {
    this.setState({ active: true });
    Animated.timing(
      this.state.anim,
      {
        duration: 100,
        easing: Easing.inOut(Easing.circle),
        toValue: 1,
      }
    ).start(() => {
      this.setState({ isMenuOpen: true });
    });
  }

  closeMenu = () => {
    Animated.timing(
      this.state.anim,
      {
        duration: 100,
        toValue: 0,
      }
    ).start(() => {
      this.setState({ isMenuOpen: false, active: false });
    });
  }

  animateButton() {
    if (this.state.active) {
      this.reset();
      return;
    }

    Animated.spring(this.state.anim, {
      toValue: 1,
      duration: 250,
    }).start();

    this.setState({ active: true });
  }

  reset() {
    Animated.spring(this.state.anim, {
      toValue: 0,
      duration: 250,
    }).start();

    setTimeout(() => {
      this.setState({ active: false });
    }, 250);
  }

  renderButton() {
    if (this.state.isMenuOpen) {
      return (
        <View
          style={this.getActionButtonStyle()}
        >
          <TouchableIcon
            onPress={this.closeMenu}
            icon="md-close"
            backgroundColor="#535a6b"
            color="#0E1329"
          />
        </View>
      );
    }

    return (
      <View style={this.getActionButtonStyle()} >
        <TouchableWithoutFeedback
          onPress={() => {
              this.openMenu();
          }}
        >
          <Animated.View
            ref={ref => { this.burger = ref; }}
            style={[styles.buttonContainer, this.getActionButtonStyle(), styles.btn, {
              backgroundColor: 'white',
              width: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [constants.BUTTON_SIZE, this.props.radius - this.props.itemSize]
              }),
              height: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [constants.BUTTON_SIZE, this.props.radius - this.props.itemSize]
              }),
              borderRadius: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [constants.BORDER_RADIUS, this.props.radius]
              }),
            }]}
          >
            <Icon
              name="md-menu"
              color="#0E1329"
              size={20}
            />

          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  moveFrom(angle, duration, color) {
    this.setState({
      circleColor: color,
      startDeg: (angle * 180 / Math.PI) + 90,
    });
    Animated.timing(
      this.circleAnimation,
      {
        duration: duration - 100,
        toValue: 1,
      }
    ).start(() => {
      this.circleAnimation.setValue(0)
    });   
  }

  renderActions() {
    if (!this.state.active) return null;
    
    const childrenCount = this.props.items.length;

    const increase = Math.PI * 2 / childrenCount;
    let angle = -Math.PI / 2;

    return (
      this.props.items.map((item, index) => {
        const btnAngle = angle;
        angle += increase;
        return (

          <ActionButtonItem
            key={index}
            anim={this.state.anim}
            size={this.props.itemSize}
            radius={this.props.radius - this.props.itemSize}
            angle={btnAngle}
            buttonColor={item.color}
            afterPress={() => this.closeMenu()}
            onPress={this.moveFrom.bind(this)}
            style={[styles.actionContainer, { position: 'absolute' }]}
          >
            <Icon name={item.name} color="white" size={20} />
          </ActionButtonItem>
        );
      })
    );
  }

  render() {
    return (
      <View
        setNativeProps={true}
        pointerEvents="box-none"
        style={[styles.circle, {
          width: this.props.radius + this.props.itemSize,
          height: this.props.radius + this.props.itemSize,
          borderRadius: (this.props.radius + this.props.itemSize) / 2,
          transform: [{
            rotate: this.state.startDeg + 'deg',
          }],
        }]}
      >
        <View setNativeProps={true} style={[styles.leftWrap, {
          width: this.props.radius,
          height: this.props.radius * 2,
          left: -this.props.itemSize,
        }]}>
          <View
            setNativeProps={true}
            ref={(ref) => this.leftPart = ref}
            style={[styles.loader,{
              left: this.props.radius,
              width: this.props.radius,
              height: this.props.radius * 2,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              backgroundColor: this.state.circleColor,
            }]}
          />
        </View>
        <View setNativeProps={true} style={[styles.leftWrap, {
          left: this.props.radius - this.props.itemSize,
          width: this.props.radius,
          height: this.props.radius * 2,
        }]}>
          <View
            setNativeProps={true}
            ref={(ref) => this.rightPart = ref}
            style={[styles.loader, {
              left: -this.props.radius,
              width: this.props.radius,
              height: this.props.radius * 2,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: this.state.circleColor,
            }]}
          />
        </View>
        <View style={[styles.innerCircle, {
          borderRadius: this.props.radius,
          backgroundColor: this.props.bgColor,
          zIndex: 1,
          ...Platform.select({
            ios: {
              width: this.props.radius - this.props.itemSize,
              height: this.props.radius - this.props.itemSize,
            },
            android: {
              width: this.props.radius * 2 - this.props.itemSize,
              height: this.props.radius * 2 - this.props.itemSize,
              // borderWidth: this.props.itemSize,
              // borderColor: 'transparent',
            },
          }),
        }]}>
          <View style={[styles.innerCircle, {
            ...Platform.select({
            ios: {
              // width: this.props.radius - this.props.itemSize,
              // height: this.props.radius - this.props.itemSize,
            },
            android: {
              width: '100%',
              height: '100%',
              flex: 1,
              // borderWidth: this.props.itemSize,
              // borderColor: 'greeen',
            },
          }),
            transform: [{
              rotate: -this.state.startDeg + 'deg',
            }],
          }]}>
            {this.renderActions()}
            <View pointerEvents="box-none" style={styles.actionContainer} >
              {this.renderButton()}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

CircleMenu.propTypes = {
  active: PropTypes.bool,
  bgColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  size: PropTypes.number,
  itemSize: PropTypes.number,
  autoInactive: PropTypes.bool,
  onPress: PropTypes.func,
  onOverlayPress: PropTypes.func,
  backdrop: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  startDegree: PropTypes.number,
  endDegree: PropTypes.number,
  radius: PropTypes.number,
  children: PropTypes.node,
  position: PropTypes.oneOf(['left', 'center', 'right']),
};

CircleMenu.defaultProps = {
  active: false,
  bgColor: '#0E1329',
  buttonColor: 'rgba(0,0,0,1)',
  buttonTextColor: 'rgba(255,255,255,1)',
  position: 'center',
  outRangeScale: 1,
  autoInactive: true,
  onPress: () => {},
  onOverlayPress: () => {},
  backdrop: false,
  degrees: 0,
  size: 63,
  itemSize: 50,
  radius: 100,
  btnOutRange: 'rgba(0,0,0,1)',
  btnOutRangeTxt: 'rgba(255,255,255,1)',
};

const styles = StyleSheet.create({
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
  },
  actionContainer: {
    flexDirection: 'column',
    padding: 0,
    alignItems: 'center',
  },
  actionBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#444',
    shadowRadius: 1,
  },
  btnText: {
    marginTop: -4,
    fontSize: 24,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: constants.BORDER_RADIUS,
    width: constants.BUTTON_SIZE,
    height: constants.BUTTON_SIZE,
  },
});