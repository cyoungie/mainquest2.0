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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";
import { MainQuestHeader } from "@/components/MainQuestHeader";

const categories = ["hiking", "coffee", "gym", "study", "food", "sports"];

export default function AddQuestScreen() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [spots, setSpots] = useState("2");
  const [when, setWhen] = useState("");

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

          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryWrap}>
            {categories.map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.categoryChip, category === c && styles.categoryChipSelected]}
                onPress={() => setCategory(c)}
              >
                <Text style={[styles.categoryChipText, category === c && styles.categoryChipTextSelected]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
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
          <TextInput
            style={styles.input}
            value={when}
            onChangeText={setWhen}
            placeholder="e.g. Saturday 8:00 AM"
            placeholderTextColor={colors.tertiaryLabel}
          />

          <TouchableOpacity style={styles.submit} activeOpacity={0.8}>
            <Text style={styles.submitText}>Post sidequest</Text>
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
    fontWeight: "700",
    color: colors.textOnLight,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textOnLightSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textOnLightSecondary,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: CARD_BG,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 17,
    color: colors.textOnLight,
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
  categoryWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.lg },
  categoryChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: "#e8e8ed",
  },
  categoryChipSelected: { backgroundColor: colors.accent + "26" },
  categoryChipText: { fontSize: 15, color: colors.textOnLightSecondary },
  categoryChipTextSelected: { color: colors.accent, fontWeight: "600" },
  submit: {
    backgroundColor: colors.red,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  submitText: { fontSize: 17, fontWeight: "600", color: "#fff" },
});
