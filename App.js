
import React from "react";
import { StyleSheet, ImageBackground, Text, View, Button, Alert, LayoutAnimation, TouchableOpacity, Image } from "react-native";
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
            stop: true,
            top: 40,
            move: -1,
            left: 40,
            moveTop: 40,
            moveLeft: 40,
            buttonText: "press me",
            poop: require('./assets/poops1.png')
        };
        this.audioPlayer = new Audio.Sound();
    }

    startFart = async () => {
        if (this.state.stop) {
            this.setState({ stop: false, buttonText: "stop" }, () => {
                this.fart();
            });
        } else {
            // this.fart();
            this.setState({ stop: true, buttonText: "press me" });
            this.cancelMovement();
        }

    };

    fart = async () => {
        setTimeout(() => {
            if (!this.state.stop) {
                //Alert.alert("Farting!");
                this.soundFart();
                this.fart();
            }

            this.setState({
                poop: require('./assets/poops2.png')
            })

            setTimeout(() => { this.setState({ poop: require('./assets/poops1.png') }) }, 400)
        }, 2000);
        this.movement();
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

    // Movement 

    changeTop = () => {
        this.setState((prevState, props) => ({
            moveTop: -prevState.moveTop,
        }))
    }

    changeLeft = () => {
        this.setState((prevState, props) => ({
            moveLeft: -prevState.moveLeft,
        }))
    }

    changeMoveValue = () => {
        this.setState((prevState, props) => ({
            move: prevState.move * (-1),
        }))
    }


    startMovement = () => {
        this.getMovement = setInterval(() => this.changePosition(), 200);
    }

    movement = async () => {
        const { move, top } = this.state;
        if (move === -1) {
            this.getMovement = setInterval(() => this.changePosition(), 100);
            this.changeMoveValue();
        } else {
            clearInterval(this.getMovement);
            this.changeMoveValue();
        }
    }

    changePosition = async () => {
        const { move, top, left, moveTop, moveLeft } = this.state;
        if (left >= 240) {
            this.changeLeft();
            this.setState({ left: 180 })
        }
        if ((top >= 425)) {
            this.changeTop();
            this.setState({ top: 365 })
        }

        if (left <= 10) {
            this.changeLeft();
            this.setState({ left: 70 })
        }

        if ((top <= 10)) {
            this.changeTop();
            this.setState({ top: 70 })
        }

        LayoutAnimation.spring();
        this.setState((prevState, props) => ({
            top: prevState.top + moveTop,
            left: prevState.left + moveLeft
        }))
        console.log(`top ${top} left ${left} moveLeft ${moveLeft} moveTop ${moveTop}`);
    };

    cancelMovement = async () => {
        clearInterval(this.movement);
    }


    render() {
        console.disableYellowBox = true;

        const { poop } = this.state;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./assets/toilet.png')} style={{ width: '100%', height: '100%' }}>
                    <TouchableOpacity
                        style={{ left: this.state.left, top: this.state.top }}
                        onPress={this.startFart}
                    >
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={poop}
                        />
                        {/* <Text style={styles.buttonText}>{this.state.buttonText}</Text> */}
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    button: {
        width: 100,
        backgroundColor: "#0287CF",
        borderRadius: 25,

        marginVertical: 10,
        paddingVertical: 12,
        marginHorizontal: 5,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "500",
        color: "#F8BC36",
        fontSize: 17,
    },

});