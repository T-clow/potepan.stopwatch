'use strict';

const stopwatch = document.getElementById("stopwatch");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const resume = document.getElementById("resume"); 

let state = "start";
let timerId;
let elapsedMs = 0;
let startTime; 

function timeToString(millis) {
    const ms = millis % 1000;
    const s = Math.floor(millis / 1000) % 60;
    const m = Math.floor(millis / 1000 / 60) % 60;

    const formattedMs = ms.toString().padStart(1, "0");
    const formattedS = s.toString().padStart(1, "0");
    const formattedM = m.toString().padStart(1, "0");

    return `${formattedM}:${formattedS}:${formattedMs}`;
}

start.addEventListener("click", () => {
    if (stopwatch.innerHTML === '0:0:0:0' || state === "reset") { 
        startTime = Date.now();
        elapsedMs = 0; 
    } else if (state === "stopped") {
        startTime = Date.now() - elapsedMs; 
    }
    timerId = setInterval(() => {
        const nowMs = Date.now();
        elapsedMs = nowMs - startTime; 
        stopwatch.textContent = timeToString(elapsedMs);
        start.disabled = true;
        stop.disabled = false;
        reset.disabled = true;
        resume.disabled = true; 
    }, 10);
    state = "running";
});

stop.addEventListener("click", () => {
    clearInterval(timerId);
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
    resume.disabled = false;
    state = "stopped";
});

reset.addEventListener('click', () => {
    clearInterval(timerId); 
    stopwatch.innerHTML = '0:0:0:0';
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
    resume.disabled = false; 
    state = "start";
    elapsedMs = 0; 
});

resume.addEventListener('click', () => { 
    startTime = Date.now() - elapsedMs; 
    timerId = setInterval(() => {
        const nowMs = Date.now();
        elapsedMs = nowMs - startTime;
        stopwatch.textContent = timeToString(elapsedMs);
        start.disabled = true;
        stop.disabled = false;
        reset.disabled = true;
        resume.disabled = true;
    }, 10);
    state = "running";
});

stop.disabled = true;
resume.disabled = true;
