import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Stack } from 'expo-router'
import pb from '../utils/pb'

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize auth state
    setIsAuthenticated(pb.authStore.isValid)
    setIsReady(true)

    // Listen for auth changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setIsAuthenticated(!!pb.authStore.isValid)
    })

    return unsubscribe
  }, [])

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    )
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        gestureEnabled: false,
      }}
      initialRouteName={isAuthenticated ? 'index' : 'login'}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="index" />
    </Stack>
  )
}
