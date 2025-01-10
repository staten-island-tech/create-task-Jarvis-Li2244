

document.addEventListener("DOMContentLoaded", () => {
    const DOMSelectors = {
        howtoplay: document.querySelector(".how-to-play"),
        rollbutton: document.querySelector(".roll-button")
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

    let dice = [
        {   
            name: "dice_1",
            value: [5],
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
    
    function startGame() {

        function gameTurn() {
            DOMSelectors.howtoplay.addEventListener("click", function(event) {
                
            })

            let roll_count = 0
            DOMSelectors.rollbutton.addEventListener("click", function(event) {
                roll_count += 1
                if (roll_count < 3) {
                    for (let i = 0; i < 5; i++) {
                        if (dice[i].position == "roll") {
                            dice[i].value = []
                            dice[i].value.push(Math.floor(Math.random() * (6 - 1 + 1) ) + 1)
                        }
                    }
                } else {
                    DOMSelectors.rollbutton.disabled = true
                    DOMSelectors.rollbutton.classList.add("dark")
                }
            })
        }

        function gameEnd() {

        }
    }

















})

