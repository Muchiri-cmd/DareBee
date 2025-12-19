import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
        animation: 'fade',
      }}
    />
  )
}

export default _layout