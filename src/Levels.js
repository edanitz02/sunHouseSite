let startAnimationFlag;
let keydownListener = null;
let currentStartAnimID = null;

function setStartAnimation(ctx, width, height, assets, ship) {
    startAnimationFlag = true;
    let animateIterator = 0;
    let animateBool = false;

    function startState() {
        // clear canvas
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(assets.levelBackground, 0, 0, width, height);

        if(animateBool) {
            if(animateIterator > 10) {
                animateBool = false;

            } else {
                animateIterator++;
                ship.velocity += 0.3;
            }
        } else {
            if(animateIterator < -10) {
                animateBool = true;
            } else {
                animateIterator--;
                ship.velocity -= 0.3;
            }
        }

        updateShip(ship, 0, 5, height);
        drawShip(ctx, ship, assets);

        currentStartAnimID = requestAnimationFrame(startState);
    }
    currentStartAnimID = requestAnimationFrame(startState);
}

function updateShip(ship, gravity, maxDrop, height) {
    // apply gravity to ship
    ship.velocity = Math.min(ship.velocity + gravity, maxDrop); // define MAX DROP speed
    // don't let ship go above wall
    ship.y = Math.max(ship.y + ship.velocity, 0);
    // don't let ship fall below
    if(ship.y > height - ship.height) ship.y = height - ship.height;
}

function drawShip(ctx, ship, assets) {
    const radians = 5 * ship.velocity * Math.PI / 180; // define rotation degree (radians)
    // save old context
    ctx.save();
    // move context to ship for rotation
    ctx.translate(ship.x + ship.width/2, ship.y + ship.height/2);
    // rotate
    ctx.rotate(radians);
    // move context back back
    ctx.translate(-ship.x - ship.width/2, -ship.y - ship.height/2);
    // draw ship
    ctx.drawImage(assets.rocketship, ship.x, ship.y, ship.width, ship.height);
    // restore old context
    ctx.restore();
}

function testUpdateShip(ship, gravity, maxDrop, width, height) {
    // apply gravity to ship
    ship.velocity = Math.min(ship.velocity + gravity, maxDrop); // define MAX DROP speed
    // don't let ship go above wall
    ship.y = Math.max(ship.y + ship.velocity, 0);
    // don't let ship fall below
    if(ship.y > height - ship.height) ship.y = height - ship.height;

    // move ship forward
    ship.x += 5;
    return ship.x >= width // move to next frame if reached end
}

export function tutorial(canvas, ctx, assets, setScreen) {
    // local global variables
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

    // set start animation
    setStartAnimation(ctx, width, height, assets, ship);    

    // set game loop for gravity
    function update() {
        // // clear and draw background
        // ctx.clearRect(0, 0, width, height);
        // ctx.drawImage(assets.levelBackground, 0, 0, width, height);

        // // update ship for this frame
        // updateShip(ship, gravity, 10, height);

        // // draw ship
        // drawShip(ctx, ship, assets);

        // FOR DRAWING THE BACKGROUND:
        if(testUpdateShip(ship, gravity, 10, width, height)) {
            ship.x -= width;
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(assets.levelBackground, 0, 0, width, height);
        }
        drawShip(ctx, ship, assets);

        requestAnimationFrame(update);
    }

    if(keydownListener) document.removeEventListener("keydown", keydownListener); // CLEAN UP MOVE ELSEWHERE

    // ship movement
    keydownListener = function (e) {
        if(e.code === "Space" && !startAnimationFlag) {
            if(ship.velocity > 0) ship.velocity = -8; // SET RISE: -8
            else ship.velocity = Math.max(-18, ship.velocity -8);
        }
        else if(e.code === "KeyW" && !startAnimationFlag) {
            if(ship.velocity > 0) ship.velocity = -6; // SET RISE: -6
            else ship.velocity = Math.max(-18, ship.velocity -6);
        }
        else if(e.code === "KeyP" && !startAnimationFlag) {
            if(ship.velocity > 0) ship.velocity = -4; // SET RISE: -4
            else ship.velocity = Math.max(-18, ship.velocity -4);
        }
        else if(e.code === "KeyD" && !startAnimationFlag) {
            if(ship.velocity < 0) ship.velocity = 0; // SET DROP
            else ship.velocity = Math.min(10, ship.velocity +2);
        }
        else if(e.code === "KeyQ" && startAnimationFlag) {
            startAnimationFlag = false;
            cancelAnimationFrame(currentStartAnimID);
            ship.velocity = 0;
            requestAnimationFrame(update);
        }
    };

    document.addEventListener("keydown", keydownListener);

    // set game loop for moving background

    // define timer for different sheet music rotations (song speeds up?)

    // add pause functionality

    // 
}


export function Game1(canvas, ctx, assets, setScreen) {
    const width = canvas.width;
    const height = canvas.height;
    const gravity = 0.4;

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
        ship.velocity = Math.min(ship.velocity + gravity, 4); // MAX DROP: 4
        // don't let ship go above wall
        //ship.y += ship.velocity;
        ship.y = Math.max(ship.y + ship.velocity, 0);
        // don't let ship fall below
        if(ship.y > height - ship.height) ship.y = height - ship.height;

        // draw ship
        ctx.drawImage(assets.rocketship, ship.x, ship.y, ship.width, ship.height);
    }
    // ship movement
    document.addEventListener("keydown", moveShip);
    function moveShip(e) {
        if(e.code === "Space") {
            ship.velocity = -8; // SET RISE: -8
        }
        else if(e.code === "KeyW") {
            ship.velocity = -6;
        }
        else if(e.code === "KeyP") {
            ship.velocity = -4;
        }
    }

    // set game loop for moving background

    // define timer for different sheet music rotations (song speeds up?)

    // add pause functionality

    // 
}

