# GeoLocations
React Native application to display geolocations after enabling gps using react-native.

### Installation:

#### Mostly automatic installation (recommended)

1. `yarn add react-native-android-location-services-dialog-box`
<br/>or<br/>
`npm install react-native-android-location-services-dialog-box --save`
2. `react-native link react-native-android-location-services-dialog-box`

#### Manual Installation

##### Android

1. `yarn add react-native-android-location-services-dialog-box`
<br/>or<br/>
`npm install react-native-android-location-services-dialog-box --save`
2. Make the following additions to the given files:

**android/settings.gradle**

```gradle
include ':react-native-android-location-services-dialog-box'
project(':react-native-android-location-services-dialog-box').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-android-location-services-dialog-box/android')
```

**android/app/build.gradle**

```gradle
dependencies {
   ...
   compile project(':react-native-android-location-services-dialog-box')
}
```

**MainApplication.java**

On top, where imports are:
```java
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
```

Under `protected List<ReactPackage> getPackages() {`  
```java
  return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    new LocationServicesDialogBoxPackage() // <== this
  );
```


GEO 1     |  GEO 2 |  GEO 3 |
:---------:|:----------:|:---------:
![](https://github.com/ReactNativeCodility/GeoLocation/blob/master/design/gps.png?raw=true)  |  ![](https://github.com/ReactNativeCodility/GeoLocation/blob/master/design/enable.png?raw=true) |  ![](https://github.com/ReactNativeCodility/GeoLocation/blob/master/design/location.png?raw=true) 

# Play Video
[![](https://github.com/ReactNativeCodility/GeoLocation/blob/master/design/react-geo.png?raw=true)](https://youtu.be/0zxf51nunao "Click here to watch")

# Like Facebook Page
[![](https://github.com/AndroidCodility/Barchart-Graph/blob/master/design/fb.png?raw=true)](https://www.facebook.com/androidcodility/ "Click here")