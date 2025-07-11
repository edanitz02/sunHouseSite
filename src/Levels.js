
export function Game1(canvas, ctx, assets, setScreen) {
    const width = canvas.width;
    const height = canvas.height;
    const gravity = 0.6;

    let ship = { // hardcoded
        x: width/6,
        y: height/2,
        width: 50, // hardcoded for ships dimensions
        height: 47,
        velocity: 0
    }

    // draw the initial screen
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(assets.levelBackground, 0, 0, width, height);

    // set game loop for gravity
    requestAnimationFrame(update);
    function update() {
        requestAnimationFrame(update);

        // clear and draw background
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(assets.levelBackground, 0, 0, width, height);

        // apply gravity to ship
        ship.velocity = Math.min(ship.velocity + gravity, 14);
        ship.y += ship.velocity;

        // draw ship
        ctx.drawImage(assets.rocketship, ship.x, ship.y, ship.width, ship.height);
    }
    // ship movement
    document.addEventListener("keydown", moveShip);
    function moveShip(e) {
        if(e.code === "Space") {
            ship.velocity -= 8;
        }
        else if(e.code === "KeyW") {
            ship.velocity -= 6;
        }
        else if(e.code === "KeyP") {
            ship.velocity -= 4;
        }
    }

    // set game loop for moving background

    // define timer for different sheet music rotations (song speeds up?)

    // add pause functionality

    // 
}

