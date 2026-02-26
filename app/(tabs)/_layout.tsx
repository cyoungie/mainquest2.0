import { Tabs } from "expo-router";
import { Platform, View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tertiaryLabel,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopWidth: 0,
            backgroundColor: "transparent",
          },
          default: {
            backgroundColor: colors.secondaryBackground,
          },
        }),
        tabBarBackground: Platform.OS === "ios" ? () => (
          <BlurView
            intensity={80}
            tint="dark"
            style={{ flex: 1, overflow: "hidden" }}
          />
        ) : undefined,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "500" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "MainQuest",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="questmap"
        options={{
          title: "QUESTMAP",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.addIconWrap, focused && styles.addIconWrapActive]}>
              <Ionicons
                name="add"
                size={28}
                color={focused ? "#000" : colors.label}
              />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="bingo"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addIconWrap: {
    width: 52,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.tertiaryLabel,
    alignItems: "center",
    justifyContent: "center",
  },
  addIconWrapActive: {
    backgroundColor: colors.accent,
  },
});
