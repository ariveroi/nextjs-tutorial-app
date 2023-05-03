import React from "react";
import Image from "next/image";

const fetchComments = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //   throw new Error("Error");
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    next: {
      revalidate: 10, //Recupera los datos (hace fetch de datos) cada 10 segundos
    },
  }).then((res) => res.json());
};

const Comments = async ({ params }) => {
  const { id } = params;
  const comments = await fetchComments(id);
  return (
    <ul style={{ fontSize: "15px", background: "#eee" }}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <Image
            src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${comment.email}`}
            alt={comment.name}
            width="50"
            height="50"
          />
          <h4>{comment.name}</h4>
          <small>{comment.body}</small>
        </li>
      ))}
    </ul>
  );
};

export default Comments;
