export const getGeolocation = () => {
  let latitude = 0;
  let longitude = 0;

  const success = (position: GeolocationPosition) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    fetch(
      `http://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=false`
    ).then(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (data: any) {
        console.log(data);
      }
    );
  };

  const error = (err: GeolocationPositionError) => {
    console.log("Error obteniendo localización: " + err.message);
  };

  const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    return "Geolocation is not supported by this browser.";
  }

  return {
    latitude,
    longitude,
  };
};
