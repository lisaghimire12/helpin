import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import L from "leaflet"; 
import mapbg from "../assets/images/mapbg.svg"; 

const bounds = [[0, 0], [1000, 1000]];

function Map() {
  return (
    <>
    <h1 style={{ textAlign: "center" }}>HelpIN Map📍</h1>
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={[500, 500]} 
        zoom={1}
        style={{ height: "100%", width: "100%" }}
        crs={L.CRS.Simple} // flat 2D coordinates
        minZoom={-2} // zoom out
        maxBounds={bounds} 
      >
        <ImageOverlay url={mapbg} bounds={bounds} />
        <Marker position={[500, 465]}>
          <Popup>HI🙋 I Need Help 🚨 </Popup>
        </Marker>
      </MapContainer>
    </div>
    </>
  );
}

export default Map;
