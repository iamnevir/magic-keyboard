import { BackButton } from "./back-button";

const LibraryOverLay = () => {
  return (
    <>
      <BackButton />
      <div className=" absolute right-5 bottom-5 cursor-pointer z-[99999]">
        ©2023
      </div>
      <div className=" absolute left-5 bottom-5 cursor-pointer z-[99999]">
        Nevir Studio
      </div>
    </>
  );
};

export default LibraryOverLay;
