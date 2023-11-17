"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, MeshTransmissionMaterial } from "@react-three/drei";
import { easing } from "maath";
import { useTheme } from "next-themes";

export const BannerMain = () => {
  const { theme } = useTheme();
  return (
    <>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <color
          attach="background"
          args={theme === "dark" ? ["#000000"] : ["#00000000"]}
        />
        {/* <spotLight
          position={[20, 20, 10]}
          penumbra={1}
          castShadow
          angle={0.2}
        /> */}
        <Status position={[0, 0, -10]} />
        {/* <Float floatIntensity={2}>
          <Knot />
        </Float>
        <ContactShadows
          scale={100}
          position={[0, -7.5, 0]}
          blur={1}
          far={100}
          opacity={0.85}
        /> */}
        <Rig />
      </Canvas>
    </>
  );
};

const Rig: any = () => {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 5,
        state.pointer.y * 3.5,
        15 + Math.cos(state.pointer.x) * 10,
      ],
      0.2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
};

const Knot = (props: any) => (
  <mesh receiveShadow castShadow {...props}>
    <torusKnotGeometry args={[3, 1, 256, 32]} />
    <MeshTransmissionMaterial
      distortionScale={1}
      temporalDistortion={1}
      backside
      backsideThickness={5}
      thickness={2}
    />
  </mesh>
);

function Status(props: any) {
  const text = "/keyboard";
  const { theme } = useTheme();
  return (
    <Text
      fontSize={14}
      letterSpacing={-0.025}
      color={theme === "dark" ? "white" : "black"}
      {...props}
    >
      {text}
    </Text>
  );
}
