import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { QuestDetailCard, type QuestDetail } from "@/components/questmap/QuestDetailCard";
import { StatsBar } from "@/components/questmap/StatsBar";
import { MOCK_QUESTS, getStats } from "@/components/questmap/mockQuests";
import { colors, spacing, radius } from "@/constants/theme";
import { MainQuestHeader } from "@/components/MainQuestHeader";

// In Expo Go, MapView crashes on this tab. Use list here; map only in dev/standalone builds.
const isExpoGo = Constants.appOwnership === "expo";

export default function QuestMapScreen() {
  const [selectedQuest, setSelectedQuest] = useState<QuestDetail | null>(null);
  const [cardVisible, setCardVisible] = useState(false);

  const stats = getStats(MOCK_QUESTS);

  const openCard = useCallback((quest: QuestDetail) => {
    setSelectedQuest(quest);
    setCardVisible(true);
  }, []);

  const closeCard = useCallback(() => {
    setCardVisible(false);
    setSelectedQuest(null);
  }, []);

  // Dev/standalone build: load map screen (react-native-maps only required here)
  if (!isExpoGo) {
    const QuestMapView = require("./QuestMapView").default;
    return <QuestMapView />;
  }

  // Expo Go: list only (no MapView to avoid crash)
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <MainQuestHeader variant="light" />
        <Text style={styles.subtitle}>
          Your quests. Tap one to open. (Map in dev build.)
        </Text>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {MOCK_QUESTS.map((quest) => (
            <TouchableOpacity
              key={quest.id}
              style={styles.row}
              onPress={() => openCard(quest)}
              activeOpacity={0.7}
            >
              <View style={[styles.pin, { backgroundColor: quest.categoryColor }]} />
              <View style={styles.rowBody}>
                <Text style={styles.rowTitle} numberOfLines={1}>{quest.name}</Text>
                <Text style={styles.rowSubtitle}>
                  {quest.city}, {quest.country} · {quest.questNumber}th quest
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textOnLightSecondary} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      <View style={styles.statsWrap}>
        <StatsBar
          countries={stats.countries}
          avgRating={stats.avgRating}
          friends={stats.friends}
          totalXp={stats.totalXp}
          variant="light"
        />
      </View>

      <QuestDetailCard
        quest={selectedQuest}
        onClose={closeCard}
        visible={cardVisible}
      />
    </View>
  );
}

const LIGHT_BG = "#f2f2f7";
const CARD_BG = "#fff";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_BG },
  safe: { flex: 1 },
  subtitle: {
    fontSize: 14,
    color: colors.textOnLightSecondary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  pin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  rowBody: { flex: 1, minWidth: 0 },
  rowTitle: { fontSize: 17, fontWeight: "600", color: colors.textOnLight },
  rowSubtitle: { fontSize: 14, color: colors.textOnLightSecondary, marginTop: 2 },
  statsWrap: {
    backgroundColor: CARD_BG,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
});
