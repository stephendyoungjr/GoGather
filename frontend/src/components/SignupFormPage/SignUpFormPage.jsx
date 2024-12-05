import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignUpFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password must match Password."
      });
    }
    setErrors({});
    try {
      await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }));
    } catch (res) {
      const data = await res.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        {errors.email && <p>{errors.email}</p>}
        
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        {errors.username && <p>{errors.username}</p>}
        
        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        {errors.firstName && <p>{errors.firstName}</p>}
        
        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        {errors.lastName && <p>{errors.lastName}</p>}
        
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {errors.password && <p>{errors.password}</p>}
        
        <label>Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpFormPage;
