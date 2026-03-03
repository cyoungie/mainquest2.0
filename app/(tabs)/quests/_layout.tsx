import { Stack } from "expo-router";
import { colors } from "@/constants/theme";

export default function QuestsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffff" },
        headerTintColor: colors.textOnLight,
        headerBackTitle: "Back",
        headerLargeTitle: false,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: "#f2f2f7" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Quests",
          headerLargeTitle: true,
          headerTransparent: false,
        }}
      />
      <Stack.Screen name="new" options={{ title: "Post quest", presentation: "modal" }} />
      <Stack.Screen name="[id]" options={{ title: "Quest" }} />
      <Stack.Screen name="[id]/chat" options={{ title: "Group chat" }} />
    </Stack>
  );
}
