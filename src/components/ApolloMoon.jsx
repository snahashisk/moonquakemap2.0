import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Stars } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import apolloGlb from "../assets/models/apollo.glb";
import * as THREE from "three";

import moonColor from "../assets/img/moon-texture.jpg";
import moonBump from "../assets/img/moon-displacement.jpg";

const ApolloMoon = ({ updateInfo }) => {
  const apolloLandings = [
    {
      name: "Apollo 11",
      latitude: 0.67416,
      longitude: 23.47314,
    },
    {
      name: "Apollo 12",
      latitude: -3.0128,
      longitude: -23.4219,
    },
    {
      name: "Apollo 14",
      latitude: -3.64589,
      longitude: -17.47194,
    },
    {
      name: "Apollo 15",
      latitude: 26.13239,
      longitude: 3.6333,
    },
    {
      name: "Apollo 16",
      latitude: -8.9734,
      longitude: 15.5011,
    },
    {
      name: "Apollo 17",
      latitude: 20.1911,
      longitude: 30.7723,
    },
    {
      name: "Chandrayaan-3",
      latitude: 69.373,
      longitude: 32.319,
    },
  ];

  const [apolloModel] = useLoader(GLTFLoader, [apolloGlb]);

  const [mooncolormap, moonbumpmap] = useLoader(TextureLoader, [
    moonColor,
    moonBump,
  ]);
  const moonRef = useRef();
  const pointRef = useRef();

  useFrame((state, delta) => {
    const radius = 2;
    const angularSpeed = 1;
    const newY = radius * Math.cos(angularSpeed * state.clock.elapsedTime);
    const newZ = radius * Math.sin(angularSpeed * state.clock.elapsedTime);
    pointRef.current.position.set(2, newY, newZ);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight color="#f6f3ea" intensity={20} castShadow ref={pointRef} />
      <mesh ref={moonRef} position={[0, 0, 0]} receiveShadow>
        <sphereGeometry args={[0.986, 32, 32]} />
        <meshStandardMaterial
          map={mooncolormap}
          displacementMap={moonbumpmap}
          displacementScale={0.004}
          bumpMap={moonbumpmap}
          bumpScale={0.008}
        />
      </mesh>
      <OrbitControls enableZoom={false} />

      {apolloLandings.map((landing, index) => (
        <ApolloModel
          key={index}
          {...landing}
          updateInfo={updateInfo}
          model={apolloModel}
        />
      ))}

      <Stars
        radius={300}
        depth={60}
        count={1000}
        factor={10}
        saturation={5}
        fade={true}
      />
    </>
  );
};

export default ApolloMoon;

function ApolloModel({ name, latitude, longitude, model, updateInfo }) {
  const radius = 1.005;
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const normalVector = new THREE.Vector3(x, y, z).normalize();
  const upVector = new THREE.Vector3(0, 1, 0);
  const orientation = new THREE.Quaternion().setFromUnitVectors(
    upVector,
    normalVector
  );
  const clonedModel = model.scene.clone();
  clonedModel.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    }
  });
  return (
    <group
      position={[x, y, z]}
      quaternion={orientation}
      onPointerDown={() => {
        console.log(name);
        updateInfo(name);
      }}
    >
      <primitive object={clonedModel} scale={0.012} castShadow />
      <Html>
        <div
          className="text-center cursor-pointer bg-black text-white font-medium mt-4 text-sm rounded-md h-8 p-1 border-solid border-2 border-yellow-500"
          style={{ width: `${name.length * 10}px` }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}
