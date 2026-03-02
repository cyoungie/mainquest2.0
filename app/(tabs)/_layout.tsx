import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { colors, heading } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.textOnLightSecondary,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopWidth: 0,
            backgroundColor: "transparent",
          },
          default: {
            backgroundColor: "#f2f2f7",
          },
        }),
        tabBarBackground: Platform.OS === "ios" ? () => (
          <BlurView
            intensity={80}
            tint="light"
            style={{ flex: 1, overflow: "hidden" }}
          />
        ) : undefined,
        tabBarLabelStyle: { fontSize: 10, fontFamily: heading.medium },
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
          href: null,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          href: null,
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

