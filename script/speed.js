const typingTest = document.querySelector(".typing-test p");
inpField = document.querySelector(".wrapper .input-field");
mistakTag = document.querySelector(".mistake span");
wpmTag = document.querySelector(".wpm span");
cpmTag = document.querySelector(".cpm span");
tryAgainBtn=document.querySelector("button");

timeTag = document.querySelector(".time span b");
let timer;
maxtime=60;
timeLeft = maxtime;
charIndex = mistakes = isTyping= 0;

function rendomParagraph()
{
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingTest.innerHTML=""; 
    paragraphs[randomIndex].split("").forEach(span=>{
        let spanTag = `<span>${span}</span>`;
        typingTest.innerHTML += spanTag;
    });
    typingTest.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",()=>{inpField.focus()});
    typingTest.addEventListener("click",()=>{inpField.focus()});

}

function initTyping()
{
    const characters=typingTest.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex<characters.length-1 && timeLeft>0)
    {
        if(!isTyping)
        {
            timer = setInterval(initTimer,1000);
            isTyping=true;
        }
        if(typedChar == null)
        {
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect"))
            {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
    
        }
        else{
            if(characters[charIndex].innerText === typedChar)
        {
           characters[charIndex].classList.add("correct");
        }
        else{
            mistakes++;
            
            characters[charIndex].classList.add("incorrect");
        
        }
        charIndex++;
    
        }
        
        
        characters.forEach(span=>span.classList.remove("active"));
        characters[charIndex].classList.add('active');
        let wpm = Math.round(((charIndex-mistakes)/5)/((maxtime-timeLeft))* 60);
        wpm=wpm<0 || !wpm || wpm==Infinity? 0 :wpm;
        wpmTag.innerText=wpm;
        mistakTag.innerText=mistakes;
        cpmTag.innerText=charIndex-mistakes;
    
    }
    else
    {
        inpField.value="";
        clearInterval(timer);
    }
}

function initTimer()
{
    if(timeLeft>0)
    {
        timeLeft--;
        timeTag.innerText=timeLeft;
    }
    else
    {
        clearInterval(timer);
    }
}

function resetGame()
{
    rendomParagraph();
    inpField.value="";
    clearInterval(timer);
    
    timeLeft = maxtime;
    charIndex = mistakes = isTyping= 0;
    timeTag.innerText=timeLeft;
    mistakTag.innerText=mistakes;
    wpmTag.innerText=0;
    cpmTag.innerText=0;

   
}

rendomParagraph();
inpField.addEventListener("input",initTyping);
tryAgainBtn.addEventListener('click',resetGame);