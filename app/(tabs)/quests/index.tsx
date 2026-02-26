import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

const quests = [
  {
    id: "1",
    title: "Sunrise hike at Eagle Peak",
    when: "Sat 8:00 AM",
    spots: 3,
    joined: 2,
    author: "Alex",
    icon: "walk" as const,
  },
  {
    id: "2",
    title: "Study sesh + coffee at Blue Bottle",
    when: "Fri 2:00 PM",
    spots: 2,
    joined: 1,
    author: "Jordan",
    icon: "cafe" as const,
  },
  {
    id: "3",
    title: "Gym buddy for legs day",
    when: "Thu 6:00 PM",
    spots: 1,
    joined: 0,
    author: "Sam",
    icon: "barbell" as const,
  },
];

export default function QuestsListScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.subtitle}>
            Post an event or join one. When the crew is full, group chat unlocks.
          </Text>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => Router.push("/(tabs)/quests/new")}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={22} color="#000" />
            <Text style={styles.postButtonText}>Post quest</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {quests.map((q) => {
            const full = q.joined >= q.spots;
            return (
              <TouchableOpacity
                key={q.id}
                style={styles.row}
                onPress={() => Router.push(`/(tabs)/quests/${q.id}`)}
                activeOpacity={0.7}
              >
                <View style={styles.iconWrap}>
                  <Ionicons name={q.icon} size={24} color={colors.accentViolet} />
                </View>
                <View style={styles.middle}>
                  <Text style={styles.rowTitle} numberOfLines={1}>{q.title}</Text>
                  <Text style={styles.rowSubtitle}>
                    {q.when} · by {q.author}
                  </Text>
                </View>
                <View style={styles.badgeWrap}>
                  <View style={styles.badge}>
                    <Ionicons name="people" size={14} color={colors.tertiaryLabel} />
                    <Text style={styles.badgeText}>{q.joined}/{q.spots}</Text>
                  </View>
                  {full && (
                    <View style={styles.fullBadge}>
                      <Text style={styles.fullBadgeText}>Full</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  header: { marginBottom: spacing.xl },
  subtitle: {
    fontSize: 15,
    color: colors.tertiaryLabel,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  postButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
  },
  postButtonText: { fontSize: 17, fontWeight: "600", color: "#000" },
  list: { gap: spacing.sm },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.xl,
    padding: spacing.lg,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.accentViolet + "26",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.lg,
  },
  middle: { flex: 1, minWidth: 0 },
  rowTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.label,
  },
  rowSubtitle: {
    fontSize: 15,
    color: colors.tertiaryLabel,
    marginTop: 2,
  },
  badgeWrap: { alignItems: "flex-end", gap: 4 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: { fontSize: 15, color: colors.tertiaryLabel },
  fullBadge: {
    backgroundColor: colors.accentGreen + "26",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  fullBadgeText: { fontSize: 12, fontWeight: "600", color: colors.accentGreen },
});
