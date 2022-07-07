'use strict'

// geeting user username

// const usrnm = prompt("choose a username : ");
// const rbUsrnm = prompt("choose a name for your enemy : ");

// if(usrnm !== null ){
//     document.querySelector('.p2-username').innerHTML = usrnm;
// }
// if(rbUsrnm !== null){
//     document.querySelector('.p1-username').innerHTML = rbUsrnm;
// }

// inordred cards 

function play(){
    document.getElementById('main-container').style.visibility = 'visible';
    document.getElementById('play').style.visibility = 'hidden';

}

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
window.onload = 
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

const cardToAction = function(){
    
    const elms = document.querySelectorAll('.card')
    
    elms.forEach( (elm)=>{
        elm.addEventListener('click', ()=>{
            const elmContent = Number (elm.textContent);
            const whichPlayer = Number (elm.classList[1][1]);
            console.log(`${elmContent}` , elm , whichPlayer, typeof(whichPlayer))
            

            
            document.querySelector('.action-cards').insertAdjacentHTML(`beforeend`,`<div class="card action-card-i"><p>${elmContent}</p></div>`)
            qaae_card.push(elmContent)
            console.log(document.querySelector('.action-cards').innerHTML);
            elm.remove();
        })
    }
    )
    
    
}

cardToAction();





