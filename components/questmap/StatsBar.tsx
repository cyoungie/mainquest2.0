import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "@/constants/theme";

type StatsBarProps = {
  countries: number;
  avgRating: number;
  friends: number;
  totalXp: number;
};

export function StatsBar({ countries, avgRating, friends, totalXp }: StatsBarProps) {
  return (
    <View style={styles.bar}>
      <View style={styles.column}>
        <Text style={styles.number}>{countries}</Text>
        <Text style={styles.label}>Countries</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.column}>
        <Text style={styles.number}>{avgRating.toFixed(1)}</Text>
        <Text style={styles.label}>Avg Rating</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.column}>
        <Text style={styles.number}>{friends}</Text>
        <Text style={styles.label}>Friends</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.column}>
        <Text style={styles.number}>{totalXp}</Text>
        <Text style={styles.label}>Total XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.secondaryBackground,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  column: { flex: 1, alignItems: "center" },
  number: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.label,
    fontVariant: ["tabular-nums"],
    // Optional: set fontFamily to fonts.numberSerif after loading Cormorant Garamond
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.tertiaryLabel,
    marginTop: 2,
    letterSpacing: 1,
    textTransform: "uppercase",
    // Optional: set fontFamily to fonts.labelSans after loading DM Sans
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 24,
    backgroundColor: colors.separator,
  },
});
