import Dashboard from "../components/Dashboard";
import { UidContext } from "../components/AppContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors/user.selectors";
import Alert from "../components/Alert";
import { useDispatch } from "react-redux";

import { SRLWrapper } from 'simple-react-lightbox'

// Icons
import { CameraIcon, MapIcon, InformationCircleIcon, CurrencyEuroIcon, TableIcon, LightningBoltIcon, CodeIcon, TerminalIcon, IdentificationIcon } from '@heroicons/react/outline'

function Home() {
    const uid = useContext(UidContext);
    const userData = useSelector(userSelector);
    const dispatch = useDispatch();
    // display banner and footer
    dispatch({ type: 'SET_BANNER', payload: true })
    dispatch({ type: 'SET_FOOTER', payload: true })

    return (
        <main className={`${uid ? 'menu-toggled menu-collapse' : 'mx-4 md:mx-12 lg:mx-24'}`}>
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
    const galleryOptions = {
        buttons: {
            showAutoplayButton: false,
            showDownloadButton: false,
            showThumbnailsButton: false,
        },
        thumbnails: {
            showThumbnails: false
        }
    }

    return (
        <>
            <h1>Gérez vos BPF et BCN. Facilement.</h1>
            <div className="hero-item left">
                <div className="infos">
                    <h2><LightningBoltIcon className="icon-md" />&nbsp;Plus besoin de tableur</h2>
                    <p>BpfMgr signifie BpfManager. C'est une application <b>simple d'utilisation</b> pour gérer vos bpf et bcn.</p>
                </div>
                <SRLWrapper options={galleryOptions}>
                    <img src="img/hero/stats.jpg" alt="Capture d'écran de l'interface BpfMgr" />
                </SRLWrapper>
            </div>
            <div className="hero-item right">
                <div className="infos">
                    <h2><CameraIcon className="icon-md" />&nbsp;Pointez un BPF avec une photo</h2>
                    <p>Notre système vous permet d'utiliser une <b>photo géolocalisée</b> pour pointer un Bpf.<br />
                        <b>C'est simple : Photographiez, Validez, c'est terminé !</b><br />
                        <i>Il est bien sûr aussi possible de valider un bpf manuellement</i>
                    </p>
                </div>
                <SRLWrapper options={galleryOptions}>
                    <img src="img/hero/frompic.png" alt="Détails d'un BPF" />
                </SRLWrapper>
            </div>
            <div className="hero-item left">
                <div className="infos">
                    <h2><MapIcon className="icon-md" />&nbsp;Affichez vos BPF sur la carte</h2>
                    <p>BpfMgr propose l'<b>affichage</b> d'une carte sur laquelle vous pouvez visionner les lieux visités, et ceux qu'il reste à visiter.</p>
                </div>
                <SRLWrapper options={galleryOptions}>
                    <img src="img/hero/map.jpg" alt="Carte des BPF/BCN" />
                </SRLWrapper>
            </div>
            <div className="hero-item right">
                <div className="infos">
                    <h2><InformationCircleIcon className="icon-md" />&nbsp;Obtenez des infos sur un BPF</h2>
                    <p>BpfMgr vous permet d'obtenir plus de détails sur un BPF : <b>des photos, une description, les endroits à visiter...</b></p>
                </div>
                <SRLWrapper options={galleryOptions}>
                    <img src="img/hero/details.jpg" alt="Détails d'un BPF" />
                </SRLWrapper>
            </div>
            <div className="hero-item left">
                <div className="infos">
                    <h2><CurrencyEuroIcon className="icon-md" />&nbsp;Gratuit à vie</h2>
                    <p>BpfMgr est un projet <b>gratuit</b> et <b>open-source</b>, ce qui signifie que tout le monde peut voir le code source et y contribuer.</p>
                </div>
                <div>
                    <div className="text-5xl font-bold mr-24 mb-8">
                        <CodeIcon className="icon-lg" />&nbsp;&&nbsp;<TerminalIcon className="icon-lg" />
                    </div>
                    <a href="https://github.com/DamienSn" className="btn m-8 mt-8 bg-gray-700 text-white hover:bg-gray-600 outline-none focus:ring">Voir le code</a>
                </div>
            </div>
            <div className="hero-item right">
                <div className="infos">
                    <h2><TableIcon className="icon-md" />&nbsp;Migrez depuis un tableur</h2>
                    <p>Nous vous proposons d'ajouter les BPF stockés dans un fichier de tableur directement dans BpfMgr, sans les ajouter un par un. Il suffit d'<b>un fichier CSV, et c'est parti !</b></p>
                </div>
                <SRLWrapper options={galleryOptions}>
                    <img src="img/hero/calc.png" alt="Détails d'un BPF" />
                </SRLWrapper>
            </div>
            <div className="hero-item left">
                <div>
                    <h2><IdentificationIcon className="icon-md" />&nbsp;Qui suis-je ?</h2>
                    <h4>Damien Stéphan</h4>
                    <h5>Cycliste 🚴‍♂️, Développeur 💻, Lycéen 👨‍🎓</h5>
                </div>
                <p>Créateur de BpfMgr, je suis un cycliste pratiquant les BPF et BCN. Initialement du Cyclo Club Montrabéen, je me suis mis au cyclisme récemment. C'est dans mon temps libre que j'ai développé cette application, pour aider à la gestion des BPF/BCN qui était complexe avec un tableur.</p>
            </div>
        </>
    )
}

export default Home;