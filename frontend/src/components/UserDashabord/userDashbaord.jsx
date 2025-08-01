import ProfileBar from "./ProfileBar";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 to-purple-900 text-white">
      <div className="fixed top-20 left-0 right-0 z-50">
        <ProfileBar />
      </div>

      {/* Add padding top equal to height of ProfileBar to prevent content overlap */}
      <div className="pt-20 flex items-center justify-center">
        {/* Your dashboard content here */}
        <h1 className="text-2xl">Welcome to the User Dashboard</h1>
      </div>
    </div>
  );
}
