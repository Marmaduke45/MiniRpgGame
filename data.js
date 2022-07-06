const enemyData = {
    orc: {
        name: "Orc",
        avatar: "images/orc.png",
        health: 30,
        diceCount: 2,
        currentDiceScore: []
    },
    demon: {
        name: "Demon",
        avatar: "images/demon.png",
        health: 25,
        diceCount: 2,
        currentDiceScore: []
    },
    goblin: {
        name: "Goblin",
        avatar: "images/goblin.png",
        health: 20,
        diceCount: 3,
        currentDiceScore: []
    }
}

const heroData = {
    wizard: {
        name: "Wizard",
        avatar: "images/wizard.png",
        health: 65,
        diceCount: 3,
        currentDiceScore: []
    },
    brute: {
        name: "Brute",
        avatar: "images/brute.png",
        health: 80,
        diceCount: 2,
        currentDiceScore: []
    },
    vampire: {
        name: "Vampire",
        avatar: "images/vampire.png",
        health: 60,
        diceCount: 1,
        currentDiceScore: []

    },
    gambler: {
        name: "Gambler",
        avatar: "images/gambler.png",
        health: 40,
        diceCount: 5,
        currentDiceScore: []
    }

}

export {heroData, enemyData}