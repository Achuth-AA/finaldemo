function StatusBadge({ status, color }) {
  const getStatusBgColor = (color) => {
    switch (color) {
      case "orange": return "bg-orange-500";
      case "blue": return "bg-blue-500";
      case "red": return "bg-red-500";
      case "green": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <span className={`${getStatusBgColor(color)} text-white text-xs font-medium px-3 py-1 rounded-full`}>
      {status}
    </span>
  );
}

export default StatusBadge;