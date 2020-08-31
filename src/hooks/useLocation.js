import { useState, useEffect } from 'react';
import {
    Accuracy, requestPermissionsAsync, watchPositionAsync
} from 'expo-location';

export default (shouldTruck, callback) => {
    const [err, setErr] = useState(null);
    //const [subscriber, setSubscriber] = useState(null);
    let subscriber;
    useEffect(() => {


        const startWatching = async () => {
            try {
                await requestPermissionsAsync();
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10

                }, callback
                )

                // const { granted } = await requestPermissionsAsync();
                // if (!granted) {
                //   throw new Error('Location permission not granted');
                // }
            } catch (e) {
                setErr(e);
            }
        };
        if (shouldTruck) {
            startWatching();
        } else {
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }
        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        }
    }, [shouldTruck, callback, subscriber])
    return [err];

}