// Router
import { BrowserRouter as Router, Route } from "react-router-dom";

// Modules
import axios from "axios";
import { useDispatch } from "react-redux";

// Styles
import "./styles/css/style.css";

// Components
import Header from "./components/Header";
import Log from "./components/Log";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { UidContext} from "./components/AppContext";
import Menu from "./components/Menu";
import Banner from "./components/Banner";
import Profile from "./pages/Profile";
import { getUser } from "./redux/actions/user.actions";
import Settings from "./pages/Settings";
import VerifyAccount from "./components/VerifyAccount";
import List from "./pages/List";
import Add from "./pages/Add";
import MapContainerBpf from "./pages/Map";

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

        if (uid) dispatch(getUser(uid));
    }, [uid, dispatch]);

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
                        <Route path="/map" component={MapContainerBpf} />
                    </Router>
            </UidContext.Provider>
        </div>
    );
}

export default App;
