import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import Lottie from "lottie-react";
import loader from "../../assets/images/loader.svg";
import "./Auth.css";
import animation from "../../assets/Lottie/lottie.json";
import useAuth from "../../Hooks/useAuth";
import Select from "react-select";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(null);
  const { Login, Signup, error, loading, setError } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    let email = e.target.email.value.trim();
    let password = e.target.password.value.trim();

    if (isLogin) {
      if (isLogin && email.length > 0 && password.length > 0) {
        Login({ email, password });
        // console.log({ email, password });
      } else {
        console.log("cannot be empty");
      }
    } else {
      let name = e.target.name.value.trim();
      // let role_name = e.target.role_name.value.trim();
      if (email.length > 0 && password.length > 0 && name.length > 0) {
        Signup({ email, password, name, role_name: role });
        // console.log({ email, password, name, role_name });
      } else {
        setError(" field cannot be empty");
      }
    }
  };
  const options = [
    { value: "Sr Devloper", label: "Sr Devloper" },
    { value: "Jr devloper", label: "Jr devloper" },
  ];

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
      <div className="left_section">
        <div className="lottie_contain">
          <Lottie animationData={animation} loop={true} />
        </div>
        <img src={logo} className="logo_img" />
      </div>
      <div className="right_section">
        <h1 className="app_title gradient-text">Cadre</h1>
        <motion.div
          className="right_content"
          variants={formVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="title_contain">
            <h1>{isLogin ? "Login" : "Sign up"}</h1>
            <p className="sub_text">
              {isLogin ? "Welcome back" : "Lets get you started."}
            </p>
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
                <>
                  <motion.input
                    type="text"
                    className="username textbox"
                    placeholder="Username"
                    name="name"
                    variants={inputVariant}
                    initial="hidden"
                    animate="visible"
                  />
                  {/* <motion.select
                    variants={inputVariant}
                    initial="hidden"
                    animate="visible"
                    name="role_name"
                    id="cars"
                    className="username textbox"
                    placeholder="select role"

                  >
                    <option value="Sr Devloper">Sr Devloper</option>
                    <option value="Jr devloper">Jr devloper</option>
                    <option value="Admin">Admin</option>
                  </motion.select> */}
                  <Select
                    options={options}
                    onChange={(role) => {
                      setRole(role.value);
                    }}
                  />
                </>
              )}
              <p className="error_msg">{error}</p>
              <button type="submit" disabled={loading} className="submit_btn">
                {loading ? (
                  <img src={loader} className="loader" alt="loading" />
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
            <p
              className="redirect sub_text"
              onClick={() => {
                setIsLogin((prev) => !prev);
                setError("");
              }}
            >
              {/* {isLogin ? (
                <span>
                  {" "}
                  Dont have an account?{" "}
                   <span className="link_btn"> Signup</span> 
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <span className="link_btn">Login</span>
                </span>
              )} */}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Auth;
