import { useState } from 'react'

import * as Location from 'expo-location'

export function useLocation() {
  const [loadingLocation, setLoadingLocation] = useState(false)

  async function getLocation() {
    try {
      setLoadingLocation(true)

      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        console.log('Permissão para acessar localização negada.')
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
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingLocation(false)
    }
  }

  return {
    loadingLocation,
    getLocation
  }
}
