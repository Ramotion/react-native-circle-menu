![header](./header.png)
![preview](./preview.gif)

# React Native Circle Menu
[![Twitter](https://img.shields.io/badge/Twitter-@Ramotion-blue.svg?style=flat)](http://twitter.com/Ramotion)

# Check this library on other platforms:
<a href="https://github.com/Ramotion/circle-menu"> 
<img src="https://github.com/ramotion/navigation-stack/raw/master/Swift@2x.png" width="178" height="81"></a>
<a href="https://github.com/Ramotion/circle-menu-android"> 
<img src="https://github.com/ramotion/navigation-stack/raw/master/Android_Java@2x.png" width="178" height="81"></a>

**Looking for developers for your project?**<br>
This project is maintained by Ramotion, Inc. We specialize in the designing and coding of custom UI for Mobile Apps and Websites.

<a href="https://ramotion.com/?utm_source=gthb&utm_medium=special&utm_campaign=circle-menu-contact-us/#Get_in_Touch">
<img src="https://github.com/ramotion/gliding-collection/raw/master/contact_our_team@2x.png" width="187" height="34"></a> <br>


The [iPhone mockup](https://store.ramotion.com?utm_source=gthb&utm_medium=special&utm_campaign=react-native-circle-menu) available [here](https://store.ramotion.com?utm_source=gthb&utm_medium=special&utm_campaign=react-native-circle-menu).

The [Android mockup](https://store.ramotion.com/product/samsung-galaxy-s8-mockups?utm_source=gthb&utm_medium=special&utm_campaign=react-native-circle-menu) available [here](https://store.ramotion.com/product/samsung-galaxy-s8-mockups?utm_source=gthb&utm_medium=special&utm_campaign=react-native-circle-menu-android).

## Features

* Custom colors
* Custom size

## Installation

`npm install --save @ramotion/react-native-circle-menu`

## Usage

Look it in folder `./example`

```javascript
import React, {Component} from 'react'
import CircleMenu from '@ramotion/react-native-circle-menu'

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

## Licence

Circle menu is released under the MIT license.
See [LICENSE](./LICENSE) for details.
<br>

# Get the Showroom App for iOS to give it a try
Try this UI component and more like this in our mobild app. Contact us if interested.

<a href="https://play.google.com/store/apps/details?id=com.ramotion.showroom" >
<img src="https://raw.githubusercontent.com/Ramotion/react-native-circle-menu/master/google_play@2x.png" width="104" height="34"></a>
<a href="https://itunes.apple.com/app/apple-store/id1182360240?pt=550053&ct=react-native-circle-menu&mt=8" >
<img src="https://github.com/ramotion/gliding-collection/raw/master/app_store@2x.png" width="117" height="34"></a>
<a href="https://ramotion.com/?utm_source=gthb&utm_medium=special&utm_campaign=react-native-circle-menu-contact-us/#Get_in_Touch">
<img src="https://github.com/ramotion/gliding-collection/raw/master/contact_our_team@2x.png" width="187" height="34"></a>
<br>
<br>

Follow us for the latest updates<br>
[![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=https://github.com/ramotion/circle-menu)
[![Twitter Follow](https://img.shields.io/twitter/follow/ramotion.svg?style=social)](https://twitter.com/ramotion)
