import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Audio } from 'expo';

const soundArr = [
  require("./media/fart1.mp3"),
  require("./media/fart2.mp3"),
  require("./media/fart3.mp3")
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      stop: true
    };
    this.audioPlayer = new Audio.Sound();
  }

  startFart = () => {
    if (this.state.stop) {
      this.setState({ stop: false }, () => this.fart());
    } else {
      this.fart();
    }
  };

  stopFart = () => {
    this.setState({ stop: true });
  };

  fart = async () => {
    setTimeout(() => {
      if (!this.state.stop) {
        //Alert.alert("Farting!");
        this.soundFart();
        this.fart();
      }
    }, 2000);
  };

  soundFart = async () => {
    var number = Math.floor(Math.random() * 3);
    try {
      await this.audioPlayer.unloadAsync();
      // var forRequire = soundArr[number];
      console.log("number is " + number);
      await this.audioPlayer.loadAsync(soundArr[number]);
      await this.audioPlayer.playAsync();
    } catch (err) {
      console.warn("Couldn't Play audio", err)
    }
  };

  shuffleFarts = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
