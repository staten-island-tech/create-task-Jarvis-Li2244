

document.addEventListener("DOMContentLoaded", () => {
    const DOMSelectors = {
        howtoplay: document.querySelector(".how-to-play"),
        rollbutton: document.querySelector(".roll-button"),
        dice: document.querySelectorAll(".dice"),
        player_a_buttons: document.querySelectorAll(".column-buttons-a"),
        player_b_buttons: document.querySelectorAll(".column-buttons-b"),
        
    }

    let player_a_score = {
        ones: [],
        twos: [],
        threes: [],
        fours: [],
        fives: [],
        sixes: [],
        bonus: [],
        three_of_a_kind: [],
        four_of_a_kind: [],
        full_house: [],
        small_straight: [],
        large_straight: [],
        yahtzee: [],
        chance: [],
        total: []
    }

    let player_b_score = {
        ones: [],
        twos: [],
        threes: [],
        fours: [],
        fives: [],
        sixes: [],
        bonus: [],
        three_of_a_kind: [],
        four_of_a_kind: [],
        full_house: [],
        small_straight: [],
        large_straight: [],
        yahtzee: [],
        chance: [],
        total: []
    }

    let dice_list = [
        {   
            name: "dice_1",
            value: [1],
            position: "keep"
        },
        {   
            name: "dice_2",
            value: [],
            position: "roll"
        },
        {   
            name: "dice_3",
            value: [],
            position: "roll"
        },
        {   
            name: "dice_4",
            value: [],
            position: "roll"
        },
        {   
            name: "dice_5",
            value: [],
            position: "roll"
        }
    ]

    function updateDice() {
        let dice = Array.from(DOMSelectors.dice)
        for (let i = 0; i < 5; i++) {
            dice[i].firstElementChild.setAttribute("src",`./images/dice-${dice_list[i].value[0]}.png`)
        }
    }

    function updateButton(button, x) {
        if (x == "a") {
            button.setAttribute("class", "column-buttons-a  bg-violet-400 rounded-lg flex items-center justify-evenly text-black")
        } else {
            button.setAttribute("class", "column-buttons-b  bg-violet-400 rounded-lg flex items-center justify-evenly text-black")
        }

        button.disabled = true

        if (button.firstElementChild.getAttribute("class") == "player-one text-1xl font-bold") {
            let ones = 0
            for (let i = 0; i < 5; i++) {
              if (dice_list[i].value[0] == 1)
                ones += 1
            }
            button.firstElementChild.textContent = ones

        }
    }


    DOMSelectors.howtoplay.addEventListener("click", function(event) {
                // fill this in, comment for later
            })

    DOMSelectors.player_a_buttons.forEach(button => button.disabled = true)
    DOMSelectors.player_b_buttons.forEach(button => button.disabled = true)

    let turn = 1

    function startGame() {

        function turnStart(turn) {
            // fix all of this dumb dark and disable buttons
            if (turn == 1) {
                DOMSelectors.player_a_buttons.forEach(button => button.disabled = false)

                DOMSelectors.player_b_buttons.forEach(button => button.disabled = true)
                DOMSelectors.player_b_buttons.forEach(button => button.classList.add("dark"))
            } else {
                DOMSelectors.player_b_buttons.forEach(button => button.disabled = false)

                DOMSelectors.player_a_buttons.forEach(button => button.disabled = true)
                DOMSelectors.player_a_buttons.forEach(button => button.classList.add("dark"))
            } 


            let roll_count = 0
            DOMSelectors.rollbutton.addEventListener("click", function(event) {
                if (roll_count < 3) {
                    for (let i = 0; i < 5; i++) {
                        if (dice_list[i].position == "roll") {
                            dice_list[i].value = []
                            dice_list[i].value.push(Math.floor(Math.random() * (6 - 1 + 1) ) + 1)
                        }
                    }
                    updateDice()
                }
                roll_count += 1
                if (roll_count >= 3) {
                    DOMSelectors.rollbutton.disabled = true
                    DOMSelectors.rollbutton.classList.add("dark")
                }
            })
            
            DOMSelectors.player_a_buttons.forEach(button => button.addEventListener("click", function(event) {
                turnEnd(button, "a")
            }))
            DOMSelectors.player_a_buttons.forEach(button => button.addEventListener("click", function(event) {
                turnEnd(button, "b")
            }))
            
            function turnEnd(button) {
                updateButton(button)
                DOMSelectors.rollbutton.classList.remove("dark")
                if (turn == 1) {
                    DOMSelectors.player_b_buttons.forEach(button => button.classList.remove("dark"))
                } else {
                    DOMSelectors.player_a_buttons.forEach(button => button.classList.remove("dark"))
                }
                startGame()
            }
            // end turn when one of the buttons are clicked, update values, run start game function, remove dark classes, yeah
        
        }
        
        function gameEnd() {

        }

        turnStart(turn)
        turn *= -1
    }

    startGame()















})

