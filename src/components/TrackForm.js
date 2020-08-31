import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { View } from 'react-native';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { state: { name, recording, locations }, startRecording, stopRecording, changeName } = useContext(LocationContext);

    const [saveTrack] = useSaveTrack();
    return <View>
        <Spacer>
            <Input value={name} onChangeText={changeName} placeholder="Enter Track Name" />
            {recording ? <Button title="Stop Track" onPress={stopRecording} />
                :
                <Button onPress={startRecording} title="Start Recording" />
            }
        </Spacer>
        <Spacer>
            {!recording && locations.length
                ? <Button title="Save Recording" onPress={saveTrack} />
                : null
            }
        </Spacer>
    </View>
}


export default TrackForm;
