import { Keyboard1Canvas } from "./SceneDraco";
import TextUnderMagic from "./text-under-magic";

const MagicKeyboard = () => {
  return (
    <div className=" h-full w-full bg-[#d0d0d0] relative">
      <Keyboard1Canvas />
      <TextUnderMagic />
    </div>
  );
};

export default MagicKeyboard;
