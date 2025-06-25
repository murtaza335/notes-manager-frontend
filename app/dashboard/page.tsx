import Card from "../components/card";
import FeaturesBar from "../components/featuresBar";
import Cookies from 'js-cookie';

export default function Dashboard() {

    

  return (
    <div className="min-h-screen bg-[#111111] text-white p-6">
      {/* {features bar component} */}
      <FeaturesBar />
      

      {/* Main Body */}
      <div className="dashboard-body space-y-4">
        <Card />
        {/* Add more <Card />s if needed */}
      </div>
    </div>
  );
}
