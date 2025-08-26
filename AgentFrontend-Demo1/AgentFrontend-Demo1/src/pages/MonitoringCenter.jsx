import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function MonitoringCenter() {
  const {title,description} = useParams();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-landing-gradient text-black">
    <div className="pl-6 pt-6 pb-2">
        <button
          onClick={()=>navigate('/home')}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-4 transition-colors hover:shadow-md hover:rounded-2xl hover:p-1 hover:bg-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Chat</span>
        </button>

        <h1 className="text-2xl font-semibold mb-2 text-black">{title}</h1>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}

export default MonitoringCenter;
