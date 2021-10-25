import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { t, color } from "react-native-tailwindcss";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import Input from "./Input";
import Button from "./Button";

// taken from https://dev.to/sankhadeeproy007/using-react-hook-form-with-react-native-part-i-set-up-validation-31ca
export default function App() {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);

  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: "APIKEY",
          language: "en", // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          useOnPlatform: "web",
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
      <Button label="Verify" />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    width: "70%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  switch: [t.mB4, t.selfStart, t.flexRow, t.itemsCenter],
  switchText: [t.textBase, t.mR3, t.textGray800],
};
