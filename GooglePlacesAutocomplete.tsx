import * as React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_PLACES_API_KEY = "";

// @ts-ignore
const GooglePlacesAutocompleteCustom = ({ cb }) => {
  const [address, setAddress] = React.useState("");
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true}
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en", // language of the results
        }}
        onPress={(data: any, details: any = null) => {
          console.log("DATA", data);
          console.log("kappa", details);
          cb(details?.geometry?.location);
          //   console.log(JSON.stringify(details.geometry.location));
          setAddress(data?.description);
        }}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          useOnPlatform: "web",
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    paddingTop: 100,
    backgroundColor: "#ecf0f1",
  },
});

export default GooglePlacesAutocompleteCustom;
