import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { CustomEqualCreatorOptions, createCustomEqual } from "fast-equals";
import { useEffect, useRef } from "react";

/**
 * Hooks provided by Google: https://developers.google.com/maps/documentation/javascript/react-map?hl=fr
 */
const deepCompareEqualsForMaps = createCustomEqual(((
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deepEqual: (a: any, b: any) => boolean
  ) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    return deepEqual(a, b);
  }) as CustomEqualCreatorOptions<google.maps.Data.Feature>);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  useEffect(callback, [...dependencies.map(useDeepCompareMemoize), callback]);
}
