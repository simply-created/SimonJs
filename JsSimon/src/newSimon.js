let game_level = 0
let mouse_clicks = -1
let computer_colors = []
let your_colors = []
let display_colors = []


const FINDID = id => document.getElementById(id);
const FINDQSA = selector => document.querySelectorAll(selector);
const MAXLEVEL = 2023


function clickColors(color) {

     const COLORID = FINDID(color.id)

     COLORID.addEventListener('click', (event) => {

          // tracks id of color clicked
          color = event.target.id
          checkPattern(color)
     })
}


function lightUp(color, include_audio = true) {

     let timer_speed = 500
     let color_opacity = 'bg-opacity-50'
     let color_sounds = new Audio(`audio/${color}.mp3`)


     // plays audio of the lighted up color
     if (include_audio === true) color_sounds.play()


     showsColor: setTimeout(
          () => FINDID(color).classList.toggle(color_opacity),

          timer_speed
     )

     hidesColor: setTimeout(
          () => FINDID(color).classList.toggle(color_opacity),

          timer_speed / 2
     )
}


function checkPattern(color) {

     mouse_clicks++

     // adds your color into the array
     your_colors.push(Number(color))

     lightUp(color)

     // your clicks gets compared to computer color clicks
     if (Number(color) === computer_colors[mouse_clicks]) {

          if (your_colors.length === computer_colors.length) {

               your_colors = []

               mouse_clicks = -1

               // pre increment level
               FINDID('level').innerHTML = `Level: ${++game_level}/${MAXLEVEL}`

               increasePattern(color)
          }

     } else {

          if (your_colors.length === computer_colors.length) {

               FINDID('level').innerHTML = `Game Over`
               FINDID('start').style.pointerEvents = 'auto'

          } else {

               FINDID('level').innerHTML = `Game Over`
               FINDID('start').style.pointerEvents = 'auto'
               FINDID('p1').style.pointerEvents = 'none'
               FINDID('p2').style.pointerEvents = 'none'

          }

     }
}


function increasePattern(color, pattern_speed = 800) {

     let i = 0
     let colors = [0, 1, 2, 3]

     FINDID('level').innerHTML = `Level: ${game_level}/${MAXLEVEL}`

     if (game_level !== MAXLEVEL) {

          // this is where pattern gets increased
          let next = setInterval(() => {

               // generates random number
               color = colors[Math.floor(Math.random() * colors.length)]

               // makes computer colors
               computer_colors.push(color)

               // avoids an extra push to computer colors
               // copies array into another array
               display_colors = [...computer_colors]

               // computer colors cannot exceed game level
               if (computer_colors.length > game_level) {

                    let show_increased_pattern = setInterval(

                         () => {

                              // replays values in this array
                              lightUp(display_colors[i++])

                              // for too many values shown
                              if (i > game_level) {

                                   i = 0

                                   clearInterval(show_increased_pattern)
                              }

                         }, pattern_speed)

                    clearInterval(next)
               }

          }, pattern_speed / 2)

     } else {

          FINDID('start').style.pointerEvents = "auto"

     }
}


function gameStarter() {

     if (game_level >= 0) {

          game_level = 0
          mouse_clicks = -1
          your_colors = []
          display_colors = []
          computer_colors = []

          FINDID('start').style.pointerEvents = "none"
          FINDID('p1').style.pointerEvents = 'auto'
          FINDID('p2').style.pointerEvents = 'auto'
          FINDID('level').innerHTML = `Level: ${game_level}/${MAXLEVEL}`
     }


     if (game_level === 0) increasePattern()

}


FINDID('start').addEventListener('click', gameStarter)
FINDID('p1').style.pointerEvents = 'none'
FINDID('p2').style.pointerEvents = 'none'


// applies each function to html tags with the block className
FINDQSA('div.block').forEach(clickColors)