import { useState } from "react";
import styles from "../signUp/RegisterUser.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  signinUserAsync,
} from "../../../redux/reducers/authReducer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  loadingSelector,
  toggleLoading,
} from "../../../redux/reducers/loadingReducer";

const LoginUser = () => {
  const [userCred, setUserCred] = useState({ email: "", password: "" });
  const { loading } = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signinUserAsync(userCred)).then((data) => {
      const user = data.payload;
      navigate(`/user/${user.uid}`);
    });
    setUserCred({ email: "", password: "" });
  };

  return (
    <div className={styles.container}>
      {loading && (
        <Backdrop
          sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <form className={styles.formContainer} onSubmit={(e) => handleSignIn(e)}>
        <h2 className={styles.formHeader}>Sign In!</h2>
        <input
          className={styles.formInput}
          type="email"
          placeholder="Enter Email"
          value={userCred.email}
          required
          onChange={(e) => setUserCred({ ...userCred, email: e.target.value })}
        />
        <input
          className={styles.formInput}
          type="password"
          placeholder="Enter Password"
          value={userCred.password}
          required
          onChange={(e) =>
            setUserCred({ ...userCred, password: e.target.value })
          }
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
