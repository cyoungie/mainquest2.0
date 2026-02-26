import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

type PhotoPinProps = {
  categoryColor: string;
  size?: number;
  delay?: number;
};

export function PhotoPin({ categoryColor, size = 44, delay = 0 }: PhotoPinProps) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }).start();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, scale]);

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          width: size + 24,
          height: size + 32,
          transform: [{ scale }],
        },
      ]}
    >
      <View style={[styles.ring, { width: size + 8, height: size + 8, borderRadius: (size + 8) / 2, borderColor: categoryColor }]}>
        <View style={[styles.photo, { width: size, height: size, borderRadius: size / 2 }]} />
      </View>
      <View style={styles.stem} />
      <View style={[styles.dot, { backgroundColor: categoryColor }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  ring: {
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  photo: {
    backgroundColor: "#2c2c2e",
  },
  stem: {
    width: 2,
    height: 10,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginTop: -2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: -2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
});
