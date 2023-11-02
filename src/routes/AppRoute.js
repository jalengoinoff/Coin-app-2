import { Routes, Route ,Navigate} from "react-router-dom";
import Home from "../pages/Home/Home";
import Watchlist from "../pages/Watchlist/Watchlist";
import Account from "../pages/Account/Signin";
import News from "../pages/News/News";
import Chartdata from "../pages/Chartdata/Chartdata";
import Register from "../pages/Account/Register";
import Coindata from "../pages/Coindata/Coindata";
import Reset from "../pages/Account/Reset";
import Dashboard from "../pages/Account/Dashboard";
function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chartdata" element={<Chartdata />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/news" element={<News />} />
      <Route path="/watchlist/:id" component={Watchlist} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<Account />} />
      <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
      <Route path="/coins/:id" element={<Coindata />} />
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default AppRoute;
