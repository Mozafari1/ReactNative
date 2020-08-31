import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { errorMessage: '', token: action.payload }
        case 'signin':
            return { errorMessage: '', token: action.payload }
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'signout':
            return { token: null, errorMessage: '' }
        default:
            return state;
    }
}
const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token })
        navigate('mainFlow')
    } else {
        navigate('loginFlow')
    }
}
const clearErrorMessage = (dispatch) => {
    return (() => {
        dispatch({ type: 'clear_error_message' });
    })
}



const signup = (dispatch) => {
    return async ({ email, password }) => {
        // Make api request to signup with that email, and pass
        // if we sign up, modify our state, and say that we are authenticated
        // is signing up fails, we probably need to reflect an error msg
        try {
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signup', payload: response.data.token });

            navigate('mainFlow');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
        }
    }
}

const signin = (dispatch) => {
    return async ({ email, password }) => {
        // try to signin
        // Handle success by updating state
        // Handle failure by showing error msg (somehow)
        try {
            const response = await trackerApi.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token });
            navigate('mainFlow');
        } catch (err) {
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in'
            })
        }
    }
}

const signout = dispatch => async () => {

    // somehow signout
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' })
    navigate('loginFlow');

}
export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
)