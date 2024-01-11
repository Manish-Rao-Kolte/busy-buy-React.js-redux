import { useState } from "react";
import styles from "./RegisterUser.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserAsync } from "../../../redux/reducers/authReducer";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";

const RegisterUser = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(createUserAsync(user));
    setUser({ name: "", email: "", password: "" });
  };

  return (
    <>
      {/* {loading && (
        <Backdrop
          sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )} */}
      <form className={styles.formContainer} onSubmit={(e) => handleSignUp(e)}>
        <h2 className={styles.formHeader}>Sign Up!</h2>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Enter Name"
          value={user.name}
          required
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
        />
        <input
          className={styles.formInput}
          type="email"
          placeholder="Enter Email"
          value={user.email}
          required
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
        />
        <input
          className={styles.formInput}
          type="password"
          placeholder="Enter Password"
          value={user.password}
          required
          onChange={(e) =>
            setUser({
              ...user,
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
