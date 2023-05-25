import React from "react";
import Link from "next/link";

const BlogCard = ({ data }) => {
  const { image, title, url, date } = data;
  return (
    <div className="latestBlogItem">
      <div className="lbi_thumb">
        <img src={image} alt={title} />
      </div>
      <div className="lbi_details">
        <Link href={url}>
          <span className="lbid_date">{date}</span>
        </Link>
        <h2>
          <Link href={url}>
            <span>{title}</span>
          </Link>
        </h2>
        <Link href={url}>
          <span className="learnM">Learn More</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
