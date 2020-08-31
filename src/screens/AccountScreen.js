import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Text, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import { Feather } from '@expo/vector-icons';
const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <Spacer>
        <Text h4>Hope you had a great time, and wish you a warm welcome back!</Text>
      </Spacer>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>

    </SafeAreaView>
  )
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <Feather name="settings" size={24} color="black" />
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: "center",
    marginBottom: 250
  }
});


export default AccountScreen;
