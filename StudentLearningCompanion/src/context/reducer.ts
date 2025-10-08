//Reducer function to manage global app state changes
//Each action updates the state immutably
import { StudySession, AppState, Subject } from "../types";
import {v4 as uuidv4} from "uuid";

//Define all possible actions that can modify state
export type Action =
    | {type: 'ADD_SUBJECT'; payload: Subject}
    | {type: 'START_SESSION'; payload: {subjectId?: string; subjectName?: string}}
    | {type: 'END_SESSION'; payload: {notes?: string}}
    | {type: 'LOAD_STATE'; payload: AppState}
    | {type: 'DELETE_SESSION'; payload: {id: string}};

    //Reducer logic
export function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        //Add new study subject
        case 'ADD_SUBJECT': {
            return {...state, subject: [action.payload, ...state.subject]};
        }

        //Start a new study session
        case 'START_SESSION': {
            const id = uuidv4(); //Generate unique session ID
            const session: StudySession = {
                id,
                subjectid: action.payload.subjectId ?? null,
                subjectName: action.payload.subjectName,
                start: new Date().toISOString(), //Record current time
            };
            //Save to session list and mark as active
            return {...state, sessions: [session, ...state.sessions], activeSessionId: id};
        }

        //End the current active study session
        case 'END_SESSION': {
            if (!state.activeSessionId) return state;

            const sessions = state.sessions.map(s => {
                if (s.id !== state.activeSessionId) return s;

                //Calculate session duration in minutes
                const end = new Date().toISOString();
                const durationMins = Math.round(
                    (new Date(end).getTime() - new Date(s.start).getTime()) / 60000
                );

                return {...s, end, durationMins, notes: action.payload.notes ?? s.notes};
            });

            return {...state, sessions, activeSessionId: undefined};
        }

        //Load saved state from storage
        case 'LOAD_STATE':
            return action.payload;

        //Remove a session from history
        case 'DELETE_SESSION':
            return {...state, sessions: state.sessions.filter(s => s.id !== action.payload.id)};

        default:
            return state;
    }
}