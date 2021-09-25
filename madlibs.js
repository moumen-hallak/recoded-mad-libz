
function parseStory(rawStory) {
  let array = [];
  let split = rawStory.split(' ');
  //console.log(split)
  let noun = /^.*\[[n]+].*$/;
  let verb = /^.*\[[v]+].*$/;
  let adj = /^.*\[[a]+].*$/;
  for (let i = 0; i < split.length; i++) {
    let word = split[i];
    let finalLetter = word[word.length - 1];
    let object = {};
    let extraObject = {};
    if (finalLetter == "," || finalLetter == ".") {
      word = word.slice(0, word.length - 1)
    }
    if (noun.test(word)) {
      let newNoun = word.replace('[n]', ' ');
      object.word = `${newNoun}`;
      object.pos = 'noun';
      array.push(object);
    }
    else if (verb.test(word)) {
      let newVerb = word.replace('[v]', ' ');
      object.word = `${newVerb}`;
      object.pos = 'verb';
      array.push(object);
    }
    else if (adj.test(word)) {
      let newAdj = word.replace('[a]', ' ');
      object.word = `${newAdj}`;
      object.pos = 'adjective';
      array.push(object)
    }
    else {
      object.word = `${word}`;
      array.push(object)
    }
    if (finalLetter == "," || finalLetter == ".") {
      extraObject.word = `${finalLetter}`
      array.push(extraObject);
    }
  }
  console.log(array);
   return array;
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
    textManipulation(processedStory);
});

  let madLibsEdit = document.getElementsByClassName('madLibsEdit')[0]
  
  let madLibsPreview = document.getElementsByClassName('madLibsPreview')[0]

  // this loop is to whether replace the word w/pos with the input or display it as it is (in the original story array) in the DOM
   function textManipulation(array) { 
    let inputId = 0 
  for (let i=0; i<array.length; i++) { 
    if(array[i].pos){
        // if it has a part of speech then an input will be created and then input will replace the word with pos (input can be max 20 chars)      
    
      let input= document.createElement("input")
      input.id= inputId
      inputId = (inputId +1)%22; //we have 23 placeholders, so 22 indexes. We want to iterate over input places by pressing enter so once we reach index 22, it will go back to index 0. So we needed to specify this.
      input.maxLength="20"; 
      input.setAttribute("placeholder", array[i].pos)
        
      madLibsEdit.appendChild(input)
      
      let inputvalue = document.createElement("span")
      //input value is empty ,we add pos to it
      inputvalue.innerText = `(${array[i].pos})`
      input.addEventListener('input', function(){
        if (input.value){
          inputvalue.innerText = `${input.value}`
          inputvalue.style.color='#12313f';
        } else {
          inputvalue.innerText = `(${array[i].pos})`
          inputvalue.style.color='#12313f';
        }
      });
      madLibsPreview.appendChild(inputvalue);
     
  
  //  keydown event triggered with pressed keys (typing)
      input.addEventListener('keypress', e => keyDown(e, inputvalue)); // an event with a function that uses the iterations of inputId to iterate through the blanks 
       (function(inputId){ 
          input.addEventListener('keypress',
       function(e) { keyDown(e, inputvalue, inputId)});
       })(inputId)
        
      
    } 
    
    //if it does not have a part of speech:
    else { let editSpan = document.createElement("span")
      let displaySpan = document.createElement("span")
  
      editSpan.innerText = array[i].word+""
      displaySpan.innerText = array[i].word+""
  
      madLibsEdit.appendChild(editSpan)
      madLibsPreview.appendChild(displaySpan)
  
    } 
  }   
  }

// when we press enter (keycode 13) it will proceed to the next inout box. Once we reach the last one (index 22) it will start over from index 0.
  function keyDown(e, previewSpan, inputId) {
   
    if (e.keyCode == 13 ) { //13 means "enter"
      let nextInput = document.getElementById(inputId)
      
      if (!nextInput) { // iterates when there is a next input box through enter. Wriitng it this way is easier bc it is the default condition that we look for for our purpose. 
      
        return
      }
      nextInput.focus()
    }
    previewSpan.innerText= e.target.value; 
  }


