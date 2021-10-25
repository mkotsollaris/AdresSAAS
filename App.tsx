import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useEffect } from "react";
import { Alert, Linking, StyleSheet, Text, View, Platform } from "react-native";
import {
  Geometry,
  GooglePlacesAutocomplete,
  Point,
} from "react-native-google-places-autocomplete";
import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";
import Form from "./Form";
import GooglePlacesAutocompleteCustom from "./GooglePlacesAutocomplete";
import Button from "./Button";

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default function App() {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [point, setPoint] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let pnt: Point = {
        // @ts-ignore
        lat: location?.coords?.latitude,
        // @ts-ignore
        lng: location?.coords?.longitude,
      };
      setPoint(pnt);
    })();
  }, []);

  const callBack = (userInsertedGeometry: Point) => {
    // @ts-ignore
    const diff = getDistanceFromLatLonInKm(point?.lat, point.lng, userInsertedGeometry.lat, userInsertedGeometry.lng);
    Alert.alert(diff.toString());
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocompleteCustom cb={callBack} />
      <Text>{text}</Text>
      {/* <Form /> */}
      {/* <StatusBar style="auto" /> */}
      <Button label="Verify" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    marginTop: 10,
    marginBottom: 10,
  },
});
