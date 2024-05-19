//adapted from https://www.geeksforgeeks.org/create-a-compass-app-using-react-native/
import React, { useEffect, useState } from "react";
import CompassHeading from "react-native-compass-heading";
import { View, Text, StyleSheet, Animated, useWindowDimensions } from "react-native";

function Compass({fontSize}) {
    const [heading, setHeading] = useState(0);
    const rotateValue = new Animated.Value(0);
    const dimensions = useWindowDimensions();
    var compassImageWidth = dimensions.width * 0.95;
    compassImageWidth += compassImageWidth % 2 == 0 ? 1 : 0;


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
            width: compassImageWidth,
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
            elevation: 2
        },
        compassImage: {
            width: compassImageWidth,
            height: compassImageWidth,
            marginRight: 1.25
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
        directionLine: {
            position: 'absolute',
            height: dimensions.height * 0.75,
            top: 0,
            width: 2,
            backgroundColor: '#888888',
            elevation: 1
        }
    });
 
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
            <View style={styles.directionLine} />
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
 
export default Compass;