const LoadingBar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-loading-bar"></div>
        </div>
    );
};

export default LoadingBar;
