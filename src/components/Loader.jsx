const Loader = () => {
    let circleCommonClasses = 'h-4 w-4 bg-current rounded-full';

    return (
        <div className='fixed top-1/2 left-1/2 flex'>
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-1 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
};

export default Loader;