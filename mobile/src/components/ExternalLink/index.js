import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';

const ExternalLink = (props) => {
  const { url, children, style = {} } = props;

  const onPress = () =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });

  const styles = StyleSheet.create({
    text: {
      fontSize: 15,
      color: '#888',
      marginTop: 2,
      marginBottom: 10,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ExternalLink;
