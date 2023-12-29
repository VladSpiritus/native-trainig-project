import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function FullInfoHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Главная страница</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ed5d3d',
    height: 55,
    //flex: 10,
    flexWrap: 'wrap',
    //flexDirection: 'row',
    alignContent: 'space-around',
  },
  title: {
    fontSize: 22,
    color: '#010101',
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
    paddingTop: 10,
    //flexBasis: '90%',
  },
  iconMenu: {
    paddingTop: 10,
    //marginBottom: 0,
    marginLeft: 10,
    //flexBasis: '10%',
  },
});

export default FullInfoHeader;
