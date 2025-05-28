



// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { 
//   FaShoppingCart, 
//   FaUtensils, 
//   FaHamburger, 
//   FaPizzaSlice, 
//   FaIceCream,
//   FaMotorcycle 
// } from "react-icons/fa";
// import { FiLogOut, FiUser, FiHome, FiInfo, FiMail, FiShoppingBag } from "react-icons/fi";
// import { GiFullPizza, GiSodaCan, GiChickenOven } from "react-icons/gi";
// import { logout } from "../Redux/Slices/authSlice";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoggedIn, role, data } = useSelector((state) => state.auth);
//   const { restaurantData } = useSelector((state) => state.restaurant);
//   const { cartItems } = useSelector((state) => state.cart);
  
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const profileRef = useRef(null);
//   const [logoHover, setLogoHover] = useState(false);
  
//   const foodIcons = useRef([
//     <FaHamburger key="burger" />,
//     <FaPizzaSlice key="pizza" />,
//     <GiFullPizza key="fullpizza" />,
//     <FaIceCream key="icecream" />,
//     <GiSodaCan key="soda" />,
//     <GiChickenOven key="chicken" />
//   ]).current;
//   const [currentFoodIcon, setCurrentFoodIcon] = useState(0);

//   // Rotate food icons every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentFoodIcon((prev) => (prev + 1) % foodIcons.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [foodIcons.length]);

//   const handleLogout = async () => {
//     try {
//       await dispatch(logout()).unwrap();
//       setProfileMenuOpen(false);
//       setMobileMenuOpen(false);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const restaurantExists = (userId) => {
//     return restaurantData?.some((res) => res?.user_id === userId) ?? false;
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen((prev) => !prev);
//   };

//   const toggleProfileMenu = () => {
//     setProfileMenuOpen((prev) => !prev);
//   };

//   // Close profile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Calculate cart items count
//   const cartCount = cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;

//   return (
//     <header className="bg-gradient-to-r from-orange-900 via-orange-800 to-amber-900 text-white shadow-xl sticky top-0 z-50 border-b border-amber-400/20">
//       {/* Animated food particles background */}
//       <div className="absolute inset-0 overflow-hidden opacity-10">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-amber-400"
//             initial={{
//               scale: 0,
//               opacity: 0,
//               x: `${Math.random() * 100}%`,
//               y: `${Math.random() * 100}%`,
//               rotate: Math.random() * 360
//             }}
//             animate={{
//               scale: [0, 1, 0],
//               opacity: [0, 0.7, 0],
//               rotate: Math.random() * 360
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               repeatType: "loop",
//               delay: Math.random() * 5
//             }}
//           >
//             {foodIcons[Math.floor(Math.random() * foodIcons.length)]}
//           </motion.div>
//         ))}
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo section */}
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex-shrink-0"
//           >
//             <Link 
//               to="/" 
//               className="flex items-center space-x-2"
//               onMouseEnter={() => setLogoHover(true)}
//               onMouseLeave={() => setLogoHover(false)}
//             >
//               <motion.div
//                 animate={{
//                   scale: logoHover ? [1, 1.1, 1] : 1,
//                   rotate: logoHover ? [0, 10, -10, 0] : 0
//                 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg"
//               >
//                 <AnimatePresence mode="wait">
//                   <motion.span
//                     key={currentFoodIcon}
//                     initial={{ scale: 0.5, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 0.5, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {foodIcons[currentFoodIcon]}
//                   </motion.span>
//                 </AnimatePresence>
//               </motion.div>
//               <motion.span 
//                 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 HungryHighway
//               </motion.span>
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-1">
//             <NavLink to="/" icon={<FiHome />} text="Home" />
//             <NavLink to="/menu" icon={<FaUtensils />} text="Menu" />
//             <NavLink to="/about" icon={<FiInfo />} text="About" />
//             <NavLink to="/about#contactsection" icon={<FiMail />} text="Contact" />
//             {role !== "Restaurant" && role !== "DeliveryMan" && <CartIcon count={cartCount} />}
//           </nav>

//           {/* Profile/Auth Section */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isLoggedIn ? (
//               <div className="relative" ref={profileRef}>
//                 <motion.button
//                   onClick={toggleProfileMenu}
//                   className="flex items-center space-x-2 focus:outline-none group"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <div className="relative">
//                     {data?.photo?.photoUrl ? (
//                       <motion.img
//                         src={data.photo.photoUrl}
//                         alt="User profile"
//                         className="w-9 h-9 rounded-full border-2 border-amber-400/50 object-cover shadow-md hover:border-amber-400 transition-all duration-300"
//                         whileHover={{ scale: 1.1 }}
//                       />
//                     ) : (
//                       <motion.div 
//                         className="w-9 h-9 rounded-full bg-orange-900 flex items-center justify-center border-2 border-amber-400/50 hover:border-amber-400 transition-all duration-300"
//                         whileHover={{ rotate: 20 }}
//                       >
//                         <FiUser className="text-amber-200" />
//                       </motion.div>
//                     )}
//                   </div>
//                   <motion.span 
//                     className="text-amber-100 group-hover:text-white transition-colors"
//                     whileHover={{ x: 5 }}
//                   >
//                     {data?.name || "Profile"}
//                   </motion.span>
//                 </motion.button>

//                 <AnimatePresence>
//                   {profileMenuOpen && (
//                     <motion.ul
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-2 w-56 bg-orange-900 shadow-2xl rounded-lg py-1 z-50 border border-amber-400/20"
//                     >
//                       <ProfileMenuItem to="/profile" icon={<FiUser />} text="My Profile" />
//                       {role === "Restaurant" && !restaurantExists(data?._id) && (
//                         <ProfileMenuItem 
//                           to="/create/Restaurant" 
//                           icon={<FaUtensils />} 
//                           text="Add Restaurant" 
//                         />
//                       )}
//                       {role === "DeliveryMan" && (
//                         <ProfileMenuItem 
//                           to="/delivery" 
//                           icon={<FaMotorcycle />} 
//                           text="Delivery Dashboard" 
//                         />
//                       )}
//                       <ProfileMenuItem 
//                         to="/myorder" 
//                         icon={<FiShoppingBag />} 
//                         text="My Orders" 
//                       />
//                       <div className="border-t border-amber-400/20 my-1" />
//                       <li>
//                         <motion.button
//                           onClick={handleLogout}
//                           className="flex items-center px-4 py-2 text-sm text-red-300 hover:bg-orange-800 w-full text-left transition-colors"
//                           whileHover={{ x: 5 }}
//                         >
//                           <FiLogOut className="mr-3" />
//                           Logout
//                         </motion.button>
//                       </li>
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <AuthButtons />
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             {role !== "Restaurant" && role !== "DeliveryMan" && (
//               <div className="mr-4">
//                 <CartIcon count={cartCount} />
//               </div>
//             )}
//             <motion.button
//               onClick={toggleMobileMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-amber-200 hover:text-white hover:bg-orange-700 focus:outline-none"
//               aria-expanded={mobileMenuOpen}
//               whileTap={{ scale: 0.9 }}
//             >
//               <span className="sr-only">Open main menu</span>
//               <AnimatePresence mode="wait" initial={false}>
//                 {mobileMenuOpen ? (
//                   <motion.svg
//                     key="close"
//                     initial={{ rotate: 180, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: -180, opacity: 0 }}
//                     className="h-6 w-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </motion.svg>
//                 ) : (
//                   <motion.svg
//                     key="menu"
//                     initial={{ rotate: -180, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 180, opacity: 0 }}
//                     className="h-6 w-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   </motion.svg>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-orange-900/95 backdrop-blur-sm overflow-hidden"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <MobileNavLink to="/" icon={<FiHome />} text="Home" />
//               <MobileNavLink to="/menu" icon={<FaUtensils />} text="Menu" />
//               <MobileNavLink to="/about" icon={<FiInfo />} text="About" />
//               <MobileNavLink to="/about#contactsection" icon={<FiMail />} text="Contact" />
              
//               {isLoggedIn ? (
//                 <>
//                   <MobileNavLink to="/profile" icon={<FiUser />} text="Profile" />
//                   {role === "Restaurant" && !restaurantExists(data?._id) && (
//                     <MobileNavLink 
//                       to="/create/Restaurant" 
//                       icon={<FaUtensils />} 
//                       text="Add Restaurant" 
//                     />
//                   )}
//                   {role === "DeliveryMan" && (
//                     <MobileNavLink 
//                       to="/delivery" 
//                       icon={<FaMotorcycle />} 
//                       text="Delivery Dashboard" 
//                     />
//                   )}
//                   <MobileNavLink to="/myorder" icon={<FiShoppingBag />} text="My Orders" />
//                   <motion.button
//                     onClick={handleLogout}
//                     className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-orange-800"
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <FiLogOut className="mr-3" />
//                     Logout
//                   </motion.button>
//                 </>
//               ) : (
//                 <div className="pt-4 pb-2 border-t border-amber-400/20">
//                   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                     <Link
//                       to="/login"
//                       className="block w-full px-4 py-2 text-center rounded-md bg-orange-800 text-white mb-2 hover:bg-orange-700 transition-colors"
//                     >
//                       Login
//                     </Link>
//                   </motion.div>
//                   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                     <Link
//                       to="/signup"
//                       className="block w-full px-4 py-2 text-center rounded-md bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition-colors"
//                     >
//                       Sign Up
//                     </Link>
//                   </motion.div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// // Reusable Components
// const NavLink = ({ to, icon, text }) => (
//   <Link
//     to={to}
//     className="px-3 py-2 rounded-md text-sm font-medium text-amber-100 hover:text-white flex items-center nav-link transition-colors"
//   >
//     <motion.span className="mr-2" whileHover={{ scale: 1.2 }}>
//       {icon}
//     </motion.span>
//     {text}
//   </Link>
// );

// const MobileNavLink = ({ to, icon, text }) => (
//   <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
//     <Link
//       to={to}
//       className="flex items-center px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:text-white hover:bg-orange-800"
//     >
//       <span className="mr-3">{icon}</span>
//       {text}
//     </Link>
//   </motion.div>
// );

// const ProfileMenuItem = ({ to, icon, text }) => (
//   <motion.li whileHover={{ x: 5 }}>
//     <Link
//       to={to}
//       className="flex items-center px-4 py-2 text-sm text-amber-100 hover:bg-orange-800 transition-colors"
//     >
//       <motion.span className="mr-3" whileHover={{ scale: 1.2 }}>
//         {icon}
//       </motion.span>
//       {text}
//     </Link>
//   </motion.li>
// );

// const CartIcon = ({ count }) => (
//   <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//     <Link to="/cart" className="relative p-2 rounded-full hover:bg-orange-700 transition-colors">
//       <motion.div
//         animate={{
//           rotate: [0, 10, -10, 0],
//           scale: [1, 1.1, 1]
//         }}
//         transition={{ 
//           duration: 0.5,
//           repeat: Infinity,
//           repeatDelay: 3
//         }}
//       >
//         <FaShoppingCart className="h-5 w-5 text-amber-200 hover:text-white" />
//       </motion.div>
//       {count > 0 && (
//         <motion.span
//           className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//         >
//           {Math.min(count, 99)}
//         </motion.span>
//       )}
//     </Link>
//   </motion.div>
// );

// export default Header;











// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUtensils, FaHamburger, FaPizzaSlice, FaIceCream } from "react-icons/fa";
// import { FiLogOut, FiUser, FiHome, FiInfo, FiMail, FiShoppingBag } from "react-icons/fi";
// import { GiFullPizza, GiSodaCan, GiChickenOven } from "react-icons/gi";
// import { logout } from "../Redux/Slices/authSlice.js";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoggedIn, role, data } = useSelector((state) => state.auth);
//   const { restaurantData } = useSelector((state) => state.restaurant);
//   const { cartItems } = useSelector((state) => state.cart);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const profileRef = useRef(null);
//   const [logoHover, setLogoHover] = useState(false);
//   const [foodIcons, setFoodIcons] = useState([
//     <FaHamburger key="burger" />,
//     <FaPizzaSlice key="pizza" />,
//     <GiFullPizza key="fullpizza" />,
//     <FaIceCream key="icecream" />,
//     <GiSodaCan key="soda" />,
//     <GiChickenOven key="chicken" />
//   ]);
//   const [currentFoodIcon, setCurrentFoodIcon] = useState(0);

//   // Rotate food icons every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentFoodIcon((prev) => (prev + 1) % foodIcons.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [foodIcons.length]);

//   const handleLogout = async () => {
//     await dispatch(logout());
//     navigate("/");
//   };

//   const RestaurantExist = (userId) => {
//     return restaurantData?.some((res) => res?.user_id === userId);
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const toggleProfileMenu = () => {
//     setProfileMenuOpen(!profileMenuOpen);
//   };

//   // Close profile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Cart items count
//   const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <header className="bg-gradient-to-r from-orange-900 via-orange-800 to-amber-900 text-white shadow-xl sticky top-0 z-50 border-b border-amber-400/20">
//       {/* Animated food particles background */}
//       <div className="absolute inset-0 overflow-hidden opacity-10">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-amber-400"
//             initial={{
//               scale: 0,
//               opacity: 0,
//               x: `${Math.random() * 100}%`,
//               y: `${Math.random() * 100}%`,
//               rotate: Math.random() * 360
//             }}
//             animate={{
//               scale: [0, 1, 0],
//               opacity: [0, 0.7, 0],
//               rotate: Math.random() * 360
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               repeatType: "loop",
//               delay: Math.random() * 5
//             }}
//           >
//             {foodIcons[Math.floor(Math.random() * foodIcons.length)]}
//           </motion.div>
//         ))}
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo with food animation */}
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex-shrink-0"
//           >
//             <Link 
//               to="/" 
//               className="flex items-center space-x-2"
//               onMouseEnter={() => setLogoHover(true)}
//               onMouseLeave={() => setLogoHover(false)}
//             >
//               <motion.div
//                 animate={{
//                   scale: logoHover ? [1, 1.1, 1] : 1,
//                   rotate: logoHover ? [0, 10, -10, 0] : 0
//                 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg"
//               >
//                 <AnimatePresence mode="wait">
//                   <motion.span
//                     key={currentFoodIcon}
//                     initial={{ scale: 0.5, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 0.5, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {foodIcons[currentFoodIcon]}
//                   </motion.span>
//                 </AnimatePresence>
//               </motion.div>
//               <motion.span 
//                 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 {role || "HUngryHIghwway"}
//               </motion.span>
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-1">
//             <NavLink to="/" icon={<FiHome />} text="Home" />
//             <NavLink to="/menu" icon={<FaUtensils />} text="Menu" />
//             <NavLink to="/about" icon={<FiInfo />} text="About" />
//             {/* <NavLink to="/contact" icon={<FiMail />} text="Contact" /> */}
//              <NavLink to="/about#contactsection" icon={<FiMail />} text="Contact" /> 
            
//             {role !== "Restaurant" && role !== "DeliveryMan" && (
//               <CartIcon count={cartCount} />
//             )}
//           </nav>

//           {/* Auth/Profile Section */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isLoggedIn ? (
//               <div className="relative" ref={profileRef}>
//                 <motion.button
//                   onClick={toggleProfileMenu}
//                   className="flex items-center space-x-2 focus:outline-none group"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <div className="relative">
//                     {data?.photo?.photoUrl ? (
//                       <motion.img
//                         src={data.photo.photoUrl}
//                         alt="User"
//                         className="w-9 h-9 rounded-full border-2 border-amber-400/50 object-cover shadow-md hover:border-amber-400 transition-all duration-300"
//                         whileHover={{ scale: 1.1 }}
//                       />
//                     ) : (
//                       <motion.div 
//                         className="w-9 h-9 rounded-full bg-orange-900 flex items-center justify-center border-2 border-amber-400/50 hover:border-amber-400 transition-all duration-300"
//                         whileHover={{ rotate: 20 }}
//                       >
//                         <FiUser className="text-amber-200" />
//                       </motion.div>
//                     )}
//                   </div>
//                   <motion.span 
//                     className="text-amber-100 group-hover:text-white transition-colors"
//                     whileHover={{ x: 5 }}
//                   >
//                     {data?.name || "Profile"}
//                   </motion.span>
//                 </motion.button>

//                 <AnimatePresence>
//                   {profileMenuOpen && (
//                     <motion.ul
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-2 w-56 bg-orange-900 shadow-2xl rounded-lg py-1 z-50 border border-amber-400/20"
//                     >
//                       <ProfileMenuItem 
//                         to="/profile" 
//                         icon={<FiUser />} 
//                         text="My Profile" 
//                       />
                      
//                       {role === "Restaurant" && !RestaurantExist(data?._id) && (
//                         <ProfileMenuItem 
//                           to="/create/Restaurant" 
//                           icon={<FaUtensils />} 
//                           text="Add Restaurant" 
//                         />
//                       )}
                      
//                       {role === "DeliveryMan" && (
//                         <ProfileMenuItem 
//                           to="/delivery" 
//                           icon={<FaMotorcycle />} 
//                           text="Delivery Dashboard" 
//                         />
//                       )}
                      
//                       <ProfileMenuItem 
//                         to="/myorder" 
//                         icon={<FiShoppingBag />} 
//                         text="My Orders" 
//                       />
                      
//                       <div className="border-t border-amber-400/20 my-1"></div>
                      
//                       <li>
//                         <motion.button
//                           onClick={handleLogout}
//                           className="flex items-center px-4 py-2 text-sm text-red-300 hover:bg-orange-800 w-full text-left transition-colors"
//                           whileHover={{ x: 5 }}
//                         >
//                           <FiLogOut className="mr-3" />
//                           Logout
//                         </motion.button>
//                       </li>
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <AuthButtons />
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             {role !== "Restaurant" && role !== "DeliveryMan" && (
//               <div className="mr-4">
//                 <CartIcon count={cartCount} />
//               </div>
//             )}
            
//             <motion.button
//               onClick={toggleMobileMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-amber-200 hover:text-white hover:bg-orange-700 focus:outline-none"
//               aria-expanded={mobileMenuOpen}
//               whileTap={{ scale: 0.9 }}
//             >
//               <span className="sr-only">Open main menu</span>
//               <AnimatePresence mode="wait" initial={false}>
//                 {mobileMenuOpen ? (
//                   <motion.svg
//                     key="close"
//                     initial={{ rotate: 180, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: -180, opacity: 0 }}
//                     className="h-6 w-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </motion.svg>
//                 ) : (
//                   <motion.svg
//                     key="menu"
//                     initial={{ rotate: -180, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 180, opacity: 0 }}
//                     className="h-6 w-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   </motion.svg>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-orange-900/95 backdrop-blur-sm overflow-hidden"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <MobileNavLink to="/" icon={<FiHome />} text="Home" />
//               <MobileNavLink to="/menu" icon={<FaUtensils />} text="Menu" />
//               <MobileNavLink to="/about" icon={<FiInfo />} text="About" />
//               {/* <MobileNavLink to="/contact" icon={<FiMail />} text="Contact" /> */}
//             <a href="#contactsection" className="text-gray-700 hover:bg-gray-200 hover:text-gray-900 group flex items-center px-3 py-2 text-base font-medium rounded-md">
//       {/* Yahan icon aur text ka structure MobileNavLink jaisa bana sakte ho */}
//       <FiMail className="mr-4 flex-shrink-0 h-6 w-6 text-gray-500 group-hover:text-gray-500" aria-hidden="true" />
//       Contact
//   </a>
              
//               {isLoggedIn ? (
//                 <>
//                   <MobileNavLink to="/profile" icon={<FiUser />} text="Profile" />
                  
//                   {role === "Restaurant" && !RestaurantExist(data?._id) && (
//                     <MobileNavLink to="/create/Restaurant" icon={<FaUtensils />} text="Add Restaurant" />
//                   )}
                  
//                   {role === "DeliveryMan" && (
//                     <MobileNavLink to="/delivery" icon={<FaMotorcycle />} text="Delivery Dashboard" />
//                   )}
                  
//                   <MobileNavLink to="/myorder" icon={<FiShoppingBag />} text="My Orders" />
                  
//                   <motion.button
//                     onClick={handleLogout}
//                     className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-orange-800"
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <FiLogOut className="mr-3" />
//                     Logout
//                   </motion.button>
//                 </>
//               ) : (
//                 <div className="pt-4 pb-2 border-t border-amber-400/20">
//                   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                     <Link
//                       to="/login"
//                       className="block w-full px-4 py-2 text-center rounded-md bg-orange-800 text-white mb-2 hover:bg-orange-700 transition-colors"
//                     >
//                       Login
//                     </Link>
//                   </motion.div>
//                   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                     <Link
//                       to="/signup"
//                       className="block w-full px-4 py-2 text-center rounded-md bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition-colors"
//                     >
//                       Sign Up
//                     </Link>
//                   </motion.div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Global styles for animations */}
//       <style jsx global>{`
//         @keyframes float {
//           0% { transform: translateY(0) translateX(0); }
//           50% { transform: translateY(-20px) translateX(10px); }
//           100% { transform: translateY(0) translateX(0); }
//         }
        
//         .nav-link {
//           position: relative;
//           overflow: hidden;
//         }
        
//         .nav-link::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background: linear-gradient(90deg, #f59e0b, #f97316);
//           transition: width 0.3s ease;
//         }
        
//         .nav-link:hover::after {
//           width: 100%;
//         }
        
//         .cart-pulse {
//           animation: pulse 1.5s infinite;
//         }
        
//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.2); }
//           100% { transform: scale(1); }
//         }

//         @keyframes foodSpin {
//           0% { transform: rotate(0deg) scale(1); }
//           50% { transform: rotate(180deg) scale(1.2); }
//           100% { transform: rotate(360deg) scale(1); }
//         }
//       `}</style>
//     </header>
//   );
// };

// // Reusable Components
// const NavLink = ({ to, icon, text }) => (
//   <Link
//     to={to}
//     className="px-3 py-2 rounded-md text-sm font-medium text-amber-100 hover:text-white flex items-center nav-link transition-colors"
//   >
//     <motion.span 
//       className="mr-2"
//       whileHover={{ scale: 1.2 }}
//     >
//       {icon}
//     </motion.span>
//     {text}
//   </Link>
// );

// const MobileNavLink = ({ to, icon, text }) => (
//   <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
//     <Link
//       to={to}
//       className="flex items-center px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:text-white hover:bg-orange-800"
//     >
//       <span className="mr-3">{icon}</span>
//       {text}
//     </Link>
//   </motion.div>
// );

// const ProfileMenuItem = ({ to, icon, text }) => (
//   <motion.li whileHover={{ x: 5 }}>
//     <Link
//       to={to}
//       className="flex items-center px-4 py-2 text-sm text-amber-100 hover:bg-orange-800 transition-colors"
//     >
//       <motion.span 
//         className="mr-3"
//         whileHover={{ scale: 1.2 }}
//       >
//         {icon}
//       </motion.span>
//       {text}
//     </Link>
//   </motion.li>
// );

// const CartIcon = ({ count }) => (
//   <motion.div 
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.9 }}
//   >
//     <Link to="/cart" className="relative p-2 rounded-full hover:bg-orange-700 transition-colors">
//       <motion.div
//         animate={{ 
//           rotate: [0, 10, -10, 0],
//           scale: [1, 1.1, 1]
//         }}
//         transition={{ 
//           duration: 0.5,
//           repeat: Infinity,
//           repeatDelay: 3
//         }}
//       >
//         <FaShoppingCart className="h-5 w-5 text-amber-200 hover:text-white" />
//       </motion.div>
//       {count > 0 && (
//         <motion.span
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           className="absolute -top-1 mt-4  -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md"
//         >
//           {count}
//         </motion.span>
//       )}
//     </Link>
//   </motion.div>
// );

// const AuthButtons = () => (
//   <div className="flex space-x-3">
//     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//       <Link
//         to="/login"
//         className="px-4 py-2 rounded-md text-sm font-medium text-amber-100 hover:text-white border border-amber-400/50 hover:border-amber-400 transition-colors"
//       >
//         Login
//       </Link>
//     </motion.div>
//     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//       <Link
//         to="/signup"
//         className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-md transition-all"
//       >
//         Sign Up
//       </Link>
//     </motion.div>
//   </div>
// );

// export default Header;

















import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUtensils,
  FaHamburger,
  FaPizzaSlice,
  FaIceCream,
} from "react-icons/fa";
import {
  FiLogOut,
  FiUser,
  FiHome,
  FiInfo,
  FiMail,
} from "react-icons/fi";
import {
  GiFullPizza,
  GiSodaCan,
  GiChickenOven,
} from "react-icons/gi";
import { logout } from "../Redux/Slices/authSlice.js";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Reusable NavLink component
const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-800 transition-all duration-300 text-white"
  >
    <span className="mr-2">{icon}</span>
    {text}
  </Link>
);

// CartIcon component
const CartIcon = ({ count }) => (
  <Link
    to="/cart"
    className="relative flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-800 transition-all duration-300 text-white"
  >
    <FaShoppingCart />
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {count}
      </span>
    )}
  </Link>
);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role, data } = useSelector((state) => state.auth);
  const { restaurantData } = useSelector((state) => state.restaurant);
  const { cartItems } = useSelector((state) => state.cart);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const [logoHover, setLogoHover] = useState(false);
  const [foodIcons, setFoodIcons] = useState([
    <FaHamburger key="burger" />,
    <FaPizzaSlice key="pizza" />,
    <GiFullPizza key="fullpizza" />,
    <FaIceCream key="icecream" />,
    <GiSodaCan key="soda" />,
    <GiChickenOven key="chicken" />,
  ]);
  const [currentFoodIcon, setCurrentFoodIcon] = useState(0);

  // Rotate food icons every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFoodIcon((prev) => (prev + 1) % foodIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [foodIcons.length]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-orange-900 via-orange-800 to-amber-900 text-white shadow-xl sticky top-0 z-50 border-b border-amber-400/20">
      {/* Animated background icons */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-400"
            initial={{
              scale: 0,
              opacity: 0,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.7, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          >
            {foodIcons[Math.floor(Math.random() * foodIcons.length)]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="flex items-center space-x-2"
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              <motion.div
                animate={{
                  scale: logoHover ? [1, 1.1, 1] : 1,
                  rotate: logoHover ? [0, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentFoodIcon}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {foodIcons[currentFoodIcon]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
              <motion.span
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400"
                whileHover={{ scale: 1.05 }}
              >
                {role || "HUngryHIghwway"}
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" icon={<FiHome />} text="Home" />
            <NavLink to="/menu" icon={<FaUtensils />} text="Menu" />
            <NavLink to="/about" icon={<FiInfo />} text="About" />
            <NavLink to="/about#contactsection" icon={<FiMail />} text="Contact" />
            {role !== "Restaurant" && role !== "DeliveryMan" && (
              <CartIcon count={cartCount} />
            )}
          </nav>

          {/* Auth / Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <motion.button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none group"
                  whileHover={{ scale: 1.05 }}
                >
                  {data?.photo?.photoUrl ? (
                    <motion.img
                      src={data.photo.photoUrl}
                      alt="User"
                      className="w-9 h-9 rounded-full border-2 border-amber-400/50 object-cover shadow-md hover:border-amber-400 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                  ) : (
                    <motion.div
                      className="w-9 h-9 rounded-full bg-orange-900 flex items-center justify-center border-2 border-amber-400/50 hover:border-amber-400 transition-all duration-300"
                      whileHover={{ rotate: 20 }}
                    >
                      <FiUser className="text-amber-200" />
                    </motion.div>
                  )}
                  <motion.span
                    className="text-amber-100 group-hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {data?.name || "Profile"}
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-orange-900 shadow-2xl rounded-md overflow-hidden text-white z-50"
                    >
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-orange-700"
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-red-700 flex items-center"
                        >
                          <FiLogOut className="mr-2" />
                          Logout
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-amber-600 px-4 py-2 rounded hover:bg-amber-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
