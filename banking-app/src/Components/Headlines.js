import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/Headlines.css"
class Headlines extends React.Component {
  componentDidMount() {
    const axios = require("axios").default;
    /*
    Pulling data from newsapi.org
    then render App page
    */
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e9cdf3a801374e4eba79b8ea0552a4bd"
      )
      .then(res => {
        for (var i = 0; i < res.data.articles.length; i++) {
          //create LI element then form news article then append to LI then add to list
          var node = document.createElement("LI");
          node.id = "headline";
          var text = document.createTextNode(
            "Headline: " +
              res.data.articles[i].title +
              "Description: " +
              res.data.articles[i].description  +
              "Author: " +
              res.data.articles[i].author
          );
          var image = document.createElement("IMG");
          image.src = res.data.articles[i].urlToImage;
          image.alt = "Picture not available";
          var link = document.createElement("A");
          link.href = res.data.articles[i].url;
          link.text = "Link to article";
          node.append(text);
          node.append(link);
          node.append(image);
          document.getElementById("financial").appendChild(node);
        }
       });
       axios
         .get(
           "https://www.reddit.com/r/wallstreet/.json"
         )
         .then(res => {
           for (var i = 0; i < res.data.data.children.length; i++) {
             var node = document.createElement("LI");
             node.id = "reddit_headlines";
             var text = document.createTextNode(
                 "Headline: " + res.data.data.children[i].data.title + " " + res.data.data.children[i].data.selftext
             );
             var link = document.createElement("A");
             link.href = res.data.data.children[i].data.url
             link.text = "Link to article";
             var image = document.createElement("IMG");
             image.src = res.data.data.children[i].data.thumbnail
             image.alt = "Picture not available";
             image.height = res.data.data.children[i].data.thumbnail_height
             image.width = res.data.data.children[i].data.thumbnail_width
             node.append(text)
             node.append(link)
             node.append(image)
             document.getElementById("reddit").appendChild(node);
           }
          });
  }

  render(){
    return(
    <div className="Headlines">
    <Helmet>
      <title>Latest Financial News</title>
    </Helmet>
      <h1>Latest Financial News</h1>
      <h2>News from NewsAPI</h2>
      <ul id = "financial">
      </ul>
      <h2>News From /r/wallstreet</h2>
      <ul id = "reddit">
      </ul>
    </div>
  );
}
}

export default Headlines;
