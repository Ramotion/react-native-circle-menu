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
      circleColor: 'red',
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
    this.setState({ active: true });
    Animated.timing(
      this.state.anim,
      {
        duration: 300,
        easing: Easing.inOut(Easing.circle),
        toValue: 1,
      }
    ).start(() => {
      this.setState({ isMenuOpen: true });
    });
  }

  closeMenu = () => {
    this.setState({ isMenuOpen: false, active: false });
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
        <TouchableIcon icon="md-menu" color="#0E1329" onPress={this.openMenu}/>
      </View>
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
            onPress={this.closeMenu}
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
      <View>
        <View pointerEvents="box-none" style={styles.actionContainer} >
          {this.renderButton()}
        </View>
        {this.renderActions()}
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