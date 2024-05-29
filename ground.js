import {getCustomProperty,
    incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"
    const groundElems = document.querySelectorAll("[data-ground]")

const speed = .09

export function setUpGround(){
    setCustomProperty(groundElems[0], "--left", 0)
    setCustomProperty(groundElems[1], "--left", 300)
}
export function updateGround(delta,speedScale){
    groundElems.forEach(ground=>{
        incrementCustomProperty(ground,"--left", delta * speedScale *speed* -1)

        if(getCustomProperty(ground, "--left")<= -300){
            incrementCustomProperty(ground, "--left", 600)
        }

    })

}
