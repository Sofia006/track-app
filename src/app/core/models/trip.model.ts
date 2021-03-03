export interface ITripModel {
  _id: string;
  idAccount: string;
  origin: string;
  destination: string;
  distance: number;
  geoOrigin: {
    lat: number,
    lng: number,
  };
  geoDestination: {
    lat: number,
    lng: number,
  };
  weight?: number;
  created_at: string;
  tripStart?: string;
  tripEnd?: string;
}
