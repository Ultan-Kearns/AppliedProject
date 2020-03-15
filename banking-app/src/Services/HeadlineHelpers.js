export function getHeadlines(numberOfArticles) {
    const axios = require("axios").default;

axios
  .get(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e9cdf3a801374e4eba79b8ea0552a4bd"
  )
  .then(res => {
    for (var i = 0; i < numberOfArticles; i++) {
      //create LI element then form statment then append to LI then add to list
      var node = document.createElement("LI");
      var headlineText = document.createTextNode(
        res.data.articles[i].title
      );
      var descriptionText = document.createTextNode(
        res.data.articles[i].description
      );
      var authorText = document.createTextNode(
        "Author: " + res.data.articles[i].author
      );
      //check if desc or author === null
      if (descriptionText.textContent === "null") {
        descriptionText = document.createTextNode(
          "No description could be find for this story"
        );
      }
      if (authorText.textContent === "Author: null") {
        authorText = document.createTextNode("Author: Unknown");
      }
      if (i % 2 === 0) {
        node.id = "headlinesEven";
      } else {
        node.id = "headlinesOdd";
      }
      node.className = "headlines";
      var image = document.createElement("IMG");
      image.src = res.data.articles[i].urlToImage;
      image.alt = "Picture not available";
      var link = document.createElement("A");
      link.href = res.data.articles[i].url;
      link.target = "_blank"
      link.text = "Link to article";
      var br = document.createElement("BR");
      node.append(headlineText);
      node.append(br);
      node.appendChild(br.cloneNode());
      node.append(descriptionText);
      node.appendChild(br.cloneNode());
      node.appendChild(br.cloneNode());
      node.append(authorText);
      node.appendChild(br.cloneNode());
      node.appendChild(br.cloneNode());
      node.append(link);
      node.appendChild(br.cloneNode());
      node.append(image);
      document.getElementById("financial").appendChild(node);
    }
  })
  .catch(error => {
    alert("Having issues getting your news from NewsAPI");
  });

}
