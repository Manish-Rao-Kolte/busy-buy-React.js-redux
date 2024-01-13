import { useState } from "react";
import styles from "./RegisterUser.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../../../redux/reducers/authReducer";
import {
  loadingSelector,
  setLoadingTrue,
} from "../../../redux/reducers/loadingReducer";

const RegisterUser = () => {
  const [userCred, setUserCred] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setUserCred({ name: "", email: "", password: "" });
    dispatch(setLoadingTrue());
    dispatch(createUserAsync(userCred)).then((data) => {
      const user = data.payload;
      navigate(`/user/${user.uid}`);
    });
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={(e) => handleSignUp(e)}>
        <h2 className={styles.formHeader}>Sign Up!</h2>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Enter Name"
          value={userCred.name}
          required
          onChange={(e) =>
            setUserCred({
              ...userCred,
              name: e.target.value,
            })
          }
        />
        <input
          className={styles.formInput}
          type="email"
          placeholder="Enter Email"
          value={userCred.email}
          required
          onChange={(e) =>
            setUserCred({
              ...userCred,
              email: e.target.value,
            })
          }
        />
        <input
          className={styles.formInput}
          type="password"
          placeholder="Enter Password"
          value={userCred.password}
          required
          onChange={(e) =>
            setUserCred({
              ...userCred,
              password: e.target.value,
            })
          }
        />
        <button type="submit" className={styles.formBtn}>
          {" "}
          Sign Up{" "}
        </button>
        <p>
          Already have an account?{" "}
          <Link className={styles.linkBtn} to="/login">
            {" "}
            Sign In{" "}
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterUser;
