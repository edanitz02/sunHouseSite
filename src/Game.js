import { useEffect } from 'react';
import './Game.css';

export function Game() {
    let game;
    let context;

    // height and width
    let gameHeight = 600;
    let gameWidth = 800;

    useEffect(() => {
        game = document.getElementById("game");
        game.height = gameHeight;
        game.width = gameWidth;
        context = game.getContext("2d"); // to draw on canvas
        context.fillStyle = "blue";
        context.fillRect(0, 0, game.width, game.height);
    });


    return (
        <canvas id="game"></canvas>
    );
}

