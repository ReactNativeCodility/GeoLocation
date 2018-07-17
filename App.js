import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  BackHandler,
  DeviceEventEmitter,
  StatusBar,
  View
} from 'react-native';

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export default class App extends Component {

  state = {
    initialPosition: 'unknown',
    latitude: null,
    longitude: null,
    accuracy: null,
    altitude: null
  };

  componentDidMount() {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2>Use Location ?</h2>This app wants to change your GPS settings:<br/><br/>Enable GPS network for location services.<br/>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
      preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
      providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    }).then(function (success) {
      // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
      navigator.geolocation.getCurrentPosition((position) => {
        let initialPosition = JSON.stringify(position);
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let accuracy = position.coords.accuracy
        let altitude = position.coords.altitude
        this.setState({ initialPosition, latitude, longitude, accuracy, altitude });
      }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    }.bind(this)
    ).catch((error) => {
      console.log(error.message);
    });

    BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
      LocationServicesDialogBox.forceCloseDialog();
    });

    DeviceEventEmitter.addListener('locationProviderStatusChange', function (status) { // only trigger when "providerListener" is enabled
      console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
    });
  }

  componentWillUnmount() {
    // used only when "providerListener" is enabled
    LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener.
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#117864"
          barStyle="light-content"
        />
        <View style={styles.headerView}>
          <Text style={styles.textHeader}>
            React-Native Codility
          </Text>
        </View>
        <Text style={styles.welcome}>
          Welcome to React Native Geolocation!
        </Text>
        <Text style={styles.instructions}>
          Geolocation: {this.state.initialPosition}
        </Text>
        <View style={styles.viewContainer}>
          <Text style={styles.welcome}>
            Latitude: {this.state.latitude}
          </Text>
          <Text style={styles.welcome}>
            Longitude: {this.state.longitude}
          </Text>
          <Text style={styles.welcome}>
            Accuracy: {this.state.accuracy}
          </Text>
          <Text style={styles.welcome}>
            Altitude: {this.state.altitude}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#117864',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#117864',
    marginTop: 25,
    padding: 10
  },
  headerView: {
    height: '15%',
    alignItems: 'center',
    borderColor: '#117864',
    borderWidth: 1
  },
  textHeader: {
    fontSize: 35,
    color: '#117864',
    textAlign: 'center',
    marginTop: 20
  },
});
