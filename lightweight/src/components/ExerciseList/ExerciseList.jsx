import { useState } from 'react';
import './ExerciseList.css';

function ExerciseList({ onSelect }) {
    const [exerciseList, setExerciseList] = useState([
        { id: 1, name: 'Push-ups' },
        { id: 2, name: 'Squats' },
        { id: 3, name: 'Plank' }
    ]);

    const addExercise = (newExercise) => {
        setExerciseList([...exerciseList, newExercise]);
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <ul>
                {exerciseList.map(exercise => (
                    <li 
                        key={exercise.id} 
                        className="exercise-item" 
                        onClick={() => onSelect(exercise.name)}
                    >
                        {exercise.name}
                    </li>
                ))}
            </ul>
            <button onClick={() => addExercise({ id: Date.now(), name: 'New Exercise' })}>
                Add Exercise
            </button>
        </div>
    );
}

export default ExerciseList;