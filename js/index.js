'use strict'



function play(){
    const p1Name = document.querySelector('.player-username').value;
    const p2Name = document.querySelector('.enemy-username').value;
    document.getElementById('main-container').style.visibility = 'visible';
    document.getElementById('play').style.display = 'none';
    document.querySelector('.p1-username').textContent = p1Name;
    document.querySelector('.p2-username').textContent = p2Name;
    
}
// console.log(p1Name, p2Name);

const cardsTptal = 40;
const cards = [1,2,3,4,5,6,7,10,11,12,1,2,3,4,5,6,7,10,11,12,1,2,3,4,5,6,7,10,11,12,1,2,3,4,5,6,7,10,11,12];
const rndmOrderCards = ()=>{

    for(let i = 0; i<cards.length; i++){
        const rmd = Math.floor(Math.random()*cards.length);
        const dtd = cards.splice(i, 1)[0];
        cards.splice(rmd, 0, dtd);
    }
    console.log(cards);
}
 
rndmOrderCards();

// cards for players

const p1_cards = [];
const p2_cards = [];
const qaae_card = [];

const randomCard = function(){
    for(let i = 0; i<20 ; i++){
        p1_cards.push(cards[i]);
        cards.shift(); 
        p2_cards.push(cards[i]);
        // console.log(cards);
        cards.shift();
        // console.log(cards);
    }
}
randomCard(); 

const cardToPlayer = function(){
    for(let i = 0; i<4 ; i++){
        document.querySelector(`.p1-card${i+1}>p`).innerHTML = p1_cards[i];
        document.querySelector(`.p2-card${i+1}>p`).innerHTML = p2_cards[i];
    }
    
}
cardToPlayer();

// card to action area

const logic = function(){
    
    const elms = document.querySelectorAll('.card')
    const lastCardDropped = []
    
    elms.forEach( (elm)=>{
        

        elm.addEventListener('click', ()=>{
            
            const whichPlayer = Number(elm.classList[1][1])
            const elmContent = Number (elm.textContent);
            const p2CountCards = document.querySelector(`.p2-cards`).childElementCount
            const p1CountCards = document.querySelector(`.p1-cards`).childElementCount

            // drop card turn logic
            
            const drop = function(){
                document.querySelector('.action-cards').insertAdjacentHTML(`beforeend`,`<div class="card action-card-i"><p>${elmContent}</p></div>`)
                qaae_card.push(elmContent)
                elm.remove();        
            }
            
            if(p1CountCards === p2CountCards && p1CountCards === 4){
                drop()
                lastCardDropped.push(whichPlayer)
            }

            else if(lastCardDropped[(lastCardDropped.length)-1] != whichPlayer)
            {
                drop()
                lastCardDropped.push(whichPlayer)
            }
            
            console.log(lastCardDropped);

            // points logic
        
            
        })
        
        

    }
    )
    
    
}

logic();


