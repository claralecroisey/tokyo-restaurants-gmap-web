export type GetRestaurantsResponse = Restaurant[];

export type Restaurant = {
  id: string;
  displayName: {
    languageCode: string;
    text: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  formattedAddress: string;
  nationalPhoneNumber: string;
};
