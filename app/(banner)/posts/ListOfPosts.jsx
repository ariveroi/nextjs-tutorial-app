import React from "react";
import LikeButton from "./LikeButton";
import Link from "next/link";

const fetchPost = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 10, //Recupera los datos (hace fetch de datos) cada 10 segundos
    },
  }).then((res) => res.json());
};

const ListOfPosts = async () => {
  const posts = await fetchPost();

  return (
    <>
      {posts.map((post) => (
        <article key={post.id}>
          <Link href="/posts/[id]" as={`/posts/${post.id}`}>
            <h2 style={{ color: "#09f" }}>{post.title}</h2>
            <p>{post.body}</p>
            <LikeButton id={post.id} />
          </Link>
          <hr />
        </article>
      ))}
    </>
  );
};

export default ListOfPosts;
