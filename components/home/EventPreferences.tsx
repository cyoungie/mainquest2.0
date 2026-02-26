import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

const iconMap = {
  mountain: "walk" as const,
  coffee: "cafe" as const,
  dumbbell: "barbell" as const,
};

type EventType = {
  id: string;
  label: string;
  iconId: keyof typeof iconMap;
};

export function EventPreferences({
  eventTypes,
}: {
  eventTypes: readonly EventType[];
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  return (
    <View style={styles.wrap}>
      {eventTypes.map(({ id, label, iconId }) => {
        const isSelected = selected.has(id);
        const iconName = iconMap[iconId];
        return (
          <TouchableOpacity
            key={id}
            onPress={() => {
              setSelected((prev) => {
                const next = new Set(prev);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
              });
            }}
            style={[styles.chip, isSelected && styles.chipSelected]}
            activeOpacity={0.7}
          >
            <Ionicons
              name={iconName}
              size={18}
              color={isSelected ? colors.accent : colors.tertiaryLabel}
            />
            <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.separator,
    backgroundColor: colors.tertiaryBackground,
  },
  chipSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent + "26",
  },
  chipLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.tertiaryLabel,
  },
  chipLabelSelected: { color: colors.accent },
});
