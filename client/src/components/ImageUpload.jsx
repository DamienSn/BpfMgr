import { useContext } from "react"
import { UidContext } from "./AppContext"
import '@grafikart/drop-files-element';
 

export function ImageUploadProfile() {
    const uid = useContext(UidContext);

    return (
            <input
                type="file"
                name="file"
                label="Glissez un fichier ou cliquez pour ouvrir l'explorateur"
                help="Changer votre photo de profil"
                is="drop-files"
                accept="image/jpeg, image/png"
            />
    )
}