<template>
  <Layout>
    <div id="mainBlock" class="container">

        <v-dialog/>

      <h1 id="title" class="text-6xl text-center">New Poem</h1>
      <h1 id="title" class="text-1xl text-center">type something below:</h1>
      <div class=".DivWithScroll text-center">

        <div id="wow" ref="input" width="100%" v-observer:subtree.childList="mutationHandler"
          @blur="onEdit"
    
          contenteditable="contenteditable" @paste.prevent data-ph="Type Something..." v-on:keyup="keyupEvent"
          v-on:keydown="keydownEvent" class="
          h-auto min-h-32 poemHolder align-middle text-3xl text-center
          text-gray-700 w-full py-2 px-4 border-transparent
          rounded shadow focus:bg-gray-100 bg-white focus:border-red-400

          ">
        </div>
        <ClientOnly>
          <SimpleKeyboard v-responsive.md.sm.xs @onKeyPress="onKeyPress"/>
        </ClientOnly>
        <div class="simple-keyboard"></div>
        <div class="m-12">
        <button  v-on:click="savePoem" class="bg-white hover:bg-gray-100 text-gray font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Save + Share
        </button>
      </div>

     </div>

     <RecentPoems />
    </div>

  </Layout>
</template>


<script>
//import Keyboard from "simple-keyboard";
import { db } from '~/firebaseConfig'
import { ulid } from 'ulid'

//SimpleKey = new SimpleKeyboard();
//<span v-for="letter in letters" v-bind:class="{ active: stepNumber === syncKey }" contenteditable="false">{{letter}}</span>
import WebSynth from '../webAudioSynth.js';
import EventLooper from '../EventLooper.js';
import {pasteHtmlAtCaret} from '../helperFunctions.js';
import { observer } from 'vue-mutation-observer';
import RecentPoems from '~/components/RecentPoems.vue';
import { required, minLength } from 'vuelidate/lib/validators';

//import SimpleKeyboard from ;
EventLooper.reset();
EventLooper.start();
let mySynth = null;
//import SimpleKeyboard from '~/components/SimpleKeyboard.vue'

//import VModal from 'vue-js-modal';

function ignoreThis(key){
  return [' '].indexOf (key) > -1 ? true : false;
}

function getSelectionStart() {
  var node = document.getSelection().anchorNode;
  return (node.nodeType == 3 ? node.parentNode : node);
}

export default {
  metaInfo: {
    title: 'Tone Poems Home'
  },
  components: {
    RecentPoems,
    SimpleKeyboard: ()=> import('~/components/SimpleKeyboard.vue')
},
  data: ()=>
    {
      return {
          syncKey: EventLooper.currentStep,
          letters: [],
          innerHTML:'',
          innerText:'',
        //  width:document.width,
          mobile:true


      }
    },
  validations: {
    innerText: {
      required,
      minLength: minLength(1)
    },
    innerHTML: {
      required,
      minLength: minLength(1)
    }
  },

  directives: { observer },
  computed: {
    onfocus: function () {

      // `this` points to the vm instance
      if(this.mobile){
        return ()=>{
            console.log('do something')
            this.$refs.input.blur();
          }
      }
      else{
        return function(){
          console.log('do nothing')
        }
      }
    },
    contenteditable: function(){
      if(this.mobile){
        console.log('this is mobile')
      return
       // 'false'
       'contenteditable'
      }
      else{
        return 'contenteditable'
      }
  },
  readonly: function(){
    if(mobile){
      console.log('readonly')
    return
      'readonly'
    }
    else{
      console.log('not read only')
      return 'false'
    }
}

  },
  mounted(){


      this.mobile =  window.innerWidth < 990;

      if(!this.mySynth){
        this.mySynth = new WebSynth('Original','C',window);
      }
      EventLooper.reset();
      console.log('mounted');
      this.$refs.input.focus();

      this.$modal.show('dialog', {
        title: 'somewhat important',
        text: 'this website makes beautiful majestic music (and sometimes awful, terrible, noise), to start press any button',
        buttons: [
          {
            title: 'just touch Me ;)',
        //    handler: () => { alert('great job! you touched the good button :)') }
          },
          {
            title: 'do not touch',       // Button title
            default: true,    // Will be triggered by default if 'Enter' pressed.
   
          },
          {
            title: 'close'
          }
       ]
     })
  },
  methods: {
    keyupEvent(event){
      if(event.key.length == 1){
        console.log('Key pressed:', event);
        console.log(event.timestamp);
        console.log(event.key);
    }},
    keydownEvent(event) {
      //this.$refs.input.focus();
      console.log('keydownEvent')
      if(!EventLooper.nowPlaying){
        EventLooper.start();
      }
      //console.log(event)
      console.log(event.key);
      if(event.key.length == 1 && !ignoreThis(event.key)){
        event.preventDefault();
        event.stopPropagation();
        //convert keycode to charcode:
        let charCode = event.key.charCodeAt(0);

        this.mySynth.playNote(charCode);
        let eventID = EventLooper.insertEvent(()=> {
          console.log('inserting char code',charCode)
          this.mySynth.playNote.bind(this.mySynth,charCode)();
        });
        pasteHtmlAtCaret('<span class="letra active' + eventID.stepNumber + '" contenteditable="false" class="' + eventID.functionNumber + eventID.stepNumber + '" data-functionnumber="' + eventID.functionNumber + '" data-stepnumber="' + eventID.stepNumber + '">' + event.key + '</span>');
        console.log('Key pressed:', event);
        console.log('timeslot:' + (event.timestamp % 10000));

        return;
        }
        if(event.key == 'Enter'){
          event.preventDefault();
          event.stopPropagation();
          pasteHtmlAtCaret('\n');
          return
        }
    },
    onKeyPress(button){
      console.log('onKeyPress')
      this.$refs.input.focus();


          if(!EventLooper.nowPlaying){
            EventLooper.start();
          }
          if(button == '{space}'){
            pasteHtmlAtCaret(' ');
            return
          }
          if(button == '{shift}' || button == '{numbers}' || button == '{abc}'){
            return
          }
          if(button == '{backspace}'){
            let node = document.getSelection().anchorNode;
            let anchorOffset = document.getSelection().anchorOffset;
            console.log(node);
            console.log(node.childNodes)
            let toDel = node.childNodes[anchorOffset - 1];
            toDel.parentNode.removeChild(toDel);

            //if(node.parentNode.classList.contains('poemHolder'))
            //node.parentNode.removeChild(node);
            return;
          }
          if(button == '{ent}'){
            pasteHtmlAtCaret('\r');
            return;
          }
          let charCode =  button.charCodeAt(0);
          this.mySynth.playNote(charCode);
          let eventID = EventLooper.insertEvent(()=> {
            console.log('inserting char code',charCode)
            this.mySynth.playNote.bind(this.mySynth,charCode)();
          });
          pasteHtmlAtCaret('<span readonly="readonly" tabindex="0" class="letra active' + eventID.stepNumber + '" contenteditable="false" class="' + eventID.functionNumber + eventID.stepNumber + '" data-functionnumber="' + eventID.functionNumber + '" data-stepnumber="' + eventID.stepNumber + '">' + button + '</span>');
          console.log(button)
    //    }
    },


    onEdit(evt){
     this.innerHTML = evt.target.innerHTML;
     this.innerText = evt.target.innerText
    },
    mutationHandler(mutations){
      console.log(EventLooper);
      console.log(mutations);

      mutations.map( recordPage => {
        if(recordPage.removedNodes.length > 0){
          EventLooper.deleteSpans(recordPage.removedNodes);
        }
      });
    },
    savePoem() {
      const text = this.innerText;
      const html = this.innerHTML;
      const newID = ulid();
      EventLooper.stop();
      EventLooper.reset();
      db.collection('poems').doc(newID).set({
        innerText: text,
        innerHTML: html
      }).then(() => {
        this.$router.push({ path: '/' + newID });
      }).catch(error => {
        console.error("Error saving poem: ", error);
      });
    },
  },
  beforeRouteUpdate (to, from, next) {
    console.log('route change')
     EventLooper.reset();
  },
}

</script>
<style>


[contenteditable]:focus, button:focus {
    outline: 0px solid transparent;
}

 [contentEditable=true]:empty:not(:focus):before{
    content:attr(data-ph)
}

.home-links a {
  margin-right: 1rem;
}

.poemHolder{
  display: block;
  white-space:pre-wrap;
}

</style>
