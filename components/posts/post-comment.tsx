"use client";
import { useMutation, useQuery } from "convex/react";
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
import CommentItem from "./comment-item";
import { chunkArray } from "../products/product-review";
import { useUser } from "@clerk/clerk-react";

const PostComments = ({ postId }: { postId: Id<"post"> }) => {
  const { user } = useUser();
  const create = useMutation(api.comment.create);
  const [isWriteReview, setIsWriteReview] = useState(false);
  const [page, setPage] = useState(0);
  const comments = useQuery(api.comment.getCommentByPost, {
    postId,
  });

  const formSchema = !user
    ? z.object({
        name: z.optional(z.string()),
        email: z.string().email({
          message: "Mail mà ông :v",
        }),
        content: z.string().min(2, {
          message: "Viết dài lên ông :v",
        }),
        images: z.optional(z.array(z.string())),
      })
    : z.object({
        name: z.optional(z.string()),
        email: z.string().optional(),
        content: z.string().min(2, {
          message: "Viết dài lên ông :v",
        }),
        images: z.optional(z.array(z.string())),
      });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      content: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsWriteReview(false);
    if (!user) {
      create({
        postId,
        name: values.name ? values.name : "Ẩn danh",
        email: values.email!,
        content: values.content,
      });
    } else {
      create({
        postId,
        name: user.fullName ? user.fullName : "Ẩn danh",
        email: user.emailAddresses[0].toString(),
        content: values.content,
      });
    }
  }
  const commentsList =
    comments?.length! > 0 ? chunkArray<Doc<"comment">>(comments!, 3) : null;
  return (
    <div className=" flex flex-col gap-2 w-full h-full sm:px-40 sm:py-20 px-2 py-2">
      <div className=" flex flex-col w-full">
        <div className=" flex items-start  sm:flex-row flex-col sm:gap-5 gap-2 justify-between">
          <span className=" font-semibold text-2xl sm:text-3xl">Bình luận</span>

          <AnimateButton
            text={!isWriteReview ? "Thêm một bình luận" : "Đóng"}
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
                      name="name"
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
                  name="content"
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
                          placeholder="Nhập bình luận vô đây"
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
      {isWriteReview ? <Divider className="mt-5 mb-2" /> : null}
      <div className=" w-full h-full space-y-5">
        <span className=" text-2xl font-medium">
          Bình luận {`(${comments?.length})`}
        </span>
        {commentsList?.[page].map((item, index) => (
          <div key={index}>
            <CommentItem comment={item} />
          </div>
        ))}
        <div>
          {comments && comments?.length > 3 ? (
            <Pagination
              total={Math.round(comments?.length! / 3)}
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

export default PostComments;
