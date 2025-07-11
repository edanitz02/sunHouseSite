import { useEffect, useRef, useState } from 'react';
import './Game.css';
import background from './planets/game/game-background.jpg';
import levelButton from './planets/game/levelButton.jpeg';
import levelBackground from './planets/game/levelBackground.jpg';
import rocketship from './planets/rocketship.webp';
import { Game1 } from './Levels.js';

function drawButton(ctx, img, x, y, size, label) {
    ctx.drawImage(img, x, y, size, size);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, x + size / 2, y + size / 2 + 6);
}

function buildHome(ctx, assets, setScreen) {
    // draw background image
    ctx.drawImage(assets.background, 0, 0, 800, 450);
    // draw title
    ctx.strokeStyle = "#0492c2";
    ctx.fillStyle = "#0492c2";
    ctx.font = "5rem Droid Sans"
    ctx.textAlign = "center";
    ctx.fillText("Zach Zach hcaZ", 400, 125); // into the games
    ctx.font = "5.2rem Droid Sans";
    ctx.strokeText("Zach Zach hcaZ", 400, 128);

    // define buttons
    const buttons = [
        { label: "Play", x: 150, y: 250, screen: "levelSelect" },
        { label: "Settings", x: 350, y: 250, screen: "settings" },
        { label: "How to Play", x: 550, y: 250, screen: "howTo" },
    ];
    // draw buttons and set click targets
    buttons.forEach(({ label, x, y, screen }) => {
        drawButton(ctx, assets.button, x, y, 100, label);
        assets.clickTargets.push({ x, y, width: 100, height: 100, action: () => setScreen(screen) });
    });
}

function buildSettings(ctx, assets, setScreen) {
    // background image
    ctx.drawImage(assets.background, 0, 0, 800, 450);
    // title
    ctx.fillStyle = "#0382c2";
    ctx.font = "5rem Fira Sans";
    ctx.textAlign = "center";
    ctx.fillText("Settings", 400, 100);

    // set buttons
    // TODO: switch key controls
    // TODO: volume controls
    drawButton(ctx, assets.button, 350, 350, 100, "Back");
    assets.clickTargets.push({ x: 350, y: 350, width: 100, height: 100, action: () => setScreen("home") });
}

function buildHowTo(ctx, assets, setScreen) {
    // background image
    ctx.drawImage(assets.background, 0, 0, 800, 450);
    // title
    ctx.fillStyle = "#0382c2";
    ctx.font = "5rem Fira Sans";
    ctx.textAlign = "center";
    ctx.fillText("How To Play", 400, 100);
    // write game rules
    ctx.fillStyle = "#2982c2";
    ctx.font = "1.5rem Arial";
    ctx.fillText("Can you read drumming sheet music?", 400, 175);
    ctx.fillText("You'll be pressing 'w', 'p', and 'space' in time with the song.", 400, 225);
    ctx.fillText("'w' is snare, 'p' is cymbal, and 'space' is bass drum.", 400, 275);
    ctx.font = "1rem Arial";
    ctx.fillText("There's totally gravity in space..", 400, 315);
    // back button
    drawButton(ctx, assets.button, 350, 350, 100, "Back");
    assets.clickTargets.push({ x: 350, y: 350, width: 100, height: 100, action: () => setScreen("home") });
}

function buildLevelSelect(ctx, assets, setScreen) {
    // background image
    ctx.drawImage(assets.background, 0, 0, 800, 450);
    // define buttons
    // even spacing x: 83, 226, 369, 512, 655, y: 110, 280
    const buttons = [
        { label: "Back", x: 0, y: 0, size: 50, screen: "home" },
        { label: "1", x: 84, y: 92, size: 60, screen: "game1" },
        { label: "3", x: 223, y: 116, size: 60, screen: "home" },
        { label: "2", x: 370, y: 101, size: 60, screen: "home" },
        { label: "4", x: 516, y: 86, size: 60, screen: "home" },
        { label: "5", x: 649, y: 139, size: 60, screen: "home" },
        { label: "6", x: 85, y: 299, size: 60, screen: "home" },
        { label: "7", x: 231, y: 265, size: 60, screen: "home" },
        { label: "8", x: 361, y: 305, size: 60, screen: "home" },
        { label: "9", x: 508, y: 280, size: 60, screen: "home" },
        { label: "10", x: 657, y: 296, size: 60, screen: "home" },
    ];

    // draw buttons and set click targets
    buttons.forEach(({ label, x, y, size, screen }) => {
        drawButton(ctx, assets.button, x, y, size, label);
        assets.clickTargets.push({ x, y, width: size, height: size, action: () => setScreen(screen) });
    });
}

function selectGameLevel(screen, canvas, ctx, assets, setScreen) {
    switch (screen) {
        case "game1":
            Game1(canvas, ctx, assets, setScreen);
            break;
        default:
            console.log("No level selected");
    }
}

export function Game() {
    const game = useRef(null); // reference for dom object for canvas for game
    const [screen, setScreen] = useState("home"); // keeps track of which screen

    // height and width
    const gameHeight = 450;
    const gameWidth = 800;

    // load images in assets array
    const assets = useRef({
        background: new Image(),
        button: new Image(),
        levelBackground: new Image(),
        rocketship: new Image(),
        clickTargets: [],
    });


    // sets up screen
    useEffect(() => {
        // get dom reference to canvas
        const canvas = game.current;
        if(canvas) {
            // set height and width of canvas
            canvas.height = gameHeight;
            canvas.width = gameWidth;
            const ctx = canvas.getContext("2d"); // to draw on canvas

            const a = assets.current;
            a.clickTargets = []; // clear old targets

            // once images are loaded, render the correct screen
            const render = () => {
                a.clickTargets = [];
                if (screen === "home") buildHome(ctx, a, setScreen);
                else if (screen === "settings") buildSettings(ctx, a, setScreen);
                else if (screen === "howTo") buildHowTo(ctx, a, setScreen);
                else if (screen === "levelSelect") buildLevelSelect(ctx, a, setScreen);
                else if (screen.startsWith("game")) selectGameLevel(screen, canvas, ctx, a, setScreen); // choose which level to load
                else ctx.fillText("Unknown screen", 400, 300);
            };

            // only draw once all images are loaded
            if (a.background.complete && a.button.complete && a.levelBackground.complete && a.rocketship.complete) {
                render();
            } else {
                a.background.onload = render;
                a.button.onload = render;
                a.levelBackground.onload = render;
                a.rocketship.onload = render;
            }

            // set the places on the canvas where clicks do stuff
            const handleClick = (e) => {
                const rect = canvas.getBoundingClientRect(); // canvas position on screen
                const scaleX = canvas.width / rect.width;    // ratio of actual canvas to displayed canvas
                const scaleY = canvas.height / rect.height;

                const x = (e.clientX - rect.left) * scaleX;
                const y = (e.clientY - rect.top) * scaleY;

                // check if click is within any click targets
                for (const target of a.clickTargets) {
                    const withinX = x >= target.x && x <= target.x + target.width;
                    const withinY = y >= target.y && y <= target.y + target.height;
                    if (withinX && withinY) {
                        target.action(); // run action if clicked
                        break;
                    }
                }
            };

            // event listener when user clicks
            canvas.addEventListener("click", handleClick);

            // Clean up when component unmounts
            return () => {
                canvas.removeEventListener("click", handleClick);
            };
        }
        else {
            console.log("Error loading canvas element");
        }
    }, [screen]); // re-runs this code when screen is changed

    // Load images once
    useEffect(() => {
        assets.current.background.src = background;
        assets.current.button.src = levelButton;
        assets.current.levelBackground.src = levelBackground;
        assets.current.rocketship.src = rocketship;
    }, []);

    // put a canvas in the dom
    return (
        <canvas ref={game}></canvas>
    );
}

