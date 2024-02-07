
const LoadingSpinner: React.FC = () => {
  return (
    <div role="status" className="max-w-md p-4 space-y-5  divide-y divide-slate-500 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 bg-black">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-slate-500 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-2"></div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
