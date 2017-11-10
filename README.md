# React Native Circle Menu

## Features

* Custom colors
* Custom size

## Installation

`npm install --save react-native-circle-menu`

## Usage

Look it in folder `./example`

```javascript
import React, {Component} from 'react'
import CircleMenu from 'react-native-circle-menu'

class Example extends Component {
    items = [
      {
        name: 'md-home',
        color: '#298CFF'
      },
      {
        name: 'md-search',
        color: '#30A400'
      },
      {
        name: 'md-time',
        color: '#FF4B32'
      },
      {
        name: 'md-settings',
        color: '#8A39FF'
      },
      {
        name: 'md-navigate',
        color: '#FF6A00'
      }
    ];
    
    onPress = index => console.warn(`${this.items[index].name} icon pressed!`);
    
    render() {
    	return <CircleMenu
            bgColor="#E74C3C"
            items={this.items}
            onPress={this.onPress}
        />
    }
}
```

## Props
| Name | Description | Type | Required | Default Value |
| :--- | :----- | :--- | :---: | :---: |
| active | Menu is active | Boolean |  | `false` |
| bgColor | The background color of the menu | String |  | `#0E1329` |
| itemSize | The size of menu elements | Number |  | `60` |
| radius | The circle radius | Number |  | `150` |
| onPress | The function that called when pressed on menu item | Function |  |  |