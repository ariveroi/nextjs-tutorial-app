import React from "react";
import Counter from "./posts/Counter";

const PostsLayout = ({ children }) => {
  return (
    <div>
      <marquee>Soy un crack</marquee>
      <small>Home &bull; Posts</small>
      {/* <Counter /> */}
      {children}
    </div>
  );
};

export default PostsLayout;
