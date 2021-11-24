// Icons
import { ArrowCircleDownIcon, CameraIcon, MapIcon, InformationCircleIcon, CurrencyEuroIcon, TableIcon, LightningBoltIcon, CodeIcon, TerminalIcon, IdentificationIcon } from '@heroicons/react/outline'

import { SRLWrapper } from 'simple-react-lightbox'

export default function About() {
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
        <section className="mx-4 md:mx-12 lg:mx-24">
            <h1>Gérez vos BPF et BCN. Facilement.</h1>
            <div className="hero-item left">
                <div className="infos">
                    <h2><LightningBoltIcon className="icon-md" />&nbsp;Plus besoin de tableur</h2>
                    <p>BpfMgr signifie BpfManager. C'est une application <b>simple d'utilisation</b> pour gérer vos bpf et bcn.<br />
                        <b>Cependant, cette application ne remplace pas une <a href="https://ffvelo.fr/activites-federales/adherents/les-brevets/homologuer-votre-brevet/" className="text-blue-600 underline hover:text-blue-800">homologation officielle</a>, c'est un outil de gestion.</b></p>
                </div>
                <ArrowCircleDownIcon className="icon-lg animate-bounce text-blue-500" />
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
                    <p><b>Visualisez</b> directement sur la carte les lieux visités et ceux restants à découvrir.</p>
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
                    <h2><TableIcon className="icon-md" />&nbsp;Migrez depuis un tableur</h2>
                    <p>Nous vous proposons d'ajouter les BPF stockés dans un fichier de tableur (Excel, LibreOffice Calc...) directement dans BpfMgr, sans les ajouter un par un. Il suffit d'<b>un fichier CSV, et c'est parti !</b></p>
                </div>
                <SRLWrapper options={galleryOptions}>
                    <img src="img/hero/calc.png" alt="Détails d'un BPF" />
                </SRLWrapper>
            </div>
            <div className="hero-item left">
                <div className="infos">
                    <h2><CurrencyEuroIcon className="icon-md" />&nbsp;Gratuit à vie</h2>
                    <p>BpfMgr est un projet <b>gratuit</b> et <b>open-source</b>, ce qui signifie que tout le monde peut voir le code source et y contribuer.</p>
                    <p><b>Pour me soutenir, vous pouvez "Star" le projet et m'offrir un café !</b></p>
                </div>
                <div className="flex flex-col justify-between mr-16 md:mr-32 lg:mr-64 space-y-4">
                    <iframe src="https://ghbtns.com/github-btn.html?user=DamienSn&repo=BpfMgr&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
                    <a href="https://ko-fi.com/damiensn" className="btn btn-blue">
                        ☕ Offrez moi un café
                    </a>
                </div>
            </div>
            <div className="hero-item left">
                <div>
                    <h2><IdentificationIcon className="icon-md" />&nbsp;Qui suis-je ?</h2>
                    <h4>Damien Stéphan</h4>
                    <h5>Cycliste 🚴‍♂️, Développeur 💻, Lycéen 👨‍🎓</h5>
                </div>
                <p className="mr-16 md:mr-32 lg:mr-64">Créateur de BpfMgr, je suis un cycliste pratiquant les BPF et BCN. Je suis inscrit au Cyclo Club Montrabéen et possède la double licence FFVélo & FFC. C'est dans mon temps libre que j'ai développé cette application, pour aider à la gestion des BPF/BCN qui était complexe avec un tableur.</p>
            </div>
        </section>
    )
}