import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../Store/AuthSlice";
import { useForm } from "react-hook-form";
import CountDown, { zeroPad } from "react-countdown";
function VerifyEmail() {
  const [eror, seterror] = useState();
  const [mailedtoken, setToken] = useState(null);
  const [Resend, setResend] = useState();
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const verifyToken = ({ token }) => {
    console.log("my token is", token.length);

    // if (token !== mailedtoken) {
    //   console.log("token not matched");
    //   seterror("ENTER THE CORRECT TOKEN");
    // }
    if (token.length < 6) {
      seterror("token must be of 6 digit");
    }
    if(!userdata.password){
      navigate("/reset-password")
    }
    axios
      .post("http://localhost:4000/api/v1/users/signup", userdata)
      .then((res) => {
        dispatch(logout());
        console.log(res);
        dispatch(login(res.data));
        navigate("/")
      })
      .catch((err) => {
        console.log(`error occured on signup time ${err}`);
        console.log(userdata);
      });
  };
  const sendmail = async () => {
    axios
      .post("http://localhost:4000/api/v1/users/emailverify", {
        email: userdata.email, Emailtype : userdata.password ?"verifyEmail":"forgotPassword"
      })
      .then((res) => {
        setToken(res.data);
      })
      .catch((err) => {
        console.log(`error occured on sending email ${err}`);
      });
  };
  useEffect(() => {
    console.log(userdata);
    setTimeout(sendmail, 2000);
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
        <CountDown
          daysInHours={true}
          zeroPadTime={1}
          zeroPadDays={0}
          date={Date.now() + 58999}
        >
          <a className="font-semibold underline float-end" onClick={sendmail}>
            Resend code
          </a>
        </CountDown>
        <button
          type="submit"
          className="px-4 bg-red-600 text-white  p-2 rounded-lg w-full"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default VerifyEmail;
