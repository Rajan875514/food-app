







// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getAllRestaurants,
//     searchRestaurant,
// } from "../../Redux/Slices/restaurantSlice.js";
// import RestaurantCard from "../../Components/Cards/RestaurantCard.jsx";
// import RestaurantListShimmer from "../Shimmer/RestaurantListShimmer.jsx";
// import { FaSearch } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

// const RestaurantList = () => {
//     const dispatch = useDispatch();
//     const { restaurantData, filteredRestaurant } = useSelector(
//         (state) => state?.restaurant
//     );
//     const { role } = useSelector((state) => state.auth);

//     const [searchQuery, setSearchQuery] = useState("");
//     const [isFilteredRestaurant, setIsFilteredRestaurant] = useState(false);

//     async function loadAllRestaurants() {
//         if (restaurantData?.length === 0) {
//             await dispatch(getAllRestaurants());
//         }
//     }

//     async function handleSearch(searchText) {
//         setSearchQuery(searchText);
//         const searchTerm = searchText.toLowerCase();
//         if (searchTerm) {
//             const asiaRestaurants = restaurantData.filter(restaurant => {
//                 return restaurant.name.toLowerCase().includes(searchTerm) ||
//                        (restaurant.cuisines && restaurant.cuisines.toLowerCase().includes(searchTerm)); // Safe check for cuisines
//             });
//             dispatch(searchRestaurant(asiaRestaurants));
//             setIsFilteredRestaurant(true);
//         } else {
//             dispatch(searchRestaurant([])); // Clear the filtered results
//             setIsFilteredRestaurant(false);
//         }
//     }

//     const clearSearch = () => {
//         setSearchQuery("");
//         setIsFilteredRestaurant(false);
//         dispatch(searchRestaurant(""));
//     };

//     useEffect(() => {
//         loadAllRestaurants();
//     }, []);

//     useEffect(() => {

//     }, [searchQuery]);


//     return (
//         <div className="py-12">
//             <style>
//                 {`
//                     @keyframes fadeIn {
//                         from { opacity: 0; }
//                         to { opacity: 1; }
//                     }

//                     @keyframes slideUp {
//                         from { opacity: 0; transform: translateY(20px); }
//                         to { opacity: 1; transform: translateY(0); }
//                     }

//                     @keyframes scaleIn {
//                         from { opacity: 0; transform: scale(0.95); }
//                         to { opacity: 1; transform: scale(1); }
//                     }

//                     .animate-fadeIn {
//                         animation: fadeIn 0.8s ease-out;
//                     }

//                     .animate-slideUp {
//                         animation: slideUp 0.6s ease-out;
//                     }

//                     .animate-scaleIn {
//                         animation: scaleIn 0.5s ease-out forwards;
//                     }

//                     .restaurant-card-animation {
//                         animation: scaleIn 0.5s ease-out forwards;
//                     }

//                     .banner-overlay-animation {
//                         animation: fadeIn 1s ease-out;
//                     }

//                     .search-bar-animation {
//                         animation: fadeIn 0.6s ease-out;
//                     }

//                     .search-input-container {
//                         position: relative;
//                         width: 100%;
//                         transition: box-shadow 0.3s ease-in-out;
//                     }

//                     .search-input-container input {
//                         padding: 12px 40px 12px 60px; /* Increased left padding significantly */
//                         background-color: rgba(255, 255, 255, 0.15);
//                         border: 1px solid rgba(255, 255, 255, 0.25);
//                         color: #e2e8f0;
//                         font-size: 1rem;
//                         transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out;
//                     }

//                     .search-input-container input::placeholder {
//                         color: rgba(226, 232, 240, 0.6);
//                     }


//                     .search-input-container.is-active input {
//                         background-color: rgba(255, 255, 255, 1);
//                         border-color: #a0aec0;
//                         color: #1f2937;
//                         box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
//                     }

//                     .search-input-container.is-active input::placeholder {
//                         color: #a0aec0;
//                     }


//                     .search-input-container .search-icon,
//                     .search-input-container .clear-icon {
//                         position: absolute;
//                         top: 50%;
//                         transform: translateY(-50%);
//                         cursor: pointer;
//                         transition: color 0.3s ease-in-out;
//                         z-index: 1;
//                         font-size: 1.2rem;
//                     }

//                     .search-input-container .search-icon {
//                         left: 15px;
//                         color: #fff; /* Search icon is white */
//                     }

//                     .search-input-container .clear-icon {
//                         right: 15px;
//                         color: #cbd5e0;
//                     }

//                     .search-input-container.is-active .search-icon,
//                     .search-input-container.is-active .clear-icon {
//                         color: #4a5568;
//                     }

//                     .search-input-container .clear-icon:hover {
//                         color: #1a202c;
//                     }
//                     .search-input-container .search-icon:hover {
//                         color: #1a202c;
//                     }
//                 `}
//             </style>
//             <div className="container mx-auto px-4">
//                 {role !== "Restaurant" && (
//                     <section className="mb-10 animate-fadeIn">
//                         <div
//                             className="relative w-full rounded-xl overflow-hidden shadow-lg"
//                             style={{ height: "400px" }}
//                         >
//                             <img
//                                 src="https://res.cloudinary.com/djwn5bkj7/image/upload/v1747459591/pexels-chanwalrus-941861_umxyxf.jpg"
//                                 alt="Restaurant Banner"
//                                 className="absolute inset-0 w-full h-full object-cover brightness-75"
//                                 style={{ border: "2px black white", boxShadow: "0px 0px 8px black" }}
//                             />
//                             <div className="absolute inset-0 flex justify-center items-center banner-overlay-animation">
//                                 <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-md max-w-xl w-full text-center search-bar-animation">
//                                     <h2 className="text-white text-3xl font-bold mb-4 animate-slideUp">
//                                         Discover Great Places to Eat
//                                     </h2>
//                                     <div className={`search-input-container flex items-center ${searchQuery ? 'is-active' : ''}`}>
//                                         <FaSearch className="search-icon ms-1" />
//                                         <input
//                                             type="text"
//                                             value={searchQuery}
//                                             onChange={(e) => handleSearch(e.target.value)}
//                                             placeholder="Search by restaurant name or cuisine"
//                                             className="input  w-full ps-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold transition-all duration-300"
//                                         />
//                                         {searchQuery && (
//                                             <IoClose
//                                                 className="clear-icon"
//                                                 onClick={clearSearch}
//                                             />
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 )}

//                 <section className="mt-8 d-flex justify-content-center align-items-center" style={{ flexDirection: "column" }}>
//                     <h2 className="text-gray-800 text-2xl  font-semibold mb-6 animate-slideUp ">
//                         {isFilteredRestaurant ? "Search Results" : "Popular Restaurants"}
//                     </h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 d-flex justify-content-start align-items-center animate-fadeIn" style={{ gap: "2rem", flexWrap: "wrap", width: "100%" }}>
//                         {isFilteredRestaurant ? (
//                             filteredRestaurant.length === 0 ? (
//                                 <div className="text-gray-600 font-semibold text-lg col-span-full text-center animate-fadeIn">
//                                     No restaurants found matching your search.
//                                 </div>
//                             ) : (
//                                 filteredRestaurant.map((restaurant, index) => (
//                                     <div key={restaurant._id} style={{ animationDelay: `${index * 0.05}s` }} className="restaurant-card-animation">
//                                         <RestaurantCard resdata={restaurant} />
//                                     </div>
//                                 ))
//                             )
//                         ) : restaurantData?.length === 0 ? (
//                             Array.from({ length: 8 }).map((_, index) => (
//                                 <RestaurantListShimmer key={index} />
//                             ))
//                         ) : (
//                             restaurantData?.map((restaurant, index) => (
//                                 <div key={restaurant._id} style={{ animationDelay: `${index * 0.05}s` }} className="restaurant-card-animation">
//                                     <RestaurantCard resdata={restaurant} />
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default RestaurantList;





















import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllRestaurants,
    searchRestaurant,
} from "../../Redux/Slices/restaurantSlice.js";
import RestaurantCard from "../../Components/Cards/RestaurantCard.jsx";
import RestaurantListShimmer from "../Shimmer/RestaurantListShimmer.jsx";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const RestaurantList = () => {
    const dispatch = useDispatch();
    const { restaurantData, filteredRestaurant } = useSelector(
        (state) => state?.restaurant
    );
    const { role } = useSelector((state) => state.auth);

    const [searchQuery, setSearchQuery] = useState("");
    const [isFilteredRestaurant, setIsFilteredRestaurant] = useState(false);

    async function loadAllRestaurants() {
        if (restaurantData?.length === 0) {
            await dispatch(getAllRestaurants());
        }
    }

    async function handleSearch(searchText) {
        setSearchQuery(searchText);
        const searchTerm = searchText.toLowerCase();
        if (searchTerm) {
            const asiaRestaurants = restaurantData.filter(restaurant => {
                return restaurant.name.toLowerCase().includes(searchTerm) ||
                       (restaurant.cuisines && restaurant.cuisines.toLowerCase().includes(searchTerm)); // Safe check for cuisines
            });
            dispatch(searchRestaurant(asiaRestaurants));
            setIsFilteredRestaurant(true);
        } else {
            dispatch(searchRestaurant([])); // Clear the filtered results
            setIsFilteredRestaurant(false);
        }
    }

    const clearSearch = () => {
        setSearchQuery("");
        setIsFilteredRestaurant(false);
        dispatch(searchRestaurant(""));
    };

    useEffect(() => {
        loadAllRestaurants();
    }, []);

    useEffect(() => {

    }, [searchQuery]);


    return (
        <div className="py-12">
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes scaleIn {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }

                    .animate-fadeIn {
                        animation: fadeIn 0.8s ease-out;
                    }

                    .animate-slideUp {
                        animation: slideUp 0.6s ease-out;
                    }

                    .animate-scaleIn {
                        animation: scaleIn 0.5s ease-out forwards;
                    }

                    .restaurant-card-animation {
                        animation: scaleIn 0.5s ease-out forwards;
                    }

                    .banner-overlay-animation {
                        animation: fadeIn 1s ease-out;
                    }

                    .search-bar-animation {
                        animation: fadeIn 0.6s ease-out;
                    }

                    .search-input-container {
                        position: relative;
                        width: 100%;
                        transition: box-shadow 0.3s ease-in-out;
                    }

                    .search-input-container input {
                        padding: 12px 40px 12px 60px; /* Increased left padding significantly */
                        background-color: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.25);
                        color: #e2e8f0;
                        font-size: 1rem;
                        transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out;
                    }

                    .search-input-container input::placeholder {
                        color: rgba(226, 232, 240, 0.6);
                    }


                    .search-input-container.is-active input {
                        background-color: rgba(255, 255, 255, 1);
                        border-color: #a0aec0;
                        color: #1f2937;
                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                    }

                    .search-input-container.is-active input::placeholder {
                        color: #a0aec0;
                    }


                    .search-input-container .search-icon,
                    .search-input-container .clear-icon {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                        transition: color 0.3s ease-in-out;
                        z-index: 1;
                        font-size: 1.2rem;
                    }

                    .search-input-container .search-icon {
                        left: 15px;
                        color: #fff; /* Search icon is white */
                    }

                    .search-input-container .clear-icon {
                        right: 15px;
                        color: #cbd5e0;
                    }

                    .search-input-container.is-active .search-icon,
                    .search-input-container.is-active .clear-icon {
                        color: #4a5568;
                    }

                    .search-input-container .clear-icon:hover {
                        color: #1a202c;
                    }
                    .search-input-container .search-icon:hover {
                        color: #1a202c;
                    }
                `}
            </style>
            <div className="container mx-auto px-4">
                {role !== "Restaurant" && (
                    <section className="mb-10 animate-fadeIn">
                        <div
                            className="relative w-full rounded-xl overflow-hidden shadow-lg"
                            style={{ height: "400px" }}
                        >
                            <img
                                src="https://res.cloudinary.com/djwn5bkj7/image/upload/v1747459591/pexels-chanwalrus-941861_umxyxf.jpg"
                                alt="Restaurant Banner"
                                className="absolute inset-0 w-full h-full object-cover brightness-75"
                                style={{ border: "2px black white", boxShadow: "0px 0px 8px black" }}
                            />
                            <div className="absolute inset-0 flex justify-center items-center banner-overlay-animation">
                                <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-md max-w-xl w-full text-center search-bar-animation">
                                    <h2 className="text-white text-3xl font-bold mb-4 animate-slideUp">
                                        Discover Great Places to Eat
                                    </h2>
                                    <div className={`search-input-container flex items-center ${searchQuery ? 'is-active' : ''}`}>
                                        <FaSearch className="search-icon ms-1" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            placeholder="Search by restaurant name or cuisine"
                                            className="input  w-full ps-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold transition-all duration-300"
                                        />
                                        {searchQuery && (
                                            <IoClose
                                                className="clear-icon"
                                                onClick={clearSearch}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <section className="mt-8 d-flex justify-content-center align-items-center" style={{ flexDirection: "column" }}>
                    <h2 className="text-gray-800 text-2xl  font-semibold mb-6 animate-slideUp ">
                        {isFilteredRestaurant ? "Search Results" : "Popular Restaurants"}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 d-flex justify-content-start align-items-center animate-fadeIn" style={{ gap: "2rem", flexWrap: "wrap", width: "100%" }}>
                        {isFilteredRestaurant ? (
                            filteredRestaurant.length === 0 ? (
                                <div className="text-gray-600 font-semibold text-lg col-span-full text-center animate-fadeIn">
                                    No restaurants found matching your search.
                                </div>
                            ) : (
                                filteredRestaurant.map((restaurant, index) => (
                                    <div key={restaurant._id} style={{ animationDelay: `${index * 0.05}s` }} className="restaurant-card-animation">
                                        <RestaurantCard resdata={restaurant} />
                                    </div>
                                ))
                            )
                        ) : restaurantData?.length === 0 ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <RestaurantListShimmer key={index} />
                            ))
                        ) : (
                            restaurantData?.map((restaurant, index) => (
                                <div key={restaurant._id} style={{ animationDelay: `${index * 0.05}s` }} className="restaurant-card-animation">
                                    <RestaurantCard resdata={restaurant} />
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RestaurantList;