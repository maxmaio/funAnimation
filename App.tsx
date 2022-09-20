import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SensorType, useAnimatedSensor } from "react-native-reanimated";

import Circle from "./src/circle";

const COLORS = [
  "#371175",
  "#5d1994",
  "#9832c0",
  "#b048d1",
  "#db77e8",
  "#f9a6f6",
  "#fcbcf7",
];
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}
function App() {
  const forceUpdate = useForceUpdate();
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION);
  const { qw, qx } = animatedSensor.sensor.value;

  useEffect(() => {
    console.log(qx);
  }, [qx, qw]);

  return (
    <TouchableOpacity onPress={forceUpdate} style={styles.container}>
      <View style={styles.container}>
        {COLORS.map((color, index) => (
          <Circle
            key={color}
            scale={1 - index * 0.1}
            xOffset={-qx}
            wOffset={-qw}
            color={COLORS[index]}
          />
        ))}

        <StatusBar style="auto" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
