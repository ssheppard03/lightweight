import { useEffect, useState } from 'react';

function ExerciseCard({ name }) {
    const [sets, setSets] = useState([]);

    const addSet = () => {
        const newSet = {
            id: Date.now(),
            reps : 0,
            weight: 0,
            isDone: false,
            restTimer: 60,
            timerRunning: false
        };
        setSets([...sets, newSet]);
    }

    const updateSet = (id, key, value) => {
        const updatedSets = sets.map(set => {
            if (set.id === id) {
                const val = value === '' ? '' : Number(value);
                return { ...set, [key]: val };
            }
            return set;
        });
        setSets(updatedSets);
    }

    const deleteSet = (id) => {
        const filteredSets = sets.filter(set => set.id !== id);
        setSets(filteredSets);
    }

    const toggleSetDone = (id) => {
        const updatedSets = sets.map(set => {
            if (set.id === id) {
                return { ...set, isDone: !set.isDone, timerRunning: set.isDone ? false : true  };
            }
            return set;
        });
        setSets(updatedSets);
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // timer logic
    useEffect(() => {
        const interval = setInterval(() => {
            setSets((currentSets) =>
                currentSets.map((s) => {
                    if (s.timerRunning && s.restTimer > 0) {
                        return { ...s, restTimer: s.restTimer - 1 };
                    } else if (s.restTimer === 0 && s.timerRunning) {
                        return { ...s, timerRunning: false };
                    }
                    return s;
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '20px',
            margin: '10px 0',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            color: '#333'
        }}>
            <h3>{name}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {sets.map((set, index) => (
                    <li key={set.id} style={{ 
                                            flexDirection: 'column', 
                                            alignItems: 'flex-start',
                                            listStyle: 'none', 
                                            backgroundColor: set.isDone ? '#dcfce7' : 'transparent',
                                            borderRadius: '4px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button 
                                onClick={() => deleteSet(set.id)}
                                style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
                            >
                            ✕
                            </button>

                            <span>Set {index + 1}</span> 
                            <input 
                                type="number" 
                                value={set.reps} 
                                onChange={(e) => updateSet(set.id, 'reps', e.target.value)}
                                onFocus={(e) => e.target.select()}
                                style={{ width: '50px', padding: '5px' }}
                            />
                            <span>reps</span>
                            
                            <input 
                                type="number" 
                                value={set.weight} 
                                onChange={(e) => updateSet(set.id, 'weight', e.target.value)}
                                onFocus={(e) => e.target.select()}
                                style={{ width: '60px', padding: '5px' }}
                            />
                            <span>lbs</span>

                            <button
                                onClick={() => toggleSetDone(set.id)}
                                style={{ background: 'none', border: 'none', color: 'green', cursor: 'pointer'}}
                            >
                                ✓
                            </button>
                        </div>
                        <div style={{ 
                            fontSize: '12px', 
                            color: '#074b94', 
                            marginTop: '5px',
                            fontWeight: 'bold',
                            alignItems: 'center',
                            backgroundColor: 'gray',
                            borderRadius: '4px',
                        }}>
                            {formatTime(set.restTimer)}
                        </div>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => addSet()}
                style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Add Set
            </button>
        </div>
    )
}

export default ExerciseCard;