import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

const leaderboard = [
  { rank: 1, name: "Jordan", score: 11, you: false },
  { rank: 2, name: "Alex", score: 9, you: false },
  { rank: 3, name: "You", score: 7, you: true },
  { rank: 4, name: "Sam", score: 5, you: false },
  { rank: 5, name: "Riley", score: 4, you: false },
];

export default function LeaderboardScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Leaderboard</Text>
          <Text style={styles.subtitle}>
            Who’s completed the most experiences this month? Compete with friends.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Ionicons name="trophy" size={22} color={colors.accent} />
            <Text style={styles.cardTitle}>February 2025</Text>
          </View>
          <Text style={styles.cardText}>
            Based on completed sidequests and bingo squares.
          </Text>
        </View>

        <View style={styles.list}>
          {leaderboard.map((entry) => (
            <View
              key={entry.rank}
              style={[styles.row, entry.you && styles.rowYou]}
            >
              <Text style={styles.rank}>{entry.rank}</Text>
              <View style={styles.avatar} />
              <View style={styles.rowBody}>
                <Text style={[styles.name, entry.you && styles.nameYou]}>
                  {entry.name}
                  {entry.you && " (you)"}
                </Text>
              </View>
              <Text style={styles.score}>{entry.score}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.bingoLink}
          onPress={() => Router.push("/(tabs)/bingo")}
        >
          <Ionicons name="grid" size={22} color={colors.accentViolet} />
          <Text style={styles.bingoLinkText}>View your bingo card</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.tertiaryLabel} />
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  header: { marginBottom: spacing.xl },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: colors.label,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: colors.tertiaryLabel,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  cardRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  cardTitle: { fontSize: 17, fontWeight: "600", color: colors.secondaryLabel },
  cardText: {
    fontSize: 15,
    color: colors.tertiaryLabel,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  list: { marginBottom: spacing.xl },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  rowYou: {
    borderWidth: 2,
    borderColor: colors.accent + "40",
  },
  rank: {
    width: 28,
    fontSize: 17,
    fontWeight: "700",
    color: colors.tertiaryLabel,
    textAlign: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.separator,
    marginHorizontal: spacing.md,
  },
  rowBody: { flex: 1 },
  name: { fontSize: 17, fontWeight: "600", color: colors.label },
  nameYou: { color: colors.accent },
  score: { fontSize: 17, fontWeight: "700", color: colors.accent },
  bingoLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  bingoLinkText: { flex: 1, fontSize: 17, fontWeight: "600", color: colors.accentViolet },
});
