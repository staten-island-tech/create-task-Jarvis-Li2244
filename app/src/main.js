

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

    let dice = {
        dice_1: {
            value: [],
            position: "roll"
        },
        dice_2: {
            value: [],
            position: "roll"
        },
        dice_3: {
            value: [],
            position: "roll"
        },
        dice_4: {
            value: [],
            position: "roll"
        },
        dice_5: {
            value: [],
            position: "roll"
        }
    }

    DOMSelectors.howtoplay.addEventListener("click", function(event) {
        
    })

    DOMSelectors.rollbutton.addEventListener("click", function(event) {
        let vals = []
        for (let i = 1; i < 6; i++) {
            vals.push([Math.floor(Math.random() * (6 - 1 + 1) ) + 1])
        }
        console.log(vals)
    })
















})

