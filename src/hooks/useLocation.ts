import { useState } from 'react'

import Toast from 'react-native-toast-message'

import * as Location from 'expo-location'

export function useLocation() {
  const [loadingLocation, setLoadingLocation] = useState(false)

  async function getLocation() {
    try {
      setLoadingLocation(true)

      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        Toast.show({
          type: 'info',
          text1: 'Sem permissão para acessar a localização.'
        })
        return null
      }

      const location = await Location.getCurrentPositionAsync({})

      const { latitude, longitude } = location.coords

      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      })

      return {
        lat: latitude,
        lng: longitude,
        address
      }
    } finally {
      setLoadingLocation(false)
    }
  }

  return {
    loadingLocation,
    getLocation
  }
}
