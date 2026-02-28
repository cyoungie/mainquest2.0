require("dotenv").config();

const { expo } = require("./app.json");

module.exports = {
  expo: {
    ...expo,
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
    },
  },
};
