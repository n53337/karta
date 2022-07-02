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

// rondomize cards logic
 
const cardsTptal = 40;
const cards = [1,2,3,4,5,6,7,10,11,12,1,2,3,4,5,6,7,10,11,12,1,2,3,4,5,6,7,10,11,12,1,2,3,4,5,6,7,10,11,12];
for(let i = 0; i<cards.length; i++){
    const rmd = Math.floor(Math.random()*cards.length);
    const dtd = cards.splice(i, 1)[0];
    cards.splice(rmd, 0, dtd);
}
console.log(cards);

// cards for players

const p1_cards = [];
const p2_cards = [];

for(let i = 0; i<20 ; i++){
    p1_cards.push(cards[i]);
    cards.shift();
    p2_cards.push(cards[i]);
    cards.shift();
}
console.log(cards);
console.log(p1_cards);
console.log(p2_cards);





