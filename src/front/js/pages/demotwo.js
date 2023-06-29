import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Demotwo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreated, setUserCreated] = useState(false);
  const [headerText, setHeaderText] = useState('CREATE USER');
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (userCreated) {
      navigate("/");
    }
  }, [userCreated]);

  function sendData(e) {
    e.preventDefault();
    console.log('send Data');
    console.log(email, password);
    actions.signup(email, password);

      setUserCreated(true); 
      setHeaderText('USER CREATED');

  }

  function resetForm() {
    setEmail('');
    setPassword('');
    setUserCreated(false);
    setHeaderText('CREATE USER');
  }

  return (
    <>
      {!store.auth &&
        <>
          <form className="row g-3" onSubmit={sendData}>
            <h1>{headerText}</h1>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail4" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword4" />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-warning">Sign UP</button>
            </div>
          </form>
          {userCreated && (
            <button type="button" className="btn btn-primary" onClick={resetForm}>
              Crear otro usuario
            </button>
          )}
            <Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
        </>
      }
    </>
  );
};

export default Demotwo;
