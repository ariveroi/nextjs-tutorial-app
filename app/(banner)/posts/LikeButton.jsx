"use client";
import React, { useState } from "react";

//Intentar que el solo las partes pequeñas sean componentes muy pequeños

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "Me ha gustado" : "Me gusta"}
    </button>
  );
};

export default LikeButton;
