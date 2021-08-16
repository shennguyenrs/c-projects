import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Switch, Route, Redirect } from 'react-router-native';

// Import components
import AppBar from './components/AppBar';
import RepositoriesList from './screens/RepositoriesList';
import SignInForm from './screens/SignInForm';

import { colors } from './styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
});

export default function Main() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AppBar />
        <Switch>
          <Route exact path="/" component={RepositoriesList} />
          <Route path="/sign-in" component={SignInForm} />
          <Redirect to="/" />
        </Switch>
      </View>
    </SafeAreaView>
  );
}
