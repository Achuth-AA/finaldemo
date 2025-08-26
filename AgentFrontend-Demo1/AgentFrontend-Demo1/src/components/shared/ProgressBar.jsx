function ProgressBar({ value, color = "blue", label, description }) {
  const getProgressColor = (color) => {
    switch (color) {
      case "green": return "bg-green-500";
      case "blue": return "bg-blue-500";
      case "red": return "bg-red-500";
      case "orange": return "bg-orange-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="mb-6">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-900">{label}: {value}%</span>
        </div>
      )}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-lg h-2">
          <div 
            className={`${getProgressColor(color)} h-2 rounded-lg transition-all duration-300`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
        {description && (
          <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;