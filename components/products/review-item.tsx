import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn, convertTimestampToRelativeTime } from "@/lib/utils";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useMutation } from "convex/react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import RatingStar from "../rating-star";

const ReviewItem = ({ review }: { review: Doc<"review"> }) => {
  const [like, setLike] = useState(false);
  const [dislike, setdislike] = useState(false);
  const update = useMutation(api.review.update);

  return (
    <Card className=" shadow-md dark:shadow-slate-500 shadow-black/50 ">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 w-full">
          <div className=" flex flex-col">
            <div className=" flex items-center gap-3 w-full whitespace-nowrap">
              {`@${review.userName ? review.userName : "Ẩn danh"}`}
              <RatingStar rating={review.rating} size={25} />
            </div>

            <span className=" font-semibold text-lg"> {review.title}</span>
          </div>
          <div className=" flex items-center gap-5 mr-2">
            <ThumbsUp
              onClick={() => {
                if (!like) {
                  setLike(true);
                  setdislike(false);

                  try {
                    update({
                      id: review._id,
                      like: review.like ? review.like + 1 : 1,
                    });
                  } catch (error) {}
                } else {
                  setLike(false);
                  try {
                    update({
                      id: review._id,
                      like: review.like! - 1,
                    });
                  } catch (error) {}
                }
              }}
              className={cn(
                " cursor-pointer hover:scale-105 hover:rotate-6 duration-500 hover:text-indigo-700 ",
                like ? "text-indigo-700 rotate-6" : ""
              )}
            />
            <ThumbsDown
              onClick={() => {
                if (!dislike) {
                  setdislike(true);
                  setLike(false);
                  try {
                    update({
                      id: review._id,
                      dislike: review.dislike ? review.dislike + 1 : 1,
                    });
                  } catch (error) {}
                } else {
                  setdislike(false);
                  try {
                    update({
                      id: review._id,
                      dislike: review.dislike! - 1,
                    });
                  } catch (error) {}
                }
              }}
              className={cn(
                " cursor-pointer hover:scale-105 hover:rotate-6 duration-500 hover:text-indigo-700 ",
                dislike ? "text-indigo-700 rotate-6" : ""
              )}
            />
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div>{review.comments}</div>
      </CardBody>
      <Divider />
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold  text-small">
            {review.like ? review.like : 0}
          </p>
          <p className=" text-small">Like</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold  text-small">
            {review.dislike ? review.dislike : 0}
          </p>
          <p className=" text-small">Dislike</p>
        </div>
        <div>{convertTimestampToRelativeTime(review._creationTime)}</div>
      </CardFooter>
    </Card>
  );
};

export default ReviewItem;
