import {setUpGround, updateGround} from "./ground.js"
import {setUpDino, updateDino, getDinoRect, setDinoLose} from "./dino.js"
import {setUpCactus, updateCactus, getCactusRects} from "./cactus.js"

export const WORLD_WIDTH = 100;
export  const WORLD_HEIGHT = 30;
export const speedScaleIncrease = 0.00001

export const worldElement = document.querySelector("[data-world]");
const scoreElement = document.querySelector("[data-score]");
const startScreen = document.querySelector("[data-start-screen]");

setPixelToWorldScale();

window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener("keydown",handleStart, {once: true})

let lastTime;
let speedScale =1
let score =0

function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }

    const delta = time - lastTime;
    console.log(delta);
    updateGround(delta, speedScale)
    updateDino(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    updateCactus(delta, speedScale)
    if(checkLose()) return handleLose()
    lastTime = time;
    window.requestAnimationFrame(update);
    
}

function checkLose(){
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect=> isCollision(rect, dinoRect))
}
function isCollision(rect, dinoRect) {
    return rect.left < dinoRect.right &&
           rect.top < dinoRect.bottom &&
           rect.right > dinoRect.left &&
           rect.bottom > dinoRect.top;
}

function updateSpeedScale(delta){
    speedScale+= delta* speedScaleIncrease
}
function updateScore(delta){
    score += delta * 0.01
    scoreElement.textContent = Math.floor(score)
}

function handleStart(){
    lastTime=null
    speedScale =1
    setUpGround()
    setUpDino()
    setUpCactus()
    window.requestAnimationFrame(update);
    startScreen.classList.add("hide")
}
function handleLose(){
    setDinoLose()
    setTimeout(() => {
        document.addEventListener("keydown",handleStart, {once: true})
        startScreen.classList.remove("hide")
    }, 100);
    score =0
    scoreElement.innerHTML = score
    
}


function setPixelToWorldScale() {
    let worldToPixelScale;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}


