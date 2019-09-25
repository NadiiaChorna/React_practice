import React, {useReducer} from 'react';
import axios from 'axios';
import { FirebaseContext } from './firebaseContext';
import { firebaseReducer } from './firebaseReducer';
import { SHOW_LOADER, REMOVE_NOTE, ADD_NOTE, FETCH_NOTES } from '../types';

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState);
    
    const showLoader = () => dispatch({type: SHOW_LOADER});

    const fetchNotes = async () => {
        try {
            showLoader();
            const response = await axios.get(`${url}/notes.json`);
            console.log('1---',response);
            const payload = Object.keys(response.data).map(key => {
                return {
                    ...response.data[key],
                    id: key
                }
            });
            dispatch({
                type: FETCH_NOTES,
                payload
            })
        } catch (error) {
            console.error(error);
        }
    }

    const addNote = async title => {
        const note = {
            title,
            date: new Date().toJSON()
        };
        try {
            const response = await axios.post(`${url}/notes.json`, note);
            console.log('2---',response);
            const payload = {
                ...note,
                id: response.data.name
            }
            console.log(payload);

            dispatch({
                type: ADD_NOTE,
                payload
            })
        } catch (error) {
            console.error(error);
        }
    };

    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}.json`);
        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes,
            loading: state.loading,
            notes: state.notes
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}