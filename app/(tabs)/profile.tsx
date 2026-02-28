import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, gotham } from "@/constants/theme";
import { MainQuestHeader } from "@/components/MainQuestHeader";
import { IDCard } from "@/components/profile/IDCard";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <MainQuestHeader variant="light" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <IDCard />

        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.name}>You</Text>
            <Text style={styles.handle}>@username · Your school</Text>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
            <Ionicons name="pencil" size={18} color={colors.red} />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Ionicons name="mic" size={22} color={colors.accentViolet} />
            <Text style={styles.cardTitle}>AI voice chatbot</Text>
          </View>
          <Text style={styles.cardText}>
            A quick, casual conversation so we get to know your interests, hobbies,
            and personality. Setup takes under 5 minutes and helps match you with
            people you'll vibe with.
          </Text>
          <TouchableOpacity style={styles.voiceButton} activeOpacity={0.8}>
            <Ionicons name="sparkles" size={20} color={colors.accentViolet} />
            <Text style={styles.voiceButtonText}>Start setup (voice)</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const LIGHT_BG = "#f2f2f7";
const CARD_BG = "#fff";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: LIGHT_BG },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e8e8ed",
    marginRight: spacing.lg,
  },
  headerText: { flex: 1 },
  name: { fontSize: 22, fontFamily: gotham.bold, color: colors.textOnLight },
  handle: { fontSize: 15, fontFamily: gotham.book, color: colors.textOnLightSecondary, marginTop: 4 },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.red,
  },
  editBtnText: { fontSize: 15, fontFamily: gotham.medium, color: colors.red },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  cardRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  cardTitle: { fontSize: 17, fontFamily: gotham.medium, color: colors.textOnLight },
  cardText: {
    fontSize: 15,
    fontFamily: gotham.book,
    color: colors.textOnLightSecondary,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  voiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.accentViolet + "26",
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
  },
  voiceButtonText: { fontSize: 17, fontFamily: gotham.medium, color: colors.accentViolet },
});
