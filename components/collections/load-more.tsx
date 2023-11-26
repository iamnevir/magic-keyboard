import { CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const LoadMore = ({ loadMore }: { loadMore: () => void }) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);
  return (
    <div className=" w-full flex justify-center py-5">
      <CircularProgress ref={ref} size="sm" aria-label="Loading..." />
    </div>
  );
};

export default LoadMore;
