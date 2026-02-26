import { View, Text, StyleSheet, TouchableOpacity, type ReactNode } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/constants/theme";

type MainQuestHeaderProps = {
  /** "light" = white bar, dark text (main tab). "dark" = transparent/dark, light text (other tabs) */
  variant?: "light" | "dark";
  /** Optional extra element on the right (e.g. profile avatar on main tab) */
  rightExtra?: ReactNode;
};

export function MainQuestHeader({ variant = "light", rightExtra }: MainQuestHeaderProps) {
  const isLight = variant === "light";
  const iconColor = isLight ? colors.textOnLight : colors.label;

  return (
    <View style={[styles.header, isLight ? styles.headerLight : styles.headerDark]}>
      <View style={styles.wordmark}>
        <Text style={[styles.wordmarkMain, isLight ? styles.wordmarkMainLight : styles.wordmarkMainDark]}>
          main
        </Text>
        <Text style={styles.wordmarkQuest}>quest</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon} hitSlop={12}>
          <Ionicons name="notifications-outline" size={24} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} hitSlop={12}>
          <Ionicons name="menu" size={24} color={iconColor} />
        </TouchableOpacity>
        {rightExtra}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerLight: {
    backgroundColor: "#ffffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  headerDark: {
    backgroundColor: "transparent",
  },
  wordmark: { flexDirection: "row" },
  wordmarkMain: { fontSize: 22, fontWeight: "700" },
  wordmarkMainLight: { color: colors.textOnLight },
  wordmarkMainDark: { color: colors.label },
  wordmarkQuest: { fontSize: 22, fontWeight: "700", color: colors.red },
  headerRight: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  headerIcon: { padding: 4 },
});
