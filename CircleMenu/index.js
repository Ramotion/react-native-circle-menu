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

import {ActionIcon, TouchableIcon } from './components';
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
      startDeg: 0,
      active: props.active,
      anim: new Animated.Value(props.active ? 1 : 0),
      isMenuOpen: false,
    };

    this.timeout = null;
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
    this.setState({ active: true, isMenuOpen: true });
    Animated.timing(
      this.state.anim,
      {
        duration: 300,
        easing: Easing.inOut(Easing.circle),
        toValue: 1,
      }
    ).start(this.state.anim.setValue(0));
  }

  closeMenu = () => {
    this.setState({ isMenuOpen: false, active: false });
    Animated.spring(
      this.state.anim,
      {
        toValue: 0.5,
        friction: 4
      }
    ).start(this.state.anim.setValue(0));
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
        <TouchableIcon onPress={this.closeMenu} icon="md-close" backgroundColor="#535a6b" color="#0E1329" />
      );
    }

    return (
      <TouchableIcon icon="md-menu" color="#0E1329" onPress={this.openMenu}/>
    );
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

          <ActionIcon
            key={index}
            anim={this.state.anim}
            size={this.props.itemSize}
            radius={this.props.radius - this.props.itemSize}
            angle={btnAngle}
            buttonColor={item.color}
            onPress={() => {
              this.closeMenu();
              this.props.onPress(index);
            }}
            style={[styles.actionContainer, { position: 'absolute' }]}
            bgColor={this.props.bgColor}
            icon={item.name}
          />
        );
      })
    );
  }

  render() {
    return (
      <View style={styles.actionContainer}>
        {this.renderActions()}
        <View pointerEvents="box-none" style={styles.actionContainer} >
          <Animated.View
            style={[this.getActionButtonStyle(), {
              top: 5,
              transform: [{
                rotate: this.state.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                }),
              }]
            }]}
          >
            {this.renderButton()}
          </Animated.View>
        </View>
      </View>
    );
  }
}

CircleMenu.propTypes = {
  active: PropTypes.bool,
  bgColor: PropTypes.string,
  itemSize: PropTypes.number,
  radius: PropTypes.number,
  onPress: PropTypes.func,
};

CircleMenu.defaultProps = {
  active: false,
  bgColor: '#0E1329',
  itemSize: 50,
  radius: 150,
  onPress: () => {},
};

const styles = StyleSheet.create({
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