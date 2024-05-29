import DraggableArea from "@/components/DraggableArea";
import DraggableComponent from "@/components/DraggableComponent";

export default function Home() {
  return (
    <div className="bg-gray-300 size-full h-screen flex flex-col md:flex-row">
      <DraggableArea />
      <DraggableComponent />
    </div>
  );
}
