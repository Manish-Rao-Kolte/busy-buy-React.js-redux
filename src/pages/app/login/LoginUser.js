import { useState } from "react";
import styles from "../signUp/RegisterUser.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signinUserAsync } from "../../../redux/reducers/authReducer";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";

const LoginUser = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const loading = false;
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signinUserAsync(user));
    setUser({ email: "", password: "" });
  };

  return (
    <div className={styles.container}>
      {/* {loading && (
        <Backdrop
          sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )} */}
      <form className={styles.formContainer} onSubmit={(e) => handleSignIn(e)}>
        <h2 className={styles.formHeader}>Sign In!</h2>
        <input
          className={styles.formInput}
          type="email"
          placeholder="Enter Email"
          value={user.email}
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className={styles.formInput}
          type="password"
          placeholder="Enter Password"
          value={user.password}
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button disabled={loading} className={styles.formBtn}>
          {" "}
          Sign In{" "}
        </button>
        <p>
          Don't have an account?{" "}
          <Link className={styles.linkBtn} to="/signup">
            {" "}
            Sign Up{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginUser;
