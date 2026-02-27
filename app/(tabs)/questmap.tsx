import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuestDetailCard, type QuestDetail } from "@/components/questmap/QuestDetailCard";
import { StatsBar } from "@/components/questmap/StatsBar";
import { LeafletMapView } from "@/components/questmap/LeafletMapView";
import { MOCK_QUESTS, getStats } from "@/components/questmap/mockQuests";
import { colors, spacing, gotham } from "@/constants/theme";
import { MainQuestHeader } from "@/components/MainQuestHeader";

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

  const handleMapTap = useCallback(() => {
    if (cardVisible) closeCard();
  }, [cardVisible, closeCard]);

  const handleMarkerTap = useCallback(
    (questId: string) => {
      const quest = MOCK_QUESTS.find((q) => q.id === questId);
      if (quest) openCard(quest);
    },
    [openCard]
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerBlock} edges={["top"]}>
        <MainQuestHeader variant="light" />
        <Text style={styles.subtitle}>
          Your quests on the map. Tap a pin to open. Tap empty space to close.
        </Text>
      </SafeAreaView>
      <View style={styles.mapContainer}>
        <LeafletMapView
          quests={MOCK_QUESTS}
          onMapTap={handleMapTap}
          onMarkerTap={handleMarkerTap}
        />
      </View>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7" },
  headerBlock: {
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: gotham.book,
    color: colors.textOnLightSecondary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  mapContainer: { flex: 1 },
  statsWrap: {
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
});
