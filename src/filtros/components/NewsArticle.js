import React from "react";

function NewsArticle({ data }) {
  return (
    <div className="news">
      <h4 className="news__title">{data.titulo}</h4>
      <p className="news__desc">{data.descripcion}</p>
      <span className="news__author">{data.autor}</span> <br />
      <span className="news__published">{data.publicado}</span>
      <span className="news__source">{data.fuente}</span>
    </div>
  );
}

export default NewsArticle;
