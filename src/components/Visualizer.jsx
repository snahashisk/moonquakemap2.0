import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Moon from "./Moon";
import { quakeData } from "./quakeData";

const Visualizer = () => {
  const [targetLatitude, setTargetLatitude] = useState(10);
  const [targetLongitude, setTargetLongitude] = useState(10);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 2]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const radius = 2;
    const latRad = (targetLatitude * Math.PI) / 180;
    const lonRad = (targetLongitude * Math.PI) / 180;
    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.cos(latRad) * Math.sin(lonRad);
    const z = radius * Math.sin(latRad);

    setCameraPosition([x, y, z]);
  }, [targetLatitude, targetLongitude]);

  return (
    <>
      <div className="relative h-1/2 w-1/2">
        <button
          className="bg-gray-300 p-2 rounded-md w-40"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Select Date
        </button>
        {isDropdownOpen && (
          <div className="absolute top-10 left-0 bg-white border border-gray-300 rounded-md mt-2 overflow-y-scroll h-full">
            {quakeData.map((quake, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex gap-2"
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setTargetLatitude(quake.Lat);
                  setTargetLongitude(quake.Long);
                }}
              >
                <h2 className="flex">Year: {quake.Year}</h2>
                <h3 className="flex">Date: {quake.Day}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
      <Canvas>
        <CameraController position={cameraPosition} />
        <Suspense fallback={null}>
          <Moon latitude={targetLatitude} longitude={targetLongitude} />
        </Suspense>
      </Canvas>
    </>
  );
};

const CameraController = ({ position }) => {
  const { camera, gl } = useThree();
  useEffect(() => {
    if (camera) {
      console.log("Updating camera position to: ", position);
      camera.position.set(position[0], position[1], position[2]);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, gl, position]);
  return null;
};

export default Visualizer;
