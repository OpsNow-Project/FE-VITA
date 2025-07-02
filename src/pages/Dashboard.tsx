// Dashboard.tsx
import { PodTable } from "../components/PodTable";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const Dashboard = () => {
  const urls = [
    "http://192.168.110.115:32000/d-solo/d80b2301-092b-40a8-8a8e-418239549089/prometheus?orgId=1&from=1751417061436&to=1751438661436&panelId=4",
    "http://192.168.110.115:32000/d-solo/d80b2301-092b-40a8-8a8e-418239549089/prometheus?orgId=1&from=1751417115566&to=1751438715566&panelId=3",
    "http://192.168.110.115:32000/d-solo/d80b2301-092b-40a8-8a8e-418239549089/prometheus?orgId=1&from=1751417124982&to=1751438724982&panelId=2",
    "http://192.168.110.115:32000/d-solo/d80b2301-092b-40a8-8a8e-418239549089/prometheus?orgId=1&from=1751417135155&to=1751438735155&panelId=1",
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {urls.map((src, i) => (
          <iframe
            key={i}
            src={src}
            className="w-full h-80 border-0 rounded-lg"
            allowFullScreen
            loading="lazy"
          />
        ))}
      </div>

      <PodTable />
    </DashboardLayout>
  );
};
