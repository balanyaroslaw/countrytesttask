
const LoadingComponent = () => {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="w-20 h-20 border-10 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }
  
  export default LoadingComponent;
  