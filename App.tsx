/**
 * Compass
 * https://github.com/lukejbullard/compass
 */

import React, {useState, useEffect} from 'react';
import Compass from './Compass';

import {
  SafeAreaView,
  useColorScheme,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  Animated
} from 'react-native';

function App(): React.JSX.Element {
  const {fontScale} = useWindowDimensions();
  var fontSize = 25 / fontScale;


  const styles = () => StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#BBBBBB"
    },
    text: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      color: "black",
      fontSize: fontSize
    }
  });

  const loading = true;

  return (
    <SafeAreaView style={styles().body}>
      <Compass fontSize={fontSize} />
    </SafeAreaView>
  );
}

export default App;
