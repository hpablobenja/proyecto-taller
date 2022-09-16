import { NewsContextProvider } from "./NewsContext";
import Newss from "./components/Newss";
import "./news.css";

function News() {
  return (
    <NewsContextProvider>
      <Newss/>
    </NewsContextProvider>
  );
}

export default News;
