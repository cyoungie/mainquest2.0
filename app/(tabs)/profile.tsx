import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";
import { MainQuestHeader } from "@/components/MainQuestHeader";

const pastQuests = [
  { id: "1", title: "Sunrise hike at Eagle Peak", when: "Jan 15, 2025", people: ["Alex", "Jordan", "You"] },
  { id: "2", title: "Coffee at Blue Bottle", when: "Jan 10, 2025", people: ["Jordan", "You"] },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <MainQuestHeader variant="light" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.name}>You</Text>
            <Text style={styles.handle}>@username · Your school</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Ionicons name="mic" size={22} color={colors.accentViolet} />
            <Text style={styles.cardTitle}>AI voice chatbot</Text>
          </View>
          <Text style={styles.cardText}>
            A quick, casual conversation so we get to know your interests, hobbies,
            and personality. Setup takes under 5 minutes and helps match you with
            people you'll vibe with.
          </Text>
          <TouchableOpacity style={styles.voiceButton} activeOpacity={0.8}>
            <Ionicons name="sparkles" size={20} color={colors.accentViolet} />
            <Text style={styles.voiceButtonText}>Start setup (voice)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.cardRow}>
            <Ionicons name="book" size={22} color={colors.accent} />
            <Text style={styles.cardTitle}>Digital scrapbook</Text>
          </View>
          <Text style={styles.cardText}>
            Every sidequest you've been on and the people you went with.
          </Text>
          {pastQuests.length === 0 ? (
            <View style={styles.emptyScrapbook}>
              <Text style={styles.emptyText}>Complete quests to build your scrapbook.</Text>
            </View>
          ) : (
            <View style={styles.scrapbookList}>
              {pastQuests.map((q) => (
                <View key={q.id} style={styles.scrapbookItem}>
                  <Text style={styles.scrapbookTitle}>{q.title}</Text>
                  <Text style={styles.scrapbookWhen}>{q.when}</Text>
                  <Text style={styles.scrapbookPeople}>
                    With {q.people.filter((p) => p !== "You").join(", ")}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const LIGHT_BG = "#f2f2f7";
const CARD_BG = "#fff";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: LIGHT_BG },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e8e8ed",
    marginRight: spacing.lg,
  },
  headerText: {},
  name: { fontSize: 22, fontWeight: "700", color: colors.textOnLight },
  handle: { fontSize: 15, color: colors.textOnLightSecondary, marginTop: 4 },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  cardRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  cardTitle: { fontSize: 17, fontWeight: "600", color: colors.textOnLightSecondary },
  cardText: {
    fontSize: 15,
    color: colors.textOnLightSecondary,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  voiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.accentViolet + "26",
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
  },
  voiceButtonText: { fontSize: 17, fontWeight: "600", color: colors.accentViolet },
  section: { marginBottom: spacing.xxl },
  scrapbookList: { marginTop: spacing.md, gap: spacing.sm },
  scrapbookItem: {
    backgroundColor: CARD_BG,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
  scrapbookTitle: { fontSize: 17, fontWeight: "600", color: colors.textOnLight },
  scrapbookWhen: { fontSize: 13, color: colors.textOnLightSecondary, marginTop: 4 },
  scrapbookPeople: { fontSize: 15, color: colors.textOnLightSecondary, marginTop: 4 },
  emptyScrapbook: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.separator,
    borderRadius: radius.lg,
    padding: spacing.xxl,
    marginTop: spacing.md,
  },
  emptyText: { fontSize: 15, color: colors.textOnLightSecondary, textAlign: "center" },
});
