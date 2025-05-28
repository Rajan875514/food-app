
// // import axios from "axios";

// // const axiosInstance = axios.create({
// //   baseURL: "http://localhost:5000/api/v1",
// //   withCredentials: true,
// //   headers: {
// //     "Content-Type": "multipart/form-data", // Ensure correct content type
// //   },
// // });

// // export default axiosInstance;





// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json", // Set to JSON for proper data encoding
//   },
// });

// export default axiosInstance;






import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // Correct for JSON data
  },
});

export default axiosInstance;