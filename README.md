# React Native Circle Menu

## Features

* Custom colors
* Custom size

## Usage

```javascript
import { CircleMenu } from 'react-native-circle-menu';

items = [
  {
    name: 'md-home',
    color: '#298cff',
  },
  {
    name: 'md-search',
    color: '#30a400',
  },
  {
    name: 'md-time',
    color: '#ff4b32',
  },
  {
    name: 'md-settings',
    color: '#8a39ff',
  },
  {
    name: 'md-navigate',
    color: '#ff6a00',
  },
]

onPress = (index) => {
  console.warn(`${this.items[index].name} icon pressed!`);
}

render() {
  return (
    <CircleMenu buttonColor="rgba(231,76,60,1)" items={this.items} onPress={this.onPress} />
  )
}
```

## Props
| Name | Description | Type | Required | Default Value |
| :--- | :----- | :--- | :---: | :---: |
| active | Menu is active | Boolean |  | `false` |
| bgColor | The background color of the menu | String |  | `#0E1329` |
| itemSize | The size of menu elements | Number |  | 60 |
| radius | The circle radius | Number |  | 150 |
| onPress | The function that called when pressed on menu item | Function |  |  |