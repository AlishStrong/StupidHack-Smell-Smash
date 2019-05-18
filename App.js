import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

import Sound from 'react-native-sound';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      stop: true
    };
  }


  startFart = () => {
    if (this.state.stop){
      this.setState({stop: false}, () => this.fart());
    } else {
      this.fart();
    }
  };

  stopFart = () => {
    this.setState({stop: true});
  }

  fart = async () => {
    setTimeout(() => {
      if(!this.state.stop) {
        Alert.alert("Farting!");
        this.fart();
      }
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.startFart()} title="press me" />
        <Button onPress={() => this.stopFart()} title="stop" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
