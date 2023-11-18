"use client";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useCursor, Image, Text } from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing } from "maath";
import { useTheme } from "next-themes";

const GOLDENRATIO = 1.61803398875;

export const LibraryCanvas = ({ images }: any) => {
  const { theme } = useTheme();
  const isMobile = window.screen.width <= 768;
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: isMobile ? 90 : 70, position: [0, 2, 15] }}
      className=""
    >
      <color
        attach="background"
        args={theme === "dark" ? ["#000000"] : ["#ffffff"]}
      />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} />
      </group>
    </Canvas>
  );
};

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}: any) {
  const ref = useRef<any>();
  const clicked = useRef<any>();
  const [, params] = useRoute("/library/:id");
  const [, setLocation] = useLocation();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });
  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(
          clicked.current === e.object
            ? "/library"
            : "/library/" + e.object.name
        )
      )}
      onPointerMissed={() => setLocation("/library")}
    >
      {images.map(
        (props:any) => <Frame key={props.url} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

function Frame({ url, name, c = new THREE.Color(), ...props }: any) {
  const image = useRef<any>();
  const frame = useRef<any>();
  const [, params] = useRoute("/library/:id");
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const isActive = params?.id === url;
  useCursor(hovered);
  useFrame((state, dt) => {
    image.current.material.zoom =
      2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    easing.damp3(
      image.current.scale,
      [
        0.85 * (!isActive && hovered ? 0.85 : 1),
        0.9 * (!isActive && hovered ? 0.905 : 1),
        1,
      ],
      0.1,
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "black" : "white",
      0.1,
      dt
    );
  });
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO, 0]}
        fontSize={0.025}
      >
        {name}
      </Text>
    </group>
  );
}
