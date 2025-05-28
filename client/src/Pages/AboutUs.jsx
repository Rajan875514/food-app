import React from "react";
import AppLayout from "../Layout/AppLayout";
import { FaTwitter, FaInstagram, FaLinkedin, FaCheckCircle, FaStar, FaBolt, FaUtensils, FaHeart, FaLeaf, FaPhone, FaMapMarkerAlt, FaClock, FaUsers, FaSeedling, FaShippingFast } from "react-icons/fa";
import { GiMeal, GiForkKnifeSpoon, GiSaucepan, GiHotMeal } from "react-icons/gi";
import { IoMdRestaurant } from "react-icons/io";
import { MdDeliveryDining, MdFoodBank } from "react-icons/md";

const AboutUs = () => {
  return (
    <AppLayout>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUpFadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideRightFadeIn {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes slideLeftFadeIn {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }

          @keyframes swirl {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }

          @keyframes borderPulse {
            0%, 100% { border-color: rgba(255, 255, 255, 0.5); }
            50% { border-color: rgba(255, 255, 255, 0.8); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }

          .animate-slideUpFadeIn {
            animation: slideUpFadeIn 0.7s ease-out forwards;
          }

          .animate-slideRightFadeIn {
            animation: slideRightFadeIn 0.7s ease-out forwards;
          }

          .animate-slideLeftFadeIn {
            animation: slideLeftFadeIn 0.7s ease-out forwards;
          }

          .animate-scaleIn {
            animation: scaleIn 0.6s ease-out forwards;
          }

          .animate-pulse {
            animation: pulse 1.5s ease-in-out infinite;
          }

          .animate-rotate-slow {
            animation: rotate 30s linear infinite;
          }
          
          .animate-rotate-fast {
            animation: rotate 15s linear infinite;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-float-slow {
            animation: float 5s ease-in-out infinite;
          }

          .animate-swirl {
            animation: swirl 10s ease-in-out infinite;
          }

          .animate-border-pulse {
            animation: borderPulse 2s ease-in-out infinite;
          }

          .email-link-hover {
            position: relative;
            text-decoration: none;
            transition: color 0.3s ease-in-out;
          }

          .email-link-hover::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #3b82f6;
            transition: width 0.3s ease-in-out;
          }

          .email-link-hover:hover::after {
            width: 100%;
          }

          .social-icon-hover {
            transition: transform 0.4s ease-in-out, color 0.4s ease-in-out;
          }

          .social-icon-hover:hover {
            transform: translateY(-10px) scale(1.4);
            color: #6366f1;
          }

          .text-shadow-light {
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
          }
          
          .text-shadow-dark {
            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
          }

          .bg-pattern-food {
            background-image: url('https://www.transparenttextures.com/patterns/asparagus.png');
            background-repeat: repeat;
            background-size: cover;
            background-blend-mode: overlay;
          }

          .bg-pattern-lines {
            background-image: url('https://www.transparenttextures.com/patterns/wavy-lines.png');
            background-repeat: repeat;
            background-size: cover;
            background-blend-mode: soft-light;
          }

          .bg-pattern-dots {
            background-image: url('https://www.transparenttextures.com/patterns/dot-grid.png');
            background-repeat: repeat;
            background-size: cover;
            background-blend-mode: multiply;
          }

          .story-text-box {
            position: relative;
            border: 3px solid rgba(255, 255, 255, 0.5);
            padding: 2rem;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.5);
          }

          .feature-item {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(8px);
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 6px 10px rgba(0,0,0,0.2);
            transition: transform 0.4s ease-in-out, background-color 0.4s ease-in-out;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .feature-item:hover {
            transform: translateY(-15px) scale(1.05);
            background: rgba(0, 0, 0, 0.3);
            box-shadow: 0 12px 20px rgba(0,0,0,0.3);
          }

          .feature-icon-animation {
            transition: transform 0.4s ease-in-out, color 0.4s ease-in-out;
          }

          .feature-item:hover .feature-icon-animation {
            transform: scale(1.3) rotate(10deg);
          }

          .contact-info-box {
            background: rgba(255, 255, 255, 0.95);
            padding: 3rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: box-shadow 0.4s ease-in-out;
          }

          .contact-info-box:hover {
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          }

          .social-icons-container {
            border-top: 1px solid #d1d5db;
            padding-top: 1.5rem;
            margin-top: 1.5rem;
          }

          .floating-element {
            position: absolute;
            opacity: 0.5;
            pointer-events: none;
            z-index: 0;
          }

          .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .stat-item {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 1.5rem;
            text-align: center;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease;
          }

          .stat-item:hover {
            transform: translateY(-5px) scale(1.03);
            background: rgba(255, 255, 255, 0.15);
          }

          .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            background: linear-gradient(to right, #ffffff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .team-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .team-card:hover {
            transform: translateY(-10px) scale(1.02);
          }

          .team-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .testimonial-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .testimonial-card:hover {
            transform: translateY(-5px) scale(1.02);
          }

          .testimonial-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #3b82f6;
          }

          .menu-highlight {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 1rem;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .menu-highlight:hover {
            transform: translateX(5px);
          }

          .menu-icon {
            font-size: 2rem;
            margin-right: 1rem;
            color: #3b82f6;
          }

          /* Section 1 specific floating elements */
          .section-1 .floating-element:nth-child(1) { width: 100px; height: 100px; top: 10%; left: 8%; background-color: #fcd34d; border-radius: 50%; animation: float 6s ease-in-out infinite; }
          .section-1 .floating-element:nth-child(2) { width: 150px; height: 150px; bottom: 15%; right: 12%; background-color: #f87171; border-radius: 50%; animation: float 8s ease-in-out infinite reverse; }
          .section-1 .floating-element:nth-child(3) { width: 70px; height: 70px; top: 30%; right: 25%; background-color: #a78bfa; border-radius: 50%; animation: pulse 2.5s ease-in-out infinite; }
          .section-1 .floating-element:nth-child(4) { width: 180px; height: 180px; top: 50%; left: 2%; background-color: #34d399; border-radius: 50%; animation: rotate-slow 40s linear infinite; opacity: 0.2; }
          .section-1 .floating-element:nth-child(5) { width: 90px; height: 90px; bottom: 5%; left: 30%; background-color: #60a5fa; border-radius: 50%; animation: float 4s ease-in-out infinite; opacity: 0.7; }
          .section-1 .floating-element:nth-child(6) { width: 120px; height: 120px; top: 20%; right: 10%; background-color: #f472b6; border-radius: 50%; animation: float 5s ease-in-out infinite reverse; opacity: 0.6; }
          .section-1 .floating-element:nth-child(7) { width: 80px; height: 80px; bottom: 25%; left: 20%; background-color: #818cf8; border-radius: 50%; animation: pulse 3s ease-in-out infinite; opacity: 0.5; }

          /* Section 2 specific floating elements */
          .section-2 .floating-element {
            font-size: 5rem;
            opacity: 0.15;
            pointer-events: none;
            color: #4b5563;
          }
          .section-2 .floating-element:nth-child(1) { top: 20%; left: 10%; transform: rotate(20deg); animation: float 5s ease-in-out infinite; }
          .section-2 .floating-element:nth-child(2) { bottom: 30%; right: 15%; transform: rotate(-30deg); animation: float 7s ease-in-out infinite reverse; }
          .section-2 .floating-element:nth-child(3) { top: 50%; right: 5%; font-size: 6rem; transform: rotate(40deg); animation: rotate-slow 25s linear infinite; opacity: 0.1; }
          .section-2 .floating-element:nth-child(4) { bottom: 10%; left: 40%; font-size: 4rem; transform: rotate(10deg); animation: pulse 3s ease-in-out infinite; opacity: 0.2; }
          .section-2 .floating-element:nth-child(5) { top: 15%; right: 20%; font-size: 5rem; transform: rotate(-15deg); animation: float 6s ease-in-out infinite; opacity: 0.15; }
          .section-2 .floating-element:nth-child(6) { bottom: 20%; left: 15%; font-size: 4.5rem; transform: rotate(25deg); animation: float 4s ease-in-out infinite reverse; opacity: 0.18; }

          /* Section 3 specific floating elements */
          .section-3 .floating-element {
            font-size: 6rem;
            opacity: 0.2;
            pointer-events: none;
            color: rgba(255, 255, 255, 0.8);
          }
          .section-3 .floating-element:nth-child(1) { top: 15%; left: 15%; animation: swirl 12s ease-in-out infinite; }
          .section-3 .floating-element:nth-child(2) { bottom: 20%; right: 10%; animation: swirl 15s ease-in-out infinite reverse; }
          .section-3 .floating-element:nth-child(3) { top: 60%; left: 5%; font-size: 4rem; animation: float 4s ease-in-out infinite; opacity: 0.15; }
          .section-3 .floating-element:nth-child(4) { top: 30%; right: 20%; font-size: 5rem; animation: rotate-slow 20s linear infinite; opacity: 0.1; }
          .section-3 .floating-element:nth-child(5) { bottom: 30%; left: 25%; font-size: 4.5rem; animation: float 5s ease-in-out infinite reverse; opacity: 0.18; }

          /* Section 4 specific floating elements */
          .section-4 .floating-element {
            font-size: 5rem;
            opacity: 0.2;
            pointer-events: none;
            color: rgba(255, 255, 255, 0.7);
          }
          .section-4 .floating-element:nth-child(1) { top: 10%; left: 10%; animation: float 6s ease-in-out infinite; }
          .section-4 .floating-element:nth-child(2) { bottom: 15%; right: 15%; animation: float 7s ease-in-out infinite reverse; }
          .section-4 .floating-element:nth-child(3) { top: 60%; right: 10%; animation: rotate-slow 25s linear infinite; opacity: 0.15; }
          .section-4 .floating-element:nth-child(4) { bottom: 5%; left: 20%; animation: pulse 2s ease-in-out infinite; opacity: 0.2; }

          /* Section 5 specific floating elements */
          .section-5 .floating-element {
            font-size: 5rem;
            opacity: 0.15;
            pointer-events: none;
            color: #6b7280;
          }
          .section-5 .floating-element:nth-child(1) { top: 10%; right: 8%; transform: rotate(10deg); animation: float 4s ease-in-out infinite; }
          .section-5 .floating-element:nth-child(2) { bottom: 10%; left: 12%; transform: rotate(-15deg); animation: float 6s ease-in-out infinite reverse; }
          .section-5 .floating-element:nth-child(3) { top: 40%; left: 5%; font-size: 4rem; animation: pulse 2s ease-in-out infinite; opacity: 0.2; }
          .section-5 .floating-element:nth-child(4) { bottom: 5%; right: 5%; font-size: 6rem; transform: rotate(20deg); animation: rotate-slow 35s linear infinite; opacity: 0.1; }
          .section-5 .floating-element:nth-child(5) { top: 25%; right: 20%; font-size: 5rem; animation: float 5s ease-in-out infinite; opacity: 0.15; }
          .section-5 .floating-element:nth-child(6) { bottom: 30%; left: 25%; font-size: 4.5rem; animation: swirl 12s ease-in-out infinite; opacity: 0.12; }

          /* Section 6 specific floating elements */
          .section-6 .floating-element {
            font-size: 4rem;
            opacity: 0.2;
            pointer-events: none;
            color: rgba(255, 255, 255, 0.8);
          }
          .section-6 .floating-element:nth-child(1) { top: 15%; left: 10%; animation: float 5s ease-in-out infinite; }
          .section-6 .floating-element:nth-child(2) { bottom: 20%; right: 15%; animation: float 6s ease-in-out infinite reverse; }
          .section-6 .floating-element:nth-child(3) { top: 60%; right: 5%; animation: rotate-slow 20s linear infinite; opacity: 0.15; }
          .section-6 .floating-element:nth-child(4) { bottom: 10%; left: 20%; animation: pulse 2.5s ease-in-out infinite; opacity: 0.2; }
        `}
      </style>
      <main className="w-full overflow-hidden">

        {/* Hero Section */}
        <section className="section-1 min-h-screen relative bg-gradient-to-b from-gray-100 to-white flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto text-center animate-slideUpFadeIn" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 text-shadow-light animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              Welcome to <span className="text-blue-600">Hungry Highway</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              Your ultimate destination for delicious food delivered fast. We connect food lovers with the best local restaurants to satisfy every craving.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-12 animate-slideUpFadeIn" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
                <GiMeal className="text-4xl text-blue-500 mr-4" />
                <div>
                  <h3 className="font-bold text-gray-800">1000+</h3>
                  <p className="text-gray-600">Menu Items</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
                <IoMdRestaurant className="text-4xl text-green-500 mr-4" />
                <div>
                  <h3 className="font-bold text-gray-800">200+</h3>
                  <p className="text-gray-600">Restaurants</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
                <MdDeliveryDining className="text-4xl text-orange-500 mr-4" />
                <div>
                  <h3 className="font-bold text-gray-800">30 Min</h3>
                  <p className="text-gray-600">Avg Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-2 min-h-screen relative bg-white bg-pattern-food bg-pattern-lines flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 animate-scaleIn">
          <div className="floating-element"><FaUtensils /></div>
          <div className="floating-element"><FaHeart /></div>
          <div className="floating-element"><FaLeaf /></div>
          <div className="floating-element"><GiForkKnifeSpoon /></div>
          <div className="floating-element"><GiSaucepan /></div>
          <div className="floating-element"><GiHotMeal /></div>
          
          <div className="relative z-10 max-w-6xl mx-auto animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl animate-slideUpFadeIn" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center text-shadow-light">
                Our <span className="text-blue-600">Mission</span> & Vision
              </h2>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="animate-slideRightFadeIn" style={{ animationDelay: '1.0s' }}>
                  <div className="flex items-start mb-6">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaStar className="text-blue-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Quality First</h3>
                      <p className="text-gray-600">We partner only with restaurants that meet our high standards for quality ingredients and preparation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaSeedling className="text-green-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Support Local</h3>
                      <p className="text-gray-600">We're committed to helping local restaurants thrive by connecting them with new customers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <FaUsers className="text-purple-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Customer Happiness</h3>
                      <p className="text-gray-600">Your satisfaction is our top priority. We're constantly improving based on your feedback.</p>
                    </div>
                  </div>
                </div>
                
                <div className="animate-slideLeftFadeIn" style={{ animationDelay: '1.2s' }}>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl h-full">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                    <p className="text-gray-700 mb-6">
                      To revolutionize food delivery by creating a seamless experience that benefits customers, restaurants, and delivery partners alike.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-3" />
                        <span className="text-gray-700">Become the most trusted food delivery platform</span>
                      </div>
                      <div className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-3" />
                        <span className="text-gray-700">Expand to 50+ cities nationwide</span>
                      </div>
                      <div className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-3" />
                        <span className="text-gray-700">Achieve carbon-neutral deliveries by 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-3 min-h-screen relative overflow-hidden flex items-center justify-center text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/djwn5bkj7/image/upload/v1747459591/pexels-chanwalrus-941861_umxyxf.jpg"
              alt="Our Story Background"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80"></div>
          </div>
          
          <div className="floating-element"><FaBolt /></div>
          <div className="floating-element"><FaStar /></div>
          <div className="floating-element"><FaHeart /></div>
          <div className="floating-element"><GiMeal /></div>
          <div className="floating-element"><MdFoodBank /></div>
          
          <div className="relative z-10 max-w-6xl mx-auto animate-slideRightFadeIn" style={{ animationDelay: '1.4s' }}>
            <div className="story-text-box animate-fadeIn" style={{ animationDelay: '1.6s' }}>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-shadow-dark">
                Our <span className="text-yellow-400">Journey</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-lg md:text-xl leading-relaxed mb-6">
                    Founded in 2018 by food enthusiasts Sarah and Michael, FoodExpress began as a small project to help local restaurants during a slow season. What started as a simple ordering system for 5 neighborhood eateries has grown into a platform serving thousands of customers daily.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed mb-6">
                    Our first breakthrough came when we introduced real-time order tracking in 2019. This innovation set us apart and helped us grow 300% that year. By 2021, we had expanded to 15 cities and introduced our premium membership program.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed">
                    Today, we're proud to support over 200 local restaurants and employ more than 150 delivery professionals. But our core mission remains the same: connecting people with great food and supporting local businesses.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-700">
                    <div className="text-yellow-400 text-4xl mb-2">2018</div>
                    <h3 className="text-xl font-bold mb-2">Founded</h3>
                    <p className="text-gray-300">Started with 5 restaurants in one city</p>
                  </div>
                  
                  <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-700">
                    <div className="text-yellow-400 text-4xl mb-2">2019</div>
                    <h3 className="text-xl font-bold mb-2">Innovation</h3>
                    <p className="text-gray-300">Launched real-time tracking</p>
                  </div>
                  
                  <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-700">
                    <div className="text-yellow-400 text-4xl mb-2">2020</div>
                    <h3 className="text-xl font-bold mb-2">Growth</h3>
                    <p className="text-gray-300">Expanded to 15 cities</p>
                  </div>
                  
                  <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-700">
                    <div className="text-yellow-400 text-4xl mb-2">2023</div>
                    <h3 className="text-xl font-bold mb-2">Today</h3>
                    <p className="text-gray-300">200+ restaurant partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-4 min-h-screen relative bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-white">
          <div className="floating-element"><FaStar /></div>
          <div className="floating-element"><FaCheckCircle /></div>
          <div className="floating-element"><FaBolt /></div>
          <div className="floating-element"><FaHeart /></div>
          
          <div className="relative z-10 max-w-6xl mx-auto text-center animate-slideUpFadeIn" style={{ animationDelay: '2.2s' }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-shadow-dark">
              By The <span className="text-yellow-300">Numbers</span>
            </h2>
            
            <div className="stats-container animate-fadeIn" style={{ animationDelay: '2.4s' }}>
              <div className="stat-item animate-slideUpFadeIn" style={{ animationDelay: '2.5s' }}>
                <div className="stat-number">50K+</div>
                <p className="text-gray-200">Happy Customers</p>
              </div>
              
              <div className="stat-item animate-slideUpFadeIn" style={{ animationDelay: '2.6s' }}>
                <div className="stat-number">200+</div>
                <p className="text-gray-200">Restaurant Partners</p>
              </div>
              
              <div className="stat-item animate-slideUpFadeIn" style={{ animationDelay: '2.7s' }}>
                <div className="stat-number">30 Min</div>
                <p className="text-gray-200">Average Delivery</p>
              </div>
              
              <div className="stat-item animate-slideUpFadeIn" style={{ animationDelay: '2.8s' }}>
                <div className="stat-number">98%</div>
                <p className="text-gray-200">Satisfaction Rate</p>
              </div>
            </div>
            
            <div className="mt-16 grid md:grid-cols-3 gap-8 animate-fadeIn" style={{ animationDelay: '3.0s' }}>
              <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20 animate-slideUpFadeIn" style={{ animationDelay: '3.1s' }}>
                <FaShippingFast className="text-4xl text-yellow-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                <p className="text-gray-200">Our optimized routes ensure your food arrives hot and fresh</p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20 animate-slideUpFadeIn" style={{ animationDelay: '3.2s' }}>
                <GiMeal className="text-4xl text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Quality Food</h3>
                <p className="text-gray-200">Only the best restaurants make it onto our platform</p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20 animate-slideUpFadeIn" style={{ animationDelay: '3.3s' }}>
                <FaLeaf className="text-4xl text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Eco-Friendly</h3>
                <p className="text-gray-200">Sustainable packaging and delivery methods</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-6 min-h-screen relative bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="floating-element"><FaUsers /></div>
          <div className="floating-element"><FaHeart /></div>
          <div className="floating-element"><FaStar /></div>
          <div className="floating-element"><FaCheckCircle /></div>
          
          <div className="relative z-10 max-w-6xl mx-auto animate-fadeIn" style={{ animationDelay: '3.6s' }}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
              Meet Our <span className="text-blue-600">Team</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 animate-fadeIn" style={{ animationDelay: '3.8s' }}>
          <div className="team-card animate-slideUpFadeIn" style={{ animationDelay: '4.1s' }}>
            <img 
              src="" 
              alt="Rajan Prasad" 
              className="team-img"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">Rajan Prasad</h3>
              <p className="text-blue-600 mb-3">Co-Founder & CTO</p>
              <p className="text-gray-600">Tech innovator passionate about food delivery solutions</p>
            </div>
          </div>
          
          <div className="team-card animate-slideUpFadeIn" style={{ animationDelay: '4.2s' }}>
            <img 
              src="" 
              alt="shaurya" 
              className="team-img"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">Shaurya Singh Rana </h3>
              <p className="text-blue-600 mb-3">Head of Operations</p>
              <p className="text-gray-600">Ensuring seamless delivery experiences for all customers</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 grid md:grid-cols-2 gap-8 animate-fadeIn" style={{ animationDelay: '4.4s' }}>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Culture</h3>
            <p className="text-gray-600 mb-6">
              At FoodExpress, we believe in a culture of innovation, collaboration, and food passion. Our team comes to work every day excited to solve problems and create better food experiences.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaHeart className="text-red-500 mr-3" />
                <span className="text-gray-700">Passion for food and service</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-blue-500 mr-3" />
                <span className="text-gray-700">Teamwork and collaboration</span>
              </div>
              <div className="flex items-center">
                <FaBolt className="text-yellow-500 mr-3" />
                <span className="text-gray-700">Fast-paced innovation</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Team</h3>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals who share our passion for food and technology. Check out our current openings and be part of our growing family.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
              View Careers
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="min-h-screen relative bg-gray-100 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto animate-fadeIn" style={{ animationDelay: '4.6s' }}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
          What Our <span className="text-blue-600">Customers</span> Say
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 animate-fadeIn" style={{ animationDelay: '4.8s' }}>
          <div className="testimonial-card animate-slideUpFadeIn" style={{ animationDelay: '5.0s' }}>
            <div className="flex items-center mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/22.jpg" 
                alt="Lisa M." 
                className="testimonial-avatar mr-4"
              />
              <div>
                <h4 className="font-bold text-gray-800">Lisa M.</h4>
                <div className="flex text-yellow-400">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "FoodExpress has completely changed how I order food. The selection is amazing and delivery is always faster than promised!"
            </p>
          </div>
          
          <div className="testimonial-card animate-slideUpFadeIn" style={{ animationDelay: '5.1s' }}>
            <div className="flex items-center mb-4">
              <img 
                src="https://randomuser.me/api/portraits/men/41.jpg" 
                alt="David T." 
                className="testimonial-avatar mr-4"
              />
              <div>
                <h4 className="font-bold text-gray-800">David T.</h4>
                <div className="flex text-yellow-400">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "As a busy professional, I rely on FoodExpress for quick, quality meals. Their app makes ordering so easy and their customer service is top-notch."
            </p>
          </div>
          
          <div className="testimonial-card animate-slideUpFadeIn" style={{ animationDelay: '5.2s' }}>
            <div className="flex items-center mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/63.jpg" 
                alt="Maria G." 
                className="testimonial-avatar mr-4"
              />
              <div>
                <h4 className="font-bold text-gray-800">Maria G.</h4>
                <div className="flex text-yellow-400">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "I love discovering new restaurants through FoodExpress. The reviews and photos help me make great choices every time."
            </p>
          </div>
        </div>
        
        <div className="mt-12 bg-white p-8 rounded-xl shadow-lg animate-fadeIn" style={{ animationDelay: '5.4s' }}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Menu Highlights</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="menu-highlight animate-slideRightFadeIn" style={{ animationDelay: '5.6s' }}>
              <GiMeal className="menu-icon" />
              <div>
                <h4 className="font-bold text-gray-800">Chef's Special Pasta</h4>
                <p className="text-gray-600 text-sm">From Bella Italia - our most ordered dish</p>
              </div>
            </div>
            
            <div className="menu-highlight animate-slideLeftFadeIn" style={{ animationDelay: '5.7s' }}>
              <GiHotMeal className="menu-icon" />
              <div>
                <h4 className="font-bold text-gray-800">Spicy Thai Curry</h4>
                <p className="text-gray-600 text-sm">From Thai Orchid - customer favorite</p>
              </div>
            </div>
            
            <div className="menu-highlight animate-slideRightFadeIn" style={{ animationDelay: '5.8s' }}>
              <GiSaucepan className="menu-icon" />
              <div>
                <h4 className="font-bold text-gray-800">Vegan Buddha Bowl</h4>
                <p className="text-gray-600 text-sm">From Green Leaf - healthiest choice</p>
              </div>
            </div>
            
            <div className="menu-highlight animate-slideLeftFadeIn" style={{ animationDelay: '5.9s' }}>
              <GiForkKnifeSpoon className="menu-icon" />
              <div>
                <h4 className="font-bold text-gray-800">Classic Burger</h4>
                <p className="text-gray-600 text-sm">From Burger Joint - timeless favorite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section className="section-5 min-h-screen relative bg-gradient-to-t from-gray-300 to-gray-300  flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="floating-element" id="contactsection" ><FaUtensils /></div>
      <div className="floating-element"><FaHeart /></div>
      <div className="floating-element"><FaLeaf /></div>
      <div className="floating-element"><FaStar /></div>
      <div className="floating-element"><FaPhone /></div>
      <div className="floating-element"><FaMapMarkerAlt /></div>
      
      <div className="relative z-10 max-w-6xl mx-auto animate-slideUpFadeIn" style={{ animationDelay: '6.2s' }}>
        <div className="contact-info-box animate-fadeIn" style={{ animationDelay: '6.4s' }}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center">
            Contact <span className="text-blue-600">Us</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-lg text-gray-700 mb-8">
                We'd love to hear from you! Whether you have questions about our service, feedback to share, or want to partner with us, our team is ready to assist.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-blue-500 text-xl mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-gray-800">Our Office</h3>
                    <p className="text-gray-600">123 Food Street, Culinary District<br />San Francisco, CA 94103</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaPhone className="text-blue-500 text-xl mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-gray-800">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567<br />Mon-Fri: 9am-6pm PST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaClock className="text-blue-500 text-xl mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-gray-800">Support Hours</h3>
                    <p className="text-gray-600">24/7 Customer Support<br />For order-related inquiries</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Your Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div className="social-icons-container animate-fadeIn" style={{ animationDelay: '6.6s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Follow Us</h3>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-gray-500 hover:text-blue-500 social-icon-hover text-4xl md:text-5xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-500 social-icon-hover text-4xl md:text-5xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-700 social-icon-hover text-4xl md:text-5xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</AppLayout>

);
};

export default AboutUs;