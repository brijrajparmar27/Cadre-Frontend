import API from "../Pages/axios/axios";
import { useDispatch } from "react-redux";
import { setLoginData } from "../Pages/redux/logindataslice";
import { toast } from "react-toastify";

const useAuth = () => {
  const dispatch = useDispatch();

  const Login = (data) => {
    API.post("user-login", data)
      .then((res) => {
        // navigate("dashboard");
        dispatch(setLoginData(res.data));
      })
      .catch((err) => {
        console.log(err);
        toast.error("sucssesfuly login");
      });
  };
  const Signup = (data) => {
    API.post("user-register", data)
      .then((res) => {
        console.log(res);
        dispatch(setLoginData(res.data));
        toast.success("sucssesfuly register");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { Login, Signup };
};

export default useAuth;
