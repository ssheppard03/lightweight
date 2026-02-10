import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.js";

function Dashboard({ onStartWorkout }) {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            const { data, error } = await supabase
                .from('templates')
                .select('*');
            if (error) console.error("Error fetching templates:", error);
            else setTemplates(data);
            console.log("Fetched templates:", data);
        };
        fetchTemplates();
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <button onClick={() => onStartWorkout(null)}> Start Empty Workout </button>

            <h3>Saved Templates</h3>
            {templates.length === 0 ? (
                <p>No templates found. Create a workout and save it as a template!</p>
            ) : (
                <ul>
                    {templates.map(template => (
                        <li key={template.id}>
                            {template.name}
                            <button onClick={() => onStartWorkout(template)}> Start Workout </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;