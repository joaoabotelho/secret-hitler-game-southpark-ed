import React from 'react'
import './Tile.scss'                   

export default function Tile(props) {
    return (
        <div class="tile-border">
            {props.children}
        </div>
    )
}
