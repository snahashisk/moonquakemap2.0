import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Stars } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import moonColor from "../assets/img/moon-texture.jpg";
import moonBump from "../assets/img/moon-displacement.jpg";
import moonHeight from "../assets/img/moon-height.jpg";
import * as THREE from "three";
import MoonLabel from "./MoonLabel";
import Wireframe from "./Wirframe";

const Moon = ({
  latitude,
  longitude,
  areLabelsVisible,
  useHeightMap,
  isWireframeVisible,
}) => {
  const [mooncolormap, moonbumpmap, MoonHeightMap] = useLoader(TextureLoader, [
    moonColor,
    moonBump,
    moonHeight,
  ]);
  const moonRef = useRef();

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

  const seasAndOceans = [
    { label: "Mare Imbrium", latitude: 32.8, longitude: 15.6 },
    { label: "Mare Serenitatis", latitude: 28.0, longitude: 17.5 },
    { label: "Mare Tranquillitatis", latitude: 8.5, longitude: 31.4 },
    { label: "Mare Nectaris", latitude: -15.2, longitude: 35.5 },
    { label: "Mare Crisium", latitude: 17.0, longitude: 59.1 },
    { label: "Mare Vaporum", latitude: 13.3, longitude: 3.6 },
    { label: "Mare Frigoris", latitude: 56.0, longitude: 1.4 },
    { label: "Mare Humorum", latitude: -24.4, longitude: -38.6 },
    { label: "Mare Cognitum", latitude: -10.0, longitude: -23.1 },
    { label: "Mare Fecunditatis", latitude: -7.8, longitude: 53.3 },
    { label: "Mare Ingenii", latitude: -33.7, longitude: 163.5 },
    { label: "Mare Undarum", latitude: -6.8, longitude: 68.4 },
    { label: "Mare Spumans", latitude: 1.1, longitude: 65.1 },
    { label: "Mare Marginis", latitude: 13.3, longitude: 86.1 },
    { label: "Mare Australe", latitude: -38.9, longitude: 93.0 },
    { label: "Mare Nubium", latitude: -21.3, longitude: -16.0 },
    { label: "Mare Smythii", latitude: 1.3, longitude: 87.5 },
    { label: "Mare Moscoviense", latitude: 27.3, longitude: 147.9 },
    { label: "Mare Orientale", latitude: -19.4, longitude: -92.8 },
  ];

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={20} />
      {areLabelsVisible &&
        seasAndOceans.map((sea, index) => (
          <MoonLabel
            key={index}
            label={sea.label}
            latitude={sea.latitude}
            longitude={sea.longitude}
          />
        ))}
      <mesh ref={moonRef} position={[0, 0, 0]} receiveShadow>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          map={useHeightMap ? MoonHeightMap : mooncolormap}
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
      {isWireframeVisible && <Wireframe />}
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
