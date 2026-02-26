import { Stack } from "expo-router";

export default function QuestsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#ffffff",
        headerBackTitle: "Back",
        headerLargeTitle: false,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: "#000000" },
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
