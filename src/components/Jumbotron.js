import React from "react";
import Images from './Images.js';
import Container from "./Container";
export default function Jumbotron(props) {
  return (
    <section className="jumbotron">
      <Container>
        <div className="row text-center">
          <h1>WELCOME!</h1>
          <Images source={require('./birdy2.png') } style={{width: 256, height: 320}} alt="hej" />
          <div className="row" />
        </div>
      </Container>
    </section>
  );
}
