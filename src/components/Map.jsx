import { MapContainer, ImageOverlay, Marker, Popup, useMapEvent } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import L from "leaflet";
import axios from "axios";
import mapbg from "../assets/images/mapbg.svg";

const bounds = [[0, 0], [1000, 1000]];

//Map clicks
function ClickableMap({ addHelpRequest }) {
  useMapEvent({
    click(e) {
      const title = prompt("Enter help request title:");
      const description = prompt("Enter description:");

      if (title && description) {
        addHelpRequest({
          title,
          description,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng
        });
      }
    },
  });
  return null; 
}



function Map() {

  const deleteHelpRequest = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/helprequests/${id}/`)
      .then(() => {
        setRequests(prev => prev.filter(req => req.id !== id));
      })
      .catch(err => console.log(err));
  };


  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/helprequests/")
      .then(res => setRequests(res.data)) 
      .catch(err => console.log(err));
  }, []);

  const addHelpRequest = (data) => {
    axios.post("http://127.0.0.1:8000/api/helprequests/", data)
      .then(res => {
        setRequests(prev => [...prev, res.data]);
      })
      .catch(err => console.log(err));
  };


  return (
    <>
      <h1 style={{ textAlign: "center" }}>HelpIN Map📍</h1>
      <div style={{ height: "100vh", width: "100vw" }}>
        <MapContainer
          center={[500, 500]}
          zoom={1}
          style={{ height: "100%", width: "100%" }}
          crs={L.CRS.Simple} 
          minZoom={-2}       
          maxBounds={bounds} 
        >
          <ImageOverlay url={mapbg} bounds={bounds} />

          <ClickableMap addHelpRequest={addHelpRequest} />

          {requests.map((req) => (
            <Marker key={req.id} position={[req.latitude, req.longitude]}>
              <Popup>
                <b>{req.title}</b>
                <p>{req.description}</p>
                {req.resolved ? "✅ Resolved" : "⚠️ Pending"}
                <button
                  style={{
                    marginTop: "5px",
                    display: "block",
                    backgroundColor: "#d4746eff",
                    color: "black",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "3px"
                  }}
                  onClick={() => deleteHelpRequest(req.id)}>Delete</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
