import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/constants/theme";

export default function QuestChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="chatbubbles" size={56} color={colors.accentGreen} />
        </View>
        <Text style={styles.title}>Group chat</Text>
        <Text style={styles.paragraph}>
          When a quest hits the required number of people, a group chat is
          created here. It stays active until 24 hours after the event.
        </Text>
        <Text style={styles.meta}>Quest #{id} — chat UI can be wired to your realtime backend.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xxl,
  },
  iconWrap: { marginBottom: spacing.xl },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.label,
    marginBottom: spacing.md,
  },
  paragraph: {
    fontSize: 15,
    color: colors.tertiaryLabel,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  meta: { fontSize: 13, color: colors.tertiaryLabel },
});
