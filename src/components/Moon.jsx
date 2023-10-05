import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Stars } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import moonColor from "../assets/img/moon-texture.jpg";
import moonBump from "../assets/img/moon-displacement.jpg";
import * as THREE from "three";

const Moon = ({ latitude, longitude }) => {
  const [mooncolormap, moonbumpmap] = useLoader(TextureLoader, [
    moonColor,
    moonBump,
  ]);
  const moonRef = useRef();
  const ringRef = useRef();

  const calculatePositionAndOrientation = (latitude, longitude, radius) => {
    const latRad = (latitude * Math.PI) / 180;
    const lonRad = (longitude * Math.PI) / 180;

    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.cos(latRad) * Math.sin(lonRad);
    const z = radius * Math.sin(latRad);

    const normal = new THREE.Vector3(x, y, z).normalize();

    const rotation = new THREE.Euler();
    rotation.setFromRotationMatrix(
      new THREE.Matrix4().lookAt(
        new THREE.Vector3(0, 0, 0),
        normal,
        new THREE.Vector3(0, 1, 0)
      )
    );

    return {
      position: [x, y, z],
      rotation: [rotation.x, rotation.y, rotation.z],
    };
  };
  const [ringPosition, setRingPosition] = useState([0, 0, 0]);
  const [ringRotation, setRingRotation] = useState([0, 0, 0]);

  useEffect(() => {
    const { position, rotation } = calculatePositionAndOrientation(
      latitude,
      longitude,
      0.9
    );
    setRingPosition(position);
    setRingRotation(rotation);
  }, [latitude, longitude]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={20} />
      <mesh ref={moonRef} position={[0, 0, 0]} receiveShadow>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          map={mooncolormap}
          displacementMap={moonbumpmap}
          displacementScale={0.004}
          bumpMap={moonbumpmap}
          bumpScale={0.008}
        />
      </mesh>

      <mesh ref={ringRef} position={ringPosition} rotation={ringRotation}>
        <torusGeometry args={[0.01, 0.005, 32, 32]} />
        <meshBasicMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef} position={ringPosition} rotation={ringRotation}>
        <torusGeometry args={[0.025, 0.004, 32, 32]} />
        <meshBasicMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef} position={ringPosition} rotation={ringRotation}>
        <torusGeometry args={[0.04, 0.003, 32, 32]} />
        <meshBasicMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef} position={ringPosition} rotation={ringRotation}>
        <torusGeometry args={[0.054, 0.002, 32, 32]} />
        <meshBasicMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef} position={ringPosition} rotation={ringRotation}>
        <torusGeometry args={[0.064, 0.001, 32, 32]} />
        <meshBasicMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Stars
        radius={300}
        depth={60}
        count={8000}
        factor={10}
        saturation={5}
        fade={true}
      />
    </>
  );
};

export default Moon;
