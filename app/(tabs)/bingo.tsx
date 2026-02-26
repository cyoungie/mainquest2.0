import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

const experiences = [
  "First coffee date",
  "Hike a trail",
  "Gym buddy session",
  "Study at a new café",
  "Try a new restaurant",
  "Concert or show",
  "Beach day",
  "Museum visit",
  "Game night",
];

export default function BingoScreen() {
  const [completed, setCompleted] = useState<Set<number>>(new Set([0, 2, 5, 8]));

  const toggle = (i: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Bingo</Text>
          <Text style={styles.subtitle}>
            Collect experiences like cards. Complete as many as you can this month
            and compete with friends.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardRowLeft}>
              <Ionicons name="trophy" size={20} color={colors.accent} />
              <Text style={styles.cardTitle}>February 2025</Text>
            </View>
            <View style={styles.cardRowRight}>
              <Ionicons name="grid" size={16} color={colors.tertiaryLabel} />
              <Text style={styles.cardMeta}>
                {completed.size}/{experiences.length} completed
              </Text>
            </View>
          </View>
          <Text style={styles.cardText}>
            Complete quests to mark squares. Compete with friends on the leaderboard.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Your card</Text>
        <View style={styles.grid}>
          {experiences.slice(0, 9).map((label, i) => {
            const isCompleted = completed.has(i);
            return (
              <TouchableOpacity
                key={i}
                style={[styles.gridCell, isCompleted && styles.gridCellCompleted]}
                onPress={() => toggle(i)}
                activeOpacity={0.7}
              >
                {isCompleted && (
                  <Text style={styles.gridCheck}>✓</Text>
                )}
                <Text
                  style={[styles.gridLabel, isCompleted && styles.gridLabelCompleted]}
                  numberOfLines={2}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.card, { marginTop: spacing.xl }]}>
          <View style={styles.cardRowLeft}>
            <Ionicons name="people" size={20} color={colors.accentGreen} />
            <Text style={styles.cardTitle}>Friends leaderboard</Text>
          </View>
          <Text style={styles.cardText}>
            Connect with friends to see who completes the most experiences each month.
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.link}>View leaderboard →</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  header: { marginBottom: spacing.xxl },
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
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardRowLeft: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  cardRowRight: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  cardTitle: { fontSize: 17, fontWeight: "600", color: colors.secondaryLabel },
  cardMeta: { fontSize: 15, color: colors.tertiaryLabel },
  cardText: {
    fontSize: 15,
    color: colors.tertiaryLabel,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.secondaryLabel,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  gridCell: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.separator,
    padding: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  gridCellCompleted: {
    borderColor: colors.accentGreen,
    backgroundColor: colors.accentGreen + "20",
  },
  gridCheck: { fontSize: 20, color: colors.accentGreen, marginBottom: 4 },
  gridLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.tertiaryLabel,
    textAlign: "center",
  },
  gridLabelCompleted: { color: colors.accentGreen },
  link: { fontSize: 15, color: colors.accent, marginTop: spacing.md, fontWeight: "500" },
});
