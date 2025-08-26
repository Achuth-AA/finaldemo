function PerformanceChart() {
  return (
    <div className="bg-gray-50 rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Usage Over Time</h3>
      <div className="h-48 bg-white rounded-lg p-4 relative overflow-hidden">
        {/* Dummy Area Chart */}
        <div className="relative h-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>200</span>
            <span>150</span>
            <span>100</span>
            <span>50</span>
            <span>0</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-8 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0">
              <div className="h-full border-l border-gray-200"></div>
              <div className="absolute top-0 w-full border-t border-gray-200"></div>
              <div className="absolute top-1/4 w-full border-t border-gray-100"></div>
              <div className="absolute top-1/2 w-full border-t border-gray-100"></div>
              <div className="absolute top-3/4 w-full border-t border-gray-100"></div>
              <div className="absolute bottom-0 w-full border-t border-gray-200"></div>
            </div>
            
            {/* Area charts */}
            <svg className="absolute inset-0 w-full h-full">
              {/* CPU area */}
              <path
                d="M0,120 Q60,100 120,110 T240,105 Q300,95 360,100 L360,160 L0,160 Z"
                fill="rgba(239, 68, 68, 0.3)"
                stroke="rgb(239, 68, 68)"
                strokeWidth="2"
              />
              {/* Memory area */}
              <path
                d="M0,140 Q60,125 120,130 T240,125 Q300,120 360,125 L360,160 L0,160 Z"
                fill="rgba(34, 197, 94, 0.3)"
                stroke="rgb(34, 197, 94)"
                strokeWidth="2"
              />
              {/* Network area */}
              <path
                d="M0,150 Q60,145 120,148 T240,145 Q300,140 360,145 L360,160 L0,160 Z"
                fill="rgba(59, 130, 246, 0.3)"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2"
              />
            </svg>
            
            {/* Time indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
              <span className="text-red-500">●</span> 08:00 <span className="text-gray-400">CPU: 65</span>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 mt-2">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceChart;