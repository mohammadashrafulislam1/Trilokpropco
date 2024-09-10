import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa"; // Import icons
import L from "leaflet";
import { IconContext } from "react-icons";

const Map = ({ properties }) => {
  // Custom Leaflet icon using React icon
  const customIcon = new L.DivIcon({
    html: `<div style="color: red; font-size: 24px;"><FaMapMarkerAlt/></div>`, // Use inline style for icon size/color
    iconSize: [24, 24], // Adjust icon size
    className: "custom-marker-icon", // Optional class name for custom styling
  });

  return (
    <MapContainer
      center={[22.4933742, 88.3990239]} // Change to actual property location if available
      zoom={7}
      scrollWheelZoom={false}
      className="h-[600px] rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties?.map((item) => (
        <Marker
          position={[22.4933742, 88.3990239]} // Replace with the dynamic property location, e.g., item.location.coordinates
          key={item._id}
          icon={customIcon} // Use custom icon here
        >
          <Popup>
            <div>
              <IconContext.Provider value={{ size: "24px", color: "green" }}>
                <FaMapMarkerAlt /> {/* Icon used here */}
              </IconContext.Provider>
              <div>
                <Link to={`/${item._id}`}>{item.name}</Link>
                <span>
                  <b>
                    <FaRupeeSign />
                    {item.priceRange}
                  </b>
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
