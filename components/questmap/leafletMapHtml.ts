import type { QuestMapItem } from "@/components/questmap/mockQuests";

const LEAFLET_CSS_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const CARTO_DARK =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";

/** Escape JSON for embedding inside a double-quoted JS string in HTML (so " and \ and </ and newlines don't break the script) */
function escapeJsonForHtml(json: string): string {
  return json
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/<\//g, "<\\/");
}

function escapeScriptContent(js: string): string {
  return js.replace(/<\/script/gi, "<\\/script");
}

/**
 * Build a full HTML document that shows a Leaflet map with CartoDB dark tiles,
 * red dashed route line (chronological), and photo pins. Posts to React Native:
 * - { type: "mapTap" } when user taps empty map (to close card)
 * - { type: "markerTap", questId } when user taps a quest marker
 * When leafletCss and leafletJs are provided, they are inlined so the map works in WebViews that block external script loads.
 */
export function buildLeafletMapHtml(
  quests: QuestMapItem[],
  leafletCss?: string,
  leafletJs?: string
): string {
  const questsJson = escapeJsonForHtml(JSON.stringify(quests));
  const routeCoords = quests.map(
    (q) => [q.latitude, q.longitude] as [number, number]
  );
  const routeJson = escapeJsonForHtml(JSON.stringify(routeCoords));

  const cssBlock =
    leafletCss != null
      ? `<style>${leafletCss
          .replace(/<\/style/gi, "<\\/style")
          .replace(/url\(([\"']?)images\//g, "url($1https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/")}</style>`
      : `<link rel="stylesheet" href="${LEAFLET_CSS_URL}" />`;
  const jsBlock =
    leafletJs != null
      ? `<script>${escapeScriptContent(leafletJs)}<\/script>`
      : `<script src="${LEAFLET_JS_URL}"><\/script>`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  ${cssBlock}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: #1a1a1a; }
    #map { width: 100%; height: 100%; min-height: 300px; }
    .leaflet-marker-icon.photo-pin { border: none !important; background: transparent !important; }
    .photo-pin-wrap { display: flex; flex-direction: column; align-items: center; cursor: pointer; transform-origin: 50% 100%; transition: transform 0.2s ease; }
    .photo-pin-wrap:hover { transform: scale(1.12); }
    .photo-pin-ring { border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
    .photo-pin-photo { border-radius: 50%; background-size: cover; background-position: center; }
    .photo-pin-stem { width: 2px; height: 10px; background: rgba(255,255,255,0.7); margin-top: -1px; }
    .photo-pin-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: -2px; box-shadow: 0 0 8px 2px currentColor; }
    @keyframes pinDrop { 0% { opacity: 0; transform: translateY(-12px) scale(0); } 70% { transform: translateY(2px) scale(1.05); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    window.__QUESTS_JSON__ = "${questsJson}";
    window.__ROUTE_JSON__ = "${routeJson}";
  </script>
  ${jsBlock}
  <script>
    (function() {
      try {
        var quests = JSON.parse(window.__QUESTS_JSON__);
        var route = JSON.parse(window.__ROUTE_JSON__);

        if (typeof L === "undefined") {
          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: "mapError", message: "Leaflet did not load" }));
          }
          return;
        }

        var map = L.map("map", { zoomControl: true }).setView([37.8, -122.35], 10);

        L.tileLayer("${CARTO_DARK}", {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap &copy; CARTO"
        }).addTo(map);

        var routeLine = L.polyline(route, {
          color: "#C41E3A",
          weight: 3,
          opacity: 0.9,
          dashArray: "8, 6",
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        function sendMapTap() {
          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: "mapTap" }));
          }
        }
        function sendMarkerTap(questId, lat, lng) {
          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: "markerTap", questId: questId, lat: lat, lng: lng }));
          }
        }

        map.on("click", function(e) {
          if (e.originalEvent && e.originalEvent._processedByMarker) return;
          sendMapTap();
        });

        setTimeout(function() { map.invalidateSize(); }, 100);

        var bounds = routeLine.getBounds();
        if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });

        quests.forEach(function(q, i) {
          var delay = i * 80;
          var ringColor = q.categoryColor || "#C41E3A";
          var photoBg = q.photoUrl ? "url(" + q.photoUrl + ")" : ringColor;
          var size = 40;
          var ringSize = size + 8;
          var el = document.createElement("div");
          el.className = "photo-pin-wrap";
          el.style.animation = "pinDrop 0.5s " + (delay/1000) + "s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";
          el.style.opacity = "0";
          el.innerHTML = "<div class=\\"photo-pin-ring\\" style=\\"width:" + ringSize + "px;height:" + ringSize + "px;border:3px solid " + ringColor + ";\\"><div class=\\"photo-pin-photo\\" style=\\"width:" + size + "px;height:" + size + "px;background:" + photoBg + ";\\"></div></div><div class=\\"photo-pin-stem\\"></div><div class=\\"photo-pin-dot\\" style=\\"background:" + ringColor + ";color:" + ringColor + ";\\"></div>";
          var icon = L.divIcon({
            html: el,
            className: "photo-pin",
            iconSize: [ringSize, ringSize + 22],
            iconAnchor: [ringSize/2, ringSize + 22]
          });
          var marker = L.marker([q.latitude, q.longitude], { icon: icon }).addTo(map);
          marker.on("click", function(ev) {
            ev.originalEvent._processedByMarker = true;
            map.panTo([q.latitude, q.longitude], { animate: true, duration: 0.3 });
            sendMarkerTap(q.id, q.latitude, q.longitude);
          });
        });
      } catch (err) {
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: "mapError", message: (err && err.message) ? err.message : "Map script error" }));
        }
      }
    })();
  </script>
</body>
</html>`;
}
