import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import type { QuestMapItem } from "@/components/questmap/mockQuests";
import { buildLeafletMapHtml } from "@/components/questmap/leafletMapHtml";
import { colors, gotham } from "@/constants/theme";

const LEAFLET_CSS_URL = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS_URL = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js";

export type LeafletMapViewProps = {
  quests: QuestMapItem[];
  onMapTap: () => void;
  onMarkerTap: (questId: string) => void;
};

type LoadState = "loading" | "ready" | "error";

export function LeafletMapView({
  quests,
  onMapTap,
  onMarkerTap,
}: LeafletMapViewProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setLoadState("loading");
    setErrorMessage("");
    Promise.all([
      fetch(LEAFLET_CSS_URL).then((r) => {
        if (!r.ok) throw new Error(`CSS ${r.status}`);
        return r.text();
      }),
      fetch(LEAFLET_JS_URL).then((r) => {
        if (!r.ok) throw new Error(`JS ${r.status}`);
        return r.text();
      }),
    ])
      .then(([cssText, jsText]) => {
        if (!cancelled) {
          setHtml(buildLeafletMapHtml(quests, cssText, jsText));
          setLoadState("ready");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setErrorMessage(err?.message ?? "Could not load map resources");
          setLoadState("error");
          setHtml(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [quests]);

  const handleMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      try {
        const payload = JSON.parse(event.nativeEvent.data);
        if (payload.type === "mapTap") onMapTap();
        if (payload.type === "markerTap" && payload.questId) onMarkerTap(payload.questId);
        if (payload.type === "mapError") {
          setLoadState("error");
          setErrorMessage(payload.message ?? "Map error");
        }
      } catch {
        // ignore
      }
    },
    [onMapTap, onMarkerTap]
  );

  const retry = useCallback(() => {
    setLoadState("loading");
    setHtml(null);
    setErrorMessage("");
    Promise.all([
      fetch(LEAFLET_CSS_URL).then((r) => r.text()),
      fetch(LEAFLET_JS_URL).then((r) => r.text()),
    ])
      .then(([cssText, jsText]) => {
        setHtml(buildLeafletMapHtml(quests, cssText, jsText));
        setLoadState("ready");
      })
      .catch(() => {
        setErrorMessage("Could not load map. Check your connection.");
        setLoadState("error");
      });
  }, [quests]);

  if (loadState === "loading" && html === null) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.red} />
        <Text style={styles.loadingText}>Loading map…</Text>
      </View>
    );
  }

  if (loadState === "error") {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorTitle}>Map unavailable</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={retry} activeOpacity={0.8}>
          <Text style={styles.retryBtnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: html!, baseUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/" }}
        style={styles.webview}
        scrollEnabled={true}
        bounces={false}
        overScrollMode="never"
        onMessage={handleMessage}
        originWhitelist={["*"]}
        mixedContentMode="compatibility"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        onError={(e) => {
          setLoadState("error");
          setErrorMessage(e.nativeEvent?.description ?? "WebView error");
        }}
        onHttpError={(e) => {
          setLoadState("error");
          setErrorMessage(`HTTP ${e.nativeEvent?.statusCode ?? "error"}`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
    backgroundColor: "#1a1a1a",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: gotham.book,
    color: "#8e8e93",
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: gotham.bold,
    color: "#1c1c1e",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    fontFamily: gotham.book,
    color: "#6c6c70",
    textAlign: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.red,
    borderRadius: 12,
  },
  retryBtnText: {
    fontSize: 16,
    fontFamily: gotham.medium,
    color: "#fff",
  },
  webview: {
    flex: 1,
    minHeight: 300,
    backgroundColor: "transparent",
  },
});
