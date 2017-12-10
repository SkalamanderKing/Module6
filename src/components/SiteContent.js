import React from "react";
import Container from "./Container";

export default function SiteContent() {
  return (
    <Container>
      <div className="row">
        <figure className="col-xs-4">
          <p className="mqtx">Birdy</p>
          <img
            id="bild"
            src={require("../img/birdy3D.png")}
            className="img-rounded"
            alt="Birdy2"
          />
        </figure>
        <main>
          <h3>Lorem! Ipsum dolor sit amet, consectetur adipiscing elit. </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisl
            ipsum, luctus rutrum tellus vel, mollis fringilla mauris. Nullam
            sagittis tristique arcu, vel euismod urna elementum ac. Fusce in
            tortor ac mauris elementum porttitor. Interdum et malesuada fames ac
            ante ipsum primis in
          </p>
          <form>
            <div className="form-group">
              {" "}
              <div className="col-xs-8" />
            </div>
          </form>
        </main>
      </div>
    </Container>
  );
}
