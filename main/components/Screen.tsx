import { View, StyleSheet } from "react-native";
import React from "react";
import { ReactNode } from "react";

type ScreenProps = {
  children: ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,           
      marginTop:50
    },
  });
  