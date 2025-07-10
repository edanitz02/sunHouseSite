import { useEffect, useRef, useState } from 'react';
import './Game.css';
import background from './planets/game-background.jpg';
import levelButton from './planets/levelButton.jpeg';

function drawButton(ctx, img, x, y, size, label) {
    ctx.drawImage(img, x, y, size, size);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, x + size / 2, y + size / 2 + 6);
}

function buildHome(ctx, assets, setScreen) {
    // draw background image
    ctx.drawImage(assets.background, 0, 0, 800, 600);
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
        { label: "Play", x: 350, y: 200, screen: "levelSelect" },
        { label: "Settings", x: 350, y: 320, screen: "settings" },
        { label: "How to Play", x: 350, y: 440, screen: "howTo" },
    ];
    // draw buttons and set click targets
    buttons.forEach(({ label, x, y, screen }) => {
        drawButton(ctx, assets.button, x, y, 100, label);
        assets.clickTargets.push({ x, y, width: 100, height: 100, action: () => setScreen(screen) });
    });
}

function buildSettings(ctx, assets, setScreen) {
    ctx.drawImage(assets.background, 0, 0, 800, 600);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Settings", 400, 100);
    drawButton(ctx, assets.button, 350, 500, 100, "Back");
    assets.clickTargets.push({ x: 350, y: 500, width: 100, height: 100, action: () => setScreen("home") });
}

function buildHowTo(ctx, assets, setScreen) {
    ctx.drawImage(assets.background, 0, 0, 800, 600);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Tap space to flap. Avoid pipes.", 400, 300);
    drawButton(ctx, assets.button, 350, 500, 100, "Back");
    assets.clickTargets.push({ x: 350, y: 500, width: 100, height: 100, action: () => setScreen("home") });
}

function buildLevelSelect(ctx, backImage) {

}

export function Game() {
    const game = useRef(null); // reference for dom object for canvas for game
    const [screen, setScreen] = useState("home"); // keeps track of which screen

    // height and width
    const gameHeight = 600;
    const gameWidth = 800;

    // load images in assets array
    const assets = useRef({
        background: new Image(),
        button: new Image(),
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
                else ctx.fillText("Unknown screen", 400, 300);
            };

            // only draw once both images are loaded
            if (a.background.complete && a.button.complete) {
                render();
            } else {
                a.background.onload = render;
                a.button.onload = render;
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
    }, []);


    return (
        <canvas ref={game}></canvas>
    );
}

