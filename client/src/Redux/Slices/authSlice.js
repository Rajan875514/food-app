import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") !== undefined ? JSON.parse(localStorage.getItem("data")) : {},
};

//=======================================================================================================
// Create createUserAccount  user 

export const createUserAccount = createAsyncThunk(
  "/auth/create",
  async (data, { rejectWithValue }) => {
    const loadingMessage = toast.loading("Please wait! Creating your account...");
    console.log("Sending FormData:", Object.fromEntries(data));
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success(res?.data?.message || "Account created successfully!", {
        id: loadingMessage,
      });
      return res?.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Failed to create account.";
      toast.error(errorMessage, { id: loadingMessage });
      return rejectWithValue(errorMessage);
    }
  }
);


//==================================================================================================
// dele man
export const createDeliveryMan = createAsyncThunk(
  "/auth/DeliveryMan",
  async ({ phoneNumber, selectedRestaurants }, { rejectWithValue }) => {
    const loadingMessage = toast.loading("Please wait! Creating DeliveryMan...");
    try {
      const res = await axiosInstance.post("/deliveryman/create", {
        phoneNumber: phoneNumber,
        restaurants: selectedRestaurants,
      });
      toast.success(res?.data?.message || "Delivery Man profile created successfully", {
        id: loadingMessage,
      });
      return res?.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Failed to create Delivery Man profile";
      toast.error(errorMessage, { id: loadingMessage });
      return rejectWithValue(errorMessage);
    }
  }
);


//=======================================================================================================
//customer 
export const createCustomer = createAsyncThunk(
  "/auth/customer",
  async (_, { rejectWithValue }) => {
    const loadingMessage = toast.loading("Please wait! Creating Customer...");
    try {
      const res = await axiosInstance.post("/customer/create");
      toast.success(res?.data?.message || "Customer profile created", {
        id: loadingMessage,
      });
      return res?.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Failed to create customer profile";
      toast.error(errorMessage, { id: loadingMessage });
      return rejectWithValue(errorMessage);
    }
  }
);



//============================================================================================================
//login
export const login = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    const loadingMessage = toast.loading("Please wait! Authentication in Progress...");
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Login Failed";
      toast.error(errorMessage, { id: loadingMessage });
      return rejectWithValue(errorMessage);
    }
  }
);


//=================================================================================================
// logout 

export const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    const loadingMessage = toast.loading("Please wait! Logging out...");
    try {
      const res = await axiosInstance.post("/auth/logout"); // Changed to POST
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Logout Failed";
      toast.error(errorMessage, { id: loadingMessage });
      return rejectWithValue(errorMessage);
    }
  }
);


//================================================================================================
//Rest Password
export const resetPassword = createAsyncThunk(
  "/auth/reset-password",
  async (data, { rejectWithValue }) => {
    const loadingMessage = toast.loading("Resetting Password...");
    try {
      const res = await axiosInstance.post(`/auth/password/reset/${data.token}`, {
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Failed to reset password";
      toast.error(errorMessage, { id: loadingMessage });
      return rejectWithValue(errorMessage);
    }
  }
);


//========================================================================================

export const changePassword = createAsyncThunk(
  "/auth/change-password",
  async (data, { rejectWithValue }) => {
    const loadingMessage = toast.loading("Changing Password...");
    try {
      const res = await axiosInstance.post("/auth/password/update", {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Failed to change password";
      toast.error(errorMessage, { id: loadingMessage });
      return rejectWithValue(errorMessage);
    }
  }
);


//====================================================================================

export const getProfile = createAsyncThunk(
  "/auth/user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/user/details");
      return res?.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Failed to retrieve profile";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

//===================================================================================================

export const updateProfile = createAsyncThunk(
  "/auth/update/profile",
  async (data, { rejectWithValue }) => {
    const loadingMessage = toast.loading("Please wait! Updating your profile...");
    try {
      const res = await axiosInstance.post("/auth/user/update", data);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Failed to update profile";
      toast.error(errorMessage, { id: loadingMessage });
      return rejectWithValue(errorMessage);
    }
  }
);


//===============================================================================================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAccount.fulfilled, (state, action) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.role);
        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        state.isLoggedIn = true;
        state.role = action?.payload?.data?.role;
        state.data = action?.payload?.data;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.role);
        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        state.isLoggedIn = true;
        state.role = action?.payload?.data?.role;
        state.data = action?.payload?.data;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.role);
        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        state.isLoggedIn = true;
        state.role = action?.payload?.data?.role;
        state.data = action?.payload?.data;
      })
      .addCase(createDeliveryMan.fulfilled, (state, action) => {
        localStorage.setItem("role", "DeliveryMan");
        state.role = "DeliveryMan";
      });
  },
});



//=================================================================================================

export default authSlice.reducer;