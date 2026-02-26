import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

export type QuestDetail = {
  id: string;
  questNumber: number;
  name: string;
  category: string;
  categoryColor: string;
  rating: number;
  city: string;
  country: string;
  friends: { name: string; username: string }[];
  note: string;
  date: string;
  photoUrl?: string;
};

type QuestDetailCardProps = {
  quest: QuestDetail | null;
  onClose: () => void;
  visible: boolean;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_HEIGHT = SCREEN_HEIGHT * 0.55;

export function QuestDetailCard({ quest, onClose, visible }: QuestDetailCardProps) {
  const slideAnim = useRef(new Animated.Value(CARD_HEIGHT)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = React.useState(false);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : CARD_HEIGHT,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
    if (!visible) setFlipped(false);
  }, [visible, slideAnim]);

  const flip = () => {
    const toValue = flipped ? 0 : 1;
    setFlipped(!flipped);
    Animated.spring(flipAnim, {
      toValue,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  };

  if (!quest) return null;

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const backRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.cardWrap,
        {
          height: CARD_HEIGHT,
          transform: [{ translateY: slideAnim }],
        },
      ]}
      pointerEvents={visible ? "auto" : "none"}
    >
      <View style={styles.card}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={12}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        <Pressable onPress={flip} style={styles.flipArea}>
          {/* Front */}
          <Animated.View
            style={[
              styles.side,
              styles.front,
              {
                transform: [{ rotateY: frontRotate }],
              },
            ]}
          >
            <View style={styles.photoSection}>
              {quest.photoUrl ? (
                <Image source={{ uri: quest.photoUrl }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
              ) : (
                <View style={styles.photoPlaceholder} />
              )}
              <View style={styles.photoGradient} />
              <Text style={styles.questNumber}>{quest.questNumber}th quest</Text>
              <View style={[styles.categoryTag, { backgroundColor: quest.categoryColor }]}>
                <Text style={styles.categoryTagText}>{quest.category}</Text>
              </View>
              <View style={styles.photoFooter}>
                <Text style={styles.questName}>{quest.name}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{quest.rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.locationText}>{quest.city}, {quest.country}</Text>
              </View>
            </View>
            <View style={styles.friendsRow}>
              <View style={styles.avatars}>
                {quest.friends.slice(0, 3).map((f, i) => (
                  <View key={f.username} style={[styles.miniAvatar, { marginLeft: i > 0 ? -8 : 0 }]} />
                ))}
              </View>
              <Text style={styles.friendsNames} numberOfLines={1}>
                {quest.friends.map((f) => f.name).join(", ")}
              </Text>
              <Text style={styles.flipHint}>Tap to flip →</Text>
            </View>
          </Animated.View>

          {/* Back */}
          <Animated.View
            style={[
              styles.side,
              styles.back,
              {
                transform: [{ rotateY: backRotate }],
              },
            ]}
          >
            <View style={styles.backContent}>
              <View style={styles.backSection}>
                <Text style={styles.backLabel}>Quest</Text>
                <Text style={styles.backValue}>#{quest.questNumber} · {quest.name}</Text>
                <Text style={styles.backValue}>{quest.city}, {quest.country} · {quest.date}</Text>
              </View>
              <View style={styles.backSection}>
                <Text style={styles.backLabel}>Went with</Text>
                <View style={styles.chipRow}>
                  {quest.friends.map((f) => (
                    <View key={f.username} style={styles.chip}>
                      <View style={styles.chipAvatar} />
                      <Text style={styles.chipText}>@{f.username}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.backSection}>
                <Text style={styles.backLabel}>Rating</Text>
                <View style={styles.ratingBars}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.ratingBar,
                        {
                          flex: i < Math.round(quest.rating) ? 1 : 0.3,
                          backgroundColor: quest.categoryColor,
                        },
                      ]}
                    />
                  ))}
                </View>
                <Text style={styles.ratingNumber}>{quest.rating.toFixed(1)}/10</Text>
              </View>
              <View style={styles.backSection}>
                <Text style={styles.backLabel}>Your note</Text>
                <Text style={styles.note}>"{quest.note}"</Text>
              </View>
              <Text style={styles.flipBackHint}>Tap to flip back</Text>
            </View>
          </Animated.View>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.separator,
  },
  closeBtn: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
    padding: 4,
  },
  flipArea: { flex: 1 },
  side: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: "hidden",
  },
  front: {},
  back: { backgroundColor: colors.secondaryBackground },
  photoSection: { height: 200, position: "relative" },
  photoPlaceholder: { ...StyleSheet.absoluteFillObject, backgroundColor: "#2c2c2e" },
  photoGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)" },
  questNumber: { position: "absolute", top: spacing.md, left: spacing.md, fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: "600" },
  categoryTag: { position: "absolute", top: spacing.md, right: spacing.md, paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.sm },
  categoryTagText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  photoFooter: { position: "absolute", left: 0, right: 0, bottom: 0, padding: spacing.md },
  questName: { fontSize: 18, fontWeight: "700", color: "#fff" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  ratingText: { fontSize: 14, color: "#FFD700", fontWeight: "600" },
  locationText: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 2 },
  friendsRow: { flexDirection: "row", alignItems: "center", padding: spacing.md, gap: spacing.sm },
  avatars: { flexDirection: "row" },
  miniAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.tertiaryBackground, borderWidth: 2, borderColor: colors.secondaryBackground },
  friendsNames: { flex: 1, fontSize: 14, color: colors.label },
  flipHint: { fontSize: 13, color: colors.tertiaryLabel },
  backContent: { flex: 1, padding: spacing.lg, paddingTop: spacing.xxl },
  backSection: { marginBottom: spacing.xl },
  backLabel: { fontSize: 10, fontWeight: "700", color: colors.tertiaryLabel, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 },
  backValue: { fontSize: 15, color: colors.label, marginBottom: 2 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: { flexDirection: "row", alignItems: "center", backgroundColor: colors.tertiaryBackground, paddingVertical: 4, paddingHorizontal: 8, borderRadius: radius.full, gap: 6 },
  chipAvatar: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.separator },
  chipText: { fontSize: 13, color: colors.label },
  ratingBars: { flexDirection: "row", alignItems: "center", gap: 4, height: 8, marginBottom: 4 },
  ratingBar: { height: 6, borderRadius: 2, minWidth: 4 },
  ratingNumber: { fontSize: 14, fontWeight: "600", color: colors.label },
  note: { fontSize: 15, color: colors.secondaryLabel, fontStyle: "italic", lineHeight: 22 },
  flipBackHint: { fontSize: 12, color: colors.tertiaryLabel, marginTop: "auto", paddingTop: spacing.lg },
});
