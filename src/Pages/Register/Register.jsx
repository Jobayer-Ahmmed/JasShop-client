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
import {TbEye, TbEyeClosed} from "react-icons/tb"
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";



const image_upload_key = "a7c057afc407de14aafd26a5cbcd25f3";
const image_upload_api = `https://api.imgbb.com/1/upload?key=a7c057afc407de14aafd26a5cbcd25f3`;


const Register = () => {
  const { createUser, postLocalDataInDB } = useContext(Context);
  const navigate = useNavigate();
  const [passwordVisiblity, setPasswordVisiblity] = useState("password")
  const [confirmPasswordVisiblity, setConfirmPasswordVisiblity] = useState("password")
  const [passwordTrigger, setPasswordTrigger] = useState(false)
  const [confirmPasswordTrigger, setConfirmPasswordTrigger] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    const { email, password, confirm_password, username } = data;
    const imageFile = { image: data.userImage[0] };

    if (password === confirm_password) {
      
      createUser(email, password).then(() => {
          // for image insert in imgbb
          axios.post(image_upload_api, imageFile, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data.data.display_url);
            // for pushing name & image in firebase
            if(res){
              updateProfile(auth.currentUser, {
                displayName: username, 
                photoURL: res.data.data.display_url
                })
              .then(()=>{
                postLocalDataInDB(email)
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Registration successfull",
                  showConfirmButton: false,
                  timer: 1500
                })

                navigate("/")
                
              })
            }

              // pushing data in database

          });


      });
    } else {
      // setIsConfirm(true);
      console.log("Password doesnt match")
    }
  };

  const  handlePassword=()=>{
    
    setPasswordTrigger(!passwordTrigger)
    if(passwordTrigger){
      setPasswordVisiblity("password")
    }
    else{
      setPasswordVisiblity("text")
    }
  }
  const  handleConfirmPassword=()=>{
    console.log(confirmPasswordTrigger)
    setConfirmPasswordTrigger(!confirmPasswordTrigger)
    if(confirmPasswordTrigger){
      setConfirmPasswordVisiblity("password")
    }
    else{
      setConfirmPasswordVisiblity("text")
    }
  }

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
            {...register("username", { required: true })}
            placeholder="Username"
            type="text"
            className="w-64 md:w-80 h-10 px-2 rounded "
          />{" "}
          <br />
          {errors.username && (
            <span className="text-red-700">Username is required</span>
          )}
          <br />
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            type={passwordVisiblity}
            className="w-64 md:w-80 h-10 px-2 rounded "
          />
          <TbEye onClick={handlePassword} className={` inline -ml-7 text-2xl ${passwordTrigger?'hidden':'' }`}/>
          <TbEyeClosed  onClick={handlePassword}  className={`inline -ml-7 text-2xl ${passwordTrigger?'':'hidden' }`}/>
          <br />
          {errors.password && (
            <span className="text-red-700">Password is required</span>
          )}
          <br />
          <input
            {...register("confirm_password", { required: true })}
            placeholder="Confirm Password"
            type={confirmPasswordVisiblity}
            className="w-64 md:w-80 h-10 px-2 rounded"
          />
          <TbEye onClick={handleConfirmPassword} className={` inline -ml-7 text-2xl ${confirmPasswordTrigger?'hidden':'' }`}/>
          <TbEyeClosed  onClick={handleConfirmPassword}  className={`inline -ml-7 text-2xl ${confirmPasswordTrigger?'':'hidden' }`}/>
          <br />
          {errors.confirm_password && (
            <span className="text-red-700">Confirm password is required</span>
          )}{" "}
          <br />
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
            className="w-64 md:w-80 h-10 px-2 rounded"
          />
          <br />
          {errors.email && (
            <span className="text-red-700">Email is required</span>
          )}{" "}
          <br />
          <label htmlFor="">Insert Your Image</label>
          <br />
          <input
            {...register("userImage")}
            type="file"
            className="file-input file-input-bordered w-64 md:w-80 h-10 text-white mb-6"
          />{" "}
          <br />
          <label className="text-xl">
            <LoadCanvasTemplate />
          </label>
          <br />
          <input
            {...register("captcha", { required: true })}
            className=" w-64 h-9 pl-3 text-lg rounded-sm"
            type="text"
            placeholder="Enter Captcha"
          />
          <br />
          <input
            type="submit"
            value="Register"
            className="mt-5 btn bg-cyan-800 text-white"
          />
        </form>
        <p className="mt-8">Already have an account?<Link className="underline" to="/login">Login now</Link></p>
      </div>
    </div>
  );
};

export default Register;
