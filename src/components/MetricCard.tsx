// MetricCard.tsx
type MetricCardProps = {
  title: string;
  iframeSrc?: string;
};

export const MetricCard: React.FC<MetricCardProps> = ({ title, iframeSrc }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md min-h-[150px]">
      <h3 className="text-white text-sm font-semibold mb-2">{title}</h3>
      {iframeSrc ? (
        <iframe
          src={iframeSrc}
          className="w-full h-32 border-0 rounded"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="text-white text-2xl font-bold text-center">-</div>
      )}
    </div>
  );
};
