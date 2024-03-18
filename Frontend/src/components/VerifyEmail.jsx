import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Store/AuthSlice";
import  {useForm} from "react-hook-form";
function VerifyEmail() {
  const [eror, seterror] = useState();
  const [mailedtoken, setToken] = useState(44464);
  const [Resend, setResend] = useState();
 const {handleSubmit,register} = useForm()
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.Auth.user);

  const verifyToken = ({token}) => {
    console.log("my token is", token.length);
    
    // if (token !== mailedtoken) {
      //   console.log("token not matched");
      //   seterror("ENTER THE CORRECT TOKEN");
      // }
      if (token.length < 6) {
        seterror("token must be of 6 digit");
      }
      
    axios
      .post("http://localhost:4000/api/v1/users/signup", { userdata })
      .then((res) => {
        dispatch(logout());
        console.log(res);
        dispatch(login(res.data));
      })
      .catch((err) => {
        console.log(`error occured on signup time ${err}`);
      });
  };
  useEffect(() => {
  console.log(userdata);
    setTimeout(async () => {
      axios
        .post("http://localhost:4000/api/v1/users/emailverify", { email: userdata.email })
        .then((res) => {
          setToken(res.data);
        })
        .catch((err) => {
          console.log(`error occured on sending email ${err}`);
        });
      //  console.log("email sended sucessfully");
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(verifyToken)}
        className="flex w-full flex-col  justify-around items-center"
      >
        <Input
          maxLength={6}
          placeholder="enter the token "
          className="w-[390px]"
          {...register("token", { required: true })}
        />
        {eror ? <div className="text-red-400">{eror}</div> : null}
        <button type="submit" className="px-4 bg-red-600 text-white text-2xl rounded-lg w-full">
          Verify
        </button>
      </form>
    </div>
  );
}

export default VerifyEmail;
