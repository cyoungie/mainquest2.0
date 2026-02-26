import type { QuestDetail } from "./QuestDetailCard";

export type QuestMapItem = QuestDetail & {
  latitude: number;
  longitude: number;
  photoUrl?: string;
};

// Mock quests in chronological order for the route line
export const MOCK_QUESTS: QuestMapItem[] = [
  {
    id: "1",
    questNumber: 1,
    name: "Sunrise hike at Eagle Peak",
    category: "Adventure",
    categoryColor: "#30d158",
    rating: 9.2,
    city: "San Francisco",
    country: "USA",
    latitude: 37.7749,
    longitude: -122.4194,
    friends: [{ name: "Alex", username: "alex" }, { name: "Jordan", username: "jordan" }],
    note: "Best way to start the year. Views were insane.",
    date: "Jan 15, 2025",
  },
  {
    id: "2",
    questNumber: 2,
    name: "Coffee at Blue Bottle",
    category: "Food",
    categoryColor: "#ff9f0a",
    rating: 8.5,
    city: "Oakland",
    country: "USA",
    latitude: 37.8044,
    longitude: -122.2712,
    friends: [{ name: "Sam", username: "sam" }],
    note: "Finally tried the New Orleans iced. 10/10.",
    date: "Feb 1, 2025",
  },
  {
    id: "3",
    questNumber: 3,
    name: "Gym buddy legs day",
    category: "Fitness",
    categoryColor: "#0a84ff",
    rating: 7.8,
    city: "Berkeley",
    country: "USA",
    latitude: 37.8715,
    longitude: -122.273,
    friends: [{ name: "Morgan", username: "morgan" }, { name: "Riley", username: "riley" }],
    note: "Sore for days but worth it.",
    date: "Feb 10, 2025",
  },
  {
    id: "4",
    questNumber: 4,
    name: "Concert at The Fillmore",
    category: "Events",
    categoryColor: "#af52de",
    rating: 9.5,
    city: "San Francisco",
    country: "USA",
    latitude: 37.7849,
    longitude: -122.4334,
    friends: [{ name: "Casey", username: "casey" }],
    note: "Incredible night. Front row energy.",
    date: "Feb 20, 2025",
  },
];

export function getStats(quests: QuestMapItem[]) {
  const countries = new Set(quests.map((q) => q.country)).size;
  const avgRating = quests.length ? quests.reduce((s, q) => s + q.rating, 0) / quests.length : 0;
  const friendsSet = new Set<string>();
  quests.forEach((q) => q.friends.forEach((f) => friendsSet.add(f.username)));
  const totalXp = quests.length * 100 + Math.round(avgRating * 10);
  return { countries, avgRating, friends: friendsSet.size, totalXp };
}
