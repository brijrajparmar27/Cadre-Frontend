import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import Lottie from "lottie-react";
//import useLogin from "../../Hooks/useLogin";
//import useLogout from "../../Hooks/useLogout";
//import useSignup from "../../Hooks/useSignup";
import portrait from "../../assets/images/portrait.jpg";
import garden from "../../assets/images/garden1.jpg";
import garden1 from "../../assets/images/garden2.jpg";
import loader from "../../assets/images/loader.svg";
import "./Auth.css";
import { Outlet, useNavigate } from "react-router";
import animation from "../../assets/Lottie/lottie.json";
import API from "../axios/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoginData } from "../redux/logindataslice";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [data,setdata]=useState({
    email:'',
    password:'',
    name:'',
    role_name:''
  })
  const navigate=useNavigate();
  const dispatch=useDispatch();
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const randome = [portrait,garden, garden1];

  // const { signup, error: SUError, loading: SULoading } = useSignup();
  //const { login, error: LGError, loading: LGLoading } = useLogin();
  //const { logout } = useLogout();

  //const isLoading = () => (SULoading || LGLoading);
  // useEffect(() => {
  //   const intervalId = setTimeout(() => {
  //     let length = randome.length;
  //     if (currentIndex === length - 1) {
  //       setCurrentIndex(0);
  //     }
  //     else {
  //       setCurrentIndex(currentIndex + 1);
  //     }
  //     console.log("inde changed to ", currentIndex);
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  // }, [currentIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    let email = e.target.email.value.trim();
    let password = e.target.password.value.trim();
    if (isLogin) {
      if (isLogin && email.length > 0 && password.length > 0) {
        API.post("user-login", data)
          .then((res) => {
            navigate('dashboard');
            dispatch(setLoginData(res.data));
          })
          .catch((err) => {
            console.log(err);
            toast.error("sucssesfuly login");

          });
      } else {
        console.log("cannot be empty");
      }
    } else {
      let username = e.target.name.value.trim();
      if (email.length > 0 && password.length > 0 && username.length > 0) {
        API.post("user-register", data)
          .then((res) => {
            console.log(res);
            toast.success("sucssesfuly register");
          })
          .catch((err) => {
            console.log(err);
          });
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
  const inputEvent = (e) => {
    const { name, value } = e.target;
    setdata((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
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
        // style={{ backgroundImage: `url("${randome[currentIndex]}")` }}
      >
        <div className="lottie_contain">
          <Lottie animationData={animation} loop={true} />
        </div>
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
                value={data.email}
                onChange={inputEvent}
              />
              <input
                type="password"
                className="password textbox"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={inputEvent}
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
                    value={data.name}
                    onChange={inputEvent}
                  />
                  <select
                    name="role_name"
                    id="cars"
                    className="username textbox"
                    placeholder="select role"
                    onChange={inputEvent}
                    value={data.role_name}
                  >
                    <option value="Sr Devloper">Sr Devloper</option>
                    <option value="Jr devloper">Jr devloper</option>
                    <option value="Admin">Admin</option>
                  </select>
                </>
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
              className="redirect sub_text"
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
