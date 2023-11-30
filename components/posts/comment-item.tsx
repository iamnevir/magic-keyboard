import { Doc } from "@/convex/_generated/dataModel";
import { convertTimestampToRelativeTime } from "@/lib/utils";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const commentItem = ({ comment }: { comment: Doc<"comment"> }) => {
  return (
    <Card className=" shadow-md dark:shadow-slate-500 shadow-black/50 ">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className=" flex flex-col">
            <div className=" flex items-center gap-3  whitespace-nowrap">
              {`@${comment.name ? comment.name : "Ẩn danh"}`}
              <span>
                {convertTimestampToRelativeTime(comment._creationTime)}
              </span>
            </div>

            <span className=" font-semibold text-lg"> {comment.content}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default commentItem;
