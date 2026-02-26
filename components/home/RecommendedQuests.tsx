import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

const recommendations = [
  {
    id: "1",
    title: "Sunrise hike at Eagle Peak",
    when: "Sat 8:00 AM",
    spots: 3,
    joined: 2,
    icon: "walk" as const,
  },
  {
    id: "2",
    title: "Study sesh + coffee at Blue Bottle",
    when: "Fri 2:00 PM",
    spots: 2,
    joined: 1,
    icon: "cafe" as const,
  },
];

export function RecommendedQuests() {
  return (
    <View style={styles.list}>
      {recommendations.map((q) => (
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
            <Text style={styles.rowSubtitle}>{q.when}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="people" size={14} color={colors.tertiaryLabel} />
            <Text style={styles.badgeText}>{q.joined}/{q.spots}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: { fontSize: 15, color: colors.tertiaryLabel },
});
