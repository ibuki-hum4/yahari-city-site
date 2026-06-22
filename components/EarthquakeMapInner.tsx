"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { parseQuakeCoordinates, type QuakeListItem } from "@/lib/jma";

function intensityColor(maxi: string): string {
  const num = Number.parseInt(maxi.replace(/[+-]/, ""), 10);
  if (Number.isNaN(num)) return "#6b7280";
  if (num >= 6) return "#b91c1c";
  if (num >= 4) return "#c2410c";
  if (num >= 2) return "#d97706";
  return "#2563eb";
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ja-JP", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export default function EarthquakeMapInner({ earthquakes }: { earthquakes: QuakeListItem[] }) {
  const points = earthquakes
    .map((eq) => {
      const coord = parseQuakeCoordinates(eq.cod);
      return coord ? { ...coord, eq } : null;
    })
    .filter((p): p is { lat: number; lng: number; depthKm: number | null; eq: QuakeListItem } => p !== null);

  return (
    <MapContainer
      center={[36, 138]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
      className="z-0 rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map(({ lat, lng, depthKm, eq }) => (
        <CircleMarker
          key={eq.eid + eq.rdt}
          center={[lat, lng]}
          radius={Math.max(6, Number.parseFloat(eq.mag || "0") * 2)}
          pathOptions={{
            color: intensityColor(eq.maxi),
            fillColor: intensityColor(eq.maxi),
            fillOpacity: 0.6,
            weight: 1,
          }}
        >
          <Popup>
            <strong>{eq.anm || eq.en_anm}</strong>
            <br />
            M{eq.mag || "不明"} / 最大震度{eq.maxi || "不明"}
            <br />
            {depthKm !== null && (
              <>
                深さ {depthKm.toFixed(0)}km
                <br />
              </>
            )}
            {formatDateTime(eq.at)}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
