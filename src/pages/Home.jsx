import Dashboard from "../components/Dashboard";
import { UidContext } from "../components/AppContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors/user.selectors";
import VerifyAccount from "../components/VerifyAccount";
import Alert from "../components/Alert";
import { useDispatch } from "react-redux";

function Home() {
    const uid = useContext(UidContext);
    const userData = useSelector(userSelector);
    const dispatch = useDispatch();
    // display banner
    dispatch({ type: 'SET_BANNER', payload: true })

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            {uid ?
                <>
                    {!userData.user_verified &&
                        <Alert
                            title="Vérifier votre compte"
                            content="Merci de vérifier votre compte."
                            action="Vérifier votre compte"
                            href="/#/verify_account"
                            color="red"
                        />
                    }
                    <Dashboard />
                </>
                : <Accueil />
            }
        </main>
    )
}

function Accueil() {
    return (
        <h2>Accueil</h2>
    )
}

export default Home;