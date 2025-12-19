import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'auto' | 'inverted' | 'light' | 'dark';
};

export default function Screen({ 
  children, 
  backgroundColor = '#FFFFFF',
  statusBarStyle = 'dark'
}: ScreenProps) {
  return (
    <>
      <StatusBar style={statusBarStyle} />
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        {children}
      </SafeAreaView>
    </>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,         
  },
});
  