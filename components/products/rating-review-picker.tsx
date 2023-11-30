import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { customStyles } from "../rating-star";
import "@smastrom/react-rating/style.css";
import { useEffect, useState } from "react";

const RatingReviewPicker = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  const [mouted, setMouted] = useState(false);
  useEffect(() => {
    setMouted(true);
  }, []);
  return (
    <div>
      <Rating
        style={{ maxWidth: 200 }}
        value={value ? value : 5}
        onChange={onChange}
        itemStyles={customStyles}
      />
    </div>
  );
};

export default RatingReviewPicker;
