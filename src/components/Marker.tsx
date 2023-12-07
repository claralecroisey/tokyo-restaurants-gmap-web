import { useEffect, useState } from 'react';

interface MarkerProps extends google.maps.MarkerOptions {
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

export function Marker({ onClick, ...options }: MarkerProps) {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      if (onClick) {
        google.maps.event.clearListeners(marker, 'click');
        marker.addListener('click', onClick);
      }
    }
  }, [marker, options, onClick]);

  return null;
}
