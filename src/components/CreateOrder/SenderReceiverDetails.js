/* eslint-disable no-undef */
import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import SenderDetails from "./SenderDetails";
import RecipientDetails from "./RecipientDetails";
import Script from "react-load-script";

class SenderReceiverDetails extends Component {
  saveAndContinue = values => {
    !this.props.values.senderCountry && this.handlePlaceSelect("sender");
    !this.props.values.recipientCountry &&
      this.props.values.recipientAddress &&
      this.handlePlaceSelect("recipient");
    this.props.updateState(values);
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleScriptLoad = senderReceiver => {
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
      this.autocompleteSender = new google.maps.places.Autocomplete(
        document.getElementById(senderReceiver),
        options
      );
      this.autocompleteSender.addListener("place_changed", () =>
        this.handlePlaceSelect("sender")
      );
    } else {
      this.autocompleteRecipient = new google.maps.places.Autocomplete(
        document.getElementById(senderReceiver),
        options
      );
      this.autocompleteRecipient.addListener("place_changed", () =>
        this.handlePlaceSelect("recipient")
      );
    }
  };

  handlePlaceSelect = senderReceiver => {
    // Extract City From Address Object
    let place = this.props.sender
      ? this.autocompleteSender.getPlace()
      : this.autocompleteRecipient.getPlace();
    if (!place) {
      let geocoder = new google.maps.Geocoder();
      let address = document.getElementById(`${senderReceiver}Address`).value;

      geocoder.geocode(
        {
          address: address
        },
        (result, status) => {
          if (status === "OK") {
            place = result[0];
            const country = place.address_components.find(
              e => e.types[0] === "country"
            );
            const state = place.address_components.find(
              e => e.types[0] === "administrative_area_level_1"
            );
            this.props.updateState({
              [`${senderReceiver}State`]: state["long_name"],
              [`${senderReceiver}Country`]: country["long_name"],
              [`${senderReceiver}Address`]: place.formatted_address,
              [`${
                senderReceiver === "sender" ? "srcData" : "destData"
              }`]: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              }
            });
           
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
      // console.log();
      return null;
    }

    const country = place.address_components.find(
      e => e.types[0] === "country"
    );
    const state = place.address_components.find(
      e => e.types[0] === "administrative_area_level_1"
    );

    // Check if address is valid
    if (country && state) {
      // Set State
      console.log(senderReceiver)
      this.props.updateState({
        [`${senderReceiver}State`]: state["long_name"],
        [`${senderReceiver}Country`]: country["long_name"],
        [`${senderReceiver}Address`]: `${place.formatted_address}`,
        [`${
          senderReceiver === "sender" ? "srcData" : "destData"
        }`]: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      });
    }
  };

  render() {
    const { sender } = this.props;
    return (
      <div>
        <Header as="h3" dividing>
          {`${this.props.sender ? "Sender" : "Recipient"}`}'s Details{" "}
        </Header>
        {sender && (
          <>
            <Script
              url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGFjD-GUhv7z3uj8KjNM91c2q0ivWnecg&libraries=places,geometry"
              onLoad={() => this.handleScriptLoad("senderAddress")}
            />
            <SenderDetails
              values={this.props.values}
              handleChange={this.props.handleChange}
              handleScriptLoad={this.handleScriptLoad}
              back={this.back}
              saveAndContinue={this.saveAndContinue}
            />
          </>
        )}
        {!sender && (
          <>
            <Script
              url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGFjD-GUhv7z3uj8KjNM91c2q0ivWnecg&libraries=places,geometry"
              onLoad={() => this.handleScriptLoad("recipientAddress")}
            />
            <RecipientDetails
              values={this.props.values}
              handleChange={this.props.handleChange}
              handleScriptLoad={this.handleScriptLoad}
              back={this.back}
              saveAndContinue={this.saveAndContinue}
            />
          </>
        )}
      </div>
    );
  }
}

export default SenderReceiverDetails;
