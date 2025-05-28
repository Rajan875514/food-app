// // import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
// // import { HiOutlineMail } from "react-icons/hi";

// // const Footer = () => {
// //   return (
// //     <footer className="footer bg-slate-900 shadow-md footer-center p-4 text-white mt-32">
// //       <aside>
// //         <p>Copyright © 2024 - All right reserved by </p>
// //       </aside>
// //     </footer>
// //   );
// // };

// // export default Footer;





// import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
// import { HiOutlineMail } from "react-icons/hi";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-10 mt-32">
//       <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center space-y-6">
//         <h2 className="text-2xl font-semibold">Connect with us</h2>

//         <div className="flex space-x-6 text-3xl">
//           <a
//             href="https://github.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-gray-400 transition-colors"
//           >
//             <AiFillGithub />
//           </a>
//           <a
//             href="https://linkedin.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-blue-400 transition-colors"
//           >
//             <AiFillLinkedin />
//           </a>
//           <a
//             href="mailto:example@email.com"
//             className="hover:text-red-400 transition-colors"
//           >
//             <HiOutlineMail />
//           </a>
//         </div>

//         <p className="text-sm text-gray-300">
//           © {new Date().getFullYear()} - All rights reserved by <span className="font-semibold text-white">YourBrand</span>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-900 via-orange-800 to-amber-900 text-white py-10 mt-32 border-t border-amber-400/20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center space-y-6">
        <h2 className="text-2xl font-semibold">Connect with us</h2>

        <div className="flex space-x-6 text-3xl">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <AiFillGithub />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="mailto:example@email.com"
            className="hover:text-red-400 transition-colors"
          >
            <HiOutlineMail />
          </a>
        </div>

        <p className="text-sm text-amber-100">
          © {new Date().getFullYear()} - All rights reserved by <span className="font-semibold text-white">HungryHighway</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;