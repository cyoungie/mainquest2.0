import React, { useRef, useState, useCallback } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { PhotoPin } from "@/components/questmap/PhotoPin";
import { QuestDetailCard, type QuestDetail } from "@/components/questmap/QuestDetailCard";
import { StatsBar } from "@/components/questmap/StatsBar";
import { MOCK_QUESTS, getStats } from "@/components/questmap/mockQuests";
import { colors, spacing, gotham } from "@/constants/theme";
import { MainQuestHeader } from "@/components/MainQuestHeader";

const INITIAL_REGION = {
  latitude: 37.8,
  longitude: -122.35,
  latitudeDelta: 0.4,
  longitudeDelta: 0.35,
};

/**
 * Map-only screen. Loaded only in dev/standalone builds (not in Expo Go)
 * via conditional require in questmap.tsx to avoid loading react-native-maps in Expo Go.
 */
export default function QuestMapView() {
  const mapRef = useRef<MapView | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<QuestDetail | null>(null);
  const [cardVisible, setCardVisible] = useState(false);

  const stats = getStats(MOCK_QUESTS);
  const routeCoords = MOCK_QUESTS.map((q) => ({ latitude: q.latitude, longitude: q.longitude }));

  const openCard = useCallback((quest: QuestDetail) => {
    setSelectedQuest(quest);
    setCardVisible(true);
    const item = MOCK_QUESTS.find((q) => q.id === quest.id);
    if (item && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: item.latitude,
        longitude: item.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, []);

  const closeCard = useCallback(() => {
    setCardVisible(false);
    setSelectedQuest(null);
  }, []);

  const handleMapPress = useCallback(() => {
    if (cardVisible) closeCard();
  }, [cardVisible, closeCard]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        mapType={Platform.OS === "ios" ? "muted" : "standard"}
        onPress={handleMapPress}
        rotateEnabled
        pitchEnabled
      >
        <Polyline
          coordinates={routeCoords}
          strokeColor={colors.red}
          strokeWidth={3}
          lineDashPattern={[8, 4]}
          lineCap="round"
          lineJoin="round"
        />
        {MOCK_QUESTS.map((quest, index) => (
          <Marker
            key={quest.id}
            coordinate={{ latitude: quest.latitude, longitude: quest.longitude }}
            anchor={{ x: 0.5, y: 1 }}
            onPress={() => openCard(quest)}
            tracksViewChanges={false}
          >
            <PhotoPin
              categoryColor={quest.categoryColor}
              size={44}
              delay={index * 80}
            />
          </Marker>
        ))}
      </MapView>
      <SafeAreaView style={styles.mapOverlay} edges={["top"]} pointerEvents="box-none">
        <MainQuestHeader variant="dark" />
        <Text style={styles.subtitle}>Your quests on the map. Tap a pin to open.</Text>
      </SafeAreaView>
      <View style={styles.statsWrap}>
        <StatsBar
          countries={stats.countries}
          avgRating={stats.avgRating}
          friends={stats.friends}
          totalXp={stats.totalXp}
        />
      </View>
      <QuestDetailCard quest={selectedQuest} onClose={closeCard} visible={cardVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  map: { ...StyleSheet.absoluteFillObject },
  mapOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: gotham.book,
    color: colors.tertiaryLabel,
    paddingHorizontal: spacing.lg,
  },
  statsWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.secondaryBackground,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
});
