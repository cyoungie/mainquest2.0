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
import { Router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";

const categories = ["hiking", "coffee", "gym", "study", "food", "sports"];

export default function NewQuestScreen() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [spots, setSpots] = useState("2");
  const [when, setWhen] = useState("");

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
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
          <Text style={styles.paragraph}>
            Describe what you want to do and how many people you need. When the
            crew is full, a group chat is created until 24h after the event.
          </Text>

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
            <Text style={styles.submitText}>Post quest</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  keyboard: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  paragraph: {
    fontSize: 15,
    color: colors.tertiaryLabel,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.tertiaryLabel,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 17,
    color: colors.label,
    marginBottom: spacing.lg,
  },
  categoryWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.lg },
  categoryChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.tertiaryBackground,
  },
  categoryChipSelected: { backgroundColor: colors.accent + "26" },
  categoryChipText: { fontSize: 15, color: colors.tertiaryLabel },
  categoryChipTextSelected: { color: colors.accent, fontWeight: "600" },
  submit: {
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  submitText: { fontSize: 17, fontWeight: "600", color: "#000" },
});
