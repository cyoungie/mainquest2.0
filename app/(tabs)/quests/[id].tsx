import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

const quest = {
  id: "1",
  title: "Sunrise hike at Eagle Peak",
  when: "Saturday 8:00 AM",
  where: "Eagle Peak Trailhead",
  spots: 3,
  joined: 2,
  author: "Alex",
  joinedUsers: ["Alex", "Jordan"],
  groupChatActive: false,
};

export default function QuestDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const id = params.id != null ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";
  const [imDown, setImDown] = useState(false);
  const full = quest.joined >= quest.spots;
  const canJoin = !full && !imDown;

  const openChat = () => {
    if (id && router?.push) router.push(`/(tabs)/quests/${id}/chat`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.iconLarge}>
            <Ionicons name="walk" size={28} color={colors.accentViolet} />
          </View>
          <Text style={styles.title}>{quest.title}</Text>
          <Text style={styles.meta}>
            {quest.when} · {quest.where}
          </Text>
          <Text style={styles.author}>Posted by {quest.author}</Text>

          <View style={styles.spotsRow}>
            <Ionicons name="people" size={20} color={colors.tertiaryLabel} />
            <Text style={styles.spotsText}>
              {quest.joined}/{quest.spots} people
            </Text>
            {full && (
              <View style={styles.fullBadge}>
                <Text style={styles.fullBadgeText}>Crew full — group chat open</Text>
              </View>
            )}
          </View>

          {canJoin && (
            <TouchableOpacity
              style={styles.imDownButton}
              onPress={() => {
                setImDown(true);
                openChat();
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.imDownText}>I'm Down</Text>
            </TouchableOpacity>
          )}

          {imDown && (
            <>
              <Text style={styles.joinedText}>
                You're in! Group chat is open.
              </Text>
              <TouchableOpacity
                style={styles.chatButton}
                onPress={openChat}
                activeOpacity={0.8}
              >
                <Ionicons name="chatbubbles" size={22} color={colors.accentGreen} />
                <Text style={styles.chatButtonText}>Open group chat</Text>
              </TouchableOpacity>
            </>
          )}

          {full && (
            <TouchableOpacity
              style={styles.chatButton}
              onPress={openChat}
              activeOpacity={0.8}
            >
              <Ionicons name="chatbubbles" size={22} color={colors.accentGreen} />
              <Text style={styles.chatButtonText}>Open group chat</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.whoLabel}>Who's going</Text>
        {quest.joinedUsers.map((name) => (
          <View key={name} style={styles.personRow}>
            <View style={styles.avatar} />
            <Text style={styles.personName}>{name}</Text>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  card: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  iconLarge: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.accentViolet + "26",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.label,
    marginBottom: spacing.sm,
  },
  meta: { fontSize: 15, color: colors.tertiaryLabel, marginBottom: spacing.xs },
  author: { fontSize: 13, color: colors.tertiaryLabel, marginBottom: spacing.lg },
  spotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  spotsText: { fontSize: 15, color: colors.tertiaryLabel },
  fullBadge: {
    backgroundColor: colors.accentGreen + "26",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  fullBadgeText: { fontSize: 12, fontWeight: "600", color: colors.accentGreen },
  imDownButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: "center",
  },
  imDownText: { fontSize: 18, fontWeight: "700", color: "#000" },
  joinedText: {
    fontSize: 15,
    color: colors.accentGreen,
    textAlign: "center",
    marginTop: spacing.md,
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.accentGreen + "26",
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  chatButtonText: { fontSize: 17, fontWeight: "600", color: colors.accentGreen },
  whoLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.tertiaryLabel,
    marginBottom: spacing.md,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.separator,
    marginRight: spacing.md,
  },
  personName: { fontSize: 17, fontWeight: "500", color: colors.label },
});
