let userSeq=[];
let gameSeq=[];
let started= false;
let level=0;
let button=["red","yellow","blue","green"];


let h3=document.querySelector("h3");
let div=document.getElementById("restart");

let restart=document.createElement("button");
restart.innerText="Restart";
restart.classList.add("restart-btn");
restart.style.display="none";
restart.addEventListener("click",()=>{
    reset();
    h3.innerText="Press any key to start";
});
div.append(restart);

document.addEventListener("keypress",()=>{
    if(started==false){
        started=true;
        h3.innerText=`Game Started`;
        levelUp();
        restart.style.display = "inline-block";
    }
    
});

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText= `Level ${level}`;
    let randomIdx= Math.floor(Math.random() * 4);
    let randClr=button[randomIdx];
    let randomBtn=document.querySelector(`.${randClr}`);
    flashBtn(randomBtn);
    playSound();
    gameSeq.push(randClr);
    console.log("Game seq: ", gameSeq);
    
    // span.innerHTML=restart;

}

function btnPress(){
    flashBtn(this);
    playSound();
    userSeq.push(this.classList[1]);
    ansCheck(userSeq.length-1);
};
let btns=document.querySelectorAll(".box");
for(btn of btns){
    btn.addEventListener("click", btnPress);
    
}

function ansCheck(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(gameSeq.length==userSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        if(level==0) h3.innerText=`Game over. Your score was 0.\n Press any key to start again`;
        else h3.innerText=`Game over. Your score was ${level-1}.\n Press any key to start again`;
        document.body.style.backgroundColor = "red";
        playSound("wrong");
        setTimeout(() => {
            document.body.style.backgroundColor = "black";
        }, 200);
        reset();
    }
}
function reset(){
    userSeq=[];
    gameSeq=[];
    level=0;
    started=false;
    restart.style.display="none";
}


function flashBtn(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    }, 250)
}

function playSound(type = "click") {
    let audio = new Audio(`sounds/${type}.mp3`);
    audio.play();
}
