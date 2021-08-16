import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Link, useLocation } from 'react-router-native';

import { colors } from '../styles/base';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.lightBlack,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  __active: {
    color: colors.white,
  },
  __notActive: {
    color: colors.darkGrey,
  },
});

const NavigationLink = ({ path, children }) => {
  const currentPath = useLocation().pathname;
  let isActive = true;

  if (currentPath !== path) {
    isActive = false;
  }

  const linkStyle = [
    styles.link,
    isActive && styles.__active,
    !isActive && styles.__notActive,
  ];

  return <Text style={linkStyle}>{children}</Text>;
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Link to="/" underlayColor={colors.lightBlack}>
          <NavigationLink path="/">Repositories</NavigationLink>
        </Link>
      </Pressable>
      <Pressable>
        <Link to="/sign-in" underlayColor={colors.lightBlack}>
          <NavigationLink path="/sign-in">Sign In</NavigationLink>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBar;

// Props Validation
NavigationLink.propTypes = {
  path: PropTypes.string,
  children: PropTypes.string,
};
