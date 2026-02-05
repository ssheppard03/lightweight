import { useState } from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard.jsx';

function WorkoutSession({ name }) {
    const [exercises, setExercises] = useState([]);

    const addExercise = (name) => {
        const newExercise = {
            id: Date.now(),
            name: name
        };
        setExercises([...exercises, newExercise]);
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>{name}</h2>
            {exercises.map(exercise => (
                <ExerciseCard key={exercise.id} name={exercise.name} />
            ))}
            <button onClick={() => addExercise(prompt("Enter exercise name:"))}>Add Exercise</button>
        </div>
    );
}

export default WorkoutSession;