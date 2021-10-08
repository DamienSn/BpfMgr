export function SuccessToast(props) {
    return (
        <div id={props.id} class="toast flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 absolute bottom-2 right-4">
            <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                    <span class="font-semibold text-green-500 dark:text-green-400">Succès !</span>
                    <p class="text-sm text-gray-600 dark:text-gray-200">{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export function InfoToast(props) {
    return (
        <div id={props.id} class="toast flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 absolute bottom-2 right-4">
            <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                    <span class="font-semibold text-blue-500 dark:text-blue-400">Info</span>
                    <p class="text-sm text-gray-600 dark:text-gray-200">{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export function WarningToast(props) {
    return (
        <div id={props.id} class="toast flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-5 absolute bottom-2 right-4">
            <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                    <span class="font-semibold text-yellow-400 dark:text-yellow-300">Attention</span>
                    <p class="text-sm text-gray-600 dark:text-gray-200">{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export function ErrorToast(props) {
    return (
        <div id={props.id} class="toast flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 absolute bottom-2 right-4">
            <div class="px-4 py-2 pb-5  -mx-3">
                <div class="mx-3">
                    <span class="font-semibold text-red-500 dark:text-red-400">Erreur</span>
                    <p class="text-sm text-gray-600 dark:text-gray-200">{props.message}</p>
                </div>
            </div>
        </div>
    )
}