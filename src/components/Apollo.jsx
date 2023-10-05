import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import ApolloMoon from "./ApolloMoon";
import LanderInfo from "./LanderInfo";
import { useState } from "react";
const Apollo = () => {
  const [info, setInfo] = useState("Apollo 11");
  const updateInfo = (newInfo) => {
    setInfo(newInfo);
  };
  return (
    <>
      <LanderInfo name={info} />
      <Canvas camera={{ position: [2, 0, 0] }}>
        <Suspense fallback={null}>
          <ApolloMoon updateInfo={updateInfo} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Apollo;
