const theName = 'Yannick';
let age = 33;

console.log(theName);
age++;
console.log(age);

const test = true + 1;
const test2 = 125 + '9'; 
console.log(test2);

console.log(('b' + 'a' + + 'a' + 'a'));

function displayUser(name, age) {
    console.log(`Bonjour mon nom est ${name}, j'ai ${age} ans`);
}

displayUser('Rosalie',12);

//Collection, Tableau, Liste

const fruits = ['Kiwi', 'Banane', 'Fraise', 'Pamplemousse', 'Mangue'];

console.log(fruits);

for(let fruit of fruits) {
    console.log(fruit);
}

fruits.forEach(f => console.log(f));

const sum = (a, b) => a + b;

const result = sum(2,5);
console.log(result);

const someFruits = fruits.filter(f => f.length > 5);
console.log(someFruits);

const numbers = [10,20,30,40];
const MULTIPLIER = 3;

const products = numbers.map(n => n * MULTIPLIER).filter(n => n > 75).map(n => n + 9);
console.log(products);
console.log(numbers);

numbers.push(50);
console.log(numbers);

const avenger = {
    alterEgo:'Peter Parker',
    hero:'SpiderMan',
    movies:[{title:'123'},{title:'1234'},{title:'12'}]
}

console.log(avenger.alterEgo);
console.log(avenger.movies.forEach(m => console.log(m.title)));



