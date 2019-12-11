<template>
  <Layout>
    <div id="mainBlock" class="container">

      <h1 id="title" class="text-6xl text-center">Tone Poems</h1>

      <span id="wow" ref="input" v-observer:subtree.childList="mutationHandler" contenteditable="true" @paste.prevent data-ph="Type Something..." v-on:keyup="keyupEvent"
        v-on:keydown="keydownEvent" class="poemHolder align-middle text-3xl text-center text-gray-700 w-full h-64">
      </span>


    </div>

  </Layout>
</template>
<script>
//<span v-for="letter in letters" v-bind:class="{ active: stepNumber === syncKey }" contenteditable="false">{{letter}}</span>
import WebSynth from '../webAudioSynth.js';
import EventLooper from '../EventLooper.js';
EventLooper.start();
function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}
function ignoreThis(key){
  return [' '].indexOf(key) > -1 ? true : false;
}

function getCaretCharacterOffsetWithin(element) {
  if (typeof window.getSelection != "undefined") {
    var range = window.getSelection().getRangeAt(0);
    var selected = range.toString().length; // *
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    if(selected){ // *
      caretOffset = preCaretRange.toString().length - selected; // *
    } else { // *
      caretOffset = preCaretRange.toString().length;
    } // *
  }
}

import { observer } from 'vue-mutation-observer'
export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  data: ()=> {return {
        syncKey: EventLooper.currentStep,
        letters: []
    }}
  ,
  directives: { observer },
    methods: {
        keyupEvent(event){
          if(event.key.length == 1){
            console.log('Key pressed:', event);
            console.log(event.timestamp);
            console.log(event.key);
          }},
          keydownEvent(event) {
            console.log(event)
            if(event.key.length == 1 && !ignoreThis(event.key)){
              event.preventDefault();
              WebSynth.playNote(event.keyCode);
              let eventID = EventLooper.insertEvent(()=> {
                WebSynth.playNote.bind(WebSynth,event.keyCode)();
              });
              //this.letters.splice(getCaretCharacterOffsetWithin( ),0,key);
              pasteHtmlAtCaret('<span class="letra active' + eventID.stepNumber + '" contenteditable="false" class="' + eventID.functionNumber + eventID.stepNumber + '" data-functionnumber="' + eventID.functionNumber + '" data-stepnumber="' + eventID.stepNumber + '">' + event.key + '</span>');
              this.$forceUpdate();
              //let timing = event.timestamp % 10000;

              console.log('Key pressed:', event);
              console.log('timeslot:' + (event.timestamp % 10000));
              console.log(event.key);
            }
        },
        mutationHandler(mutations){
          console.log(EventLooper);
          console.log(mutations);

          mutations.map( recordPage => {
            if(recordPage.removedNodes.length > 0){
              EventLooper.deleteSpans(recordPage.removedNodes);
            }
          });
        }
  }
}
</script>
<style>

[contentEditable=true]:empty:not(:focus):before{
    content:attr(data-ph)
}

.home-links a {
  margin-right: 1rem;
}

.activeLetter{

  -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 2s; /* Safari 4.0 - 8.0 */
  animation-name: example;
  animation-duration: 2s;
}

.poemHolder{
  display: block;
}

/* Safari 4.0 - 8.0 */
@-webkit-keyframes example {
  from {color: black;
  font-size: 220%;}
  to {color: lightgray;
  font-size: 200%;}
}

/* Standard syntax */
@keyframes example {
  from {color: black;
  font-size: 220%;}
  to {color: lightgray;
  font-size: 200%;}
}

</style>
