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
import { colors, spacing, radius, gotham } from "@/constants/theme";

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
const CARD_HEIGHT = SCREEN_HEIGHT * 0.58;

function ratingVibe(rating: number): string {
  if (rating >= 4.5) return "Amazing Vibe";
  if (rating >= 4) return "Great";
  if (rating >= 3.5) return "Solid";
  return "Good";
}

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

  const filledRating = Math.min(10, Math.round((quest.rating / 5) * 10));

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
        <Pressable onPress={flip} style={styles.flipArea}>
          {/* Front — white card, full photo, overlay title, participants with @usernames */}
          <Animated.View
            style={[
              styles.side,
              styles.front,
              {
                transform: [{ rotateY: frontRotate }],
              },
            ]}
          >
            {/* Top half (majority): photo with overlaid title, quest #, location, rating */}
            <View style={styles.photoSection}>
              {quest.photoUrl ? (
                <Image source={{ uri: quest.photoUrl }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
              ) : (
                <View style={styles.photoPlaceholder} />
              )}
              <View style={styles.photoGradient} />
              <View style={styles.questNumberPill}>
                <Text style={styles.questNumberText}>{quest.questNumber}th quest</Text>
              </View>
              <View style={[styles.categoryTag, { backgroundColor: quest.categoryColor }]}>
                <Text style={styles.categoryTagText}>{quest.category.toUpperCase()}</Text>
              </View>
              <View style={styles.photoFooter}>
                <Text style={styles.questName} numberOfLines={2}>{quest.name.toUpperCase()}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{quest.rating.toFixed(1)}/5 ({ratingVibe(quest.rating)})</Text>
                </View>
                <Text style={styles.locationText}>{quest.city}, {quest.country}</Text>
              </View>
            </View>
            {/* Bottom half: vertical list of participants (avatar + @username) */}
            <View style={styles.participantsSection}>
              {quest.friends.slice(0, 4).map((f) => (
                <View key={f.username} style={styles.participantRow}>
                  <View style={styles.miniAvatar} />
                  <Text style={styles.usernameText}>@{f.username}</Text>
                </View>
              ))}
              <Text style={styles.flipHint}>Tap to flip →</Text>
            </View>
          </Animated.View>

          {/* Back — teal/mint background, QUEST #n, WENT WITH, RATING squares, YOUR NOTE */}
          <Animated.View
            style={[
              styles.side,
              styles.back,
              { transform: [{ rotateY: backRotate }] },
            ]}
          >
            <TouchableOpacity style={styles.closeBtnBack} onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={24} color="#1c1c1e" />
            </TouchableOpacity>
            <View style={styles.backContent}>
              <Text style={[styles.backQuestTitle, { color: quest.categoryColor }]}>QUEST #{quest.questNumber}</Text>
              <Text style={styles.backName}>{quest.name}</Text>
              <Text style={styles.backMeta}>{quest.city}, {quest.country} · {quest.date}</Text>

              <Text style={styles.backLabel}>WENT WITH:</Text>
              <View style={styles.chipRow}>
                {quest.friends.map((f) => (
                  <View key={f.username} style={styles.chip}>
                    <View style={styles.chipAvatar} />
                    <Text style={styles.chipText}>{f.name}</Text>
                  </View>
                ))}
                {quest.friends.length > 3 && (
                  <View style={styles.chipOthers}>
                    <View style={styles.chipAvatarOthers} />
                    <Text style={styles.chipText}>@others</Text>
                    <Text style={styles.chipPlus}>+{quest.friends.length - 3}</Text>
                  </View>
                )}
              </View>

              <Text style={styles.backLabel}>RATING:</Text>
              <View style={styles.ratingSquares}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.ratingSquare,
                      i < filledRating
                        ? { backgroundColor: quest.categoryColor }
                        : styles.ratingSquareEmpty,
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.ratingNumberBack}>{filledRating}/10</Text>

              <Text style={styles.backLabel}>YOUR NOTE:</Text>
              <Text style={styles.note}>"{quest.note}" — You</Text>

              <Text style={styles.flipBackHint}>Tap to flip back</Text>
            </View>
          </Animated.View>
        </Pressable>

        <TouchableOpacity style={styles.closeBtnFront} onPress={onClose} hitSlop={12}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>
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
    backgroundColor: "#fff",
    borderRadius: radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  closeBtnFront: {
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
  front: { backgroundColor: "#fff", flexDirection: "column" },
  back: { backgroundColor: "#b8e6df" },
  /* Top half (majority) — photo with overlaid title, #, location, rating */
  photoSection: { flex: 1.15, minHeight: 160, position: "relative" },
  photoPlaceholder: { ...StyleSheet.absoluteFillObject, backgroundColor: "#2c2c2e" },
  photoGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  questNumberPill: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  questNumberText: { fontSize: 12, fontFamily: gotham.bold, color: "#fff" },
  categoryTag: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  categoryTagText: { fontSize: 11, fontFamily: gotham.black, color: "#fff", letterSpacing: 0.5 },
  photoFooter: { position: "absolute", left: 0, right: 0, bottom: 0, padding: spacing.md },
  questName: { fontSize: 17, fontFamily: gotham.black, color: "#fff", letterSpacing: 0.5 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 },
  ratingText: { fontSize: 13, fontFamily: gotham.bold, color: "#FFD700" },
  locationText: { fontSize: 13, fontFamily: gotham.book, color: "rgba(255,255,255,0.95)", marginTop: 2 },
  /* Bottom half — list of participants (avatar + @username) */
  participantsSection: {
    flex: 0.85,
    backgroundColor: "#fff",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    justifyContent: "flex-start",
  },
  participantRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  miniAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#e8e8ed", borderWidth: 2, borderColor: "#fff" },
  usernameText: { fontSize: 14, fontFamily: gotham.medium, color: colors.textOnLight },
  flipHint: { fontSize: 13, fontFamily: gotham.medium, color: colors.textOnLightSecondary, marginTop: spacing.xs },

  backContent: { flex: 1, padding: spacing.lg, paddingTop: spacing.xxl + 4 },
  closeBtnBack: { position: "absolute", top: spacing.md, right: spacing.md, zIndex: 10, padding: 4 },
  backQuestTitle: { fontSize: 20, fontFamily: gotham.black, marginBottom: 4, letterSpacing: 0.5 },
  backName: { fontSize: 17, fontFamily: gotham.bold, color: "#1c1c1e", marginBottom: 2 },
  backMeta: { fontSize: 14, fontFamily: gotham.book, color: "#1c1c1e", opacity: 0.85, marginBottom: spacing.lg },
  backLabel: {
    fontSize: 11,
    fontFamily: gotham.black,
    color: "#1c1c1e",
    letterSpacing: 1,
    marginTop: spacing.md,
    marginBottom: 6,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.08)", paddingVertical: 6, paddingHorizontal: 10, borderRadius: radius.full, gap: 6 },
  chipAvatar: { width: 22, height: 22, borderRadius: 11, backgroundColor: "rgba(0,0,0,0.2)" },
  chipText: { fontSize: 13, fontFamily: gotham.medium, color: "#1c1c1e" },
  chipOthers: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.08)", paddingVertical: 6, paddingHorizontal: 10, borderRadius: radius.full, gap: 4 },
  chipAvatarOthers: { width: 22, height: 22, borderRadius: 11, backgroundColor: "rgba(0,0,0,0.15)" },
  chipPlus: { fontSize: 11, fontFamily: gotham.bold, color: "#6c6c70" },
  ratingSquares: { flexDirection: "row", gap: 5, marginBottom: 4 },
  ratingSquare: { width: 22, height: 22, borderRadius: 4 },
  ratingSquareEmpty: { backgroundColor: "transparent", borderWidth: 2, borderColor: "rgba(0,0,0,0.2)" },
  ratingNumberBack: { fontSize: 14, fontFamily: gotham.bold, color: "#1c1c1e", marginBottom: 2 },
  note: { fontSize: 14, fontFamily: gotham.book, color: "#1c1c1e", fontStyle: "italic", lineHeight: 20 },
  flipBackHint: { fontSize: 12, fontFamily: gotham.book, color: "#1c1c1e", opacity: 0.8, marginTop: "auto", paddingTop: spacing.lg },
});
