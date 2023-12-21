"use client";
import { useMutation, useQuery } from "convex/react";
import RatingStar from "../rating-star";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  Card,
  CardBody,
  Divider,
  Input,
  Pagination,
  Progress,
  Textarea,
} from "@nextui-org/react";
import AnimateButton from "../animate-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ReviewItem from "./review-item";
import { useUser } from "@clerk/clerk-react";
import RatingReviewPicker from "./rating-review-picker";

export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

const ProductReview = ({ productId }: { productId: Id<"product"> }) => {
  const { user } = useUser();
  const create = useMutation(api.review.create);
  const [isWriteReview, setIsWriteReview] = useState(false);
  const [page, setPage] = useState(0);
  const reviews = useQuery(api.review.getReviewsByProduct, {
    productId,
  });

  const groupedReviews = reviews?.reduce((acc, current) => {
    const rating = current.rating.toString();

    if (!acc.has(rating)) {
      acc.set(rating, []);
    }

    acc.get(rating)?.push(current);

    return acc;
  }, new Map<string, Doc<"review">[]>());
  const reviewArrays: Doc<"review">[][] | null = groupedReviews
    ? Array.from(groupedReviews.values())
    : null;
  const ratingList = reviews?.map((review) => review.rating);
  const rating =
    ratingList !== undefined
      ? ratingList!.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ) / ratingList!.length
      : null;
  const formSchema = !user
    ? z.object({
        userName: z.optional(z.string()),
        email: z.string().email({
          message: "Mail mà ông :v",
        }),
        rating: z.number(),
        title: z.optional(z.string()),
        comments: z.string().min(2, {
          message: "Viết dài lên ông :v",
        }),
        images: z.optional(z.array(z.string())),
      })
    : z.object({
        userName: z.optional(z.string()),
        email: z.string().optional(),
        rating: z.number(),
        title: z.optional(z.string()),
        comments: z.string().min(2, {
          message: "Viết dài lên ông :v",
        }),
        images: z.optional(z.array(z.string())),
      });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      rating: 5,
      title: "",
      comments: "",
      images: [],
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsWriteReview(false);
    if (user) {
      create({
        productId,
        title: values.title,
        images: values.images,
        email: user.emailAddresses[0].emailAddress,
        userName: user.fullName ? user.fullName : "Ẩn danh",
        rating: values.rating,
        comments: values.comments,
      });
    } else {
      create({
        productId,
        title: values.title,
        images: values.images,
        email: values.email!,
        userName: values.userName,
        rating: values.rating,
        comments: values.comments,
      });
    }
  }
  const reviewsList =
    reviews?.length! > 0 ? chunkArray<Doc<"review">>(reviews!, 3) : null;
  return (
    <div className=" w-full h-full sm:px-40 sm:py-20 px-2 py-2">
      <div className=" flex sm:flex-row flex-col gap-2 items-start justify-between">
        <div className=" flex flex-col w-full">
          <span className=" font-semibold text-2xl sm:text-3xl">
            Phản hồi <span className=" hidden sm:flex">khách hàng</span>
          </span>
          <div className=" flex items-center gap-3">
            <RatingStar rating={rating} size={25} />
            <span>{`${ratingList?.length} Đánh giá`}</span>
          </div>
          {reviewArrays
            ?.sort((a, b) => {
              const ratingA = a[0].rating;
              const ratingB = b[0].rating;
              return ratingB - ratingA; // Sắp xếp giảm dần
            })
            .map((item, index) => (
              <div key={index} className=" flex items-center gap-2">
                <RatingStar size={20} rating={item[0].rating} />
                <Progress
                  value={Math.round((item.length / reviews!.length) * 100)}
                  maxValue={100}
                  color="success"
                  className="max-w-md"
                />
                <span>
                  {Math.round((item.length / reviews!.length) * 100)}%
                </span>
                <span>{`(${item.length})`}</span>
              </div>
            ))}
        </div>

        <div className=" flex items-center">
          <AnimateButton
            text={!isWriteReview ? "Thêm một đánh giá" : "Đóng"}
            onClick={() => setIsWriteReview((v) => !v)}
            color="white"
            className="shadow-md dark:shadow-slate-500 shadow-black/50 bg-white"
          />
        </div>
      </div>
      <Divider className="mt-5 mb-2" />
      <div
        className={cn(
          " transition-all duration-1000",
          !isWriteReview ? "hidden" : ""
        )}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardBody className=" gap-5">
                {!user ? (
                  <div className=" flex items-center space-x-5 w-full justify-between">
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              placeholder="Nhập tên hoặc không nhập để ẩn danh"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Nhập email (email của bạn sẽ được bảo mật)"
                              {...field}
                            />
                          </FormControl>{" "}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : null}

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="w-full py-2 justify-center flex items-center ">
                      <FormControl>
                        <div>
                          <RatingReviewPicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Xin cái tiêu đề" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          disableAnimation
                          disableAutosize
                          classNames={{
                            base: "max-w-full",
                            input: "resize-y min-h-[40px]",
                          }}
                          placeholder="Nhập đánh giá vô đây"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className=" max-w-[200px] my-3">
                  <AnimateButton text="Gửi đánh giá" color="white" />
                </Button>
              </CardBody>
            </Card>
          </form>
        </Form>
      </div>
      <div className=" w-full h-full space-y-5">
        <span className=" text-2xl font-medium">
          Đánh giá {`(${reviews?.length})`}
        </span>
        {reviewsList?.[page].map((item, index) => (
          <div key={index}>
            {" "}
            <ReviewItem review={item} />
          </div>
        ))}
        <div>
          {reviews && reviews?.length > 3 ? (
            <Pagination
              total={Math.round(reviews?.length! / 3)}
              initialPage={page + 1}
              color="primary"
              onChange={(page: number) => setPage(page - 1)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
