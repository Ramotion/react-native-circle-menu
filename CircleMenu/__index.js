import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing
  /*LayoutAnimation*/
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import { TouchableIcon, ActionButtonItem } from './components';

class CircleMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
      openValue: new Animated.Value(0),
    }
  }

  openMenu = () => {
      // LayoutAnimation.spring();
      Animated.timing(
        this.state.openValue,
        {
          duration: 1000,
          easing: Easing.inOut(Easing.circle),
          toValue: 1,
        }
      ).start(() => {
        this.setState({ isMenuOpen: true });
      });
  }

  closeMenu = () => {
    // LayoutAnimation.spring();
    Animated.timing(
      this.state.openValue,
      {
        toValue: 0,
      }
    ).start(() => {
      this.setState({ isMenuOpen: false });
    });
  }

  renderActions() {
    if (!this.state.active) return null;
    const startDegree = this.props.startDegree || alignMap[this.props.position].startDegree;
    const endDegree = this.props.endDegree || alignMap[this.props.position].endDegree;
    const startRadian = startDegree * Math.PI / 180;
    const endRadian = endDegree * Math.PI / 180;

    const childrenCount = React.Children.count(this.props.items);
    let offset = 0;
    if (childrenCount !== 1) {
      offset = (endRadian - startRadian) / (childrenCount - 1);
    }

    return (
      React.Children.map(this.props.items, (button, index) => {
        return (
          <View
            pointerEvents="box-none"
            style={this.getActionContainerStyle()}
          >
            <ActionButtonItem
              key={index}
              position={this.props.position}
              anim={this.state.anim}
              size={this.props.itemSize}
              radius={this.props.radius}
              angle={startRadian + index * offset}
              btnColor={this.props.btnOutRange}
              {...button.props}
              onPress={() => {
                  if (this.props.autoInactive) {
                    this.timeout = setTimeout(() => {
                      this.reset();
                    }, 200);
                  }
                  button.props.onPress();
                }}
            />
          </View>
        );
      })
    );
  }


  render() {
    const { items, onPress } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <View style={styles.container}>
        {
          // isMenuOpen &&
          // items.map((item, index) =>
          //   <TouchableIcon
          //     key={index}
          //     onPress={() => onPress(index)}
          //     icon={item.name}
          //     backgroundColor={item.color}
          //   />
          // )
        }
        {
          isMenuOpen
          ?
          <TouchableIcon
            onPress={this.closeMenu}
            icon="md-close"
            backgroundColor="#535a6b"
            color="#0E1329"
          />
          :
          <TouchableWithoutFeedback onPress={this.openMenu}>
            <Animated.View
              style={[styles.buttonContainer, {
                backgroundColor: 'white',
                width: this.state.openValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [BUTTON_SIZE, BUTTON_SIZE * 2]
                }),
                height: this.state.openValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [BUTTON_SIZE, BUTTON_SIZE * 2]
                }),
                borderRadius: this.state.openValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [BORDER_RADIUS, BORDER_RADIUS * 2]
                }),
              }]}
            >
              <Icon
                name="md-menu"
                color="#0E1329"
                size={ICON_SIZE}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        }
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
  bgColor: 'transparent',
  buttonColor: 'rgba(0,0,0,1)',
  buttonTextColor: 'rgba(255,255,255,1)',
  position: 'center',
  outRangeScale: 1,
  autoInactive: true,
  onPress: () => {},
  onOverlayPress: () => {},
  backdrop: false,
  degrees: 135,
  size: 63,
  itemSize: 36,
  radius: 100,
  btnOutRange: 'rgba(0,0,0,1)',
  btnOutRangeTxt: 'rgba(255,255,255,1)',
};

const BUTTON_SIZE = 40
const ICON_SIZE = 20;
const BORDER_RADIUS = BUTTON_SIZE / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
});

export default CircleMenu;
