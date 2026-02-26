import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

const FILTERS = ["Nearby", "Trending", "Friends", "Events"] as const;

const INVITE_FEATURES = [
  { label: "Mutual Map", icon: "map" as const },
  { label: "Avg XP", icon: "star" as const },
  { label: "Dish Search", icon: "search" as const },
  { label: "Sharing", icon: "share-social" as const },
  { label: "Ghost Mode", icon: "eye-off" as const },
];

const SUGGESTED = [
  { id: "1", name: "alex_quest", mutuals: 2 },
  { id: "2", name: "jordan_r", mutuals: 5 },
  { id: "3", name: "sam_hikes", mutuals: 1 },
];

const FEATURED_LISTS = [
  { id: "1", title: "10 Campus Legends", count: 10, done: 0 },
  { id: "2", title: "SF Night Quests", count: 8, done: 0 },
];

const FEED_QUESTS = [
  { id: "1", title: "Sunrise hike at Eagle Peak", category: "Hiking", location: "Eagle Peak", xp: 120, username: "alex_quest", likes: 4, comments: 2, liked: false },
  { id: "2", title: "Coffee & study at Blue Bottle", category: "Coffee", location: "Mission District", xp: 50, username: "jordan_r", likes: 12, comments: 3, liked: true },
];

export default function MainQuestTabScreen() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("Trending");
  const [following, setFollowing] = useState<Set<string>>(new Set(["jordan_r"]));
  const [liked, setLiked] = useState<Set<string>>(new Set(["2"]));

  const toggleFollow = (id: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      const name = SUGGESTED.find((s) => s.id === id)?.name;
      if (name) {
        if (next.has(name)) next.delete(name);
        else next.add(name);
      }
      return next;
    });
  };

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Sticky header */}
      <View style={styles.header}>
        <View style={styles.wordmark}>
          <Text style={styles.wordmarkMain}>main</Text>
          <Text style={styles.wordmarkQuest}>quest</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} hitSlop={12}>
            <Ionicons name="notifications-outline" size={24} color={colors.textOnLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} hitSlop={12}>
            <Ionicons name="menu" size={24} color={colors.textOnLight} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Router.push("/(tabs)/profile")} hitSlop={8}>
            <View style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search bar */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color={colors.textOnLightSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search quests, people, places…"
            placeholderTextColor={colors.textOnLightSecondary}
            editable={false}
          />
        </View>

        {/* Filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
          style={styles.filtersScroll}
        >
          {FILTERS.map((tab) => {
            const active = activeFilter === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveFilter(tab)}
                style={[styles.pill, active && styles.pillActive]}
                activeOpacity={0.8}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Invite card */}
        <View style={styles.card}>
          <Text style={styles.inviteHeadline}>You have 3 invites left!</Text>
          <Text style={styles.inviteSub}>Unlock features as friends join (0/6)</Text>
          <View style={styles.inviteIcons}>
            {INVITE_FEATURES.map(({ label, icon }) => (
              <View key={label} style={styles.inviteIconItem}>
                <View style={styles.inviteIconWrap}>
                  <Ionicons name={icon} size={20} color={colors.tertiaryLabel} />
                </View>
                <Text style={styles.inviteIconLabel}>{label}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.inviteButton} activeOpacity={0.8}>
            <Text style={styles.inviteButtonText}>Invite Friends</Text>
          </TouchableOpacity>
        </View>

        {/* Sync contacts */}
        <TouchableOpacity style={styles.syncStrip} activeOpacity={0.8}>
          <Ionicons name="call-outline" size={20} color={colors.textOnLight} />
          <Text style={styles.syncText}>Sync your contacts — find friends already on MainQuest</Text>
          <Text style={styles.syncLink}>Sync →</Text>
        </TouchableOpacity>

        {/* Suggested friends */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Suggested Friends</Text>
          {SUGGESTED.map(({ id, name, mutuals }) => {
            const isFollowing = following.has(name);
            return (
              <View key={id} style={styles.friendRow}>
                <View style={styles.friendAvatar} />
                <View style={styles.friendBody}>
                  <Text style={styles.friendName}>{name}</Text>
                  <Text style={styles.friendMutual}>{mutuals} mutual quests</Text>
                </View>
                <TouchableOpacity
                  onPress={() => toggleFollow(id)}
                  style={[styles.followBtn, isFollowing && styles.followBtnActive]}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.followBtnText, isFollowing && styles.followBtnTextActive]}>
                    {isFollowing ? "Following" : "+ Follow"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Featured lists */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Featured Lists</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredContent}
        >
          {FEATURED_LISTS.map(({ id, title, count, done }) => (
            <TouchableOpacity key={id} style={styles.featuredCard} activeOpacity={0.9}>
              <View style={[styles.featuredPhoto, id === "1" ? styles.featuredPhotoA : styles.featuredPhotoB]} />
              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredTitle}>{title}</Text>
                <Text style={styles.featuredCount}>You've been to {done} of {count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Your feed */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Your Feed</Text>
        </View>
        {FEED_QUESTS.map((q) => (
          <View key={q.id} style={styles.feedCard}>
            <View style={styles.feedPhotoWrap}>
              <View style={styles.feedPhoto} />
              <View style={styles.feedGradient} />
              <View style={styles.feedXpBadge}>
                <Text style={styles.feedXpText}>{q.xp} XP</Text>
              </View>
              <View style={styles.feedPhotoFooter}>
                <Text style={styles.feedCategory}>{q.category}</Text>
                <Text style={styles.feedTitle}>{q.title}</Text>
                <Text style={styles.feedLocation}>{q.location}</Text>
              </View>
            </View>
            <View style={styles.feedMeta}>
              <View style={styles.feedUser}>
                <View style={styles.feedAvatar} />
                <Text style={styles.feedUsername}>{q.username}</Text>
              </View>
              <View style={styles.feedActions}>
                <TouchableOpacity onPress={() => toggleLike(q.id)} style={styles.feedAction} hitSlop={8}>
                  <Ionicons
                    name={liked.has(q.id) ? "heart" : "heart-outline"}
                    size={22}
                    color={liked.has(q.id) ? colors.red : colors.textOnLight}
                  />
                  <Text style={styles.feedActionCount}>{q.likes + (liked.has(q.id) ? 1 : 0)}</Text>
                </TouchableOpacity>
                <View style={styles.feedAction}>
                  <Ionicons name="chatbubble-outline" size={20} color={colors.textOnLight} />
                  <Text style={styles.feedActionCount}>{q.comments}</Text>
                </View>
                <TouchableOpacity style={styles.feedAction} hitSlop={8}>
                  <Ionicons name="share-outline" size={20} color={colors.textOnLight} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f2f2f7" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: "#ffffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  wordmark: { flexDirection: "row" },
  wordmarkMain: { fontSize: 22, fontWeight: "700", color: colors.textOnLight },
  wordmarkQuest: { fontSize: 22, fontWeight: "700", color: colors.red },
  headerRight: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  headerIcon: { padding: 4 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.separator },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  searchInput: { flex: 1, fontSize: 16, color: colors.textOnLight, paddingVertical: 0 },
  filtersScroll: { marginBottom: spacing.xl },
  filtersContent: { gap: spacing.sm, paddingRight: spacing.lg },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.textOnLightSecondary,
  },
  pillActive: { backgroundColor: colors.red, borderColor: colors.red },
  pillText: { fontSize: 15, fontWeight: "600", color: colors.textOnLight },
  pillTextActive: { color: "#fff" },
  card: {
    backgroundColor: "#fff",
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  inviteHeadline: { fontSize: 18, fontWeight: "700", color: colors.textOnLight },
  inviteSub: { fontSize: 14, color: colors.textOnLightSecondary, marginTop: 4, marginBottom: spacing.lg },
  inviteIcons: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg, marginBottom: spacing.lg },
  inviteIconItem: { alignItems: "center", width: 64 },
  inviteIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.tertiaryBackground, alignItems: "center", justifyContent: "center" },
  inviteIconLabel: { fontSize: 11, color: colors.textOnLightSecondary, marginTop: 4 },
  inviteButton: { backgroundColor: colors.red, borderRadius: radius.lg, paddingVertical: spacing.md, alignItems: "center" },
  inviteButtonText: { fontSize: 17, fontWeight: "600", color: "#fff" },
  syncStrip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  syncText: { flex: 1, fontSize: 14, color: colors.textOnLight },
  syncLink: { fontSize: 15, fontWeight: "600", color: colors.red },
  sectionHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.md },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: colors.textOnLight, marginBottom: spacing.md },
  seeAll: { fontSize: 15, fontWeight: "500", color: colors.red },
  friendRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.separator },
  friendAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.tertiaryBackground, marginRight: spacing.md },
  friendBody: { flex: 1 },
  friendName: { fontSize: 17, fontWeight: "600", color: colors.textOnLight },
  friendMutual: { fontSize: 13, color: colors.textOnLightSecondary, marginTop: 2 },
  followBtn: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.red },
  followBtnActive: { backgroundColor: colors.tertiaryBackground, borderColor: "transparent" },
  followBtnText: { fontSize: 15, fontWeight: "600", color: colors.red },
  followBtnTextActive: { color: colors.textOnLightSecondary },
  featuredContent: { gap: spacing.lg, paddingBottom: spacing.lg },
  featuredCard: { width: 200, height: 140, borderRadius: radius.lg, overflow: "hidden" },
  featuredPhoto: { ...StyleSheet.absoluteFillObject },
  featuredPhotoA: { backgroundColor: "#2c2c2e" },
  featuredPhotoB: { backgroundColor: "#3a3a3c" },
  featuredOverlay: { position: "absolute", left: 0, right: 0, bottom: 0, padding: spacing.md, backgroundColor: "rgba(0,0,0,0.5)" },
  featuredTitle: { fontSize: 16, fontWeight: "700", color: "#fff" },
  featuredCount: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 },
  feedCard: { backgroundColor: "#fff", borderRadius: radius.xl, marginBottom: spacing.xl, overflow: "hidden" },
  feedPhotoWrap: { height: 220, position: "relative" },
  feedPhoto: { ...StyleSheet.absoluteFillObject, backgroundColor: "#2c2c2e" },
  feedGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  feedXpBadge: { position: "absolute", top: spacing.md, right: spacing.md, backgroundColor: "rgba(0,0,0,0.6)", paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.sm },
  feedXpText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  feedPhotoFooter: { position: "absolute", left: 0, right: 0, bottom: 0, padding: spacing.md },
  feedCategory: { fontSize: 12, fontWeight: "600", color: "rgba(255,255,255,0.9)" },
  feedTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginTop: 2 },
  feedLocation: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 2 },
  feedMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: spacing.md },
  feedUser: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  feedAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.tertiaryBackground },
  feedUsername: { fontSize: 15, fontWeight: "600", color: colors.textOnLight },
  feedActions: { flexDirection: "row", alignItems: "center", gap: spacing.xl },
  feedAction: { flexDirection: "row", alignItems: "center", gap: 4 },
  feedActionCount: { fontSize: 13, color: colors.textOnLightSecondary },
});
