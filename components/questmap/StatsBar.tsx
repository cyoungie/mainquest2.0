import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, gotham } from "@/constants/theme";

type StatsBarProps = {
  countries: number;
  avgRating: number;
  friends: number;
  totalXp: number;
  variant?: "light" | "dark";
};

export function StatsBar({ countries, avgRating, friends, totalXp, variant = "dark" }: StatsBarProps) {
  const isLight = variant === "light";
  return (
    <View style={[styles.bar, isLight && styles.barLight]}>
      <View style={styles.column}>
        <Text style={[styles.number, isLight && styles.numberLight]}>{countries}</Text>
        <Text style={[styles.label, isLight && styles.labelLight]}>Countries</Text>
      </View>
      <View style={[styles.divider, isLight && styles.dividerLight]} />
      <View style={styles.column}>
        <Text style={[styles.number, isLight && styles.numberLight]}>{avgRating.toFixed(1)}</Text>
        <Text style={[styles.label, isLight && styles.labelLight]}>Avg Rating</Text>
      </View>
      <View style={[styles.divider, isLight && styles.dividerLight]} />
      <View style={styles.column}>
        <Text style={[styles.number, isLight && styles.numberLight]}>{friends}</Text>
        <Text style={[styles.label, isLight && styles.labelLight]}>Friends</Text>
      </View>
      <View style={[styles.divider, isLight && styles.dividerLight]} />
      <View style={styles.column}>
        <Text style={[styles.number, isLight && styles.numberLight]}>{totalXp}</Text>
        <Text style={[styles.label, isLight && styles.labelLight]}>Total XP</Text>
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
    fontFamily: gotham.medium,
    color: colors.label,
    fontVariant: ["tabular-nums"],
  },
  label: {
    fontSize: 10,
    fontFamily: gotham.medium,
    color: colors.tertiaryLabel,
    marginTop: 2,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 24,
    backgroundColor: colors.separator,
  },
  barLight: { backgroundColor: "#fff" },
  numberLight: { color: colors.textOnLight },
  labelLight: { color: colors.textOnLightSecondary },
  dividerLight: { backgroundColor: "rgba(0,0,0,0.08)" },
});
