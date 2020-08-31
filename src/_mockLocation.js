import * as Location from 'expo-location';


const tenMtersWithDgrees = 0.0001;
const getLocation = increment => {
    return {
        timestamp: 1000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 59.92574519753646 + increment * tenMtersWithDgrees,
            latitude: 10.868188320079911 + increment * tenMtersWithDgrees
        }
    }
}

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    })
    counter++;
}, 1000)