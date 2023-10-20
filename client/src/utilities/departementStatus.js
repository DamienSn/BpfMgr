function eliminateDuplicateValues(arr) {
    const out = [];
    arr.map(item => {
        // vérifiaction que l'élément ne soit pas déjà dans la sortie
        let is_in_out = false;
        if (out.filter(item_out => item_out == item).length != 0) {
            is_in_out = true
        }
        // s'il ne l'est pas, on l'y ajoute
        if (!is_in_out) {
            out.push(item)
        }
    })

    return out
}


/**
 * Returns if the departement is finished or not, according to the bpfs validated in it
 * @param bpfs list of validated bpfs of the departement
 * @param cities list of all cities
 * @return {boolean} isFinished ?
 */
export default function getDepartementStatus(bpfs, cities) {
    const activeBpfs = bpfs.filter(bpf => !bpf.city_is_old_new_id);
    const oldBpfs = bpfs.filter(bpf => bpf.city_is_old_new_id);

    console.log(activeBpfs)

    // Si le nombre de BPFS actifs validés est de 6, le département est fini
    if (activeBpfs.length >= 6) {
        return true;
    }

    // Sinon, on cherche les id des villes associées aux anciens BPF validés
    const associatedActiveCitiesId = [];
    oldBpfs.forEach(bpf => {
        const city = cities.filter(city => city.city_id == bpf.city_is_old_new_id)[0];
        associatedActiveCitiesId.push(city.city_id)
    })
    // ids des villes des bpfs actifs
    const activeBpfsCitiesId = [];
    activeBpfs.map(bpf => {
        activeBpfsCitiesId.push(bpf.city_id);
    })
    // fusion de tous les bpfs validés en équivalent villes actives
    const resultAsActivesBpfs = [...activeBpfsCitiesId, ...associatedActiveCitiesId]
    const resultWithoutDuplicates = eliminateDuplicateValues(resultAsActivesBpfs);

    if (resultWithoutDuplicates.length >= 6 ) {
        return true
    } else {
        return false
    }
}
