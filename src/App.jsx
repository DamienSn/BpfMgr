// Router
import { BrowserRouter as Router, Route } from "react-router-dom";

// Modules
import axios from "axios";

// Redux
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/user.actions";
import { getDpts } from "./redux/actions/dpts.actions"
import { getProvinces } from './redux/actions/provinces.actions'
import { getCities } from './redux/actions/cities.actions'

// Styles
import "./styles/css/style.css";

// Components
import Header from "./components/Header";
import Log from "./components/Log";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
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

function App() {
    const [uid, setUid] = useState(null);
    // const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();

    // Verify JSON Web Token in cookies by fetching the API endpoint
    useEffect(() => {
        // setTimeout(() => {
        //     setLoader(false);
        // }, 3000);

        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}users/jwtid`,
                withCredentials: true,
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
        }
    }, [uid, dispatch]);
    
    useEffect(() => {
        dispatch(getDpts());
        dispatch(getProvinces());
        dispatch(getCities());
    }, [dispatch])

    // TODO: Loader ?
    return (
        <div className="App">
            <UidContext.Provider value={uid}>
                <Router>
                    <Header />
                    <Banner />
                    <Log />
                    {uid && <Menu />}
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
                    <Route path="/map" component={MapContainerBpf}/>
                    <Route path="/search" component={Search}/>
                </Router>
            </UidContext.Provider>
        </div>
    );
}

export default App;
