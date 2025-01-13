

document.addEventListener("DOMContentLoaded", () => {
    const DOMSelectors = {
        howtoplay: document.querySelector(".how-to-play"),
        closebutton: document.querySelector(".close-button"),
        rollbutton: document.querySelector(".roll-button"),
        dice: document.querySelectorAll(".dice"),
        player_a_buttons: document.querySelectorAll(".column-buttons-a"),
        player_b_buttons: document.querySelectorAll(".column-buttons-b"),
        player_a_total: document.querySelector(".player-a-score"),
        player_b_total: document.querySelector(".player-b-score"),
        newGame: document.querySelector(".newGame")
    }

    let player_a_score = {
        ones: [0],
        twos: [0],
        threes: [0],
        fours: [0],
        fives: [0],
        sixes: [0],
        bonus: [0],
        three_of_a_kind: [0],
        four_of_a_kind: [0],
        full_house: [0],
        small_straight: [0],
        large_straight: [0],
        yahtzee: [0],
        chance: [0],
        total: [0]
    }

    let player_b_score = {
        ones: [0],
        twos: [0],
        threes: [0],
        fours: [0],
        fives: [0],
        sixes: [0],
        bonus: [0],
        three_of_a_kind: [0],
        four_of_a_kind: [0],
        full_house: [0],
        small_straight: [0],
        large_straight: [0],
        yahtzee: [0],
        chance: [0],
        total: [0]
    }

    let dice_list = [
        {   
            name: "dice_1",
            value: [],
            position: "roll"
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
        for (let i = 0; i < dice_list.length; i++) {
            dice[i].firstElementChild.setAttribute("src",`./images/dice-${dice_list[i].value[0]}.png`)
            dice[i].firstElementChild.setAttribute("alt",`Dice with Value ${dice_list[i].value[0]}`)
        }
    }

    function resetDice() {
        let dice = Array.from(DOMSelectors.dice)
        for (let i = 0; i < dice_list.length; i++) {
            dice_list[i].value = []
            dice_list[i].position = "roll"
            dice[i].setAttribute("class", "dice w-[7vw] h-[7vw] rounded-2xl border-4 bg-white")
            dice[i].firstElementChild.setAttribute("src",`./images/dice-unknown.png`)
            dice[i].firstElementChild.setAttribute("alt",`Dice Unknown`)
        }
    }

    function updateTotal() {
        let total_a = 0
        for (let i in player_a_score){
            if (i != "ones" && i != "twos" && i != "threes" && i != "fours" && i != "fives" && i != "sixes" && i != "total") {
                total_a += player_a_score[i][0]  
            }
        }
        let total_b = 0
        for (let i in player_b_score){
            if (i != "ones" && i != "twos" && i != "threes" && i != "fours" && i != "fives" && i != "sixes" && i != "total") {
                total_b += player_b_score[i][0]
            }
        }
        player_a_score.total = [total_a]
        player_b_score.total = [total_b]

        DOMSelectors.player_a_total.textContent = player_a_score.total[0]
        DOMSelectors.player_b_total.textContent = player_b_score.total[0]
    }

    function updateBonus() {
        let bonus_a = 0
        for (let i in player_a_score) {
            if (i == "ones" || i == "twos" || i == "threes" || i == "fours" || i == "fives" || i == "sixes") {
                bonus_a += player_a_score[i][0]
            }
        }
        let bonus_b = 0
        for (let i in player_b_score) {
            if (i == "ones" || i == "twos" || i == "threes" || i == "fours" || i == "fives" || i == "sixes") {
                bonus_b += player_b_score[i][0]
            }
        }

        const bonus_div_a = document.getElementById("player-a-bonus")
        const bonus_div_b = document.getElementById("player-b-bonus")

        if (bonus_a >= 63) {
            bonus_a += 35
            bonus_div_a.parentElement.setAttribute("class", "column-buttons-a bg-violet-400 rounded-lg flex items-center justify-evenly text-emerald-700")
        }
        if (bonus_b >= 63) {
            bonus_b += 35
            bonus_div_b.parentElement.setAttribute("class", "column-buttons-b bg-violet-400 rounded-lg flex items-center justify-evenly text-emerald-700")
        }

        if (bonus_a >= 10 && bonus_a < 100) {
            bonus_div_a.setAttribute("class", "player-bonus sm font-bold")
        } else if (bonus_a >= 100) {
            bonus_div_a.setAttribute("class", "player-bonus xs font-bold")
        }
        if (bonus_b >= 10 && bonus_b < 100) {
            bonus_div_b.setAttribute("class", "player-bonus sm font-bold")
        } else if (bonus_b >= 100) {
            bonus_div_b.setAttribute("class", "player-bonus xs font-bold")
        }

        player_a_score.bonus = [bonus_a]
        player_b_score.bonus = [bonus_b]
        
        bonus_div_a.textContent = `${player_a_score.bonus[0]}/63`
        bonus_div_b.textContent = `${player_b_score.bonus[0]}/63`
    }
    
    function updateScores() {
        DOMSelectors.player_a_buttons.forEach(button => {
            if (button.firstElementChild.getAttribute("class") == "player-one text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.ones[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-two text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.twos[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-three text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.threes[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-four text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.fours[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-five text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.fives[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-six text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.sixes[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-three-of-a-kind text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.three_of_a_kind[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-four-of-a-kind text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.four_of_a_kind[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-full-house text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.full_house[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-small-straight text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.small_straight[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-large-straight text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.large_straight[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-yahtzee text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.yahtzee[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-chance text-1xl font-bold") {
                button.firstElementChild.textContent = player_a_score.chance[0]
            }
        })

        DOMSelectors.player_b_buttons.forEach(button => {
            if (button.firstElementChild.getAttribute("class") == "player-one text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.ones[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-two text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.twos[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-three text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.threes[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-four text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.fours[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-five text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.fives[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-six text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.sixes[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-three-of-a-kind text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.three_of_a_kind[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-four-of-a-kind text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.four_of_a_kind[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-full-house text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.full_house[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-small-straight text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.small_straight[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-large-straight text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.large_straight[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-yahtzee text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.yahtzee[0]
            }
            if (button.firstElementChild.getAttribute("class") == "player-chance text-1xl font-bold") {
                button.firstElementChild.textContent = player_b_score.chance[0]
            }
        })
        updateBonus()
        updateTotal()
    }

    function updateButton(button, x) {

        if (x == "a") {
            button.setAttribute("class", "column-buttons-a bg-violet-400 rounded-lg flex items-center justify-evenly text-black")
            button.setAttribute("id", "pressed")
        } else {
            button.setAttribute("class", "column-buttons-b bg-violet-400 rounded-lg flex items-center justify-evenly text-black")
            button.setAttribute("id", "pressed")
        }

        button.disabled = true

        if (button.firstElementChild.getAttribute("class") == "player-one text-1xl font-bold") {
            let ones = 0
            for (let i = 0; i < dice_list.length; i++) {
                if (dice_list[i].value[0] == 1) {
                    ones += 1
                }
            }

            if (x == "a") {
                player_a_score.ones = [ones]
            } else {
                player_b_score.ones = [ones]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-two text-1xl font-bold") {
            let twos = 0
            for (let i = 0; i < dice_list.length; i++) {
                if (dice_list[i].value[0] == 2) {
                    twos += 2
                }
            }

            if (x == "a") {
                player_a_score.twos = [twos]
            } else {
                player_b_score.twos = [twos]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-three text-1xl font-bold") {
            let threes = 0
            for (let i = 0; i < dice_list.length; i++) {
                if (dice_list[i].value[0] == 3) {
                    threes += 3
                }
            }

            if (x == "a") {
                player_a_score.threes = [threes]
            } else {
                player_b_score.threes = [threes]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-four text-1xl font-bold") {
            let fours = 0
            for (let i = 0; i < dice_list.length; i++) {
                if (dice_list[i].value[0] == 4) {
                    fours += 4
                }
            }

            if (x == "a") {
                player_a_score.fours = [fours]
            } else {
                player_b_score.fours = [fours]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-five text-1xl font-bold") {
            let fives = 0
            for (let i = 0; i < dice_list.length; i++) {
                if (dice_list[i].value[0] == 5) {
                    fives += 5
                }
            }

            if (x == "a") {
                player_a_score.fives = [fives]
            } else {
                player_b_score.fives = [fives]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-six text-1xl font-bold") {
            let sixes = 0
            for (let i = 0; i < dice_list.length; i++) {
                if (dice_list[i].value[0] == 6) {
                    sixes += 6
                }
            }

            if (x == "a") {
                player_a_score.sixes = [sixes]
            } else {
                player_b_score.sixes = [sixes]
            }

        }
        
        if (button.firstElementChild.getAttribute("class") == "player-three-of-a-kind text-1xl font-bold") {
            let found = false
            let three_of_a_kind = 0
            let frequencyMap = {}

            for (let i = 0; i < dice_list.length; i++) {
                let value = dice_list[i].value[0]
                frequencyMap[value] = (frequencyMap[value] || 0) + 1
            }

            for (let value in frequencyMap) {
                if (frequencyMap[value] >= 3) {
                    found = true
                }
            }

            if (found) {
                for (let value in frequencyMap) {
                    three_of_a_kind += value * frequencyMap[value]
                }
            }

            if (x == "a") {
                player_a_score.three_of_a_kind = [three_of_a_kind]
            } else {
                player_b_score.three_of_a_kind = [three_of_a_kind]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-four-of-a-kind text-1xl font-bold") {
            let found = false
            let four_of_a_kind = 0
            let frequencyMap = {}

            for (let i = 0; i < dice_list.length; i++) {
                let value = dice_list[i].value[0]
                frequencyMap[value] = (frequencyMap[value] || 0) + 1
            }

            for (let value in frequencyMap) {
                if (frequencyMap[value] >= 4) {
                    found = true
                }
            }

            if (found) {
                for (let value in frequencyMap) {
                    four_of_a_kind += value * frequencyMap[value]
                }
            }

            if (x == "a") {
                player_a_score.four_of_a_kind = [four_of_a_kind]
            } else {
                player_b_score.four_of_a_kind = [four_of_a_kind]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-full-house text-1xl font-bold") {
            let foundThree = false
            let foundTwo = false
            let frequencyMap = {}
            let full_house = 0

            for (let i = 0; i < dice_list.length; i++) {
                let value = dice_list[i].value[0]
                frequencyMap[value] = (frequencyMap[value] || 0) + 1
            }

            for (let value in frequencyMap) {
                if (frequencyMap[value] == 3) {
                    foundThree = true
                } else if (frequencyMap[value] == 2) {
                    foundTwo = true
                }
            }

            if (foundTwo && foundThree) {
                full_house = 25
            }

            if (x == "a") {
                player_a_score.full_house = [full_house]
            } else {
                player_b_score.full_house = [full_house]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-small-straight text-1xl font-bold") {
            let found = false
            let values_sorted = []
            let small_straight = 0

            for (let i = 0; i < dice_list.length; i++) {
                values_sorted.push(dice_list[i].value[0])
            }

            values_sorted = [...new Set(values_sorted)]
            values_sorted.sort((a, b) => a - b)

            if (values_sorted.length >= 4) {
                for (let i = 0; i < values_sorted.length - 3; i++) {
                    if (values_sorted[i] + 1 == values_sorted[i + 1] && values_sorted[i] + 2 == values_sorted[i + 2] && values_sorted[i] + 3 == values_sorted[i + 3]) {
                        found = true;
                    }
                }
            }

            if (found) {
                small_straight = 30
            }

            if (x == "a") {
                player_a_score.small_straight = [small_straight]
            } else {
                player_b_score.small_straight = [small_straight]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-large-straight text-1xl font-bold") {
            let found = false
            let values_sorted = []
            let large_straight = 0

            for (let i = 0; i < dice_list.length; i++) {
                values_sorted.push(dice_list[i].value[0])
            }

            values_sorted = [...new Set(values_sorted)]
            values_sorted.sort((a, b) => a - b)

            if (values_sorted.length = 5) {
                if (values_sorted[0] + 1 == values_sorted[1] && values_sorted[1] + 1 == values_sorted[2] && values_sorted[2] + 1 == values_sorted[3] && values_sorted[3] + 1 == values_sorted[4]) {
                    found = true;
                }
            }

            if (found) {
                large_straight = 40
            }

            if (x == "a") {
                player_a_score.large_straight = [large_straight]
            } else {
                player_b_score.large_straight = [large_straight]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-yahtzee text-1xl font-bold") {
            let found = false
            let yahtzee = 0
            let frequencyMap = {}

            for (let i = 0; i < dice_list.length; i++) {
                let value = dice_list[i].value[0]
                frequencyMap[value] = (frequencyMap[value] || 0) + 1
            }

            for (let value in frequencyMap) {
                if (frequencyMap[value] == 5) {
                    found = true
                }
            }

            if (found) {
                yahtzee = 50
            }

            if (x == "a") {
                player_a_score.yahtzee = [yahtzee]
            } else {
                player_b_score.yahtzee = [yahtzee]
            }

        }

        if (button.firstElementChild.getAttribute("class") == "player-chance text-1xl font-bold") {
            let chance = 0
            for (let i = 0; i < dice_list.length; i++) {
                chance += dice_list[i].value[0]   
            }

            if (x == "a") {
                player_a_score.chance = [chance]
            } else {
                player_b_score.chance = [chance]
            }

        }

        updateScores()
        
    }

    function resetScores() {
        for (let i in player_a_score) {
            player_a_score[i] = [0]
        }
        for (let i in player_b_score) {
            player_b_score[i] = [0]
        }
        updateScores()
    }

    function resetButtons() {
        DOMSelectors.player_a_buttons.forEach(button => {
            button.disabled = false
            button.setAttribute("class", "column-buttons-a bg-violet-400 rounded-lg flex items-center justify-evenly text-white")
            button.setAttribute("id", "unpressed")
        }
        )
        DOMSelectors.player_b_buttons.forEach(button =>{
            button.disabled = false
            button.setAttribute("class", "column-buttons-b bg-violet-400 rounded-lg flex items-center justify-evenly text-white")
            button.setAttribute("id", "unpressed")
        }
        )
    }

    function resetBonus() {
        const bonus_div_a = document.getElementById("player-a-bonus")
        const bonus_div_b = document.getElementById("player-b-bonus")

        bonus_div_a.setAttribute("class", "player-bonus text-1xl font-bold")
        bonus_div_b.setAttribute("class", "player-bonus text-1xl font-bold")

        bonus_div_a.parentElement.setAttribute("class", "column-buttons-bonus bg-violet-400 rounded-lg flex items-center justify-evenly text-red-700")
        bonus_div_b.parentElement.setAttribute("class", "column-buttons-bonus bg-violet-400 rounded-lg flex items-center justify-evenly text-red-700")
    }

    DOMSelectors.howtoplay.addEventListener("click", function(event) {
        let instructions = document.querySelector(".scrollable-div")
        instructions.classList.remove("hidden")
    })
    DOMSelectors.closebutton.addEventListener("click", function(event) {
        let instructions = document.querySelector(".scrollable-div")
        instructions.classList.add("hidden")
    })

    function disableButtons() {
        DOMSelectors.player_a_buttons.forEach(button => button.disabled = true)
        DOMSelectors.player_b_buttons.forEach(button => button.disabled = true)
    }

    let turn = 1
    let roll_count = 0

    DOMSelectors.rollbutton.addEventListener("click", function(event) {
        if (roll_count == 0) {
            turnStart(turn)
        }
        if (roll_count < 3) {
            for (let i = 0; i < dice_list.length; i++) {
                if (dice_list[i].position == "roll") {
                    dice_list[i].value = []
                    dice_list[i].value.push(Math.floor(Math.random() * (6 - 1 + 1) ) + 1)
                }
            }
            updateDice()
        }
        roll_count += 1
        if (roll_count == 3) {
            DOMSelectors.rollbutton.disabled = true
            DOMSelectors.rollbutton.classList.add("dark")
        }
    })

    DOMSelectors.dice.forEach(dice => dice.addEventListener("click", function(event) {
        if (roll_count != 0) {
            let dice_number = dice.getAttribute("id")
            for (let i = 0; i < dice_list.length; i++) {
                if (dice_list[i]["name"] == dice_number) {
                    if (dice_list[i]["position"] == "roll") {
                        dice_list[i]["position"] = "keep"
                        dice.setAttribute("class", "dice w-[7vw] h-[7vw] rounded-2xl border-4 bg-yellow-300 border-yellow-300")
                    }
                    else if (dice_list[i]["position"] == "keep") {
                        dice_list[i]["position"] = "roll"
                        dice.setAttribute("class", "dice w-[7vw] h-[7vw] rounded-2xl border-4 bg-white")
                    }
                }
            }
        }
    }))    

    function turnStart(turn) {

        if (turn == 1) {
            DOMSelectors.player_a_buttons.forEach(button => {
                if (button.getAttribute("class") == "column-buttons-a bg-violet-400 rounded-lg flex items-center justify-evenly text-white") {
                    button.disabled = false
                }
            })

            DOMSelectors.player_b_buttons.forEach(button => {
                if (button.getAttribute("class") == "column-buttons-b bg-violet-400 rounded-lg flex items-center justify-evenly text-white") {
                    button.disabled = true
                }
            })
            DOMSelectors.player_b_buttons.forEach(button => button.classList.add("dark"))
        } else {
            DOMSelectors.player_b_buttons.forEach(button => {
                if (button.getAttribute("class") == "column-buttons-b bg-violet-400 rounded-lg flex items-center justify-evenly text-white") {
                    button.disabled = false
                }
            })

            DOMSelectors.player_a_buttons.forEach(button => {
                if (button.getAttribute("class") == "column-buttons-a bg-violet-400 rounded-lg flex items-center justify-evenly text-white") {
                    button.disabled = true
                }
            })
            DOMSelectors.player_a_buttons.forEach(button => button.classList.add("dark"))
        }    
    }    
                 
    DOMSelectors.player_a_buttons.forEach(buttona => buttona.addEventListener("click", function(event) {turnEnd(buttona, "a")}))
    DOMSelectors.player_b_buttons.forEach(buttonb => buttonb.addEventListener("click", function(event) {turnEnd(buttonb, "b")}))

    function turnEnd(button, x) {
        updateButton(button, x)

        DOMSelectors.rollbutton.disabled = false
        if (DOMSelectors.rollbutton.getAttribute("class") != "w-3/5 h-1/3 roll-button bg-violet-400 rounded-lg flex items-center justify-evenly text-white") {
            DOMSelectors.rollbutton.classList.remove("dark")
        }

        if (turn == 1) {
            DOMSelectors.player_b_buttons.forEach(button => button.classList.remove("dark"))
        } else {
            DOMSelectors.player_a_buttons.forEach(button => button.classList.remove("dark"))
        }
        
        resetDice()
        disableButtons()
        
        let endA = true
        let endB = true

        DOMSelectors.player_a_buttons.forEach(button => {if (button.getAttribute("id") != "pressed"){endA = false}})
        DOMSelectors.player_b_buttons.forEach(button => {if (button.getAttribute("id") != "pressed"){endB = false}})
        if (endA && endB) {
            winner_display()
        } else {
            turn *= -1
            roll_count = 0
        }
    }
        
    function winner_display() {
        
        let winner = ""
        if (player_a_score.total[0] > player_b_score.total[0]) {
            winner = "A"
        } else if (player_a_score.total[0] < player_b_score.total[0]) {
            winner = "B"
        } else {
            winner = "N"
        }

        let winner_div = document.querySelector(".winner-div")
        winner_div.classList.remove("hidden")
        if (winner != "N") {
            winner_div.firstElementChild.textContent = `Player ${winner} won by ${Math.abs(player_a_score.total[0] - player_b_score.total[0])}`
        } else {
            winner_div.firstElementChild.textContent = "No Player Won"
        }
    }

    DOMSelectors.newGame.addEventListener("click", function(event) {
        let winner_div = document.querySelector(".winner-div")
        winner_div.classList.add("hidden")

        gameEnd()
    })

    function gameEnd() {
        resetDice()
        resetScores()
        resetButtons()
        resetBonus()
        
        disableButtons()
        turn *= -1
        roll_count = 0
    }

disableButtons()
updateScores()
})

