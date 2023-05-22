import React, { useEffect } from "react";
import { useRouter } from "next/router";

const PortfolioCard = ({ data, action_btn }) => {
  const { project_name, category_type, image, title, categorie, url, id } =
    data;
  const category = ["App", "Design", " Web"];
  const router = useRouter();

  const hadndlePortfolio = (id) => {
    localStorage.setItem("portfolio_id", id);
    router.push(`/portfolio/portfolio?id=${id}`);
    console.log("Edit", id);
  };

  return (
    <div className={`singlefolio`}>
      <img src={image} alt={project_name} />
      <div className="folioHover">
        <p className="cate" style={{ color: "white" }}>
          {category[category_type - 1]}
        </p>
        <h4>
          <button
            className="project-name-btn"
            onClick={() => hadndlePortfolio(id)}
          >
            {project_name}
          </button>
        </h4>
      </div>      
    </div>
  );
};

export default PortfolioCard;
