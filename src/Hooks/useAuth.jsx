import API from "../Pages/axios/axios";
import { useDispatch } from "react-redux";
import { setLoginData } from "../Pages/redux/logindataslice";
import { toast} from "react-toastify";
import { useState } from "react";

const useAuth = () => {
  const [error,setError]=useState();
  const [loading,setLoding]=useState(false);
  const dispatch = useDispatch();

  const Login = (data) => {
    setLoding(true);
    API.post("user-login", data)
      .then((res) => {
        setLoding(false);
        dispatch(setLoginData(res.data));
        toast.success('successfully Login');
      })
      .catch((err) => {
        setError(err.response.data.message)
        setLoding(false);
        toast.error(err.response.data.message);
      });
  };
  const Signup = (data) => {
    try{
      const res=API.post("user-register", data)
      return res
    }catch(err){
      console.log(err);
    }
    // API.post("user-register", data)
    //   .then((res) => {
    //    // dispatch(setLoginData(res.data));
    //     toast.success("successfully register");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const Logout = () => {
    dispatch(setLoginData(null));
  };
  return { Login, Signup, Logout,error,loading,setError };
};

export default useAuth;
