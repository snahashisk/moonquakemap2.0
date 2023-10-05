import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
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
  // const ringRef = useRef();

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

  const Ring = ({ position, rotation, args }) => {
    const meshRef = useRef();
    const [scale, setScale] = useState(1);
    useEffect(() => {
      const interval = setInterval(() => {
        setScale((prev) => (prev === 1 ? 1.2 : 1));
      }, 500);

      return () => clearInterval(interval);
    }, []);

    useFrame(({ clock }) => {
      if (meshRef.current) {
        meshRef.current.rotation.z = clock.getElapsedTime();
        meshRef.current.scale.set(scale, scale, scale);
      }
    });

    return (
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <torusGeometry args={args} />
        <meshBasicMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
    );
  };

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

      {[0.01, 0.025, 0.04, 0.054, 0.064].map((size, index) => (
        <Ring
          key={index}
          position={ringPosition}
          rotation={ringRotation}
          args={[size, 0.005 - index * 0.001, 32, 32]}
        />
      ))}
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
