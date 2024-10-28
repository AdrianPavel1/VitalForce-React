import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import MainMenu from "./pages/MainMenu/MainMenu";
import Thermes from "./pages/Thermes/Thermes";
import TrackProgress from "./pages/TrackProgress/TrackProgress";
import PhoneApp from "./pages/App/PhoneApp";
import Supplements from "./pages/Supplements/Supplements";
import CustomEatingMeals from "./pages/customEatingMeals/CustomEatingMeals.jsx";
import Server from "./pages/reactServerTesting/Server.jsx";
import AboutMe from "./pages/aboutMe/AboutMe.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/MainMenu" element={<MainMenu />} />
        <Route path="/Thermes" element={<Thermes />} />
        <Route path="/TrackProgress" element={<TrackProgress />} />
        <Route path="/PhoneApp" element={<PhoneApp />} />
        <Route path="/CustomEatingMeals" element={<CustomEatingMeals />} />
        <Route path="/Server" element={<Server />} />
        <Route path="Supplements" element={<Supplements />} />
        <Route path="AboutMe" element={<AboutMe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
