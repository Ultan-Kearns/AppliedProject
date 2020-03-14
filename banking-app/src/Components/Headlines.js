import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/Headlines.css";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {getHeadlines} from "../Services/HeadlineHelpers.js"
class Headlines extends React.Component {
  componentDidMount() {
    const axios = require("axios").default;
    /*
    Pulling data from newsapi.org
    then render App page
    */
    getHeadlines(20)
    axios
      .get("https://www.reddit.com/r/wallstreet/.json")
      .then(res => {
        for (var i = 0; i < res.data.data.children.length; i++) {
          var node = document.createElement("LI");
          var text = document.createTextNode(
            res.data.data.children[i].data.title +
              " " +
              res.data.data.children[i].data.selftext
          );

          if (i % 2 === 0) {
            node.id = "reddit_headlinesEven";
          } else {
            node.id = "reddit_headlinesOdd";
          }
          node.className = "headlines";
          var link = document.createElement("A");
          link.href = res.data.data.children[i].data.url;
          link.text = "Link to article";
          var image = document.createElement("IMG");
          image.src = res.data.data.children[i].data.thumbnail;
          image.alt = "Picture not available";
          image.height = res.data.data.children[i].data.thumbnail_height;
          image.width = res.data.data.children[i].data.thumbnail_width;
          var br = document.createElement("BR");
          node.append(text);
          node.append(br);
          node.append(br.cloneNode());
          node.append(link);
          node.append(br.cloneNode());
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
