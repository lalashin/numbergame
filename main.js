//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
//랜덤번호가 < 유저번호 Down!!!!
//랜덤번호가 > 유저번호 UP!!!
//Reset 버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다쓰면 게임이  끝난다.(더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다, 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

let computerNum = 0;
let gameArea = document.getElementById("game-area");
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 7;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history=[];
let viewButton =document.getElementById("view-button");
let correctButton = document.getElementById("correct-button");


playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){
    userInput.value="";
});
viewButton.addEventListener("click",gveiw);


correctButton.disabled = true;   
 

function gveiw(){
    if(gameArea.style.display === 'none') {

	    gameArea.style.display = 'block';
        viewButton.textContent="마치기"

	  }else {

	    gameArea.style.display = 'none';
        viewButton.textContent="시작하기"
	  }
}



function pinkRandomNum(){
    computerNum = Math.floor(Math.random()*100);
    console.log("정답", computerNum);
}


function play(){
   let userValue = userInput.value;
   
   if(userValue<1 ||userValue>100){
        resultArea.textContent = "1과 100사이 숫자를 입력해 주세요!";
        return;
   }
   if(history.includes(userValue)){
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
    return;
   }
   
   chances --;
   console.log("chance는",chances);  
   chanceArea.textContent = `남은 찬스:${chances}번`;   
  
   if(userValue < computerNum) {
        resultArea.textContent = "Up!!!!";

   }else if(userValue > computerNum) {
        resultArea.textContent = "Down!!!!";
   }else{
        resultArea.textContent = "정답을 맞췄습니다.";
        gameOver = true;
   }

   history.push(userValue);
   console.log(history);


   if(chances < 1){
     gameOver = true;
        correctButton.disabled = false;   
        correctButton.addEventListener("click",correct);
        function correct(){
            resultArea.textContent = `정답은 ${computerNum}입니다.`;
        }     
   }
   if(gameOver == true) {
    playButton.disabled = true;   
   }
}

function reset(){  
    
    
    //새로운 번호가 생성된다
    pinkRandomNum();
    userInput.value = "";
    resultArea.textContent = "게임을 시작하세요!!";
    gameOver = false;
    playButton.disabled = false;
    chances = 7;
    chanceArea.textContent =`남은 기회:${chances}`;
    history=[]; 

}

pinkRandomNum();
