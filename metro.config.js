const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolvedName = moduleName === "react-native/jsx-runtime"
    ? "react/jsx-runtime"
    : moduleName;
  return context.resolveRequest(context, resolvedName, platform);
};

module.exports = config;
