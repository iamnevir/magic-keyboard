"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Avatar, Chip, Divider, Skeleton } from "@nextui-org/react";
import { useQuery } from "convex/react";
import Error from "@/app/not-found";
import AnimateButton from "@/components/animate-button";
import { formatVietnameseDate } from "@/lib/utils";
import GenerateHtml from "@/lib/json-to-html";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import News from "@/components/root/news";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PostComments from "@/components/posts/post-comment";
export const PostDetail = ({ slug }: { slug: string }) => {
  const post = useQuery(api.post.getpostBySlug, { slug });
  const router = useRouter();
  const relatedPost = useQuery(api.post.getPostByType, { type: post?.type! });
  let index: number | undefined;
  let next: Doc<"post"> | undefined;
  let previous: Doc<"post"> | undefined;
  try {
    index = relatedPost?.indexOf(
      relatedPost?.find((p) => p._id === post?._id)!
    );
    next = relatedPost![index! + 1];
    previous = relatedPost![index! - 1];
  } catch (error) {}

  if (post === undefined) {
    return (
      <div className="max-w-[300px] w-full ml-20 mt-20 flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    );
  }
  if (!post) {
    return <Error />;
  }
  return (
    <>
      <div className=" sm:mx-[10dvw] mx-1 relative">
        <Image
          width={1000}
          height={600}
          src={post.thumnail}
          alt="thumnail"
          className=" object-cover rounded-[10px]"
        />
        <div className=" absolute left-0 top-0 w-28">
          <AnimateButton
            classNameFill="group-hover:bg-gradient-to-br from-indigo-500 to-pink-500 shadow-pink-500/30"
            text="back"
            className="dark:bg-transparent bg-transparent hover:shadow-md shadow-black/10"
          />
        </div>
      </div>
      <div className=" sm:mx-[15dvw] mx-1 rounded-[10px]">
        <div className=" flex items-center gap-5 my-5">
          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-indigo-500 to-pink-500 shadow-pink-500/30",
              content: "drop-shadow shadow-black text-white font-semibold",
            }}
          >
            {post.type === "news"
              ? "News"
              : post.type === "reviews"
              ? "Reviews"
              : "Guides"}
          </Chip>
          <span className=" font-semibold uppercase text-zinc-500">
            {formatVietnameseDate(post._creationTime)}
          </span>
        </div>
        <div className=" sm:text-5xl text-2xl font-semibold">{post.title}</div>
        <div className=" text-2xl font-semibold text-zinc-500">
          {post.subTitle}
        </div>
        <div className=" flex items-center gap-5 my-5">
          <Avatar
            showFallback
            className="shadow-md dark:shadow-slate-500 shadow-black/50 w-16 h-16 text-large"
          />
          <div className=" flex flex-col gap-2">
            <Chip
              variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white font-semibold",
              }}
            >
              Tác giả
            </Chip>
            <span className=" font-semibold">{post.author}</span>
          </div>
        </div>
        <GenerateHtml json={post.content} />

        <div className=" flex items-center gap-1 mt-5">
          Share:
          <Facebook className=" cursor-pointer" />
          <Twitter className=" cursor-pointer" />
          <Instagram className=" cursor-pointer" />
        </div>
        <Divider className=" my-5" />
        <div className=" flex items-center cursor-pointer justify-between gap-4">
          <div
            onClick={() => router.push(`/posts/${previous?._id}`)}
            className=" flex flex-col text-zinc-500 hover:text-white duration-500 items-end gap-1 sm:text-base text-xs"
          >
            PREVIOUS
            <div className=" flex items-center gap-2">
              <ChevronLeft className=" text-base" />
              <span className=" sm:text-base text-white text-xs">
                {previous ? previous?.title : "None"}
              </span>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div
            onClick={() => router.push(`/posts/${next?._id}`)}
            className=" flex flex-col text-zinc-500 hover:text-white duration-500 items-start gap-1 sm:text-base text-xs"
          >
            NEXT
            <div className=" cursor-pointer flex items-center gap-2">
              <span className=" sm:text-base text-white text-xs">
                {" "}
                {next ? next?.title : "None"}
              </span>
              <ChevronRight className=" text-base" />
            </div>
          </div>
        </div>
      </div>
      <div className=" py-10 mt-10 w-full justify-center flex flex-col">
        <span className=" text-2xl justify-center flex">
          Bài viết liên quan
        </span>
        <News className=" sm:w-full mt-10" news={relatedPost} />
      </div>
      <PostComments postId={post._id} />
    </>
  );
};
