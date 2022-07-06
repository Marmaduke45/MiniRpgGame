import {heroData, enemyData} from './data.js'
import Character from './Character.js'

const actionsHolder = document.getElementById('actions')
let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false
let hero
let monster = getNewMonster()


const helpTextList = [
    {
        id: 'wizard',
        text: 'Wizard has 65 health and 3 dice'
    },
    {
        id: 'brute',
        text: 'Brute has 80 health and 2 dice'
    },
    {
        id: 'vampire',
        text: 'Vampire has 60 health and 1 dice, but leeches 5 health per attack'
    },
    {
        id: 'gambler',
        text: 'Gambler has 40 health and 5 dice'
    }
]

// Sets class picking buttons and help text
function chooseCharacter() {
    actionsHolder.innerHTML = `
        <h1>Choose Your Fighter</h1>
        <button class="class-btn" id="wizard">Wizard</button>
        <button class="class-btn" id="brute">Brute</button>
        <button class="class-btn" id="vampire">Vampire</button>
        <button class="class-btn" id="gambler">Gambler</button>
        <p class="help-text"></p>
    `
}
chooseCharacter()
// Hook up class buttons
const helpTextElement = document.querySelector('.help-text')
document.querySelectorAll('.class-btn').forEach((btn) => {
    btn.addEventListener('click', pickClass)
})

// Show help text on button hover
for(let i = 0; i<helpTextList.length; i++){
    let btn = document.querySelector(`#${helpTextList[i].id}`)
    btn.addEventListener('mouseenter', ()=>{
        helpTextElement.textContent = helpTextList[i].text
    })
    btn.addEventListener('mouseleave', ()=>{
        helpTextElement.textContent = '';
    })
}



function pickClass() {
    if(this.id === "wizard"){
        hero = new Character(heroData.wizard)
        render()
    }else if(this.id === "brute"){
        hero = new Character(heroData.brute)
        render()
    }else if(this.id === "vampire"){
        hero = new Character(heroData.vampire)
        render()
    }else if(this.id === "gambler"){
        hero = new Character(heroData.gambler)
        render()
    }
}


function getNewMonster() {
    const nextMonsterData = enemyData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    if(!isWaiting){
        hero.setDiceHtml()
        monster.setDiceHtml()
        if(hero.name === "Vampire"){
            hero.health += 5;
        }
        monster.takeDamage(hero.currentDiceScore)
        hero.takeDamage(monster.currentDiceScore)
        render()
        
        if(hero.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }
}

function endGame() {
    isWaiting = true
    const endMessage = hero.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        hero.health > 0 ? "The Hero Wins" :
            "The monsters are Victorious"

    const endEmoji = hero.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
        }, 1500)
}



function render() {
    actionsHolder.innerHTML = `<button id="attack-button">Attack</button>`
    document.getElementById("attack-button").addEventListener('click', attack)
    document.getElementById('hero').innerHTML = hero.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}


