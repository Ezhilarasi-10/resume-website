import { useState } from "react";

// Reusable Card component — uses useState to toggle liked / not liked
function Card({ title }) {
  const [liked, setLiked] = useState(false);

  function handleLike() {
    setLiked(!liked);
  }

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{liked ? "Liked" : "Not liked"}</p>
      <button onClick={handleLike} className={liked ? "liked" : ""}>
        {liked ? "Unlike" : "Like"}
      </button>
    </div>
  );
}

export default Card;
