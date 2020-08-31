//import '../_mockLocation';

import React, { useContext, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { AntDesign } from '@expo/vector-icons';

import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
  const { state: { recording }, addLocation } = useContext(LocationContext);
  const callback = useCallback(location => {
    addLocation(location, recording);
  }, [recording])
  const [err] = useLocation(isFocused || recording, callback)


  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h4 style={styles.txt}> Create a Track</Text>
      <Map />
      {err ? <Text> Please enable location services </Text> : null}

      <TrackForm />

    </SafeAreaView >
  )
};

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <AntDesign name="pluscircleo" size={24} color="black" />
}

const styles = StyleSheet.create({
  txt: {
    textAlign: "center",
  }
});

export default withNavigationFocus(TrackCreateScreen);
