import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      stop: false
    };
  }
  startFart = async () => {
    setTimeout(() => {
      Alert.alert("timeout!");
      this.startFart();
    }, 10000);
  };
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.startFart()} title="press me" />
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
