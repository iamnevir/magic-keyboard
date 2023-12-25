import { Rating } from "react-simple-star-rating";

const RatingStar = ({
  rating,
  size,
}: {
  rating?: number | null;
  size?: number;
}) => {
  return (
    <Rating
      size={size}
      transition
      readonly
      fillColor="#0000FF"
      initialValue={rating ? rating : 0}
      SVGclassName="inline-block"
      SVGstyle={{ display: "inline-block" }}
      allowFraction
    />
  );
};

export default RatingStar;
