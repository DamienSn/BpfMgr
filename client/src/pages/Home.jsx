import Dashboard from "../components/Dashboard";
import { UidContext } from "../components/AppContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors/user.selectors";
import Alert from "../components/Alert";
import { useDispatch } from "react-redux";
import About from './About'

function Home() {
    const uid = useContext(UidContext);
    const userData = useSelector(userSelector);
    const dispatch = useDispatch();
    // display banner and footer
    dispatch({ type: 'SET_BANNER', payload: true })
    dispatch({ type: 'SET_FOOTER', payload: true })

    return (
        <main className={`${!uid && 'disconnected'}`}>
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
                : <About />
            }
        </main>
    )
}

export default Home;