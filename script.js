const allQuestions=[
{img:"GAMBAR/kotak.png",answer:"Persegi",fact:"Memiliki 4 sisi sama panjang"},
{img:"GAMBAR/persegipanjang.png",answer:"Persegi Panjang",fact:"Sisi berhadapan sama panjang"},
{img:"GAMBAR/segitiga.png",answer:"Segitiga",fact:"Memiliki 3 sisi"},
{img:"GAMBAR/bulat.png",answer:"Lingkaran",fact:"Tidak memiliki sudut"},
{img:"GAMBAR/jajargenjang.png",answer:"Jajar Genjang",fact:"Sisi berhadapan sejajar"},
{img:"GAMBAR/trapesium.png",answer:"Trapesium",fact:"Memiliki satu pasang sisi sejajar"},
{img:"GAMBAR/belahketupat.png",answer:"Belah Ketupat",fact:"Semua sisi sama panjang"},
{img:"GAMBAR/layang.png",answer:"Layang-layang",fact:"Dua pasang sisi sama panjang"},
{img:"GAMBAR/segilima.png",answer:"Segi Lima",fact:"Memiliki 5 sisi"},
{img:"GAMBAR/segienam.png",answer:"Segi Enam",fact:"Memiliki 6 sisi"}
];

let questions=[],index=0,score=0,lives=3;
let correctCount=0,wrongCount=0;
let timer,timeLeft=10;

window.onload=()=>startGame();

function startGame(){
questions=[...allQuestions].sort(()=>Math.random()-0.5);
index=0;score=0;lives=3;
correctCount=0;wrongCount=0;
loadQuestion();
}

function loadQuestion(){

if(index>=questions.length || lives<=0){
finishGame();return;
}

let q=questions[index];

let img=document.getElementById("shapeImg");
if(img) img.src=q.img;

document.getElementById("fact").innerText="Petunjuk: "+q.fact;
document.getElementById("score").innerText=score;
document.getElementById("lives").innerText=lives;

document.getElementById("progressBar").style.width=
((index/questions.length)*100)+"%";

/* TIMER */
clearInterval(timer);
timeLeft=10;
document.getElementById("timer").innerText=timeLeft;

timer=setInterval(()=>{
timeLeft--;
document.getElementById("timer").innerText=timeLeft;

if(timeLeft<=0){
clearInterval(timer);
lives--;
wrongCount++;
index++;
shakeScreen();
setTimeout(loadQuestion,400);
}
},1000);

/* OPTIONS */
let answers=[q.answer];
while(answers.length<3){
let r=allQuestions[Math.floor(Math.random()*allQuestions.length)].answer;
if(!answers.includes(r))answers.push(r);
}
answers.sort(()=>Math.random()-0.5);

let box=document.getElementById("answers");
box.innerHTML="";

answers.forEach(a=>{
let b=document.createElement("button");
b.innerText=a;
b.onclick=()=>check(a,q.answer);
box.appendChild(b);
});
}

function check(pick,correct){
clearInterval(timer);

if(pick===correct){
score+=10;
correctCount++;
let s=document.getElementById("correct");
if(s) s.play();
}else{
lives--;
wrongCount++;
let s=document.getElementById("wrong");
if(s) s.play();
shakeScreen();
}

index++;
setTimeout(loadQuestion,600);
}

function finishGame(){
let high=localStorage.getItem("highscore")||0;
if(score>high){
localStorage.setItem("highscore",score);
high=score;
}

document.getElementById("finalScore").innerText="Skor: "+score;
document.getElementById("bestScore").innerText=high;
document.getElementById("correctCount").innerText=correctCount;
document.getElementById("wrongCount").innerText=wrongCount;

document.getElementById("popup").classList.add("show");
}

function restart(){
document.getElementById("popup").classList.remove("show");
startGame();
}

function shakeScreen(){
document.body.classList.add("shakeScreen");
setTimeout(()=>document.body.classList.remove("shakeScreen"),350);
}
