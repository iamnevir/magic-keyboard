import * as THREE from "three";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload, Image as ImageImpl } from "@react-three/drei";
import {
  ScrollControls,
  Scroll,
  useScroll,
} from "@/components/controls/scroll-control";

function Image(props: any) {
  const ref = useRef<any>();
  const group = useRef<any>();
  const data = useScroll();
  useFrame((state: any, delta: any) => {
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      Math.max(0, data.delta * 50),
      4,
      delta
    );
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta
    );
  });
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  );
}

function Page({ m = 0.4, urls, ...props }: any) {
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;
  return (
    <group {...props}>
      <Image
        position={[-width * w, 0, -1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[0]}
      />
      <Image
        position={[0, 0, 0]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[1]}
      />
      <Image
        position={[width * w, 0, 1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[2]}
      />
    </group>
  );
}

function Pages() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <Page
        position={[-width * 1, 0, 0]}
        urls={[
          "https://utfs.io/f/10bbf7c0-ceb8-4eee-8a09-6ff0917807f4-1tv5ws.jpg",
          "https://utfs.io/f/ed3bd375-374f-4065-8d76-ab24529f1285-1tv5wt.jpg",
          "https://utfs.io/f/b482eb72-df93-4e54-abac-78b97855ebab-1xcyd.jpg",
        ]}
      />
      <Page
        position={[width * 0, 0, 0]}
        urls={[
          "https://utfs.io/f/ba01d92f-e963-4547-a974-cc1ae22dc94b-1xcy6.jpg",
          "https://utfs.io/f/00adb75b-baa2-406b-93f4-5b4a45a8dc2c-1xcy7.jpg",
          "https://utfs.io/f/7e44772e-18c1-4dcf-9c31-06be88e4dd6a-1xcy8.jpg",
        ]}
      />
      <Page
        position={[width * 1, 0, 0]}
        urls={[
          "https://utfs.io/f/7d16fcf3-cc77-4e6b-84e6-a97cdb196d22-1xcy9.jpg",
          "https://utfs.io/f/e2739118-fed4-456a-85f9-29df4a82571a-1xcyc.jpg",
          "https://utfs.io/f/22c4490f-bd40-46a1-9865-1a173ffc3c0a-1xcyb.jpg",
        ]}
      />
      <Page
        position={[width * 2, 0, 0]}
        urls={[
          "https://utfs.io/f/10bbf7c0-ceb8-4eee-8a09-6ff0917807f4-1tv5ws.jpg",
          "https://utfs.io/f/ed3bd375-374f-4065-8d76-ab24529f1285-1tv5wt.jpg",
          "https://utfs.io/f/b482eb72-df93-4e54-abac-78b97855ebab-1xcyd.jpg",
        ]}
      />
      <Page
        position={[width * 3, 0, 0]}
        urls={[
          "https://utfs.io/f/ba01d92f-e963-4547-a974-cc1ae22dc94b-1xcy6.jpg",
          "https://utfs.io/f/00adb75b-baa2-406b-93f4-5b4a45a8dc2c-1xcy7.jpg",
          "https://utfs.io/f/7e44772e-18c1-4dcf-9c31-06be88e4dd6a-1xcy8.jpg",
        ]}
      />
      <Page
        position={[width * 4, 0, 0]}
        urls={[
          "https://utfs.io/f/7d16fcf3-cc77-4e6b-84e6-a97cdb196d22-1xcy9.jpg",
          "https://utfs.io/f/e2739118-fed4-456a-85f9-29df4a82571a-1xcyc.jpg",
          "https://utfs.io/f/22c4490f-bd40-46a1-9865-1a173ffc3c0a-1xcyb.jpg",
        ]}
      />
    </>
  );
}

export const MagicKeyboardMainFooter = () => {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
          <Scroll>
            <Pages />
          </Scroll>
          <Scroll html>
            <h1 className=" absolute top-[20vh] left-[-75vw] text-[100px]">
              magic
            </h1>
            <h1 className=" absolute top-[20vh] left-[25vw] text-[100px]">
              for
            </h1>
            <h1 className=" absolute top-[20vh] left-[125vw] text-[100px]">
              keyboard
            </h1>
            <h1 className=" absolute top-[20vh] left-[225vw] text-[100px]">
              magic
            </h1>
            <h1 className=" absolute top-[20vh] left-[325vw] text-[100px]">
              for
            </h1>
            <h1 className=" absolute top-[20vh] left-[425vw] text-[100px]">
              keyboard
            </h1>
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
};
