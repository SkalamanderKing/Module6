import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar title="hej" />
        <Jumbotron />

        <section className="container">
          <div className="row">
            <figure className="col-xs-4">
              <p className="mqtx">Birdy</p>
              <img id="bild" src= {require('./components/birdy3D.png') } className="img-rounded" alt="Birdy2" width="384" height="384" />
            </figure>
            <main>
              <h3>Hello, on this site you will find some cool games! </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisl ipsum, luctus rutrum tellus vel, mollis fringilla mauris. Nullam sagittis tristique arcu, vel euismod urna elementum ac. Fusce in tortor ac mauris elementum porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc commodo purus at mi venenatis scelerisque. Mauris ornare tincidunt mauris, eu viverra elit imperdiet ut. Nullam varius gravida sagittis. Vestibulum mollis metus ac purus hendrerit dignissim. 
                Morbi convallis vulputate elit ac tincidunt. Praesent ornare consectetur ligula id consectetur. Proin tincidunt porta velit eu tempus. Nullam quis nibh tincidunt, sagittis erat sed, ultricies ligula. Integer gravida ultricies nisi. Curabitur ac ex imperdiet turpis vestibulum blandit. Donec dapibus fermentum tristique.
                Maecenas facilisis ullamcorper odio, eu dictum ligula mattis sollicitudin. Ut elementum imperdiet ante, non ornare lorem consectetur in. Fusce finibus nunc ac est euismod accumsan. Cras sit amet nulla vitae lorem mattis faucibus. Nulla nec facilisis dui. Curabitur vitae leo orci. Morbi lacinia eu enim et tincidunt. Fusce eleifend ut leo nec scelerisque. Donec mollis maximus finibus.
                Phasellus maximus ante ac neque congue, sed mollis libero luctus. Fusce sed risus nec risus iaculis viverra. Nullam tristique orci ac dui tincidunt, at viverra libero volutpat. Aliquam rutrum tellus id tincidunt euismod. Nullam tempus velit ac urna aliquam, ac interdum lacus luctus. Proin tempor condimentum cursus. Suspendisse lobortis aliquet nulla, sed tempus orci maximus id. Nunc eu eros porttitor, pellentesque lorem at, consequat sapien. Nulla facilisi. Donec non ipsum molestie, pulvinar massa at, aliquam erat. Praesent ut luctus arcu. Fusce convallis dictum tortor vel sodales.
                Aliquam vulputate a enim nec laoreet. Vivamus tincidunt ut augue id laoreet. Mauris tempor viverra laoreet. Suspendisse potenti. Duis aliquet nisl elit, a dictum elit posuere non. Nam sed rhoncus leo. Cras pulvinar consequat condimentum. Phasellus elit sem, cursus sed sapien quis, varius sollicitudin.</p>
            </main>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
