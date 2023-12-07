import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { CustomEqualCreatorOptions, createCustomEqual } from "fast-equals";
import { useEffect, useRef, useState } from "react";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

export function Map({ style, ...options }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} style={style} />
    </>
  );
}

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

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  useEffect(callback, [...dependencies.map(useDeepCompareMemoize), callback]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
