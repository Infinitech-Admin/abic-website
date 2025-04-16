// room-planner/page.tsx
import RootLayout from "@/app/layout"; // Adjust import if needed

const RoomPlanner = () => {
  return (
    <RootLayout noSidebar={true}> {/* Disable sidebar styles for this page */}
      <div className="w-full h-screen">
        <iframe
          src="https://roomplanner-nu.vercel.app/roomplanner/abic"
          width="100%"
          height="100%"
          title="Room Planner"
          style={{ border: "none" }}
        />
      </div>
    </RootLayout>
  );
};

export default RoomPlanner;
