import React, { useContext, useState } from 'react';
import AuthContext from '../../context/Auth/authContext';

function ForgotPassword() {
  const authContext = useContext(AuthContext);

  const { resetPassword } = authContext;

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isReset, setIsReset] = useState(false);

  const handleReset = async () => {
    try {
      await resetPassword(email);
      setIsReset(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide account email address"
        onChange={event => setEmail(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleReset}>
          Reset Password
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
      {isReset && <p>Check email to reset password</p>}
    </div>
  );
}

export default ForgotPassword;
