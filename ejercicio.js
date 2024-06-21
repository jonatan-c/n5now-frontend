function reverseStringWithSpecialChars(str) {
  let arr = str.split("");

  let letters = [];

  for (let i = 0; i < arr.length; i++) {
    if (/[a-zA-Z]/.test(arr[i])) {
      letters.push(arr[i]);
    }
  }

  letters.reverse();

  let result = [];
  let letterIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (/[a-zA-Z]/.test(arr[i])) {
      result.push(letters[letterIndex]);
      letterIndex++;
    } else {
      result.push(arr[i]);
    }
  }

  return result.join("");
}

let str1 = "a,b$c";
let str2 = "Ab,c,de!$";

console.log(reverseStringWithSpecialChars(str1));
console.log(reverseStringWithSpecialChars(str2));
