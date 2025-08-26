function AgentHeader({ agent }) {
  const { name, description, icon: Icon, iconColor, iconBgColor, confidence } = agent;

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base">{name}</h3>
          <p className="text-sm text-gray-600 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold text-blue-600">{confidence}%</div>
        <p className="text-xs text-gray-500 mt-0.5">Confidence</p>
      </div>
    </div>
  );
}

export default AgentHeader;