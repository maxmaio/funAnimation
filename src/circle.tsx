import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIZE = width;
const DISTANCE = width;

type Props = {
  color: string;
  scale?: number;
  xOffset?: number;
  wOffset?: number;
};

function Circle({ color, scale = 1, xOffset, wOffset }: Props) {
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION);

  const animatedStyle = useAnimatedStyle(() => {
    const { qw, qy, qx } = animatedSensor.sensor.value;

    return {
      transform: [
        { translateX: withSpring(((qx + xOffset) * 500) / scale) },
        { translateY: withSpring(((qw + wOffset) * 500) / scale) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            backgroundColor: color,
            width: SIZE * scale,
            height: SIZE * scale,
            borderRadius: SIZE * scale,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});

export default Circle;
