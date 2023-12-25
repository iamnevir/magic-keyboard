"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { usePrevious } from "react-use";
import gsap from "gsap";
import Plane from "./plane";
import { getPiramidalIndex, lerp } from "@/lib/utils";
/*------------------------------
Plane Settings
------------------------------*/
const planeSettings = {
  width: 1,
  height: 3,
  gap: 0.3,
};

/*------------------------------
Gsap Defaults
------------------------------*/
gsap.defaults({
  duration: 2.5,
  ease: "power3.out",
});

/*------------------------------
Carousel
------------------------------*/

const Carousel = ({ images }: { images: string[] }) => {
  const [$root, setRoot] = useState<any>();
  const $post = useRef<any>();
  const [activePlane, setActivePlane] = useState(null);
  const prevActivePlane = usePrevious(activePlane);
  const { viewport } = useThree();

  /*--------------------
  Vars
  --------------------*/
  const progress = useRef(0);
  const startX = useRef(0);
  const isDown = useRef(false);
  const speedWheel = 0.02;
  const speedDrag = -0.3;
  const oldProgress = useRef(0);
  const speed = useRef(0);
  const $items = useMemo(() => {
    if ($root) return $root.children;
  }, [$root]);

  /*--------------------
  Diaplay Items
  --------------------*/
  const displayItems = (item: any, index: any, active: any) => {
    const piramidalIndex = getPiramidalIndex($items, active)[index];
    gsap.to(item.position, {
      x: (index - active) * (planeSettings.width + planeSettings.gap),
      y: $items.length * -0.1 + piramidalIndex * 0.1,
    });
  };

  /*--------------------
  RAF
  --------------------*/
  useFrame(() => {
    progress.current = Math.max(0, Math.min(progress.current, 100));
    const active = Math.floor((progress.current / 100) * ($items.length - 1));
    $items.forEach((item: any, index: any) =>
      displayItems(item, index, active)
    );
    speed.current = lerp(
      speed.current,
      Math.abs(oldProgress.current - progress.current),
      0.1
    );

    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1);

    if ($post.current) {
      $post.current.thickness = speed.current;
    }
  });

  /*--------------------
  Handle Wheel
  --------------------*/
  const handleWheel = (e: any) => {
    if (activePlane !== null) return;
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
    progress.current = progress.current + wheelProgress * speedWheel;
  };

  /*--------------------
  Handle Down
  --------------------*/
  const handleDown = (e: any) => {
    if (activePlane !== null) return;
    isDown.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  /*--------------------
  Handle Up
  --------------------*/
  const handleUp = () => {
    isDown.current = false;
  };

  /*--------------------
  Handle Move
  --------------------*/
  const handleMove = (e: any) => {
    if (activePlane !== null || !isDown.current) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX.current) * speedDrag;
    progress.current = progress.current + mouseProgress;
    startX.current = x;
  };

  /*--------------------
  Click
  --------------------*/
  useEffect(() => {
    if (!$items) return;
    if (activePlane !== null && prevActivePlane === null) {
      progress.current = (activePlane / ($items.length - 1)) * 100;
    }
  }, [activePlane, $items]);

  return (
    <group>
      <mesh
        position={[0, 0, -0.01]}
        onWheel={handleWheel}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerLeave={handleUp}
        onPointerCancel={handleUp}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh>
      <group ref={setRoot}>
        {images.map((item, i) => (
          <CarouselItem
            width={planeSettings.width}
            height={planeSettings.height}
            setActivePlane={setActivePlane}
            activePlane={activePlane}
            key={item}
            item={item}
            index={i}
          />
        ))}
      </group>
    </group>
  );
};

const CarouselItem = ({
  index,
  width,
  height,
  setActivePlane,
  activePlane,
  item,
}: any) => {
  const $root = useRef<any>();
  const [hover, setHover] = useState(false);
  const [isActive, setIsActive] = useState<boolean | null>(false);
  const [isCloseActive, setCloseActive] = useState(false);
  const { viewport } = useThree();
  const timeoutID = useRef<any>();

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(activePlane === index);
      setCloseActive(true);
    } else {
      setIsActive(null);
    }
  }, [activePlane]);

  useEffect(() => {
    gsap.killTweensOf($root.current.position);
    gsap.to($root.current.position, {
      z: isActive ? 0 : -0.01,
      duration: 0.2,
      ease: "power3.out",
      delay: isActive ? 0 : 2,
    });
  }, [isActive]);

  /*------------------------------
  Hover effect
  ------------------------------*/
  useEffect(() => {
    const hoverScale = hover && !isActive ? 1.05 : 1;
    gsap.to($root.current.scale, {
      x: hoverScale,
      y: hoverScale,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [hover, isActive]);

  const handleClose = (e: any) => {
    e.stopPropagation();
    if (!isActive) return;
    setActivePlane(null);
    setHover(false);
    clearTimeout(timeoutID.current);
    timeoutID.current = setTimeout(() => {
      setCloseActive(false);
    }, 1500); // The duration of this timer depends on the duration of the plane's closing animation.
  };

  return (
    <group
      ref={$root}
      onClick={() => {
        setActivePlane(index);
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Plane width={width} height={height} texture={item} active={isActive} />

      {isCloseActive ? (
        <mesh position={[0, 0, 0.01]} onClick={handleClose}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent={true} opacity={0} color={"pink"} />
        </mesh>
      ) : null}
    </group>
  );
};

export default Carousel;
