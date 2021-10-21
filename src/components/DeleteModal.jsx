import React from 'react'

/**
 * 
 * @param {*} props 
 * @param {Function} props.ok Ok modal handler 
 * @param {Function} props.cancel Cancel modal handler 
 * @returns 
 */
function DeleteModal(props) {
    return (
        <div className="delete-modal bg-gray-300 p-8 rounded-xl transition-all">
            {props.content}
            <div className="w-full flex justify-around mt-4">
                <button className="btn btn-outline-blue" onClick={props.cancel}>Annuler</button>
                <button className="btn btn-red" onClick={props.ok}>Supprimer</button>
            </div>
        </div>
    )
}

export default DeleteModal
