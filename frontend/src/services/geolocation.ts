// Geolocation Service - Enhanced GPS and location utilities

export interface GeolocationResult {
  success: boolean;
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  address?: {
    village?: string;
    district?: string;
    state?: string;
    country?: string;
  };
  error?: string;
}

export class GeolocationService {
  // Get current GPS location
  static async getCurrentLocation(): Promise<GeolocationResult> {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        resolve({
          success: false,
          error: 'Geolocation is not supported by your browser'
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            success: true,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            }
          });
        },
        (error) => {
          let errorMessage = 'Unable to retrieve location';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }

          resolve({
            success: false,
            error: errorMessage
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  // Reverse geocoding (GPS to address) - Mock implementation
  static async reverseGeocode(latitude: number, longitude: number): Promise<GeolocationResult> {
    try {
      // In production, integrate with Google Maps Geocoding API or similar service
      // For now, return mock data based on coordinates

      // Mock: Detect if coordinates are in Northeast India region
      const isNortheast = latitude >= 23 && latitude <= 29 && longitude >= 88 && longitude <= 97;

      if (isNortheast) {
        return {
          success: true,
          location: { latitude, longitude, accuracy: 0 },
          address: {
            state: 'Assam',
            district: 'Kamrup',
            village: 'Sample Village',
            country: 'India'
          }
        };
      }

      return {
        success: true,
        location: { latitude, longitude, accuracy: 0 },
        address: {
          state: 'Unknown',
          district: 'Unknown',
          country: 'India'
        }
      };
    } catch (_error) {
      return {
        success: false,
        error: 'Reverse geocoding failed'
      };
    }
  }

  // Calculate distance between two GPS points (Haversine formula)
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
      Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance; // Returns distance in kilometers
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Check if location is within a specific region
  static isWithinRegion(
    latitude: number,
    longitude: number,
    regionBounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    }
  ): boolean {
    return (
      latitude <= regionBounds.north &&
      latitude >= regionBounds.south &&
      longitude <= regionBounds.east &&
      longitude >= regionBounds.west
    );
  }

  // Get location permission status
  static async checkPermission(): Promise<'granted' | 'denied' | 'prompt' | 'unsupported'> {
    if (!('permissions' in navigator)) {
      return 'unsupported';
    }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' } as any);
      return result.state as 'granted' | 'denied' | 'prompt';
    } catch (_error) {
      return 'unsupported';
    }
  }
}
