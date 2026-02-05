import WorkoutSession from './components/WorkoutSession/WorkoutSession.jsx'
import './App.css'

function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Lightweight</h1>
      <WorkoutSession name="Morning Workout" />
    </div>
  )
}

export default App
