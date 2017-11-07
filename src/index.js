import React, {Component, PropTypes} from 'react'
import {View, Animated} from 'react-native'

import {ActionIcon, TouchableIcon} from './components'
import constants from './constants'

const styles = {
  actionContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 0
  },
  actionBarItem: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
};

export default class extends Component {
  static propTypes = {
    active: PropTypes.bool,
    bgColor: PropTypes.string,
    itemSize: PropTypes.number,
    onPress: PropTypes.func,
    radius: PropTypes.number
  };

  static defaultProps = {
    active: false,
    bgColor: '#0E1329',
    itemSize: 60,
    onPress() {},
    radius: 170
  };

  constructor(props) {
    super(props);

    this.state = {
      startDeg: 0,
      active: props.active,
      animation: new Animated.Value(+!!props.active),
      isMenuOpen: false
    }
  }

  openMenu = () => {
    this.state.animation.setValue(0);

    this.setState({
        active: true,
        isMenuOpen: true
    });

    Animated.timing(this.state.animation, {
      duration: 300,
      toValue: 1
    }).start(this.state.animation.setValue(0))
  };

  closeMenu = () => {
    this.setState({
      active: false,
      isMenuOpen: false
    });

    Animated.spring(this.state.animation, {
      toValue: .5,
      friction: 4
    }).start(this.state.animation.setValue(0))
  };

  renderButton() {
    if(this.state.isMenuOpen) {
      return <TouchableIcon
        backgroundColor="#535A6B"
        color="#0E1329"
        icon="md-close"
        onPress={this.closeMenu}
      />
    }

    return <TouchableIcon
      color="#0E1329"
      icon="md-menu"
      onPress={this.openMenu}
    />
  }

  renderActions() {
    if(!this.state.active) {
      return null
	}
    
    const increase = Math.PI * 2 / this.props.items.length;
    let angle = -Math.PI / 2;

    return this.props.items.map((item, index) => {
      const btnAngle = angle;

      angle += increase;

      return <ActionIcon
        key={index}
        animation={this.state.animation}
        angle={btnAngle}
        bgColor={this.props.bgColor}
        buttonColor={item.color}
        icon={item.name}
        radius={this.props.radius - this.props.itemSize}
        onPress={() => {
          this.closeMenu();
          this.props.onPress(index);
        }}
        size={this.props.itemSize}
        style={[styles.actionContainer, {position: 'absolute'}]}
      />
    })
  }

  render() {
    return <View style={styles.actionContainer}>
      {this.renderActions()}
      <View
        pointerEvents="box-none"
        style={styles.actionContainer}
      >
        <Animated.View style={[styles.actionBarItem, {
          top: (this.props.itemSize - constants.BUTTON_SIZE - 10) / 2 + 5,
          left: 0,
          transform: [{
            rotate: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }],
          height: constants.BUTTON_SIZE,
          width: constants.BUTTON_SIZE
        }]}>
          {this.renderButton()}
        </Animated.View>
      </View>
    </View>
  }
}