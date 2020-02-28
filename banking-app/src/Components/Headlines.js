import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/Headlines.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
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
              res.data.articles[i].description +
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
      })
      .catch(error => {
        alert("Having issues getting your news from NewsAPI");
      });
    axios
      .get("https://www.reddit.com/r/wallstreet/.json")
      .then(res => {
        for (var i = 0; i < res.data.data.children.length; i++) {
          var node = document.createElement("LI");
          node.id = "reddit_headlines";
          var text = document.createTextNode(
            "Headline: " +
              res.data.data.children[i].data.title +
              " " +
              res.data.data.children[i].data.selftext
          );
          var link = document.createElement("A");
          link.href = res.data.data.children[i].data.url;
          link.text = "Link to article";
          var image = document.createElement("IMG");
          image.src = res.data.data.children[i].data.thumbnail;
          image.alt = "Picture not available";
          image.height = res.data.data.children[i].data.thumbnail_height;
          image.width = res.data.data.children[i].data.thumbnail_width;
          node.append(text);
          node.append(link);
          node.append(image);
          document.getElementById("reddit").appendChild(node);
        }
      })
      .catch(error => {
        alert("Having issues getting your news from reddit");
      });
  }

  render() {
    return (
      <div className="Headlines">
        <Helmet>
          <title>Latest Financial News</title>
        </Helmet>
        <h1>Latest news on finance from Reddit & NewsAPI</h1>
        <Accordion defaultActiveKey="1">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Click Here For Reddit News!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Text id="reddit" />
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Click Here For NewsAPI News!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Text id="financial" />
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default Headlines;
