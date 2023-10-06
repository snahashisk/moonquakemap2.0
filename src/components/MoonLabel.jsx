import React from "react";
import { Html } from "@react-three/drei";

const MoonLabel = ({ latitude, longitude, label }) => {
  const calculatePosition = (latitude, longitude, radius) => {
    const latRad = (latitude * Math.PI) / 180;
    const lonRad = (longitude * Math.PI) / 180;

    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.cos(latRad) * Math.sin(lonRad);
    const z = radius * Math.sin(latRad);

    return [x, y, z];
  };

  const moonSurfacePosition = calculatePosition(latitude, longitude, 0.91);
  const labelPosition = calculatePosition(latitude, longitude, 0.92);

  return (
    <>
      {/* Red Dot */}
      <mesh position={moonSurfacePosition}>
        <sphereGeometry args={[0.01, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={labelPosition}>
        <Html center>
          <div className="text-white text-xs bg-black rounded-md px-2 py-1 border-2 border-yellow-200 whitespace-nowrap mt-10">
            {label}
          </div>
        </Html>
      </mesh>
    </>
  );
};

export default MoonLabel;
