import * as React from "react";
import "./Landing.scss";


export default class Landing extends React.Component {

  public render() {
    return (
      <div className="landing__container">
        <section className={"landing__intro-container"}>
          <h1 className={"landing__intro-header"}>Velkommen til Chatter {decodeURIComponent("%F0%9F%A5%B0")}</h1>
          < h3 className={"landing__intro-sub"}>En elegant, enkel, og litt over-engineered chatteapp.</h3>
        </section>
        <section className={"landing__about"}>
          <p className={"about__text"}>Chatter er bygget med React, Typescript, Node, Socket.io, SASS, Docker
            og Travis.</p>
          <a href={"https://github.com/tor0405/chatter"}><img className={"about__image"}
                                                              src={"./github.png"}/></a>
        </section>
      </div>
    );
  }

}




