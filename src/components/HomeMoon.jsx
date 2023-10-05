import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Stars } from "@react-three/drei";

import moonColor from "../assets/img/moon-texture.jpg";
import moonBump from "../assets/img/moon-displacement.jpg";

const HomeMoon = () => {
  const [mooncolormap, moonbumpmap] = useLoader(TextureLoader, [
    moonColor,
    moonBump,
  ]);
  const moonRef = useRef();

  const [hovered, setHover] = useState(false);

  useFrame((_, delta) => {
    if (hovered) {
      moonRef.current.rotation.y += 0.2 * delta;
    } else {
      moonRef.current.rotation.y += 0.4 * delta;
    }
  });
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight color="#f6f3ea" position={[1, 0, 1]} intensity={20} />
      <mesh
        ref={moonRef}
        position={[-1, 0, 0]}
        receiveShadow
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          map={mooncolormap}
          displacementMap={moonbumpmap}
          displacementScale={0.004}
          bumpMap={moonbumpmap}
          bumpScale={0.008}
        />
      </mesh>
      <Stars
        radius={300}
        depth={60}
        count={11000}
        factor={10}
        saturation={5}
        fade={true}
      />
    </>
  );
};

export default HomeMoon;
