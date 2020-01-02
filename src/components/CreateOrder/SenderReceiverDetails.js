/* eslint-disable no-undef */
import React from "react";
import { Header } from "semantic-ui-react";
import SenderDetails from "./SenderDetails";
import RecipientDetails from "./RecipientDetails";
import Script from "react-load-script";

let autocompleteSender, autocompleteRecipient;

const SenderReceiverDetails = ({
  data,
  updateState,
  sender,
  handleChange,
  nextStep,
  prevStep
}) => {
  const saveAndContinue = value => {
    // !data.senderCountry && handlePlaceSelect("sender");
    // !data.recipientCountry &&
    //   data.recipientAddress &&
    //   handlePlaceSelect("recipient");
    updateState(value);
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  const getPlaceDetails = (addressString, senderReceiver) => {
    let geocoder = new google.maps.Geocoder();
    let address = addressString;
    geocoder.geocode(
      {
        address: address
      },
      (result, status) => {
        if (status === "OK") {
          updateUserDetails(senderReceiver, result[0]);
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
          return null;
        }
      }
    );
  };

  const updateUserDetails = (senderReceiver, place) => {
    const country = place.address_components.find(
      e => e.types[0] === "country"
    );
    const state = place.address_components.find(
      e => e.types[0] === "administrative_area_level_1"
    );

    // Check if address is valid
    if (country && state) {
      updateState({
        [`${senderReceiver}State`]: state["long_name"],
        [`${senderReceiver}Country`]: country["long_name"],
        [`${senderReceiver}Address`]: `${place.formatted_address}`,
        [`${senderReceiver === "sender" ? "srcData" : "destData"}`]: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      });
    }
  };

  const handlePlaceSelect = async senderReceiver => {
    // Extract City From Address Object
    let place = sender
      ? autocompleteSender.getPlace()
      : autocompleteRecipient.getPlace();
    if (!place) {
      getPlaceDetails(
        document.getElementById(`${senderReceiver}Address`).value,
        senderReceiver
      );
      return null;
    }
    updateUserDetails(senderReceiver, place);
  };

  const handleScriptLoad = senderReceiver => {
    // Declare Options For Autocomplete
    var options = {
      types: ["geocode", "establishment"],
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(6.5244, 3.3792),
        new google.maps.LatLng(9.0765, 7.3986)
      ),
      fields: ["address_components", "formatted_address", "geometry", "name"]
    };
    if (senderReceiver.startsWith("sender")) {
      autocompleteSender = new google.maps.places.Autocomplete(
        document.getElementById(senderReceiver),
        options
      );
      autocompleteSender.addListener("place_changed", () =>
        handlePlaceSelect("sender")
      );
    } else {
      autocompleteRecipient = new google.maps.places.Autocomplete(
        document.getElementById(senderReceiver),
        options
      );
      autocompleteRecipient.addListener("place_changed", () =>
        handlePlaceSelect("recipient")
      );
    }
  };

  return (
    <div>
      <Header as="h3" dividing>
        {`${sender ? "Sender" : "Recipient"}`}'s Details{" "}
      </Header>
      {sender && (
        <>
          {/* <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGFjD-GUhv7z3uj8KjNM91c2q0ivWnecg&libraries=places,geometry"
            onLoad={() => handleScriptLoad("senderAddress")}
          /> */}
          <SenderDetails
            data={data}
            handleChange={handleChange}
            handleScriptLoad={handleScriptLoad}
            back={back}
            saveAndContinue={saveAndContinue}
          />
        </>
      )}
      {!sender && (
        <>
          {/* <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGFjD-GUhv7z3uj8KjNM91c2q0ivWnecg&libraries=places,geometry"
            onLoad={() => handleScriptLoad("recipientAddress")}
          /> */}
          <RecipientDetails
            data={data}
            handleChange={handleChange}
            handleScriptLoad={handleScriptLoad}
            back={back}
            saveAndContinue={saveAndContinue}
          />
        </>
      )}
    </div>
  );
};

export default SenderReceiverDetails;
