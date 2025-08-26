function ActionButton({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "small", 
  icon: Icon,
  disabled = false 
}) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 text-white hover:bg-blue-700";
      case "secondary":
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
      case "success":
        return "bg-green-600 text-white hover:bg-green-700";
      case "danger":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      default:
        return "bg-blue-600 text-white hover:bg-blue-700";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-3 py-1.5 text-xs";
      case "medium":
        return "px-4 py-2 text-sm";
      case "large":
        return "px-6 py-3 text-base";
      default:
        return "px-3 py-1.5 text-xs";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-1.5 font-medium rounded-lg transition-colors
        ${getVariantClasses()} 
        ${getSizeClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </button>
  );
}

export default ActionButton;