'use strict'

// => inserting usernames and play button

let playClicked ;

function play(){

    const p1Name = document.querySelector('.player-username').value;
    const p2Name = document.querySelector('.enemy-username').value;
    document.getElementById('main-container').style.visibility = 'visible';
    document.getElementById('play').style.display = 'none';
    document.querySelector('.p1-username').textContent = p1Name;
    document.querySelector('.p2-username').textContent = p2Name;

}

// => Making cards ready for give it to players 

const cards = [
                {n:1, key:'1a'}, {n:2, key:'2a'},{n:3, key:'3a'},{n:4, key:'4a'},{n:5, key:'5a'},{n:6, key:'6a'},{n:7, key:'7a'},{n:10, key:'10a'},{n:11, key:'11a'},{n:12, key:'12a'},
                {n:1, key:'1b'}, {n:2, key:'2b'},{n:3, key:'3b'},{n:4, key:'4b'},{n:5, key:'5b'},{n:6, key:'6b'},{n:7, key:'7b'},{n:10, key:'10b'},{n:11, key:'11b'},{n:12, key:'12b'},
                {n:1, key:'1c'}, {n:2, key:'2c'},{n:3, key:'3c'},{n:4, key:'4c'},{n:5, key:'5c'},{n:6, key:'6c'},{n:7, key:'7c'},{n:10, key:'10c'},{n:11, key:'11c'},{n:12, key:'12c'},
                {n:1, key:'1d'}, {n:2, key:'2d'},{n:3, key:'3d'},{n:4, key:'4d'},{n:5, key:'5d'},{n:6, key:'6d'},{n:7, key:'7d'},{n:10, key:'10d'},{n:11, key:'11d'},{n:12, key:'12d'},
              ];

// => Flipping cards

const rndmOrderCards = ()=>{

    for(let i = 0; i<cards.length; i++){
        const rmd = Math.floor(Math.random()*cards.length);
        const dtd = cards.splice(i, 1)[0];
        cards.splice(rmd, 0, dtd);
    }
};
 
rndmOrderCards();

// => giving cards to players

const p1_cards = [];
const p2_cards = [];
const p1EarnedCards = [];
const p2EarnedCards = [];

const randomCard = function(){

    for(let i = 0; i<20 ; i++){

        p1_cards.push(cards[i]);

    }

    for(let j = 20; j<40 ; j++){

        p2_cards.push(cards[j]);

    }

    cards.splice(0,cards.length);
};

randomCard(); 

function karta(_add) {
    
    document.querySelector('.p1-cards').insertAdjacentHTML(`beforeend`, `<div class="rcard p1-card1"><p>K</p><h2>a</h6><h1>K</h1></div>
    <div class="rcard p1-card2"><p>K</p><h2>a</h6><h1>K</h1></div>
    <div class="rcard p1-card3"><p>K</p><h2>a</h6><h1>K</h1></div>
    <div class="rcard p1-card4"><p>K</p><h2>a</h6><h1>K</h1></div>`)
    
    document.querySelector('.p2-cards').insertAdjacentHTML(`beforeend`, `<div class="card p2-card1"><p>K</p><h2>a</h6></div>
    <div class="card p2-card2"><p>K</p><h2>a</h6></div>
    <div class="card p2-card3"><p>K</p><h2>a</h6></div>
    <div class="card p2-card4"><p>K</p><h2>a</h6></div>`)
    
    
    const p1QaaeCard = [p1_cards[0],p1_cards[1],p1_cards[2],p1_cards[3]];
    const p2QaaeCard = [p2_cards[0],p2_cards[1],p2_cards[2],p2_cards[3]];
    
    let qaae_card = [] ;

    if (_add != undefined) {
        
        qaae_card.push(..._add);

    }
    const _index =(arr, item)=>{

        const a = arr.findIndex(x=>{

            return x.key === item ;

        });

        return a;
    };

 
const cardToPlayer = function(){
            
    for(let i = 0; i<4 ; i++){
        
        document.querySelector(`.p1-card${i+1}>p`).innerHTML = p1_cards[i].n;
        document.querySelector(`.p1-card${i+1}>h2`).innerHTML = p1_cards[i].key.slice(-1);
        document.querySelector(`.p2-card${i+1}>p`).innerHTML = p2_cards[i].n;
        document.querySelector(`.p2-card${i+1}>h2`).innerHTML = p2_cards[i].key.slice(-1);
        
    }
};

cardToPlayer();

for(let i = 0; i<p1QaaeCard.length; i++){
    
    p1_cards.splice(_index(p1_cards, p1QaaeCard[i].key),1);
    p2_cards.splice(_index(p2_cards, p2QaaeCard[i].key),1);

}

// => Game logic

const logic = function(){
    
    const elms = document.querySelectorAll('.card');
    
    // ==> points logic

    const pPoints = function(player, points){

        let pp = document.querySelector(`.p${player}-score-box>p`).textContent;
        pp = Number(pp)+points;
        document.querySelector(`.p${player}-score-box>p`).textContent = pp;

    };
    
    const roundaPoints = function(which_player){
        
        for(let i = 0; i<which_player.length; i++){
            
            for(let j = i+1 ; j < which_player.length; j++){
                
                if(which_player[i].n === which_player[j].n && which_player === p1QaaeCard ){
                    pPoints(1,1);
                }
                
                else if(which_player[i].n === which_player[j].n && which_player === p2QaaeCard){
                    pPoints(2,1);
                }

            }
        }
    };
   
    roundaPoints(p1QaaeCard);
    roundaPoints(p2QaaeCard);
    
    const lastCardDropped = [];
    
    // ==> deep dive
    
    elms.forEach( (elm)=>{
        
        elm.addEventListener('click', ()=>{

            const relms = document.querySelectorAll('.rcard');

            let whichPlayer;

            // robot

            const rr = relms[Math.floor(Math.random()*relms.length)];
            const relmContent = Number (rr.firstChild.textContent);
            const relmTxtContent = rr.children[1].textContent;
            const relmKey = relmContent+relmTxtContent;
            const rCountCards = document.querySelector(`.p1-cards`).childElementCount;

            // player

            const p2CountCards = document.querySelector(`.p2-cards`).childElementCount;   
            const elmContent = Number (elm.firstChild.textContent);
            const elmTxtContent = elm.children[1].textContent;
            const elmKey = elmContent+elmTxtContent;

        
            const drop = function(content, txtcontent, element){

                document.querySelector('.action-cards').insertAdjacentHTML(`beforeend`,`<div class="card action-card-i"><p>${content}</p><h2>${txtcontent}</h2></div>`);
                qaae_card.push({n:content, key:txtcontent});
        
                element.remove(); 
                
                if(element === rr){p1QaaeCard.splice(_index(p1QaaeCard, elmKey),1);}
                else if(element === elm){p2QaaeCard.splice(_index(p2QaaeCard, elmKey),1)}

            };


            const cDrop = ()=>{

                drop(elmContent, elmTxtContent, elm);
                lastCardDropped.push(2);

            };

            if(rCountCards === p2CountCards && p2CountCards === 4){
                cDrop();
            }
            
            else if(lastCardDropped[lastCardDropped.length-1] === 1 && rCountCards === p2CountCards){
                cDrop();
            }

            // ===> cards fight with points
            
            const cardsFight = ()=>{

                let lastPlayerEarned;

                let x = document.querySelectorAll('.action-card-i');

                for(let i = 0; i<qaae_card.length-1; i++){

                    const makla = (qc)=>{
                        
                        const maklaLogic = (pEarnedcards)=>{
                            
                            const rmvElm = (rmElm, delay, color, rm)=>{

                                    rmElm.style.backgroundColor = color;

                                    setTimeout(()=>{
                                        if(rm === true){rmElm.remove();}
                                    },delay)

                                };
                                
                                const rmvCardFromQaae = (_key, delay, color, rm)=>{
                                    
                                    for(let j = 0; j<x.length; j++){

                                        if(x[j].textContent === _key){
                                            rmvElm(x[j], delay, color, rm);
                                        }
                                    }
                                    
                                };
                                
                                pEarnedcards.push(qaae_card[qaae_card.length-1], qaae_card[qc]);
                                
                                rmvCardFromQaae(qaae_card[qaae_card.length-1].n + qaae_card[qaae_card.length-1].key, 500, 'tomato', true );
                                rmvCardFromQaae(qaae_card[qc].n + qaae_card[qc].key, 500, 'tomato', true);
                                
                                qaae_card.splice(qaae_card.length-1, 1);
                                qaae_card.splice(qaae_card.indexOf(qaae_card[qc]), 1);
                                
                                const maklaSearch = ()=>{
                                    
                                    for(let j = 0; j<qaae_card.length; j++){

                                        if(qaae_card[j].n -1 === pEarnedcards[pEarnedcards.length-1].n){

                                            pEarnedcards.push(qaae_card[j]);
                                            rmvCardFromQaae(qaae_card[j].n + qaae_card[j].key, 500, 'purple', true);
                                            qaae_card.splice(qaae_card.indexOf(qaae_card[j]),1);
                                            maklaSearch();

                                        }
                                        else if(qaae_card[j].n -3 === pEarnedcards[pEarnedcards.length-1].n && qaae_card[j].n === 10 ){
                                            
                                            pEarnedcards.push(qaae_card[j]);
                                            rmvCardFromQaae(qaae_card[j].n + qaae_card[j].key, 500, 'purple', true);
                                            qaae_card.splice(qaae_card.indexOf(qaae_card[j]),1);
                                            maklaSearch();

                                        }
                                    }
                                   
                                };

                                maklaSearch();
                                
                                // ===> Missa
                                
                                if(qaae_card.length === 0){

                                    pPoints(lastCardDropped[lastCardDropped.length-1], 1);

                                }
                            };
                                 
                            if(lastCardDropped[lastCardDropped.length-1] === 1){

                                maklaLogic(p1EarnedCards);
                            }

                            else if(lastCardDropped[lastCardDropped.length-1] === 2){

                                maklaLogic(p2EarnedCards);
                            }

                            
                        };
                        
                        // ==> bunt

                        if(qaae_card[qaae_card.length-1].n === qaae_card[qaae_card.length-2].n && qaae_card.length >= 2){

                            makla(qaae_card.length-2);

                            pPoints(lastCardDropped[lastCardDropped.length-1], 1);

                            lastPlayerEarned = lastCardDropped[lastCardDropped.length-1];

                            console.log(lastPlayerEarned);
                            
                        }
                        
                        // ==> the default makla

                        else if(qaae_card[qaae_card.length-1].n === qaae_card[i].n){

                            makla(i);
                            lastPlayerEarned = lastCardDropped[lastCardDropped.length-1];

                        }
                        
                        if(p1QaaeCard.length === 0 && p2QaaeCard.length === 0 && p1_cards.length === 0 ) {
    
                            if (lastPlayerEarned === 1) {
                                p1EarnedCards.push(...qaae_card);
                            }

                            else if (lastPlayerEarned === 2) {
                                p2EarnedCards.push(...qaae_card);
                            }

                        }
                    
                    };

                    
                    if (p1QaaeCard.length === 0 && p2QaaeCard.length === 0) { 
                        karta(qaae_card);
                    }

            }

            cardsFight()

            setTimeout(() => {
                drop(relmContent, relmTxtContent, rr);
                lastCardDropped.push(1);
                cardsFight();
            }, 800);
            
            
        });
            
        
    });

      
};

logic();

};

karta();


window.onbeforeunload = e => {
    return "Do you want to exit this page?";
};

