function MetricCard({label, values, valueColor }){

    return(
        <div className="w-48 border shadow-md hover-popout rounded-xl bg-white p-4">
            <div className="flex flex-col items-center justify-center">
                <p className={`text-${valueColor} text-md font-medium`}>{values}</p>
                <p className={`text-sm text-zinc-400`}>{label}</p>
            </div>
        </div>
    );
}

export default MetricCard;