import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { PhotoPin } from "@/components/questmap/PhotoPin";
import { QuestDetailCard, type QuestDetail } from "@/components/questmap/QuestDetailCard";
import { StatsBar } from "@/components/questmap/StatsBar";
import { MOCK_QUESTS, getStats } from "@/components/questmap/mockQuests";
import { colors, spacing } from "@/constants/theme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// CartoDB dark — no API key. Use mapType to avoid double layer on Android.
const CARTODB_DARK_TILES =
  "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";

const INITIAL_REGION = {
  latitude: 37.8,
  longitude: -122.35,
  latitudeDelta: 0.4,
  longitudeDelta: 0.35,
};

export default function QuestMapScreen() {
  const mapRef = useRef<MapView>(null);
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
        mapType={Platform.OS === "android" ? "none" : "muted"}
        onPress={handleMapPress}
        rotateEnabled
        pitchEnabled
      >
        <UrlTile urlTemplate={CARTODB_DARK_TILES} maximumZ={19} />
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

      <SafeAreaView style={styles.overlay} edges={["top"]} pointerEvents="box-none">
        <View style={styles.header}>
          <Text style={styles.title}>QUESTMAP</Text>
          <Text style={styles.subtitle}>
            Your quests on the map. Tap a pin to open.
          </Text>
        </View>
      </SafeAreaView>

      <View style={styles.statsWrap} pointerEvents="box-none">
        <StatsBar
          countries={stats.countries}
          avgRating={stats.avgRating}
          friends={stats.friends}
          totalXp={stats.totalXp}
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
  container: { flex: 1, backgroundColor: colors.background },
  map: { ...StyleSheet.absoluteFillObject },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  header: { marginBottom: spacing.sm },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.label,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.tertiaryLabel,
    marginTop: 2,
  },
  statsWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
