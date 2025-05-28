

// // ///////////////////////////////========================================


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../Helpers/axiosInstance";
// import toast from "react-hot-toast";

// const initialState = {
//     restaurantData: [],
//     filteredRestaurant: [],
//     menuItems: [],
//     isRestaurantLoading: false, // Add a loading state for restaurant creation/update
//     restaurantError: null,
// };

// export const getAllRestaurants = createAsyncThunk(
//     "/restaurant/get",
//     async () => {
//         const loadingMessage = toast.loading("fetching restaurants! ...");
//         try {
//             const res = await axiosInstance.get("/restaurants");
//             toast.success("All restaurants", { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error, { id: loadingMessage });
//             throw error; // Re-throw the error to be caught by rejected case
//         }
//     }
// );

// export const createRestaurant = createAsyncThunk(
//     "/create/restaurant",
//     async (formData) => {
//         const loadingMessage = toast.loading("Wait! Adding New restaurant! ...");
//         try {
//             const res = await axiosInstance.post("/restaurants/create", formData);
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error, { id: loadingMessage });
//             throw error; // Re-throw the error
//         }
//     }
// );

// export const deleteRestaurant = createAsyncThunk(
//     "/delete/restaurant",
//     async (resId) => {
//         const loadingMessage = toast.loading("Wait Deleting restaurant! ...");
//         try {
//             const res = await axiosInstance.delete(`/restaurants/delete/${resId}`);
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error, { id: loadingMessage });
//             throw error; // Re-throw the error
//         }
//     }
// );

// export const updateRestaurant = createAsyncThunk(
//     "/update/restaurant",
//     async ([resId, formData]) => {
//         const loadingMessage = toast.loading("Wait updating restaurant! ...");
//         try {
//             const res = await axiosInstance.put(
//                 `/restaurants/edit/${resId}`,
//                 formData
//             );
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error, { id: loadingMessage });
//             throw error; // Re-throw the error
//         }
//     }
// );

// export const selectRestaurant = createAsyncThunk(
//     "/select/restaurant",
//     async (resId) => {
//         const loadingMessage = toast.loading("Wait loading restaurant Details!");
//         try {
//             const res = await axiosInstance.get(`/restaurants/find/${resId}`);
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error, { id: loadingMessage });
//             throw error; // Re-throw the error
//         }
//     }
// );

// export const addMenuItem = createAsyncThunk(
//     "/add/menuItem",
//     async (formData) => {
//         const loadingMessage = toast.loading("Wait Adding MenuItem...!");
//         try {
//             const res = await axiosInstance.post(`/restaurants/menu/add`, formData);
//             console.log("res", res);
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error, { id: loadingMessage });
//             throw error; // Re-throw the error
//         }
//     }
// );

// export const fetchMenuItems = createAsyncThunk(
//     "/fetch/menuItems",
//     async (resId) => {
//         const loadingMessage = toast.loading("Wait Adding fetching menuItems...!");
//         try {
//             const res = await axiosInstance.get(`/restaurants/menu/items/${resId}`);
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error, { id: loadingMessage });
//             throw error; // Re-throw the error
//         }
//     }
// );

// export const updateMenuItem = createAsyncThunk(
//     "/update/menuItem",
//     async ([id, formData]) => {
//         const loadingMessage = toast.loading("Wait updating MenuItem...!");
//         try {
//             const res = await axiosInstance.put(
//                 `/restaurants/menu/update/${id}`,
//                 formData
//             );
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error, { id: loadingMessage });
//             throw error; // Re-throw the error
//         }
//     }
// );

// export const deleteMenuItem = createAsyncThunk(
//     "/delete/menuItem",
//     async (foodId) => {
//         const loadingMessage = toast.loading("Wait deleting MenuItem...!");
//         try {
//             const res = await axiosInstance.delete(
//                 `/restaurants/menu/delete/${foodId}`
//             );
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error, { id: loadingMessage });
//             throw error; // Re-throw the error
//         }
//     }
// );

// const restaurantSlice = createSlice({
//     name: "restaurant",
//     initialState,
//     reducers: {
//         searchRestaurant: (state, action) => {
//             const searchText = action.payload;
//             state.filteredRestaurant = state.restaurantData.filter((res) => {
//                 return (
//                     res.restaurantName.toLowerCase().includes(searchText) ||
//                     res.cuisines.some((cuisine) =>
//                         cuisine.toLowerCase().includes(searchText)
//                     )
//                 );
//             });
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getAllRestaurants.fulfilled, (state, action) => {
//                 state.restaurantData = action?.payload?.data;
//             })
//             .addCase(fetchMenuItems.fulfilled, (state, action) => {
//                 state.menuItems = action?.payload?.data;
//             })
//             .addCase(addMenuItem.fulfilled, (state, action) => {
//                 console.log("payload in add menu", action?.payload);
//                 state.menuItems = [...state.menuItems, action?.payload?.newItem];
//             })
//             // Handle pending state for createRestaurant
//             .addCase(createRestaurant.pending, (state) => {
//                 state.isRestaurantLoading = true;
//                 state.restaurantError = null;
//             })
//             // Handle fulfilled state for createRestaurant
//             .addCase(createRestaurant.fulfilled, (state, action) => {
//                 state.isRestaurantLoading = false;
//                 state.restaurantError = null;
//                 state.restaurantData.push(action?.payload?.data); // Assuming your backend returns the new restaurant data
//             })
//             // Handle rejected state for createRestaurant
//             .addCase(createRestaurant.rejected, (state, action) => {
//                 state.isRestaurantLoading = false;
//                 state.restaurantError = action?.error?.message || "Failed to create restaurant.";
//             })
//             // Handle pending state for updateRestaurant
//             .addCase(updateRestaurant.pending, (state) => {
//                 state.isRestaurantLoading = true;
//                 state.restaurantError = null;
//             })
//             // Handle fulfilled state for updateRestaurant
//             .addCase(updateRestaurant.fulfilled, (state, action) => {
//                 state.isRestaurantLoading = false;
//                 state.restaurantError = null;
//                 // You might want to update the restaurantData array here if needed
//             })
//             // Handle rejected state for updateRestaurant
//             .addCase(updateRestaurant.rejected, (state, action) => {
//                 state.isRestaurantLoading = false;
//                 state.restaurantError = action?.error?.message || "Failed to update restaurant.";
//             });
//     },
// });

// export const { searchRestaurant } = restaurantSlice.actions;

// export default restaurantSlice.reducer;



































import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  restaurantData: [],
  filteredRestaurant: [],
  menuItems: [],
};

export const getAllRestaurants = createAsyncThunk(
  "/restaurant/get",
  async () => {
    const loadingMessage = toast.loading("fetching restaurants! ...");
    try {
      const res = await axiosInstance.get("/restaurants");
      toast.success("All restaurants", { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error, { id: loadingMessage });
    }
  }
);

export const createRestaurant = createAsyncThunk(
  "/create/restaurant",
  async (formData) => {
    const loadingMessage = toast.loading("Wait! Adding New restaurant! ...");
    try {
      const res = await axiosInstance.post("/restaurants/create", formData);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error, { id: loadingMessage });
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  "/delete/restaurant",
  async (resId) => {
    const loadingMessage = toast.loading("Wait Deleting restaurant! ...");
    try {
      const res = await axiosInstance.delete(`/restaurants/delete/${resId}`);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error, { id: loadingMessage });
    }
  }
);

export const updateRestaurant = createAsyncThunk(
  "/update/restaurant",
  async ([resId, formData]) => {
    const loadingMessage = toast.loading("Wait updating restaurant! ...");
    try {
      const res = await axiosInstance.put(
        `/restaurants/edit/${resId}`,
        formData
      );
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error, { id: loadingMessage });
    }
  }
);

export const selectRestaurant = createAsyncThunk(
  "/select/restaurant",
  async (resId) => {
    const loadingMessage = toast.loading("Wait loading restaurant Details!");
    try {
      const res = await axiosInstance.get(`/restaurants/find/${resId}`);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error, { id: loadingMessage });
    }
  }
);

export const addMenuItem = createAsyncThunk(
  "/add/menuItem",
  async (formData) => {
    const loadingMessage = toast.loading("Wait Adding MenuItem...!");
    try {
      const res = await axiosInstance.post(`/restaurants/menu/add`, formData);
      console.log("res", res);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error, { id: loadingMessage });
    }
  }
);

export const fetchMenuItems = createAsyncThunk(
  "/fetch/menuItems",
  async (resId) => {
    const loadingMessage = toast.loading("Wait Adding fetching menuItems...!");
    try {
      const res = await axiosInstance.get(`/restaurants/menu/items/${resId}`);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error, { id: loadingMessage });
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  "/update/menuItem",
  async ([id, formData]) => {
    const loadingMessage = toast.loading("Wait updating MenuItem...!");
    try {
      const res = await axiosInstance.put(
        `/restaurants/menu/update/${id}`,
        formData
      );
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error, { id: loadingMessage });
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  "/delete/menuItem",
  async (foodId) => {
    const loadingMessage = toast.loading("Wait deleting MenuItem...!");
    try {
      const res = await axiosInstance.delete(
        `/restaurants/menu/delete/${foodId}`
      );
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error, { id: loadingMessage });
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    searchRestaurant: (state, action) => {
      const searchText = action.payload;
      state.filteredRestaurant = state.restaurantData.filter((res) => {
        return (
          res.restaurantName.toLowerCase().includes(searchText) ||
          res.cuisines.some((cuisine) =>
            cuisine.toLowerCase().includes(searchText)
          )
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRestaurants.fulfilled, (state, action) => {
        state.restaurantData = action?.payload?.data;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.menuItems = action?.payload?.data;
      })
      .addCase(addMenuItem.fulfilled, (state, action) => {
        console.log("payload in add menu", action?.payload);
        state.menuItems = [...state.menuItems, action?.payload?.newItem];
      });
  },
});

export const { searchRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;

