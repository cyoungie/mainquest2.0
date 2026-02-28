import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, spacing, radius, gotham } from "@/constants/theme";
import { MainQuestHeader } from "@/components/MainQuestHeader";
import {
  GENERAL_TAGS,
  GRADE_TAGS,
  COMMUNITY_TAGS,
  type QuestTag,
} from "@/constants/addQuestTags";
import { createQuest } from "@/lib/quests";

function formatWhen(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AddQuestScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(new Set());
  const [spots, setSpots] = useState("2");
  const [whenDate, setWhenDate] = useState<Date | null>(null);
  const [showWhenPicker, setShowWhenPicker] = useState(false);
  const [posting, setPosting] = useState(false);

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePost = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert("Missing title", "What are you doing? Enter a title for your sidequest.");
      return;
    }
    const spotsNum = parseInt(spots, 10);
    if (isNaN(spotsNum) || spotsNum < 1) {
      Alert.alert("Invalid spots", "How many people (including you)? Enter at least 1.");
      return;
    }
    setPosting(true);
    const { data, error } = await createQuest({
      title: trimmedTitle,
      tagIds: Array.from(selectedTagIds),
      spots: spotsNum,
      whenAt: whenDate,
    });
    setPosting(false);
    if (error) {
      Alert.alert("Couldn't post", error.message);
      return;
    }
    if (data) {
      router.back();
    }
  };

  const renderTag = (tag: QuestTag) => {
    const selected = selectedTagIds.has(tag.id);
    const isGeneral = tag.group === "general" && tag.emoji != null && tag.color != null;
    if (isGeneral) {
      return (
        <TouchableOpacity
          key={tag.id}
          style={[
            styles.categoryPill,
            { borderColor: tag.color!, backgroundColor: selected ? tag.color! + "22" : "transparent" },
          ]}
          onPress={() => toggleTag(tag.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.categoryPillEmoji}>{tag.emoji}</Text>
          <Text
            style={[
              styles.categoryPillText,
              selected && { color: tag.color!, fontFamily: gotham.bold },
            ]}
          >
            {tag.label}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={tag.id}
        style={[styles.plainPill, selected && styles.plainPillSelected]}
        onPress={() => toggleTag(tag.id)}
        activeOpacity={0.8}
      >
        <Text style={[styles.plainPillText, selected && styles.plainPillTextSelected]}>
          {tag.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <MainQuestHeader variant="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboard}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>New sidequest</Text>
            <Text style={styles.subtitle}>
              Post what you want to do. When the crew is full, a group chat unlocks.
            </Text>
          </View>

          <Text style={styles.label}>What are you doing?</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Sunrise hike at Eagle Peak"
            placeholderTextColor={colors.tertiaryLabel}
            autoCapitalize="sentences"
          />

          <Text style={styles.label}>Tags</Text>
          <Text style={styles.helper}>Add any tags so others can find your sidequest. General, grade, community — pick as many as you like.</Text>

          <Text style={styles.tagGroupLabel}>General</Text>
          <View style={styles.pillWrap}>
            {GENERAL_TAGS.map(renderTag)}
          </View>

          <Text style={styles.tagGroupLabel}>Grade</Text>
          <View style={styles.pillWrap}>
            {GRADE_TAGS.map(renderTag)}
          </View>

          <Text style={styles.tagGroupLabel}>Community</Text>
          <View style={styles.pillWrap}>
            {COMMUNITY_TAGS.map(renderTag)}
          </View>

          <Text style={styles.label}>How many people (including you)?</Text>
          <TextInput
            style={styles.input}
            value={spots}
            onChangeText={setSpots}
            placeholder="2"
            placeholderTextColor={colors.tertiaryLabel}
            keyboardType="number-pad"
          />

          <Text style={styles.label}>When?</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowWhenPicker(true)}
            activeOpacity={0.8}
          >
            <View style={styles.whenRow}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={whenDate ? colors.textOnLight : colors.textOnLightSecondary}
              />
              <Text
                style={[
                  styles.whenText,
                  !whenDate && styles.whenPlaceholder,
                ]}
              >
                {whenDate ? formatWhen(whenDate) : "Tap to pick date & time"}
              </Text>
              {Platform.OS !== "ios" && (
                <Ionicons name="chevron-down" size={20} color={colors.textOnLightSecondary} />
              )}
            </View>
          </TouchableOpacity>

          {/* iOS: inline calendar box (tap dates); Android: opens calendar-style picker when tapping the field above */}
          {showWhenPicker && (
            <View style={styles.calendarBox}>
              <DateTimePicker
                value={whenDate ?? new Date()}
                mode="datetime"
                display={Platform.OS === "ios" ? "inline" : "calendar"}
                onChange={(event, date) => {
                  if (Platform.OS === "android") setShowWhenPicker(false);
                  if (event.type === "set" && date != null) setWhenDate(date);
                }}
                minimumDate={new Date()}
                themeVariant="light"
              />
              {Platform.OS === "ios" && (
                <TouchableOpacity onPress={() => setShowWhenPicker(false)} style={styles.calendarDone}>
                  <Text style={styles.calendarDoneText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.submit}
            onPress={handlePost}
            disabled={posting}
            activeOpacity={0.8}
          >
            {posting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Post sidequest</Text>
            )}
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const LIGHT_BG = "#f2f2f7";
const CARD_BG = "#fff";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: LIGHT_BG },
  keyboard: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  header: { marginBottom: spacing.xl },
  title: {
    fontSize: 28,
    fontFamily: gotham.bold,
    color: colors.textOnLight,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: gotham.book,
    color: colors.textOnLightSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 13,
    fontFamily: gotham.medium,
    color: colors.textOnLightSecondary,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  helper: {
    fontSize: 12,
    fontFamily: gotham.book,
    color: colors.textOnLightSecondary,
    marginBottom: spacing.sm,
  },
  tagGroupLabel: {
    fontSize: 11,
    fontFamily: gotham.medium,
    color: colors.textOnLightSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  pillWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 2,
    gap: 4,
  },
  categoryPillEmoji: { fontSize: 14 },
  categoryPillText: { fontSize: 12, fontFamily: gotham.medium, color: colors.textOnLight },
  plainPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: "#e8e8ed",
  },
  plainPillSelected: { backgroundColor: colors.red + "22", borderWidth: 2, borderColor: colors.red },
  plainPillText: { fontSize: 13, fontFamily: gotham.book, color: colors.textOnLight },
  plainPillTextSelected: { fontFamily: gotham.medium, color: colors.red },
  input: {
    backgroundColor: CARD_BG,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 17,
    fontFamily: gotham.book,
    color: colors.textOnLight,
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
  whenRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  whenText: { flex: 1, fontSize: 17, fontFamily: gotham.book, color: colors.textOnLight },
  whenPlaceholder: { color: colors.textOnLightSecondary },
  calendarBox: {
    backgroundColor: CARD_BG,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
    overflow: "hidden",
  },
  calendarDone: { alignSelf: "flex-end", paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
  calendarDoneText: { fontSize: 17, fontFamily: gotham.medium, color: colors.red },
  submit: {
    backgroundColor: colors.red,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  submitText: { fontSize: 17, fontFamily: gotham.medium, color: "#fff" },
});
