/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
const DeviceWidth = Dimensions.get('window').width;

const colors = [
  'green',
  'blue',
  'orange',
  'yellow',
  'pink',
  'brown',
  'red',
  'violet',
  'purple',
];

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App(): JSX.Element {
  const [grids, setGrids] = useState<string[]>([]);
  const [hidden, setHidden] = useState<number[]>([]);

  useEffect(() => {
    shuffledArr(colors);
  }, []);

  const handleClick = (key: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    let tempHidden = [...hidden];
    tempHidden.push(key);
    setHidden(tempHidden);
  };
  const shuffledArr = (array: string[]) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    setGrids(shuffled);
  };
  return (
    <SafeAreaView>
      <View style={styles.boxContainer}>
        {grids.map((item: string, key: number) => {
          return (
            !hidden.includes(key) && (
              <Pressable
                onPress={() => handleClick(key)}
                key={key}
                style={[
                  styles.box,
                  {
                    backgroundColor: item,
                  },
                ]}>
                <Text>{key + 1}</Text>
              </Pressable>
            )
          );
        })}
      </View>

      <Pressable onPress={() => setHidden([])}>
        <Text>reset</Text>
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    width: DeviceWidth * 0.3,
    height: DeviceWidth * 0.3,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },

  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginLeft: 10,
  },
});

export default App;
