import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

const quests = [
  { id: "1", title: "Sunrise hike at Eagle Peak", when: "Sat 8:00 AM", spots: 3, joined: 2 },
  { id: "2", title: "Coffee at Blue Bottle", when: "Fri 2:00 PM", spots: 2, joined: 1 },
  { id: "3", title: "Gym buddy legs day", when: "Thu 6:00 PM", spots: 1, joined: 0 },
];

export default function QuestMapScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>QUESTMAP</Text>
          <Text style={styles.subtitle}>
            See where sidequests are happening. Tap one to join.
          </Text>
        </View>

        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={48} color={colors.tertiaryLabel} />
          <Text style={styles.mapPlaceholderText}>Map view</Text>
          <Text style={styles.mapPlaceholderHint}>
            Quest locations will show here. Connect a map provider to enable.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Nearby quests</Text>
        {quests.map((q) => (
          <TouchableOpacity
            key={q.id}
            style={styles.row}
            onPress={() => Router.push(`/(tabs)/quests/${q.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.rowIcon}>
              <Ionicons name="location" size={20} color={colors.accent} />
            </View>
            <View style={styles.rowBody}>
              <Text style={styles.rowTitle} numberOfLines={1}>{q.title}</Text>
              <Text style={styles.rowSubtitle}>{q.when} · {q.joined}/{q.spots} people</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.tertiaryLabel} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.seeAll}
          onPress={() => Router.push("/(tabs)/quests")}
        >
          <Text style={styles.seeAllText}>See all quests</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.accent} />
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
  mapPlaceholder: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    marginBottom: spacing.xl,
  },
  mapPlaceholderText: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.tertiaryLabel,
    marginTop: spacing.md,
  },
  mapPlaceholderHint: {
    fontSize: 13,
    color: colors.tertiaryLabel,
    marginTop: spacing.sm,
    textAlign: "center",
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.secondaryLabel,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent + "26",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  rowBody: { flex: 1, minWidth: 0 },
  rowTitle: { fontSize: 17, fontWeight: "600", color: colors.label },
  rowSubtitle: { fontSize: 15, color: colors.tertiaryLabel, marginTop: 2 },
  seeAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  seeAllText: { fontSize: 15, fontWeight: "600", color: colors.accent },
});
