import WorkoutSession from './components/WorkoutSession/WorkoutSession.jsx'
import AuthGate from './components/AuthGate/AuthGate.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import { supabase } from './supabaseClient.js';
import { useState, useEffect } from 'react';
import './App.css'


function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workoutTemplate, setWorkoutTemplate] = useState(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  const startWorkout = (template) => {
    setWorkoutTemplate(template);
    setIsWorkoutActive(true);
  }

  const goHome = () => {
    setIsWorkoutActive(false);
    setWorkoutTemplate(null);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // listener for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      {!session ? (
        <AuthGate />
      ) : (
        <>
          <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <button onClick={goHome}>Home</button>
            <button onClick={() => supabase.auth.signOut()}>Logout</button>
          </nav>
          <div>
            {!isWorkoutActive ? (
              <Dashboard onStartWorkout={startWorkout} />
            ) : (
              <WorkoutSession 
                template={workoutTemplate} 
                onCancel={() => setIsWorkoutActive(false)} 
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
