import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, gotham, heading } from "@/constants/theme";

const LIGHT_BG = "#f2f2f7";
const CARD_BG = "#fff";

export default function QuestChatScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id != null ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Ionicons name="chatbubbles" size={48} color={colors.red} />
          </View>
          <Text style={styles.title}>Group chat</Text>
          <Text style={styles.paragraph}>
            You're in! Chat with everyone who's going. This chat stays active until 24 hours after the event.
          </Text>
          {id ? (
            <Text style={styles.meta}>Quest #{id}</Text>
          ) : null}
        </View>
        <Text style={styles.hint}>Chat UI can be wired to your realtime backend.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: LIGHT_BG },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: "center",
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.red + "18",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontFamily: heading.bold,
    color: colors.textOnLight,
    marginBottom: spacing.md,
  },
  paragraph: {
    fontSize: 15,
    fontFamily: gotham.book,
    color: colors.textOnLightSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  meta: {
    fontSize: 13,
    fontFamily: gotham.medium,
    color: colors.textOnLightSecondary,
  },
  hint: {
    fontSize: 12,
    fontFamily: gotham.book,
    color: colors.tertiaryLabel,
  },
});
