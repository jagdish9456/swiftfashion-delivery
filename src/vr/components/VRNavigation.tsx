import { Html } from '@react-three/drei';

export const VRNavigation = () => {
  return (
    <Html fullscreen>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
        <div className="flex gap-4">
          <button className="hover:text-primary-500">Home</button>
          <button className="hover:text-primary-500">Search</button>
          <button className="hover:text-primary-500">Orders</button>
        </div>
      </div>
    </Html>
  );
};