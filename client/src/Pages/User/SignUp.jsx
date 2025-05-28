// import React, { useState } from "react";
// import { BsArrowRight, BsPersonCircle } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { isPassword, isEmail } from '../../Helpers/regxMatcher.js';
// import { createUserAccount, createCustomer } from "../../Redux/Slices/authSlice.js";

// const SignUp = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [previewImage, setPreviewImage] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [signUpData, setSignUpData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     photo: "",
//     role: "Customer",
//   });

//   function handleUserInput(e) {
//     const { name, value } = e.target;
//     setSignUpData({
//       ...signUpData,
//       [name]: value,
//     });
//   }

//   function getImage(event) {
//     event.preventDefault();
//     const uploadedImage = event.target.files[0];
//     if (uploadedImage) {
//       setSignUpData({
//         ...signUpData,
//         photo: uploadedImage,
//       });
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(uploadedImage);
//       fileReader.addEventListener("load", function () {
//         setPreviewImage(this.result);
//       });
//     }
//   }
// async function createNewAccount(e) {
//   e.preventDefault();
//   if (isSubmitting) return;
//   setIsSubmitting(true);

//   if (!signUpData?.fullName || !signUpData?.email || !signUpData?.password || !signUpData?.photo) {
//     toast.error("All fields are required");
//     setIsSubmitting(false);
//     return;
//   }

//   if (signUpData.fullName.length < 5) {
//     toast.error("Name should be more than 5 characters");
//     setIsSubmitting(false);
//     return;
//   }

//   if (!isEmail(signUpData.email)) {
//     toast.error("Please enter a valid email");
//     setIsSubmitting(false);
//     return;
//   }

//   if (!isPassword(signUpData.password)) {
//     toast.error(
//       "Password should be 6 - 16 characters long with at least a number and special character"
//     );
//     setIsSubmitting(false);
//     return;
//   }

//   const formData = new FormData();
//   formData.append("name", signUpData.fullName);
//   formData.append("email", signUpData.email);
//   formData.append("password", signUpData.password);
//   formData.append("photo", signUpData.photo);
//   formData.append("role", signUpData.role);

//   // Log FormData contents and photo details
//   console.log("FormData contents:", Object.fromEntries(formData));
//   console.log("Photo details:", {
//     name: signUpData.photo.name,
//     size: signUpData.photo.size,
//     type: signUpData.photo.type,
//   });

//   try {
//     const userCreationResult = await dispatch(createUserAccount(formData)).unwrap();

//     if (userCreationResult?.success) {
//       setSignUpData({
//         fullName: "",
//         email: "",
//         password: "",
//         photo: "",
//         role: "Customer",
//       });
//       setPreviewImage("");
//       toast.success("Account created successfully!");

//       if (signUpData.role === "DeliveryMan") {
//         if (!phoneNumber) {
//           toast.error("Enter phone number");
//           setIsSubmitting(false);
//           return;
//         } else {
//           navigate("/select/Restaurants", {
//             state: { phoneNumber: phoneNumber },
//           });
//           setPhoneNumber("");
//         }
//       } else if (signUpData.role === "Customer") {
//         try {
//           const customerCreationResult = await dispatch(createCustomer()).unwrap();
//           if (customerCreationResult?.success) {
//             navigate("/");
//           }
//         } catch (error) {
//           console.error("Error creating customer profile:", error);
//           toast.error("Failed to create customer profile.");
//         }
//       } else if (signUpData.role === "Restaurant") {
//         navigate("/create/Restaurant");
//       } else {
//         navigate("/");
//       }
//     }
//   } catch (error) {
//     console.error("Error creating account:", error);
//     const errorMessage = error || "Failed to create account";
//     if (errorMessage.includes("User already exists")) {
//       toast.error("This email is already registered. Try a different email or log in.", {
//         action: {
//           text: "Log In",
//           onClick: () => navigate("/login"),
//         },
//       });
//     } else {
//       toast.error(`Error creating account: ${errorMessage}`);
//     }
//   } finally {
//     setIsSubmitting(false);
//   }
// }

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
//       }}
//     >
//       <div className="w-full max-w-md backdrop-blur-md bg-white/30 rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center mb-6 text-white">Sign Up</h2>
//         <form onSubmit={createNewAccount}>
//           <div className="mb-4">
//             <div className="mt-2 flex justify-center">
//               <label htmlFor="image_uploads" className="cursor-pointer">
//                 {previewImage ? (
//                   <img className="w-32 h-32 rounded-full" src={previewImage} alt="Profile" />
//                 ) : (
//                   <BsPersonCircle className="w-32 h-32 text-white" />
//                 )}
//               </label>
//               <input
//                 className="hidden"
//                 type="file"
//                 name="image_uploads"
//                 id="image_uploads"
//                 accept=".jpg, .jpeg, .png, .svg"
//                 onChange={getImage}
//                 required
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-white">Full Name</label>
//             <input
//               type="text"
//               className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
//               placeholder="Enter your full name"
//               name="fullName"
//               value={signUpData.fullName}
//               onChange={handleUserInput}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-white">Email address</label>
//             <input
//               type="email"
//               className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
//               placeholder="Enter your email"
//               name="email"
//               value={signUpData.email}
//               onChange={handleUserInput}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-white">Password</label>
//             <input
//               type="password"
//               className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
//               placeholder="Enter your password"
//               name="password"
//               value={signUpData.password}
//               onChange={handleUserInput}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-white">Role</label>
//             <div className="mt-2">
//               <select
//                 name="role"
//                 value={signUpData.role}
//                 onChange={handleUserInput}
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
//               >
//                 <option value="Customer">Customer</option>
//                 <option value="Restaurant">Restaurant</option>
//                 <option value="DeliveryMan">Delivery Boy</option>
//               </select>
//             </div>
//           </div>
//           {signUpData.role === "DeliveryMan" && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-white">Phone Number</label>
//               <input
//                 type="number"
//                 className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
//                 placeholder="Enter your phone number"
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//             </div>
//           )}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Creating Account..." : "Create Account"} <BsArrowRight className="ml-2 w-5 h-5" />
//           </button>
//         </form>
//         <p className="text-center text-sm text-white mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="underline text-white font-medium">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;






import React, { useState } from "react";
import { BsArrowRight, BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { isPassword, isEmail } from '../../Helpers/regxMatcher.js';
import { createUserAccount, createCustomer } from "../../Redux/Slices/authSlice.js";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    photo: "",
    role: "Customer",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    console.log()
    setSignUpData({
      ...signUpData,
      [name]: value,
      
    });
  }

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setSignUpData({
        ...signUpData,
        photo: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }
  async function createNewAccount(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!signUpData?.fullName || !signUpData?.email || !signUpData?.password || !signUpData?.photo) {
      toast.error("All fields are required");
      setIsSubmitting(false);
      return;
    }

    if (signUpData.fullName.length < 5) {
      toast.error("Name should be more than 5 characters");
      setIsSubmitting(false);
      return;
    }

    if (!isEmail(signUpData.email)) {
      toast.error("Please enter a valid email");
      setIsSubmitting(false);
      return;
    }

    if (!isPassword(signUpData.password)) {
      toast.error(
        "Password should be 6 - 16 characters long with at least a number and special character"
      );
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", signUpData.fullName);
    formData.append("email", signUpData.email);
    formData.append("password", signUpData.password);
    formData.append("photo", signUpData.photo);
    formData.append("role", signUpData.role);

    // Log FormData contents and photo details
    console.log("FormData contents:", Object.fromEntries(formData));
    console.log("Photo details:", {
      name: signUpData.photo.name,
      size: signUpData.photo.size,
      type: signUpData.photo.type,
    });

    try {
      const userCreationResult = await dispatch(createUserAccount(formData)).unwrap();

      if (userCreationResult?.success) {
        setSignUpData({
          fullName: "",
          email: "",
          password: "",
          photo: "",
          role: "Customer",
        });
        setPreviewImage("");
        toast.success("Account created successfully!");

        if (signUpData.role === "DeliveryMan") {
          if (!phoneNumber) {
            toast.error("Enter phone number");
            setIsSubmitting(false);
            return;
          } else {
            navigate("/select/Restaurants", {
              state: { phoneNumber: phoneNumber },
            });
            setPhoneNumber("");
          }
        } else if (signUpData.role === "Customer") {
          try {
            const customerCreationResult = await dispatch(createCustomer()).unwrap();
            if (customerCreationResult?.success) {
              navigate("/");
            }
          } catch (error) {
            console.error("Error creating customer profile:", error);
            toast.error("Failed to create customer profile.");
          }
        } else if (signUpData.role === "Restaurant") {
          navigate("/create/Restaurant");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error creating account:", error);
      const errorMessage = error || "Failed to create account";
      if (errorMessage.includes("User already exists")) {
        toast.error("This email is already registered. Try a different email or log in.", {
          action: {
            text: "Log In",
            onClick: () => navigate("/login"),
          },
        });
      } else {
        toast.error(`Error creating account: ${errorMessage}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="w-full max-w-md backdrop-blur-md bg-white/30 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Sign Up</h2>
        <form onSubmit={createNewAccount}>
          <div className="mb-4">
            <div className="mt-2 flex justify-center">
              <label htmlFor="image_uploads" className="cursor-pointer">
                {previewImage ? (
                  <img className="w-32 h-32 rounded-full" src={previewImage} alt="Profile" />
                ) : (
                  <BsPersonCircle className="w-32 h-32 text-white" />
                )}
              </label>
              <input
                className="hidden"
                type="file"
                name="image_uploads"
                id="image_uploads"
                accept=".jpg, .jpeg, .png, .svg"
                onChange={getImage}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your full name"
              name="fullName"
              value={signUpData.fullName}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Email address</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your email"
              name="email"
              value={signUpData.email}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your password"
              name="password"
              value={signUpData.password}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Role</label>
            <div className="mt-2">
              <select
                name="role"
                value={signUpData.role}
                onChange={handleUserInput}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="Customer">Customer</option>
                <option value="Restaurant">Restaurant</option>
                <option value="DeliveryMan">Delivery Boy</option>
              </select>
            </div>
          </div>
          {signUpData.role === "DeliveryMan" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Phone Number</label>
              <input
                type="number"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your phone number"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"} <BsArrowRight className="ml-2 w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-sm text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline text-white font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;