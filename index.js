/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import FlatListDemo  from './pages/FlatListDemo';
import SwipeableFlatList from './pages/SwipeableFlatListDemo'
import {name as appName} from './app.json';
import{StackNavigator} from 'react-navigation'

const AppRoot = StackNavigator({
  App :{
    screen: App,
  },
  FlatListDemo:{
    screen: FlatListDemo,
    navigationOptions:{
      title: 'FlatListDemo',
    }
  },
  SwipeableFlatList:{
  screen: SwipeableFlatList,
  navigationOptions:{
    title: 'SwipeableFlatList',
  }
  },
})

AppRegistry.registerComponent(appName, () => AppRoot);
