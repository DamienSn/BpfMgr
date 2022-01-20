// Router
import { HashRouter as Router, Route } from "react-router-dom";

// Modules
import axios from "axios";
import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/actions/user.actions";
import { getDpts } from "./redux/actions/dpts.actions"
import { getProvinces } from './redux/actions/provinces.actions'
import { getCities } from './redux/actions/cities.actions'
import { getBpfs } from './redux/actions/bpfs.actions'
import { getBcns } from './redux/actions/bcns.actions'

// Styles
import "./styles/css/style.css";

// Components
import Header from "./components/Header";
import Log from "./pages/Log";
import Home from "./pages/Home";
import { UidContext } from "./components/AppContext";
import Menu from "./components/Menu";
import Banner from "./components/Banner";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import VerifyAccount from "./components/VerifyAccount";
import List from "./pages/List";
import Add from "./pages/Add";
import MapContainerBpf from "./pages/Map";
import Search from './pages/Search';
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import About from "./pages/About";
import ToastProvider from "./components/toaster/ToastProvider";
import Legals from "./pages/Legals";
import UserMgmt from "./pages/admin/UserMgmt";
import User from "./pages/admin/User";

function App() {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loader)
    const userData = useSelector(state => state.user);

    // Verify JSON Web Token in cookies by fetching the API endpoint
    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}users/jwtid`,
                withCredentials: true,
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY
                }
            })
                .then((res) => {
                    res.data.id !== undefined
                        ? setUid(res.data.id)
                        : setUid(null);
                })
                .catch((err) => console.log("no token"));
        };
        fetchToken();

        // Init redux state
        if (uid) {
            dispatch(getUser(uid));
            dispatch(getBpfs(uid));
            dispatch(getBcns(uid));
        }
    }, [uid, dispatch]);

    useEffect(() => {
        dispatch(getDpts());
        dispatch(getProvinces());
        dispatch(getCities());
    }, [dispatch])

    return (
        <div className="App h-screen">
            <UidContext.Provider value={uid}>
                <ToastProvider variant={"bottom_right"}>
                    <Router>
                        <Header />
                        <Banner />
                        {loading && <Loader />}
                        {uid && <Menu />}
                        <div className="flex flex-col h-full justify-between" style={{ height: "calc(100% - 330px)" }}>
                                <Route path="/" exact component={Home} />
                                <Route path="/profile" exact component={Profile} />
                                <Route path="/settings" exact component={Settings} />
                                <Route
                                    path="/verify_account"
                                    exact
                                    component={VerifyAccount}
                                />
                                <Route path="/list" exact component={List} />
                                <Route path="/add" exact component={Add} />
                                <Route path="/map" component={MapContainerBpf} />
                                <Route path="/search" component={Search} />
                                <Route path="/about" component={About} />
                                <Route path="/connect" component={Log} />
                                <Route path="/legal" component={Legals} />
                                {/* ProtectedRoutes */}
                                {userData.user_permissions === "adm" &&
                                    <>
                                        <Route path="/users/:id" component={User} />
                                        <Route path="/users" exact component={UserMgmt} />
                                    </>
                                }
                            <Footer />
                        </div>
                    </Router>
                </ToastProvider>
            </UidContext.Provider>
        </div >
    );
}

export default App;
