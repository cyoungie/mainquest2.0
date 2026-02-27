/**
 * Tags for "Add new sidequest" — general (category), grade, and community.
 * All are sub-tags; pick any number in any order.
 */

export type TagGroup = "general" | "grade" | "community";

export type QuestTag = {
  id: string;
  group: TagGroup;
  label: string;
  emoji?: string;
  color?: string;
  idealFor?: string;
};

/** General / category tags (vibe sub-tags) */
export const GENERAL_TAGS: QuestTag[] = [
  { id: "urgent", group: "general", label: "RIGHT NOW", emoji: "🚨", color: "#FF3333", idealFor: 'Last-minute boba runs, finding a gym spot, or "who\'s at CoHo?"' },
  { id: "academic", group: "general", label: "GRIND SET", emoji: "📚", color: "#1565C0", idealFor: 'P-Set parties, library takeovers, or "Save me a seat in Econ 1."' },
  { id: "social", group: "general", label: "MAIN EVENT", emoji: "🥳", color: "#7c4dff", idealFor: "Dorm parties, club mixers, or campus-wide traditions." },
  { id: "fitness", group: "general", label: "PUMP", emoji: "⚡", color: "#00C853", idealFor: "AOERC runs, intramural sports, or sunrise hikes." },
  { id: "relaxed", group: "general", label: "CHILL PILL", emoji: "🧘", color: "#03A9F4", idealFor: "Sunset at the Dish, hammock sessions, or low-key movie nights." },
  { id: "food", group: "general", label: "FEAST", emoji: "🍜", color: "#FF9800", idealFor: "Late-night Tressider, dining hall crawls, or off-campus foodie trips." },
];

/** Grade tags */
export const GRADE_TAGS: QuestTag[] = [
  { id: "freshman", group: "grade", label: "Freshman '29" },
  { id: "sophomore", group: "grade", label: "Sophomore '28" },
  { id: "junior", group: "grade", label: "Junior '27" },
  { id: "senior", group: "grade", label: "Senior '26" },
  { id: "coterm", group: "grade", label: "Coterm/Grad" },
];

/** Community / gender tags */
export const COMMUNITY_TAGS: QuestTag[] = [
  { id: "girls", group: "community", label: "Girls Only" },
  { id: "guys", group: "community", label: "Guys Only" },
  { id: "nonbinary", group: "community", label: "Non-Binary Space" },
  { id: "coed", group: "community", label: "Co-ed" },
];

/** All tags in one list (general, then grade, then community — order flexible when displaying) */
export const ALL_QUEST_TAGS: QuestTag[] = [
  ...GENERAL_TAGS,
  ...GRADE_TAGS,
  ...COMMUNITY_TAGS,
];

// Legacy exports for compatibility
export type CategoryTagId = "urgent" | "academic" | "social" | "fitness" | "relaxed" | "food";
export type CategoryTag = QuestTag & { id: CategoryTagId };
export const CATEGORY_TAGS = GENERAL_TAGS as CategoryTag[];
export type GradeTagId = "freshman" | "sophomore" | "junior" | "senior" | "coterm";
export type GradeTag = QuestTag;
export type CommunityTagId = "girls" | "guys" | "nonbinary" | "coed";
export type CommunityTag = QuestTag;
