//adapted from https://www.geeksforgeeks.org/create-a-compass-app-using-react-native/
import React, { useEffect, useState } from "react";
import CompassHeading from "react-native-compass-heading";
import { View, Text, StyleSheet, Animated } from "react-native";

function Compass({fontSize}) {
    const [heading, setHeading] = useState(0);
    const rotateValue = new Animated.Value(0);
 
    useEffect(() => {
        const degreeUpdateRate = 3;
 
        CompassHeading.start(degreeUpdateRate, ({ heading, accuracy }) => {
            //console.log("CompassHeading: ", heading, accuracy);
            setHeading(heading);
 
            // Rotate the compass image
            Animated.timing(rotateValue, {
                toValue: heading,
                duration: 100,
                useNativeDriver: false,
            }).start();
        });
 
        return () => {
            CompassHeading.stop();
        };
    }, []);
 
    const rotateStyle = {
        transform: [{ rotate: `${-heading}deg` }],
    };
 
    const getCardinalDirection = () => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(heading / 45) % 8;
        return directions[index];
    };
 
    return (
        <View style={styles.container}>
            <View style={styles.compassContainer}>
                <Animated.Image
                    source={require("./compass.png")}
                    style={[styles.compassImage, rotateStyle]}
                />
            </View>
            <Text style={[styles.headingValue, {fontSize: fontSize}]}>{`${heading.toFixed(
                3
            )}`}</Text>
            <Text
                style={[styles.cardinalDirection, {fontSize: fontSize}]}
            >{`${getCardinalDirection()}`}</Text>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    appName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    compassContainer: {
        width: 250,
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 125,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    compassImage: {
        width: 200,
        height: 200,
    },
    headingValue: {
        fontSize: 18,
        marginTop: 10,
        color: "#555",
    },
    cardinalDirection: {
        fontSize: 18,
        marginTop: 10,
        color: "#555",
    },
});
 
export default Compass;