import React, { Component } from 'react'
import './Liberal.scss'
import Tile from '../tiles/Tile';
import liberalTile from './liberal_tile.png'
import fascistTile from './fascist_tile.png'

export default class Liberal extends Component {
    constructor(props){
        super(props);

        var max = 5;

        if (this.props.type === "Fascist"){
            max = 6;
        }

        this.state = {
            tilesFull: this.props.tiles,
            maxTiles: max
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ tilesFull: nextProps.tiles})
    }

    tile_setup(params) {
        const tiles = [];
        const src = this.props.type === "Liberal" ? liberalTile : fascistTile
        const tile_img = <img src={ src } alt="tile"/>
        for(var i = 0; i < this.state.maxTiles; i++){
            if(i < this.state.tilesFull){
                tiles.push(<Tile key={i}>{tile_img}</Tile>)
            } else {
                tiles.push(<Tile/>)
            }
        }
        return tiles;
    }
    render() {
        const Tiles = this.tile_setup();
        const innerClassName = "inner-border" + (this.props.type==='Fascist' ? '-fascist' : "") 

        return (
            <div class="outside-border">
                <h1>{this.props.type}</h1>
                <div className={innerClassName}>
                    {Tiles}
                </div>
            </div>
        )
    }
}

