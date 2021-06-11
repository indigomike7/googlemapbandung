import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import markerRetina from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import * as _ from "lodash";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: markerRetina,
    shadowUrl: markerShadow,
});
function MyComponent(props) {
    const map = useMap();
    map.setView([props.lat, props.lng], 17);
    return null;
}
const ResultComponent = (props) => {
    const { data } = props;
    const [dataFiltered, setDataFiltered] = useState(data);
    const [filterWeb, setFilterWeb] = useState(0);
    const [filterRating, setFilterRating] = useState(0);
    const [orderBy, setOrderBy] = useState(null);
    const [orderByInt, setOrderByInt] = useState(0);
    const convertDay = (day) => {
        let hari = "";
        switch (day) {
            case "Sunday":
                hari = "Minggu";
                break;
            case "Monday":
                hari = "Senin";
                break;
            case "Tuesday":
                hari = "Selasa";
                break;
            case "Wednesday":
                hari = "Rabu";
                break;
            case "Thursday":
                hari = "Kamis";
                break;
            case "Friday":
                hari = "Jum'at";
                break;
            case "Saturday":
                hari = "Sabtu";
                break;
        }
        return hari;
    };
    const convertTime12to24 = (time12h) => {
        let splitter = time12h ? time12h.split("–") : "";
        if (splitter.length > 1) {
            let splitJamMenitBuka = splitter[0].split(":");
            let jamBuka = splitJamMenitBuka[0];
            let menitBuka =
                splitJamMenitBuka.length > 1 ? splitJamMenitBuka[1] : "00";
            if (splitter[0].indexOf("AM") > -1) {
                const splitModifier = splitter[0].split("AM");
                if (parseInt(splitModifier[0]) == 12) {
                    jamBuka = "00:00";
                } else {
                    jamBuka =
                        parseInt(splitModifier[0]) >= 10
                            ? splitModifier[0] + ":" + menitBuka
                            : "0" + splitModifier[0] + ":" + menitBuka;
                }
            }
            if (splitter[0].indexOf("PM") > -1) {
                const splitModifier = splitter[0].split("PM");
                if (parseInt(splitModifier[0]) == 12) {
                    jamBuka = "00:00";
                } else {
                    jamBuka = parseInt(jamBuka, 10) + 12 + ":" + menitBuka;
                }
            }

            let splitJamMenitTutup = splitter[1].split(":");
            let jamTutup = splitJamMenitTutup[0];
            let menitTutup =
                splitJamMenitTutup.length > 1 ? splitJamMenitTutup[1] : "00";
            if (splitter[1].indexOf("AM") > -1) {
                const splitModifier = splitter[1].split("AM");
                if (parseInt(splitModifier[0]) == 12) {
                    jamTutup = "00:00";
                } else {
                    jamTutup =
                        parseInt(splitModifier[0]) >= 10
                            ? splitModifier[0] + ":" + menitTutup
                            : "0" + splitModifier[0] + ":" + menitTutup;
                }
            }
            if (splitter[1].indexOf("PM") > -1) {
                const splitModifier = splitter[1].split("PM");
                if (parseInt(splitModifier[0]) == 12) {
                    jamTutup = "00:00";
                } else {
                    jamTutup = parseInt(jamTutup, 10) + 12 + ":" + menitTutup;
                }
            }
            return jamBuka + "-" + jamTutup;
        } else {
            return "Tutup";
        }
    };
    const handleFilter = () => {
        let dirtyData = data;
        if (filterWeb !== 0) {
            if (filterWeb == 1) {
                dirtyData =
                    dirtyData.length > 0
                        ? dirtyData.filter((v) => v.web != "")
                        : [];
            } else {
                dirtyData =
                    dirtyData.length > 0
                        ? dirtyData.filter((v) => v.web == "")
                        : [];
            }
        }

        if (filterRating !== 0) {
            dirtyData =
                dirtyData.length > 0
                    ? dirtyData.filter(
                          (v) => parseInt(v.rate, 10) == filterRating
                      )
                    : [];
        }

        if (orderBy) {
            dirtyData = _.orderBy(dirtyData, [orderBy.name], [orderBy.value]);
        }
        setDataFiltered(dirtyData);
    };
    return (
        <div className="d-flex flex-column">
            <div className="d-flex mt-3 flex-column card p-5">
                <select
                    className="form-select form-select-xs form-control mb-3"
                    onChange={(e) => {
                        setFilterWeb(e.target.value);
                    }}
                    value={filterWeb}
                >
                    <option defaultValue value={0} disabled>
                        - Filter website -
                    </option>
                    <option value={1}>Memiliki website</option>
                    <option value={2}>Tidak memiliki website</option>
                </select>
                <select
                    className="form-select form-select-xs form-control mb-3"
                    onChange={(e) => setFilterRating(e.target.value)}
                    value={filterRating}
                >
                    <option defaultValue value={0} disabled>
                        - Filter Rating -
                    </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <select
                    className="form-select form-select-xs form-control mb-3"
                    onChange={(e) => {
                        if (e.target.value == 1)
                            setOrderBy({ name: "name", value: "asc" });
                        if (e.target.value == 2)
                            setOrderBy({ name: "name", value: "desc" });
                        if (e.target.value == 3)
                            setOrderBy({ name: "rate", value: "desc" });
                        if (e.target.value == 4)
                            setOrderBy({ name: "rate", value: "asc" });
                        if (e.target.value == 5)
                            setOrderBy({ name: "review", value: "desc" });
                        if (e.target.value == 6)
                            setOrderBy({ name: "review", value: "asc" });
                        setOrderByInt(e.target.value);
                    }}
                    value={orderByInt}
                >
                    <option defaultValue value={0} disabled>
                        - Urutkan berdasarkan -
                    </option>
                    <option value={1}>Nama ( A-z )</option>
                    <option value={2}>Nama ( Z-a )</option>
                    <option value={3}>Rate tertinggi</option>
                    <option value={4}>Rate terendah</option>
                    <option value={5}>Ulasan tertinggi</option>
                    <option value={6}>Ulasan terendah</option>
                </select>
                <button className="btn btn-primary" onClick={handleFilter}>
                    Filter
                </button>
                <button
                    className="btn btn-link"
                    onClick={() => {
                        setFilterWeb(0);
                        setFilterRating(0);
                        setOrderBy(null);
                        setOrderByInt(0);
                    }}
                >
                    Reset
                </button>
                <span className="text-dark mt-3">
                    Hasil pencarian didapatkan {dataFiltered.length || 0} data
                </span>
            </div>
            {dataFiltered.length > 0 ? (
                dataFiltered.map((v, i) => (
                    <div className="card mt-3 mb-3" key={i.toString()}>
                        <div className="card-body">
                            <div className="d-flex align-items-center w-full h-100">
                                <MapContainer
                                    center={[v.lat, v.lng]}
                                    zoom={17}
                                    scrollWheelZoom={false}
                                    style={{
                                        width: "-webkit-fill-available",
                                        height: 300,
                                    }}
                                >
                                    <MyComponent {...v} />
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                        subdomains={[
                                            "mt0",
                                            "mt1",
                                            "mt2",
                                            "mt3",
                                        ]}
                                    />
                                    <Marker position={[v.lat, v.lng]}>
                                        <Popup>{v.location}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <div className="d-flex align-items-center mt-3">
                                <h5>{v.name}</h5>
                                <div className="ml-auto">
                                    <img
                                        src={
                                            v.logo || "/images/placeholder.jpeg"
                                        }
                                        style={{ width: 50 }}
                                        alt="Logo"
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <StarRatings
                                    rating={parseInt(v.rate || 0)}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    starDimension="20px"
                                    starSpacing="1px"
                                    name="rating"
                                />
                                <span className="ml-3">
                                    {v.review || 0} ulasan google
                                </span>
                            </div>
                            <div className="d-flex">
                                <span className="font-weight-bold">
                                    Alamat:{" "}
                                </span>
                                <span className="ml-3">{v.location}</span>
                            </div>
                            <div className="d-flex">
                                <span className="font-weight-bold">
                                    Jadwal:{" "}
                                </span>
                                <span className="ml-3">
                                    {v.jadwal.length > 0
                                        ? v.jadwal.map((x, y) => (
                                              <span
                                                  key={y.toString()}
                                                  className={
                                                      y == 0
                                                          ? "font-weight-bold"
                                                          : ""
                                                  }
                                              >
                                                  -{" "}
                                                  {x[0] ? convertDay(x[0]) : ""}{" "}
                                                  {convertTime12to24(x[1][0])}
                                                  <br />
                                              </span>
                                          ))
                                        : "Tidak memiliki jadwal"}
                                </span>
                            </div>
                            <div className="d-flex">
                                <span className="font-weight-bold">
                                    Telepon:
                                </span>
                                <span className="ml-2">
                                    {v.phone || "Tidak memiliki no telepon"}
                                </span>
                            </div>
                            <div className="d-flex">
                                <span className="font-weight-bold">
                                    Website:
                                </span>
                                <span className="ml-2">
                                    {v.web || "Tidak memiliki website"}
                                </span>
                            </div>
                            <a
                                className="btn btn-primary btn-sm mt-3"
                                href={
                                    v.phone
                                        ? "tel:" + v.phone.replace(/ /g, "")
                                        : ""
                                }
                                target="_blank"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="css-i6dzq1"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </a>
                            <a
                                className="btn btn-primary btn-sm mt-3 ml-1"
                                href={"http://" + v.web || "#"}
                                target="_blank"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="css-i6dzq1"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                            </a>
                            <a
                                className="btn btn-link btn-sm mt-3 ml-1"
                                href={
                                    "https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=" +
                                    v.lat +
                                    "," +
                                    v.lng
                                }
                                target="_blank"
                            >
                                Lihat lokasi pada maps
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <span className="text-dark mt-3">No data found...</span>
            )}
        </div>
    );
};

export default ResultComponent;
