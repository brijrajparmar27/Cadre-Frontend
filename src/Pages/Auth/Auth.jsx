import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
//import useLogin from "../../Hooks/useLogin";
//import useLogout from "../../Hooks/useLogout";
//import useSignup from "../../Hooks/useSignup";
import portrait from "../../assets/images/portrait.jpg";
import garden from "../../assets/images/garden1.jpg";
import garden1 from "../../assets/images/garden2.jpg";
import loader from "../../assets/images/loader.svg";
import "./Auth.css";
import { Outlet } from "react-router";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const randome = [portrait,garden, garden1];

  // const { signup, error: SUError, loading: SULoading } = useSignup();
  //const { login, error: LGError, loading: LGLoading } = useLogin();
  //const { logout } = useLogout();

  //const isLoading = () => (SULoading || LGLoading);
  useEffect(() => {
    const intervalId = setTimeout(() => {
      let length = randome.length;
      if (currentIndex === length - 1) {
        setCurrentIndex(0);
      }
      else {
        setCurrentIndex(currentIndex + 1);
      }
      console.log("inde changed to ", currentIndex);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target.email.value.trim();
    let password = e.target.password.value.trim();
    if (isLogin) {
      if (isLogin && email.length > 0 && password.length > 0) {
        login(email, password);
      } else {
        console.log("cannot be empty");
      }
    } else {
      let username = e.target.username.value.trim();
      if (email.length > 0 && password.length > 0 && username.length > 0) {
        signup({ email: email, pass: password, username: username });
      } else {
        console.log("cannot be empty");
      }
    }
  };

  const formVariant = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
  const inputVariant = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const pageVariant = {
    hide: {
      x: "100vw",
      transition: {
        type: "spring",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    show: {
      x: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      x: "100vw",
      transition: {
        type: "spring",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="auth"
      variants={pageVariant}
      initial="hide"
      animate="show"
      exit="exit"
    >
      <div
        className="left_section"
        style={{ backgroundImage: `url("${randome[currentIndex]}")` }}
      >
        <img src={logo} className="logo_img" />
      </div>
      <div className="right_section">
        <h1
          className="app_title" //onClick={logout}
        >
          Cadre
        </h1>
        <motion.div
          className="right_content"
          variants={formVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="title_contain">
            <h1>{isLogin ? "Login" : "Sign up"}</h1>
            <p>{isLogin ? "Welcome back" : "Lets get you started."}</p>
          </div>
          <div className="form_contain">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="email textbox"
                placeholder="Email"
                name="email"
              />
              <input
                type="password"
                className="password textbox"
                placeholder="Password"
                name="password"
              />
              {!isLogin && (
                <motion.input
                  type="text"
                  className="username textbox"
                  placeholder="Username"
                  name="username"
                  variants={inputVariant}
                  initial="hidden"
                  animate="visible"
                />
              )}
              {/* {(LGError || SUError) && <p className="error_msg">{LGError ? LGError : SUError}</p>} */}
              <button type="submit" className="submit_btn">
                {false ? (
                  <img src={loader} className="loader" alt="loading" />
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
            <p
              className="redirect"
              onClick={() => {
                setIsLogin((prev) => !prev);
              }}
            >
              {isLogin
                ? "Dont have an account? Signup"
                : "Already have an account? Login"}
            </p>
          </div>
        </motion.div>
      </div>
      <Outlet></Outlet>
    </motion.div>
  );
};
export default Auth;
