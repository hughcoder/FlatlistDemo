/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  SwipeableFlatList,
  TouchableHighlight
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
const { height, width } = Dimensions.get("window");

type Props = {};
const CITY_NAMES = ["b", "s", "c", "a", "f", "s", "s", "s", "s", "hd", "h"];
export default class SwipeableFlatListDemo extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataArray: CITY_NAMES
    };
  }
  loadData(refreshing) {
    if (refreshing) {
      this.setState({
        isLoading: true
      });
    }
    setTimeout(() => {
      let dataArray = [];
      if (refreshing) {
        for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
          dataArray.push(this.state.dataArray[i]);
        }
      } else {
        dataArray = this.state.dataArray.concat(CITY_NAMES);
      }
      this.setState({
        dataArray: dataArray,
        isLoading: false
      });
    }, 2000);
  }
  quickActions() {
    return (
      <View style={styles.quickContainer}>
        <TouchableHighlight>
          <View>
            <Text style={{ fontSize: 18, color: "black" }}>删除</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  getIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size={"large"}
          animating={true}
          color={"red"}
        />
        <Text>正在加载更多</Text>
      </View>
    );
  }

  _renderItem(data) {
    return (
      <View style={styles.item}>
        <Text styles={styles.text}>{data.item}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeableFlatList
          data={this.state.dataArray}
          bounceFirstRowOnMount={true}
          maxSwipeDistance={160}

          renderItem={data => this._renderItem(data)}
          // refreshing ={this.state.isLoading}
          // onRefresh ={()=>{
          //   this.loadData();
          // }}
          // 自定义,下拉刷新
          refreshControl={
            <RefreshControl
              title={"loading"}
              colors={["red"]}
              tintColor={"red"}
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.loadData(true);
              }}
            />
          }
          ListFooterComponent={() => this.getIndicator()}
          onEndReached={() => {
            this.loadData();
          }}
          renderQuickActions={() => {
            this.quickActions();
          }}
          maxSwipeDistance={100}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  item: {
    backgroundColor: "#169",
    height: 200,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.95
  },
  text: {
    color: "white",
    fontSize: 20
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: 10
  },
  quick: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10,
    width: 200
  },
  quickContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
    marginBottom: 15
  }
});
