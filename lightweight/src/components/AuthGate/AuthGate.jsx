import { useState } from 'react';
import { supabase } from '../../supabaseClient.js';

export default function AuthGate({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        const { _data, error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else alert('Check your email for a verification link!');
    };

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else onLogin(data.user);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Login or Sign Up</h3>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <div style={{ marginTop: '10px' }}>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    );
}