import Lottie from "lottie-react";
import upload from "@/public/upload.json";
import { Chip } from "@nextui-org/react";
import { ElementRef, useRef, useState } from "react";
import Image from "next/image";
const SingleFileUpload = ({
  value,
  onChange,
}: {
  value?: File | null;
  onChange: (v: File | null) => void;
}) => {
  const imageInput = useRef<ElementRef<"input">>(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div
      onClick={() => imageInput.current?.click()}
      className=" cursor-pointer sm:p-10 p-5 rounded-[10px] border-dashed border-blue-500 border-2 flex flex-col items-center max-w-[346px] sm:max-w-[400px]"
    >
      {value ? (
        <Image
          src={URL.createObjectURL(value)}
          onClick={async () => {
            await onChange(null);
            imageInput.current?.click();
          }}
          width={350}
          height={400}
          alt="imageUpload"
        />
      ) : (
        <>
          <Lottie animationData={upload} width={200} height={200} />
          <Chip className=" bg-blue-500" variant="shadow">
            {isLoading ? "UpLoading..." : "Upload"}
          </Chip>
          <input
            type="file"
            className=" opacity-0"
            ref={imageInput}
            accept="image/*"
            onChange={(event) => {
              event.preventDefault();
              setIsLoading(true);
              onChange(event.target.files![0]);
              setIsLoading(false);
            }}
            disabled={value !== null}
          />
        </>
      )}
    </div>
  );
};

export default SingleFileUpload;
