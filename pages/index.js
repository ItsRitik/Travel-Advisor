import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import List from "../components/List";
import Map from "../components/Map";
import PlaceDetail from "../components/PlaceDetail";
import { getPlacesData } from "./api";
import { LoadScript } from '@react-google-maps/api';
import Head from "next/head";

const GOOGLE_MAPS_LIBRARIES = ['places'];
const Home = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [type, setType] = useState("restaurants");
  const [ratings, setRatings] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // get the users current location on intial login

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log({ latitude, longitude });
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);


  useEffect(() => {
    setIsLoading(true);
    if (bounds && bounds.sw && bounds.ne) {
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data);
          setPlaces(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(`Fetch data Error: ${error}`);
        });
    }
  }, [type, coordinates, bounds]);

  useEffect(() => {
    const filteredData = places.filter((place) => place.rating && place.rating > ratings);
    setFilteredPlaces(filteredData);
    console.log({ ratings });
  }, [ratings]);
  

  useEffect(() => {
    setIsLoading(true);
    if (coordinates.lat && coordinates.lng) {
      getPlacesData(type, bounds?.sw, bounds?.ne)
        .then((data) => {
          console.log(data);
          setPlaces(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(`Fetch data Error: ${error}`);
        });
    }
  }, [type, coordinates, bounds]);
  


  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      maxWidth={"100vw"}
      maxHeight={"100vh"}
      position={"relative"}
    >
    <LoadScript
            googleMapsApiKey="AIzaSyAhezZc7U1z_f_FoIoNRTnTO7wYbPvPqGs"
            libraries={GOOGLE_MAPS_LIBRARIES}
          >
      <Header
        setType={setType}
        setRatings={setRatings}
        setCoordinates={setCoordinates}
      />

      <List
        places={filteredPlaces.length ? filteredPlaces : places}
        isLoading={isLoading}
      />

      <Map
        setCoordinates={setCoordinates}
        coordinates={coordinates}
        setBounds={setBounds}
        places={filteredPlaces.length ? filteredPlaces : places}
      />
      </LoadScript>
    </Flex>
  );
};

export default Home;
