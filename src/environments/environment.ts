// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://trackerz-api.herokuapp.com/',
  mapbox: {
    accessToken: 'pk.eyJ1Ijoia2xhamRpYXYiLCJhIjoiY2tkYWttazY3MTY4ZDJybm5yaGJjYTN5eCJ9.4v-2asaRLRvaGOCOlCFl3g'
  },
  apify: {
    accessToken: 'dd8dd2b2f511487399f0a2a432c3d850',
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
