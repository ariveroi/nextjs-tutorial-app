import Link from "next/link";
import React from "react";

const fetchSinglePost = (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: {
      revalidate: 10, //Recupera los datos (hace fetch de datos) cada 10 segundos
    },
  }).then((res) => res.json());
};

const Post = async ({ children, params }) => {
  const { id } = params;
  const post = await fetchSinglePost(id);
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link href={`posts/${id}/comments`}>Ver comentarios</Link>
      {children}
    </article>
  );
};

export default Post;
