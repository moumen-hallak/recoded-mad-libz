/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

function parseStory(rawStory) {
  let array = [];
    let split = rawStory.split(' ');
   //console.log(split)
 
let noun = /^.*\[[n]+].*$/;
let verb = /^.*\[[v]+].*$/;
let adj =  /^.*\[[a]+].*$/;
  
for (let i = 0; i<split.length; i++) {
let word = split[i];

let finalLetter = word[word.length-1];
if (finalLetter == "," || finalLetter == ".") {
    word = word.slice(0, word.length-1)
    }
if (noun.test(word)) {
  let newNoun = word.replace('[n]', '');
  array.push(finalArray(newNoun, 'noun'));
}
else  if (verb.test(word)) {
  let newVerb = word.replace('[v]', '');
  array.push(finalArray(newVerb, 'verb'));
}
else if (adj.test(word)) {
  let newAdj = word.replace('[a]', '');
  array.push(finalArray(newAdj, 'adj'));
}
else {
  array.push(finalArray(word));
}
if (finalLetter == "," || finalLetter == ".") {
  array.push({word: `${finalLetter}`});
  //console.log(finalLetter);

       // array.push(finalArray(finalLetter));
      }
}
  function finalArray(wordInput,pos,finalLetter){
    let output = {};
     let outputPunc = {};
    output["word"]= wordInput
      if (pos) {
     output["pos"]= pos
     console.log(output);
    }  

    //if (finalLetter == "," || finalLetter == ".")
      if (wordInput == "," || wordInput == ".") {
       
      outputPunc["word"]= wordInput;
      console.log(wordInput);
      return outputPunc;
      console.log("word");
    }
          return output;
     console.log(output);
  }

  /*function finalArray(wordInput,pos){
    let output = {};
    output["word"]= wordInput
      if (pos) {
     output["pos"]= pos
     console.log(output);
    } 
      return output;
     console.log(output);
  } */

return array; 

}




/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
  //console.log(processedStory);
});
