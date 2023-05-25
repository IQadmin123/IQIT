import React from "react";

const authorImage = "https://picsum.photos/170/190"

const AuthorCard = () => {
  return (
    <div className="post_author">
      <img src={authorImage} alt="" />
      <h3>
        <a href="#">Christine Eve</a>
      </h3>
      <p>
        Lorem Ipsum is simply dummy text of the rinting and typesetting been the
        industry standard dummy text ever sincer nullam condimentum purus.
      </p>
      <a href="#">View all posts</a>
    </div>
  );
};

export default AuthorCard;
