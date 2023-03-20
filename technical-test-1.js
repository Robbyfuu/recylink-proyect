// Recylink - Technical Test 1 - Javascript

// 1

console.log("Ejercicio 1");
var recylink = (a) => (b) => (c) => a * b * c;
console.log(recylink(2)(5)(3)); // this outputs 30
console.log(recylink(4)(2)(2)); // this outputs 16
console.log(recylink(8)(2)(1)); // this also outputs 16
console.log("---------------------------");
console.log("Ejercicio 2");
// 2

const list = ["best", "company", "ever"];

var recylink = (arr) => {
  return arr.reduce((a, b) => (a.length > b.length ? a : b));
};
console.log(recylink(list)); // this outputs 'company'

// 3
console.log("---------------------------");
console.log("Ejercicio 3");
var recylink = (string, number) => {
  return string.repeat(number);
};
console.log(recylink("node", 5)); // this outputs 'nodenodenodenodenode'
console.log(recylink("abc", 2)); // this outputs 'abcabc'

// 4
console.log("---------------------------");
console.log("Ejercicio 4");
const contacts = [
  { firstName: "Juanito", lastName: "Recy" },
  { firstName: "James", lastName: "Link" },
  { firstName: "Harry", lastName: "Potter" },
];
var recylink = (arr) => {
  return arr.map((contact) => contact.lastName);
};
console.log(recylink(contacts)); // this outputs ['Rokket', 'Link', 'Potter']

// 5
console.log("---------------------------");
console.log("Ejercicio 5");
var recylink = (arr1, arr2) => {
  return arr1.filter((num) => arr2.includes(num));
};
console.log(recylink([1, 2, 5], [2, 1, 6])); // this outputs [1, 2]
console.log(recylink([1, 2, 3], [4, 5, 6])); // this outputs []
