import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Moon from "./Moon";
import { quakeData } from "./quakeData";

const Visualizer = () => {
  const [targetLatitude, setTargetLatitude] = useState(10);
  const [targetLongitude, setTargetLongitude] = useState(10);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 2]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedQuake, setSelectedQuake] = useState(quakeData[0]);
  const [isWireframeVisible, setIsWireframeVisible] = useState(false);

  useEffect(() => {
    if (selectedQuake) {
      setTargetLatitude(selectedQuake.Lat);
      setTargetLongitude(selectedQuake.Long);
    }
  }, [selectedQuake]);

  useEffect(() => {
    const radius = 2;
    const latRad = (targetLatitude * Math.PI) / 180;
    const lonRad = (targetLongitude * Math.PI) / 180;
    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.cos(latRad) * Math.sin(lonRad);
    const z = radius * Math.sin(latRad);

    setCameraPosition([x, y, z]);
  }, [targetLatitude, targetLongitude]);
  const [areLabelsVisible, setAreLabelsVisible] = useState(true);
  const [useHeightMap, setUseHeightMap] = useState(false);
  return (
    <>
      <div className="absolute z-10 mt-10 ml-10 h-1/2 w-1/3">
        <h1 className="text-white text-4xl font-semibold">
          Moon Quake <span className="text-amber-400">Visualizer</span>
        </h1>
        <p className="text-white text-sm mt-2">
          Explore the seismic activity on the Moon by selecting specific dates
          from the dropdown menu. This visualizer renders a 3D model of the
          Moon, highlighting the locations of moonquakes. Use the dropdown to
          navigate through various recorded quake incidents, visualizing their
          locations on the lunar surface. Upon selecting a date, the camera
          navigates to the quake's latitude and longitude, providing a spatial
          view of the incident.
        </p>
        <div className="grid grid-cols-2 gap-4 w-2/3">
          <button
            className="bg-gray-300 p-2 rounded-md mt-6"
            onClick={() => setAreLabelsVisible(!areLabelsVisible)}
          >
            Ocean & Seas
          </button>
          <button
            className="bg-gray-300 p-2 rounded-md mt-6"
            onClick={() => setUseHeightMap(!useHeightMap)}
          >
            Height Map
          </button>
          <button
            className="bg-gray-300 p-2 rounded-md"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Select Date
          </button>
          <button
            className="bg-gray-300 p-2 rounded-md"
            onClick={() => setIsWireframeVisible(!isWireframeVisible)}
          >
            Toggle Wireframe
          </button>
        </div>

        {isDropdownOpen && (
          <div className="z-10 relative top-0 left-0 bg-white border border-gray-300 rounded-md mt-2 overflow-y-auto h-full w-2/5">
            {quakeData.map((quake, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex gap-2"
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setTargetLatitude(quake.Lat);
                  setTargetLongitude(quake.Long);
                  setSelectedQuake(quake);
                }}
              >
                <h2 className="flex">Year: {quake.Year}</h2>
                <h3 className="flex">Date: {quake.Day}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="absolute right-0 z-10 p-6 w-1/5 h-full flex flex-col justify-end text-white gap-4">
        <h3 className="text-white text-3xl font-semibold">
          Quake <span className="text-amber-500">Details</span>
        </h3>
        {selectedQuake ? (
          <div className="text-lg flex flex-col gap-2">
            <p>
              <span>Year:</span> {selectedQuake.Year}
            </p>
            <p>Day: {selectedQuake.Day}</p>
            <p>Latitude: {selectedQuake.Lat}</p>
            <p>Longitude: {selectedQuake.Long}</p>
            <p>Magnitude: {selectedQuake.Magnitude}</p>
          </div>
        ) : (
          <p className="text-white">No quake selected</p>
        )}
      </div>
      <Canvas>
        <CameraController position={cameraPosition} />
        <Suspense fallback={null}>
          <Moon
            latitude={targetLatitude}
            longitude={targetLongitude}
            areLabelsVisible={areLabelsVisible}
            useHeightMap={useHeightMap}
            isWireframeVisible={isWireframeVisible}
          />
        </Suspense>
      </Canvas>
    </>
  );
};

const CameraController = ({ position }) => {
  const { camera, gl } = useThree();
  useEffect(() => {
    if (camera) {
      camera.position.set(position[0], position[1], position[2]);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, gl, position]);
  return null;
};

export default Visualizer;
