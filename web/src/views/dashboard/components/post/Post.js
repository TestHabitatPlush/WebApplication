import SectionContainer from "@/components/shared/SectionContainer";
import React from "react";
import CreatePost from "./CreatePost";
import ReplyPost from "./ReplyPost";

const Post = () => {
  return (
    <SectionContainer className="space-y-10">
      <CreatePost />
      <ReplyPost />
    </SectionContainer>
  );
};

export default Post;
