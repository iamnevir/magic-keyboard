"use client";
import { useRef } from "react";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useStore } from "@/hooks/use-valtio-store";
import { useMediaQuery } from "usehooks-ts";

export function Keyboard1Canvas() {
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Canvas eventPrefix="client" camera={{ position: [0, 0, 4], fov: 50 }}>
      <OrbitControls enableZoom={isMobile} />
      <ambientLight intensity={0.7} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 15, -5]}
        castShadow
      />
      <ContactShadows
        resolution={512}
        position={[0, -0.8, 0]}
        opacity={1}
        scale={10}
        blur={2}
        far={0.8}
      />{" "}
      <Environment preset="city" background blur={1} />
      <Selector>
        <Model />
      </Selector>
    </Canvas>
  );
}

function Selector({ children }: any) {
  const store = useStore();

  return (
    <>
      <group
        onPointerOver={() => (store.open = true)}
        onPointerOut={() => (store.open = false)}
        onPointerDown={() => (store.open = true)}
        onPointerUp={() => (store.open = false)}
      >
        {children}
      </group>
    </>
  );
}
export function Model(props: any) {
  const { nodes, materials }: any = useGLTF("/sceneDraco.gltf");
  const ref = useRef<any>();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 3) / 4,
      0.15 + Math.sin(t / 2) / 8
    );
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7;
  });
  return (
    <group {...props} ref={ref} dispose={null}>
      <group scale={0.01}>
        <mesh
          geometry={nodes.Cube_Box_0.geometry}
          material={materials.material}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.Box_Keys_0.geometry}
          material={materials.Keys}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/sceneDraco.gltf");
