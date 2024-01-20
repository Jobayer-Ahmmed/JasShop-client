import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";

const image_upload_key = import.meta.env.VITE_image_uploaded_key
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const Register = () => {
  const { createUser, postLocalDataInDB } = useContext(Context);
  const navigate = useNavigate();
  const [passwordVisiblity, setPasswordVisiblity] = useState("password");
  const [confirmPasswordVisiblity, setConfirmPasswordVisiblity] =
    useState("password");
  const [passwordTrigger, setPasswordTrigger] = useState(false);
  const [confirmPasswordTrigger, setConfirmPasswordTrigger] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getCaptcha = watch("captcha");

  const onSubmit = (data) => {
    const { email, password, confirm_password, username } = data;
    const imageFile = { image: data.userImage[0] };

    if (password === confirm_password) {
      if (validateCaptcha(getCaptcha)) {
        console.log("captha is successfull");
        createUser(email, password).then(() => {
          // for image insert in imgbb
          axios
            .post(image_upload_api, imageFile, {
              headers: {
                "content-type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res.data.data.display_url);
              // for pushing name & image in firebase
              if (res) {
                updateProfile(auth.currentUser, {
                  displayName: username,
                  photoURL: res.data.data.display_url,
                }).then(() => {
                  postLocalDataInDB(email);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration successfull",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  navigate("/");
                });
              }

              // pushing data in database
            });
        });
      }
    } else {
      // setIsConfirm(true);
      console.log("Password doesnt match");
    }
  };

  const handlePassword = () => {
    setPasswordTrigger(!passwordTrigger);
    if (passwordTrigger) {
      setPasswordVisiblity("password");
    } else {
      setPasswordVisiblity("text");
    }
  };
  const handleConfirmPassword = () => {
    console.log(confirmPasswordTrigger);
    setConfirmPasswordTrigger(!confirmPasswordTrigger);
    if (confirmPasswordTrigger) {
      setConfirmPasswordVisiblity("password");
    } else {
      setConfirmPasswordVisiblity("text");
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing function for the animation
    });
  }, []);

  return (
    <div className="py-yPadding flex justify-center " data-aos="fade-left">
      <div className="p-10 border rounded-lg shadow-xl">
        <h2 className="text-2xl font-medium pb-3 border-b mb-5">
          Registraion Now
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
            })}
            className="w-64 md:w-80 h-10 px-2 rounded "
          />
          {errors.username && (
            <p className="text-red-700">{errors.username.message}</p>
          )}
          <br />
          <input
            
            type={passwordVisiblity}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
            className="w-64 md:w-80 h-10 px-2 rounded mt-2"
          />
          <TbEye
            onClick={handlePassword}
            className={` inline -ml-7 text-2xl ${
              passwordTrigger ? "hidden" : ""
            }`}
          />
          <TbEyeClosed
            onClick={handlePassword}
            className={`inline -ml-7 text-2xl ${
              passwordTrigger ? "" : "hidden"
            }`}
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
          <br />
          <input
            
            type={confirmPasswordVisiblity}
            placeholder="Confirm Password"
            {...register("confirm_password", {
              required: "Confirm Password is required",
              minLength: {
                value: 6,
                message: "Confirm Password must be at least 6 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Confirm Password must contain at least one letter and one number",
              },
            })}
            className="w-64 md:w-80 h-10 px-2 rounded mt-2"
          />
          <TbEye
            onClick={handleConfirmPassword}
            className={` inline -ml-7 text-2xl ${
              confirmPasswordTrigger ? "hidden" : ""
            }`}
          />
          <TbEyeClosed
            onClick={handleConfirmPassword}
            className={`inline -ml-7 text-2xl ${
              confirmPasswordTrigger ? "" : "hidden"
            }`}
          />
          {errors.password && (
            <p className="text-red-700">{errors.confirm_password.message}</p>
          )}
          <br />
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-64 md:w-80 h-10 px-2 rounded  mt-2"
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
          <br />
          <p className="mt-2 -mb-6" htmlFor="">Insert Your Image</p>
          <br />
          <input
            type="file"
            {...register("userImage", {
            })}
            className="file-input file-input-bordered w-64 md:w-80 h-10 text-white"
          />

          <br />
          <div className="text-xl mt-3">
            <LoadCanvasTemplate />
          </div>
          <br />
          <input
            {...register("captcha", { required: true })}
            className=" w-64 h-9 pl-3 text-lg rounded-sm -mt-4"
            type="text"
            placeholder="Enter Captcha"
          />
          <br />
          <input
            type="submit"
            value="Register"
            className="mt-10 btn bg-cyan-800 text-white"
          />
        </form>
        <p className="mt-8">
          Already have an account?
          <Link className="underline" to="/login">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
