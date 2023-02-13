// function to represent the entire simon Game 
function simon(level = 0, maxLevel = 30, patternSpeed = 1000, hideSpeed = 500, playerClick = -1, color, playerPattern = [], compPattern = [], mainColors = ['green', 'red', 'yellow', 'blue']) {

    // each color is interactive
    document.querySelectorAll('div.block').forEach(index => document.getElementById(index.id).addEventListener('click', (colorblock) => {
        // gets the id of the colorblock clicked
        color = colorblock.target.id
        // each click on a color increases playerClick
        playerClick++
        console.log(playerClick); // player click increases to record/track how many times player clicked
        // lights up the color clicked
        clickPattern(color)
        // checks if its in the pattern
        checkPattern(color)
    }))

    // resets the game
    const reset = (mode) => {

        if (mode == 'newGame') {
            // initializes variables
            playerClick = -1
            compPattern = []
            playerPattern = []
            document.getElementById('level').innerHTML = `Level ${level = 0}/${maxLevel}`
            // allows both sides to be clicked 
            document.getElementById('p1').style.pointerEvents = 'auto'
            document.getElementById('p2').style.pointerEvents = 'auto'
            // continues the pattern of colors
            continuePattern()
        }

        if (mode == 'matched') {
            // initializes the player pattern so player can repeat
            playerClick = -1
            playerPattern = []
            // goes on to the next pattern
            continuePattern()
        }

        if (mode == 'notMatched') {
            // initializes variables
            level = 0
            playerClick = -1
            compPattern = []
            playerPattern = []
            // the start button and the colors are clickable
            document.getElementById('start').disabled = false
            document.getElementById('start').style.pointerEvents = 'auto'
            document.getElementById('p1').style.pointerEvents = 'auto'
            document.getElementById('p2').style.pointerEvents = 'auto'
            document.getElementById('level').innerHTML = `Game Over`
        }

    }

    // configures the pattern
    const checkPattern = (color) => {
        // adds to the player pattern array (player click)
        playerPattern.push(color)
        console.log(playerPattern); // shows the players click being recorded and pushed

        // compares clicked color to the computer color ( checks if it matches the pattern generated)
        if (color === compPattern[playerClick]) {
            // then i'm comparing the length of both patterns
            if (playerPattern.length === compPattern.length) {
                // setting a timer to move onto the next level
                let matchTimer = setTimeout(reset, patternSpeed, 'matched')
            }
        }

        else {
            // if the pattern is wrong; reset everything
            reset('notMatched')
            // all colorBlocks lighs up and lights off by looping through the 4 colorBlocks
            mainColors.forEach(index => {
                // activates 1st state (on)
                document.getElementById(index).classList.toggle(`bg-opacity-100`)
                // a timer to activate the 2nd state (off)
                setTimeout(() => { document.getElementById(index).classList.toggle(`bg-opacity-100`) }, hideSpeed)
            })
        }

    }

    // allows for next level/pattern
    const continuePattern = () => {
        // only the start button cannot be clicked
        document.getElementById('start').disabled = true
        document.getElementById('start').style.pointerEvents = 'none'
        // level increases every pattern
        document.getElementById('level').innerHTML = `Level ${level++}/${maxLevel}`

        // when level is maxed out
        if (level > maxLevel) {
            // both sides cannot be clicked
            document.getElementById('p1').style.pointerEvents = 'none'
            document.getElementById('p2').style.pointerEvents = 'none'
            // button can be clicked now
            document.getElementById('start').disabled = false
            document.getElementById('start').style.pointerEvents = 'auto'
            console.log("level is max"); // pops up shortly after
        }

        else {
            // picks a random color and adds to compPattern array
            color = mainColors[Math.floor(Math.random() * mainColors.length)]
            compPattern.push(color)
            // this shows the next pattern to player
            clickPattern(color)
        }

    }

    // color highlights
    const clickPattern = (color) => {
        // this is the timer to show the color with a delay
        let delay = setTimeout(() => {
            // toggle has 2 states (on or off) calling toggle once turns it on, call it again it turns it off
            const show = setTimeout(() => document.getElementById(color).classList.toggle(`bg-opacity-100`), hideSpeed)
            document.getElementById(color).classList.toggle(`bg-opacity-100`)
            // audio gets played for each color
            let simonSounds = new Audio(`audio/${color}.mp3`)
            simonSounds.play()
        }, hideSpeed / 2)

    }

    // event listener for start button
    document.getElementById('start').addEventListener('click', () => {
        // increases level/pattern when its at 0
        if (level === 0) {
            continuePattern()
        }

        // allows for a new game once player reaches max level
        if (level > maxLevel) {
            console.log("starting new game...");
            reset('newGame')
        }

    })

}
// you can choose the maximum level for simon
const activateSimon = new simon(level = 0, maxLevel = 2023, patternSpeed = 1000, hideSpeed = 500)