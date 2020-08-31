import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam('_id');

  const track = state.find(t => t._id === _id);
  const initialCoords = track.locations[0].coords;

  return <View>

    <MapView
      initialRegion={{
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        ...initialCoords
      }}
      style={styles.map}
    >

      <Polyline coordinates={track.locations.map(loc => loc.coords)} />
    </MapView>
    <Text style={{ fontSize: 30 }}>Track name: {track.name}</Text>

    <Text style={{ fontSize: 30 }}>Speed: {track.locations[0].coords.speed} KM/H</Text>
    <Text style={{ fontSize: 30 }}>Heading: {track.locations[0].coords.heading} °</Text>
  </View>

};
TrackDetailScreen.navigationOptions = {
  title: 'Detail'
}
const styles = StyleSheet.create({
  map: {
    height: 500
  }
});

export default TrackDetailScreen;
