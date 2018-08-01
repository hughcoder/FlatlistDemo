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
  SectionList
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
const { height, width } = Dimensions.get("window");

type Props = {};
const CITY_NAMES = [
  {
    data: ["1", "1", "1", "1"],
    title: "一线"
  },
  {
    data: ["2", "2", "2", "2"],
    title: "二线"
  },
  {
    data: ["3", "3", "3", "3"],
    title: "三线"
  }
];
export default class SectionListDemo extends Component<Props> {
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
  _renderSectionHeader({section}){
    return(
      <View style={styles.sectionHeader}>
        <Text style={{}}>{section.title}</Text>
        </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.dataArray}
          renderItem={data => this._renderItem(data)}
          // refreshing ={this.state.isLoading}
          // onRefresh ={()=>{
          //   this.loadData();
          // }}
          //自定义,下拉刷新
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
          renderSectionHeader={(data)=>this._renderSectionHeader(data)}
          ItemSeparatorComponent={()=><View style={styles.sepeater}/>}
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
    height: 80,
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
  sectionHeader:{
    height:50,
    backgroundColor:'#93ebbe',
    alignItems: 'center',
    justifyContent:'center',
  },
  sepeater:{
    height:1,
    backgroundColor: 'gray',
    flex: 1,
  }
});
