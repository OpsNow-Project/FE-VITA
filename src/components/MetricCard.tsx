type MetricCardProps = {
  title: string;
  iframeSrc?: string; // optional, 나중에 Grafana iframe 들어갈 자리
};

export const MetricCard: React.FC<MetricCardProps> = ({ title, iframeSrc }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md min-h-[120px]">
      <h3 className="text-white text-sm font-semibold mb-2">{title}</h3>
      {iframeSrc ? (
        <iframe src={iframeSrc} className="w-full h-20" />
      ) : (
        <div className="text-white text-2xl font-bold">-</div>
      )}
    </div>
  );
};
