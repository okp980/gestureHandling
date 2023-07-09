import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  useAnimatedGestureHandler,
  event,
} from "react-native-reanimated"

const SIZE = 100
const CIRCLE_SIZE = SIZE * 2.5

export default function App() {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)
      if (distance < CIRCLE_SIZE / 2 + (SIZE * 0.5) / 2) {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }
  }, [])

  return (
    // <GestureHandlerRootView>
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View
        style={{
          height: CIRCLE_SIZE,
          width: CIRCLE_SIZE,
          borderRadius: CIRCLE_SIZE / 2,
          borderWidth: 5,
          borderColor: "blue",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[
              {
                height: SIZE * 0.5,
                width: SIZE * 0.5,
                backgroundColor: "blue",
                borderRadius: 10,
              },
              animatedStyle,
            ]}
          />
        </PanGestureHandler>
      </View>
    </View>
    // </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
