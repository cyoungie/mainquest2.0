import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, gotham, fonts } from "@/constants/theme";

const FLIP_DURATION_MS = 600;
const FLIP_EASING = Easing.bezier(0.4, 0.2, 0.2, 1);
const CARD_ASPECT_RATIO = 1.6;
const MAX_CARD_WIDTH = 430;
const HORIZONTAL_PADDING = 24;
const PHOTO_SIZE = 72;
const PHOTO_BORDER = 2.5;
const RING_SIZE = 44;
const RING_STROKE = 2.5;

export type QuestDistributionItem = { type: string; pct: number };

export type IDCardProps = {
  displayName?: string;
  username?: string;
  photoUrl?: string | null;
  matchRate?: number | null;
  heroStat?: number;
  heroLabel?: string;
  heroBadge?: string;
  citiesExplored?: number;
  friendsMade?: number;
  questStreakDays?: number;
  avgRating?: number;
};

const defaultProps: Required<Omit<IDCardProps, "matchRate" | "photoUrl">> & {
  matchRate?: number | null;
  photoUrl?: string | null;
} = {
  displayName: "Your Name",
  username: "username",
  photoUrl: null,
  matchRate: null,
  heroStat: 47,
  heroLabel: "sidequests completed",
  heroBadge: "Top 1% of Questers",
  citiesExplored: 12,
  friendsMade: 28,
  questStreakDays: 5,
  avgRating: 4.6,
};

export function IDCard(props: IDCardProps = {}) {
  const {
    displayName = defaultProps.displayName,
    username = defaultProps.username,
    photoUrl = defaultProps.photoUrl,
    matchRate = defaultProps.matchRate,
    heroStat = defaultProps.heroStat,
    heroLabel = defaultProps.heroLabel,
    heroBadge = defaultProps.heroBadge,
    citiesExplored = defaultProps.citiesExplored,
    friendsMade = defaultProps.friendsMade,
    questStreakDays = defaultProps.questStreakDays,
    avgRating = defaultProps.avgRating,
  } = props;

  const flipAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const radiateAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  useEffect(() => {
    const radiate = Animated.loop(
      Animated.sequence([
        Animated.timing(radiateAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(radiateAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    radiate.start();
    return () => radiate.stop();
  }, [radiateAnim]);

  const { width: screenWidth } = Dimensions.get("window");
  const cardWidth = Math.min(screenWidth - HORIZONTAL_PADDING * 2, MAX_CARD_WIDTH);
  const cardHeight = cardWidth / CARD_ASPECT_RATIO;

  const flip = () => {
    const toValue = flipped ? 0 : 1;
    setFlipped(!flipped);
    if (hintVisible) setHintVisible(false);
    Animated.timing(flipAnim, {
      toValue,
      duration: FLIP_DURATION_MS,
      easing: FLIP_EASING,
      useNativeDriver: true,
    }).start();
  };

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const backRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const showMatch = matchRate != null;
  const matchPct = showMatch ? Math.min(100, Math.max(0, matchRate)) : 0;

  return (
    <View style={styles.wrap}>
      <Pressable onPress={flip} style={styles.pressable}>
        <View style={[styles.cardOuter, { width: cardWidth, height: cardHeight }]}>
          <Animated.View
            style={[
              styles.face,
              styles.front,
              {
                width: cardWidth,
                height: cardHeight,
                transform: [{ rotateY: frontRotate }],
              },
            ]}
          >
            <View style={styles.frontInner}>
              <Text style={styles.cardLabel}>MainQuest</Text>
              <TouchableOpacity
                style={styles.shareBtn}
                onPress={() => {}}
                activeOpacity={0.8}
              >
                <Ionicons name="share-outline" size={22} color="#fff" />
              </TouchableOpacity>

              <View style={styles.centerBlock}>
                <View style={styles.photoWrap}>
                  <Animated.View
                    style={[
                      styles.photoRadiateRing,
                      {
                        opacity: radiateAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 0],
                        }),
                        transform: [
                          {
                            scale: radiateAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.35],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                  <View style={styles.photoRingOuter} />
                  <Animated.View
                    style={[
                      styles.photoRingRed,
                      {
                        transform: [
                          {
                            scale: pulseAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.03],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {photoUrl ? (
                      <Image
                        source={{ uri: photoUrl }}
                        style={styles.photoImg}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.photoPlaceholder} />
                    )}
                  </Animated.View>
                </View>
                <Text style={styles.displayName} numberOfLines={1}>{displayName}</Text>
                <Text style={styles.usernameText}>@{username}</Text>
              </View>

              {showMatch && (
                <View style={styles.matchBlock}>
                  <MatchRing percentage={matchPct} />
                  <Text style={styles.matchLabel}>match</Text>
                </View>
              )}
            </View>
          </Animated.View>
          <Animated.View
            style={[
              styles.face,
              styles.back,
              {
                width: cardWidth,
                height: cardHeight,
                transform: [{ rotateY: backRotate }],
              },
            ]}
          >
            <BackFace
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              heroStat={heroStat}
              heroLabel={heroLabel}
              heroBadge={heroBadge}
              citiesExplored={citiesExplored}
              friendsMade={friendsMade}
              questStreakDays={questStreakDays}
              avgRating={avgRating}
              username={username}
              photoUrl={photoUrl}
            />
          </Animated.View>
        </View>
      </Pressable>
      {hintVisible && (
        <Text style={styles.hint}>Tap to flip</Text>
      )}
    </View>
  );
}

function MatchRing({ percentage }: { percentage: number }) {
  const pct = Math.min(100, Math.max(0, percentage));
  const rot1 = -90 + (Math.min(pct, 50) / 50) * 180;
  const rot2 = 90 + (Math.max(pct - 50, 0) / 50) * 180;
  return (
    <View style={styles.ringTrack}>
      <View style={[styles.ringHalf, { transform: [{ rotate: `${rot1}deg` }] }]} />
      <View style={[styles.ringHalf, { transform: [{ rotate: `${rot2}deg` }] }]} />
      <View style={styles.ringCenter}>
        <Text style={styles.ringNumber}>{Math.round(pct)}%</Text>
      </View>
    </View>
  );
}

const TILE_BG = "#1a2535";

type BackFaceProps = {
  cardWidth: number;
  cardHeight: number;
  heroStat: number;
  heroLabel: string;
  heroBadge: string;
  citiesExplored: number;
  friendsMade: number;
  questStreakDays: number;
  avgRating: number;
  username: string;
  photoUrl?: string | null;
};

function BackFace(props: BackFaceProps) {
  const {
    cardWidth,
    cardHeight,
    heroStat,
    heroLabel,
    heroBadge,
    citiesExplored,
    friendsMade,
    questStreakDays,
    avgRating,
    username,
    photoUrl,
  } = props;
  const statTiles = [
    { emoji: "🌍", value: String(citiesExplored), label: "Cities Explored" },
    { emoji: "👥", value: String(friendsMade), label: "Friends Made" },
    { emoji: "🔥", value: `${questStreakDays} days`, label: "Quest Streak" },
    { emoji: "⭐", value: avgRating.toFixed(1), label: "Avg Rating" },
  ];
  return (
    <View
      style={[
        styles.backInner,
        { width: cardWidth, height: cardHeight, backgroundColor: colors.red },
      ]}
    >
      <View style={styles.heroBlock}>
        <Text style={styles.heroNumber}>{heroStat}</Text>
        <Text style={styles.heroLabel}>{heroLabel}</Text>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>{heroBadge}</Text>
        </View>
      </View>

      <View style={styles.statGrid}>
        {statTiles.map((tile) => (
          <View key={tile.label} style={styles.statTile}>
            <Text style={styles.statEmoji}>{tile.emoji}</Text>
            <Text style={styles.statNumber}>{tile.value}</Text>
            <Text style={styles.statLabel}>{tile.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.backFooter}>
        <View style={styles.backFooterLeft}>
          <View style={styles.backFooterAvatar}>
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
            ) : null}
          </View>
          <Text style={styles.backFooterUsername}>@{username}</Text>
        </View>
        <View style={styles.backFooterWordmark}>
          <Text style={styles.backFooterMain}>main</Text>
          <Text style={styles.backFooterQuest}>quest</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_PADDING,
    marginBottom: spacing.xl,
  },
  pressable: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  cardOuter: {
    position: "relative",
    transformStyle: "preserve-3d" as const,
  },
  face: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: "hidden" as const,
  },
  front: {
    backgroundColor: colors.red,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  frontInner: {
    flex: 1,
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  cardLabel: {
    fontSize: 11,
    fontFamily: gotham.black,
    color: "#fff",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  shareBtn: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.md,
    zIndex: 10,
    padding: 6,
  },
  centerBlock: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    marginTop: -56,
    alignItems: "center",
    justifyContent: "center",
  },
  photoWrap: {
    position: "relative",
    marginBottom: spacing.sm,
  },
  photoRadiateRing: {
    position: "absolute",
    width: PHOTO_SIZE + 8,
    height: PHOTO_SIZE + 8,
    borderRadius: (PHOTO_SIZE + 8) / 2,
    left: -4,
    top: -4,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "transparent",
  },
  photoRingOuter: {
    position: "absolute",
    width: PHOTO_SIZE + 6,
    height: PHOTO_SIZE + 6,
    borderRadius: (PHOTO_SIZE + 6) / 2,
    left: -3,
    top: -3,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
    backgroundColor: "transparent",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 1,
  },
  photoRingRed: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
    borderWidth: PHOTO_BORDER,
    borderColor: "#fff",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  photoImg: {
    position: "absolute",
    left: PHOTO_BORDER,
    top: PHOTO_BORDER,
    width: PHOTO_SIZE - PHOTO_BORDER * 2,
    height: PHOTO_SIZE - PHOTO_BORDER * 2,
    borderRadius: (PHOTO_SIZE - PHOTO_BORDER * 2) / 2,
  },
  photoPlaceholder: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  displayName: {
    fontSize: 16,
    fontFamily: gotham.medium,
    color: "#fff",
    marginBottom: 2,
  },
  usernameText: {
    fontSize: 10,
    fontFamily: gotham.book,
    color: "rgba(255,255,255,0.85)",
    marginBottom: spacing.xs,
  },
  matchBlock: {
    position: "absolute",
    top: spacing.md + 14,
    right: spacing.md,
    alignItems: "center",
  },
  ringTrack: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_STROKE,
    borderColor: "rgba(255,255,255,0.4)",
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  ringHalf: {
    position: "absolute",
    width: RING_SIZE / 2,
    height: RING_SIZE,
    left: RING_SIZE / 4,
    top: 0,
    borderTopLeftRadius: RING_SIZE / 2,
    borderBottomLeftRadius: RING_SIZE / 2,
    borderLeftWidth: RING_STROKE,
    borderTopWidth: RING_STROKE,
    borderBottomWidth: RING_STROKE,
    borderColor: "#fff",
    backgroundColor: "transparent",
  },
  ringCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  ringNumber: {
    fontSize: 12,
    fontFamily: fonts.numberSerif,
    fontWeight: "700",
    color: "#fff",
  },
  matchLabel: {
    fontSize: 8,
    fontFamily: gotham.medium,
    color: "rgba(255,255,255,0.85)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  back: {
    backgroundColor: colors.red,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  backInner: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    justifyContent: "flex-start",
  },
  heroBlock: {
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  heroNumber: {
    fontSize: 20,
    fontFamily: fonts.numberSerif,
    fontWeight: "700",
    color: "#fff",
  },
  heroLabel: {
    fontSize: 9,
    fontFamily: fonts.labelSans,
    color: "#fff",
    marginTop: 1,
  },
  heroBadge: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 999,
    marginTop: 1,
  },
  heroBadgeText: {
    fontSize: 7,
    fontFamily: fonts.labelSans,
    fontWeight: "700",
    color: colors.red,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 4,
  },
  statTile: {
    width: "48%",
    minWidth: 0,
    backgroundColor: TILE_BG,
    borderRadius: 6,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statEmoji: { fontSize: 10, marginBottom: 0 },
  statNumber: {
    fontSize: 14,
    fontFamily: fonts.numberSerif,
    fontWeight: "700",
    color: "#fff",
  },
  statLabel: {
    fontSize: 7,
    fontFamily: fonts.labelSans,
    color: "rgba(255,255,255,0.7)",
    marginTop: 0,
  },
  backFooter: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    paddingTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backFooterLeft: { flexDirection: "row", alignItems: "center", gap: 3 },
  backFooterAvatar: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
  },
  backFooterUsername: {
    fontSize: 6,
    fontFamily: fonts.labelSans,
    color: "rgba(255,255,255,0.85)",
  },
  backFooterWordmark: { flexDirection: "row" },
  backFooterMain: {
    fontSize: 9,
    fontFamily: fonts.numberSerif,
    color: "#fff",
  },
  backFooterQuest: {
    fontSize: 9,
    fontFamily: fonts.numberSerif,
    color: "#fff",
    marginLeft: 1,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
  },
  hint: {
    marginTop: spacing.sm,
    fontSize: 11,
    fontFamily: gotham.book,
    color: colors.textOnLightSecondary,
    opacity: 0.8,
  },
});
