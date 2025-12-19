import { Stack } from 'expo-router'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
        animation: 'fade',
      }}
    />
    </GestureHandlerRootView>
  )
}

export default _layout