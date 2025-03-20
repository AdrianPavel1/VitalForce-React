import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import ContactUs from "./pages/ContactUs/ContactUs";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import MainMenu from "./pages/MainMenu/MainMenu";
import Thermes from "./pages/Thermes/Thermes";
import TrackProgress from "./pages/TrackProgress/TrackProgress";
import PhoneApp from "./pages/App/PhoneApp";
import Supplements from "./pages/Supplements/Supplements";
import CustomEatingMeals from "./pages/CustomEatingMeals/CustomEatingMeals.jsx";
import Server from "./pages/reactServerTesting/Server.jsx";
import AboutMe from "./pages/aboutMe/AboutMe.jsx";
import NewAboutUs from "./pages/AboutUs/NewAboutUs.jsx";
import Personal from "./pages/Personal/Personal.jsx";
import Admin from "./pages/admin/Admin.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/MainMenu" element={<MainMenu />} />
        <Route path="/Thermes" element={<Thermes />} />
        <Route path="/TrackProgress" element={<TrackProgress />} />
        <Route path="/PhoneApp" element={<PhoneApp />} />
        <Route path="/CustomEatingMeals" element={<CustomEatingMeals />} />
        <Route path="/Server" element={<Server />} />
        <Route path="Supplements" element={<Supplements />} />
        <Route path="new" element={<Supplements />} />
        <Route path="NewAboutUs" element={<NewAboutUs />} />
        <Route path="AboutMe" element={<AboutMe />} />
        <Route path="Personal" element={<Personal />} />
        <Route path="Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
