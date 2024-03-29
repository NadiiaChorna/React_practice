import React, {useContext} from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
export const Notes = ({notes}) => {
    const {removeNote} = useContext(FirebaseContext);
    return (
        <TransitionGroup component="ul" className="list-group">
            {notes.map(note => (
                <CSSTransition 
                    key={note.id}
                    classNames={'note'}
                    timeout={800}
                >
                    <li className="list-group-item note">
                        <div>
                            <strong>{note.title}</strong>
                            <small>{new Date().toLocaleDateString()}</small>
                        </div>
                        <button 
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={()=> removeNote(note.id)}>&times;</button>
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
};