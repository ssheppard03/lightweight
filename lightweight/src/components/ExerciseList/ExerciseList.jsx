import { useState } from 'react';
import './ExerciseList.css';

function ExerciseList({ onSelect }) {
    const [exerciseList, setExerciseList] = useState([
        { id: 1, name: 'Push-ups' },
        { id: 2, name: 'Squats' },
        { id: 3, name: 'Plank' }
    ]);

    const [addingExercise, setAddingExercise] = useState(false);

    const addExercise = (newExercise) => {
        setExerciseList([...exerciseList, newExercise]);
    };

    if (addingExercise) {
        return (
            <div style={{ padding: '20px' }}>
                <h3>Add New Exercise</h3>
                <input 
                    type="text" 
                    placeholder="Exercise Name" 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
                            addExercise({ id: Date.now(), name: e.target.value.trim() });
                            setAddingExercise(false);
                        }
                    }} 
                />
                <button onClick={() => setAddingExercise(false)}>Cancel</button>
            </div>
        );
    }

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
            <button onClick={() => setAddingExercise(true)} style={{ marginTop: '10px' }}>
                Add Exercise
            </button>
        </div>
    );
}

export default ExerciseList;