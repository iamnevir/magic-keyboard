import { Rating } from "react-simple-star-rating";
export const tooltipArray = [
  "Terrible",
  "Terrible+",
  "Bad",
  "Bad+",
  "Average",
  "Average+",
  "Great",
  "Great+",
  "Awesome",
  "Awesome+",
];
const RatingReviewPicker = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  return (
    <Rating
      size={50}
      tooltipClassName=" w-[115px] flex justify-center"
      className=" justify-center"
      transition
      initialValue={value}
      onClick={onChange}
      SVGclassName="inline-block"
      tooltipArray={tooltipArray}
      showTooltip
      fillColor="#0000FF"
      SVGstyle={{ display: "inline-block" }}
      allowFraction
    />
  );
};

export default RatingReviewPicker;
