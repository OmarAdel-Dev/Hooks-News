import React, { useContext, useState } from 'react';
import FirebaseContext from '../../context/Firebase/firebaseContext';

function ForgotPassword() {
  const firebaseContex = useContext(FirebaseContext);

  const { resetPassword } = firebaseContex;

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
