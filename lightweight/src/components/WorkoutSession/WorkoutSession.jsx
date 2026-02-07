import { useState } from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard.jsx';
import ExerciseList from '../ExerciseList/ExerciseList.jsx';

function WorkoutSession({ name }) {
    const [exercises, setExercises] = useState([]);
    const [isPickingExercise, setIsPickingExercise] = useState(false);

    const addExercise = (name) => {
        const newExercise = {
            id: Date.now(),
            name: name,
            sets: []
        };
        setExercises([...exercises, newExercise]);
    }

    const updateExerciseSets = (exerciseId, sets) => {
        setExercises(exercises.map(exercise => 
            exercise.id === exerciseId ? { ...exercise, sets } : exercise
        ));
    }

    const handlePick = (exerciseName) => {
        addExercise(exerciseName);
        setIsPickingExercise(false);
    };

    if (isPickingExercise) {
        return (
            <div style={{ padding: '20px' }}>
                <h3>Select an Exercise</h3>
                <ExerciseList onSelect={handlePick} /> 
                <button onClick={() => setIsPickingExercise(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>{name}</h2>
            
            {exercises.map(exercise => (
                <ExerciseCard 
                    key={exercise.id} 
                    exercise={exercise} 
                    onUpdateSets={(newSets) => updateExerciseSets(exercise.id, newSets)} 
                />
            ))}

            <button 
                onClick={() => setIsPickingExercise(true)}
                style={{ width: '100%', padding: '10px', marginTop: '20px' }}
            >
                + Add Exercise
            </button>
        </div>
    );
}

export default WorkoutSession;