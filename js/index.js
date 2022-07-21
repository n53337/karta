'use strict'

// => inserting usernames and play button

function play(){
    const p1Name = document.querySelector('.player-username').value;
    const p2Name = document.querySelector('.enemy-username').value;
    document.getElementById('main-container').style.visibility = 'visible';
    document.getElementById('play').style.display = 'none';
    document.querySelector('.p1-username').textContent = p1Name;
    document.querySelector('.p2-username').textContent = p2Name;
    
    
}

// => Making cards ready for give it to players 

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

// => giving cards to players

const p1_cards = [];
const p2_cards = [];
const p1EarnedCards = [];
const p2EarnedCards = [];

const randomCard = function(){
    for(let i = 0; i<20 ; i++){
        p1_cards.push(cards[i]);
        cards.shift(); 
        p2_cards.push(cards[i]);
        cards.shift();
    }
}
randomCard(); 

const p1QaaeCard = [p1_cards[0],p1_cards[1],p1_cards[2],p1_cards[3]];
const p2QaaeCard = [p2_cards[0],p2_cards[1],p2_cards[2],p2_cards[3]];
const qaae_card = [];

const cardToPlayer = function(){
    for(let i = 0; i<4 ; i++){
        document.querySelector(`.p1-card${i+1}>p`).innerHTML = p1_cards[i];
        document.querySelector(`.p2-card${i+1}>p`).innerHTML = p2_cards[i];
    }
    
}
cardToPlayer();

// => Game logic

const logic = function(){
    
    const elms = document.querySelectorAll('.card')

    // ==> points logic
    
    const pPoints = function(player, points){
        let pp = document.querySelector(`.p${player}-score-box>p`).textContent
        pp = Number(pp)+points
        document.querySelector(`.p${player}-score-box>p`).textContent = pp
    }

    const roundaPoints = function(which_player){

        for(let i = 0; i<which_player.length; i++){

            for(let j = i+1 ; j < which_player.length; j++){

                if(which_player[i] === which_player[j] && which_player === p1QaaeCard ){
                    pPoints(1,1)
                }
                else if(which_player[i] === which_player[j] && which_player === p2QaaeCard){
                    pPoints(2,1)
                }

            }
        }
    }


    roundaPoints(p1QaaeCard);
    roundaPoints(p2QaaeCard);

    const lastCardDropped = []
    
    // ==> deep dive

    elms.forEach( (elm)=>{
        
        elm.addEventListener('click', ()=>{
            
            
            const whichPlayer = Number(elm.classList[1][1])
            const elmContent = Number (elm.textContent);
            const p2CountCards = document.querySelector(`.p2-cards`).childElementCount
            const p1CountCards = document.querySelector(`.p1-cards`).childElementCount

            // ===> drop card turn logic
            
            const drop = function(){
                document.querySelector('.action-cards').insertAdjacentHTML(`beforeend`,`<div class="card action-card-i"><p>${elmContent}</p></div>`)
                qaae_card.push(elmContent)
                elm.remove(); 
                if(whichPlayer === 1){p1QaaeCard.splice(p1QaaeCard.indexOf(elmContent),1,)} 
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
            
            // ===> cards fight with points

            const cardsFight = ()=>{

                let x = document.querySelectorAll('.action-card-i')

                const makla = ()=>{
                
                    for(let i = 0; i<qaae_card.length-1; i++){

                        if(qaae_card[qaae_card.length-1] === qaae_card[i]){

                            const maklaLogic = (pEarnedcards)=>{

                                pEarnedcards.push(Number(x[x.length-1].textContent), Number(x[i].textContent))
                                
                                const maklaSearch = ()=>{

                                    for(let i = 0; i < qaae_card.length; i++){
                                        
                                        if(pEarnedcards[pEarnedcards.length-1]+1 === qaae_card[i]){

                                            pEarnedcards.push(Number(qaae_card[i]))
                                            maklaSearch();
                                            
                                        }
                                    }
                                }

                                maklaSearch();
                                console.log(` player:${whichPlayer}, earned cards ${pEarnedcards}, qaae card: ${qaae_card}`);
                            }
                                 
                            if(whichPlayer === 1){

                                maklaLogic(p1EarnedCards)
                            }

                            else if(whichPlayer === 2){

                                maklaLogic(p2EarnedCards)
                            }

                            // setTimeout(() => {
                            //     x[x.length-1].remove()
                            //     x[i].remove()
                            // }, 500);
                        }    
                    }
                }
                
                // bont()
                
                makla()
                
                
            }
            cardsFight()

            
        })
        
        

    }
    )
    
    
}

logic();


