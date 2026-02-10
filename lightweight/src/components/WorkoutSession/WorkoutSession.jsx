import { useState } from 'react';
import { supabase } from '../../supabaseClient.js';
import ExerciseCard from '../ExerciseCard/ExerciseCard.jsx';
import ExerciseList from '../ExerciseList/ExerciseList.jsx';

function WorkoutSession({ name, template }) {
    const [exercises, setExercises] = useState(template ? template.exercise_data : []);
    const [isPickingExercise, setIsPickingExercise] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [templateName, setTemplateName] = useState('');

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

    const handleSaveTemplateClick = () => {
        setIsSaveModalOpen(true);
    }

    const saveToSupabaseAsTemplate = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("You must be logged in to save templates!");
            return;
        }

        const { _data, error } = await supabase
            .from('templates')
            .insert([
                {
                    name: templateName,
                    exercise_data: exercises,
                    user_id: user.id
                }
            ])

        if (error) console.error("Error saving template:", error);
        else alert("Template saved successfully!");
    };

    if (isSaveModalOpen) {
        return (
            <div style={{ padding: '20px' }}>
                <h3>Save Workout as Template</h3>
                <input 
                    type="text" 
                    placeholder="Template Name" 
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                />
                <button 
                    onClick={() => {
                        setIsSaveModalOpen(false);
                        saveToSupabaseAsTemplate();
                    }}
                >
                    Save
                </button>
                <button onClick={() => setIsSaveModalOpen(false)}>Cancel</button>
            </div>
        );
    }

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
            <button 
                onClick={() => handleSaveTemplateClick()} 
                style={{ width: '100%', padding: '10px', marginTop: '20px' }}>
                Save as Template
            </button>
        </div>
    );
}

export default WorkoutSession;