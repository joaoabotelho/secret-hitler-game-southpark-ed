import React, { Component } from 'react';
import './App.scss';
import Liberal from './components/boards/Liberal';
import Button from 'react-bootstrap/Button';
import drawPile from './images/draw_pile.png'
import discardPile from './images/discard_pile.png'
import president from './images/president.png'
import chancelor from './images/chancelor.png'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liberal_tiles: 0,
      fascist_tiles: 0,
      tiles: [0, 0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], // 0 -> fascist tile // 1 -> liberal tile
      discard_tiles: [],
      presPosition: 1,
      chancPosition: null
    }

    this.baseState = this.state;

    this.handleDrawClick = this.handleDrawClick.bind(this);
    this.setChancelorPosition = this.setChancelorPosition.bind(this);
    this.handleFasInc = this.handleFasInc.bind(this);
    this.handleLibInc = this.handleLibInc.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  // HANDLE BUTTONS
  handleDrawClick() {
    if (this.state.chancPosition !== null) {
      var array = [...this.state.tiles];
      var disc_copy = [...this.state.discard_tiles]
      // check if draw pile as less than 3 tiles
      if (array.length < 3) {
        Array.prototype.push.apply(array, disc_copy)
        disc_copy = []
      }

      var random = Math.floor(Math.random() * array.length)
      // check if the index isnt bigger than length of array minus 3 
      // to always splice 3 elements from the array
      if (random > array.length - 3) {
        random = array.length - 3
      }

      // choose 3 tiles at random
      var element = array.splice(random, 3);
      this.setState({ tiles: array });

      // fascist tile
      if (element[0] === 0) {
        this.handleFasInc();
        // liberal tile
      } else if (element[0] === 1) {
        this.handleLibInc();
      }

      // rest of drawn tiles added to discard pile
      Array.prototype.push.apply(disc_copy, element.splice(1, 2))

      var presPos = this.state.presPosition;
      if(presPos === 5){
        presPos = 1;
      } else {
        presPos += 1;
      }
      this.setState({ 
        discard_tiles: disc_copy,
        presPosition: presPos,
        chancPosition: null
      })
    }
  }

  handleLibInc() {
    this.setState({ liberal_tiles: this.state.liberal_tiles + 1 })
  }

  handleFasInc() {
    this.setState({ fascist_tiles: this.state.fascist_tiles + 1 })
  }

  resetGame() {
    this.setState(this.baseState)
  }

  setChancelorPosition(e) {
    if(parseInt(e.target.id) !== this.state.presPosition){
      this.setState({chancPosition: parseInt(e.target.id)})
    }
  }

  setRoles(){
    var roles = []
    for(var i = 0; i < 5; i++) {
      if(i === this.state.presPosition-1){
        roles.push(<img class="role" src={president} alt="president"/>)
      } else if(i === this.state.chancPosition-1){
        roles.push(<img class="role" src={chancelor} alt="president"/>)
      } else {
        roles.push(<div class="role">-</div>)
      }
    }
    return roles;
  }

  Game(){
    if (this.state.fascist_tiles === 6) {
      return (
        <>
          <h1>FASCISTS WON</h1>
          <Button onClick={this.resetGame} variant="primary">Reset Game</Button>
        </>
      )
    }

    if (this.state.liberal_tiles === 5) {
      return (
        <>
          <h1>LIBERALS WON</h1>
          <Button onClick={this.resetGame} variant="primary">Reset Game</Button>
        </>
      );
    }
    var roles = this.setRoles()

    return (
      <>
        <h1 class="n-draw">{this.state.tiles.length}</h1>
        <h1 class="n-discard">{this.state.discard_tiles.length}</h1>
        <img onClick={this.handleDrawClick} src={drawPile} class="draw-pile" alt="drawPile" />
        <div class="main">
          <Liberal tiles={this.state.liberal_tiles} type={"Liberal"} />
          <Liberal tiles={this.state.fascist_tiles} type={"Fascist"} />
        </div>
        <img src={discardPile} class="discard-pile" alt="drawPile" /> 
        <div class="players">
          <div onClick={this.setChancelorPosition} class="player-1" id={1}>1</div>
          <div onClick={this.setChancelorPosition} class="player-2" id={2}>2</div>
          <div onClick={this.setChancelorPosition} class="player-3" id={3}>3</div>
          <div onClick={this.setChancelorPosition} class="player-4" id={4}>4</div>
          <div onClick={this.setChancelorPosition} class="player-5" id={5}>5</div>
        </div>
        <div class="players">
          {roles}
        </div>

      </>
    );
  }

  render() {
    return (
      this.Game()
    );
  }
}

export default App;
