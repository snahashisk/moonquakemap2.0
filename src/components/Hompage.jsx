import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import HomeMoon from "./HomeMoon";

const Hompage = () => {
  return (
    <>
      <div className="absolute right-0 w-2/4 h-full text-center text-white flex flex-col gap-4 items-center justify-center bg-grey-400">
        <h1 className="text-white font-bold text-6xl">
          MOONQUAKE MAP <span className="text-yellow-400">2.0</span>
        </h1>
        <h3 className="text-yellow-400 text-xl font-semibold">
          NASA International Space Apps Challenge
        </h3>
        <p className="w-4/5 leading-6 mt-4 mb-8">
          Welcome to MoonQuake Explorer 2.0! Journey to the lunar surface with
          us and discover the Moon like never before. Join us in exploring
          seismic data collected by Apollo astronauts' Passive Seismic
          Experiments (PSE) during their historic missions. Our interactive 3-D
          digital moon globe visualizes moonquakes, meteorite impacts, and
          artificial impacts detected by these instruments. Dive into this lunar
          adventure, where seismic events come to life as concentric torus
          shapes revealing their mysteries. Immerse yourself in the world of
          space exploration as you click on pins to reveal seismic event details
          and explore the Moon's topography and day/night cycles. MoonQuake
          Explorer 2.0 is your gateway to unlocking the lunar secrets hidden
          beneath the Moon's surface. Start your lunar exploration today!
        </p>
        <p className="bg-yellow-400 py-2 rounded-md px-2 text-black">
          Explore More
        </p>
      </div>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Suspense fallback={null}>
          <HomeMoon />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Hompage;
