<template>
  <Layout>
    <div id="mainBlock" class="container">

      <h1 id="title" class="text-6xl text-center">Tone Poems</h1>

      <div class=".DivWithScroll text-center">
        <div id="wow" ref="input" width="100%" v-observer:subtree.childList="mutationHandler"
          @blur="onEdit"
          contenteditable="plaintext-only" @paste.prevent data-ph="Type Something..." v-on:keyup="keyupEvent"
          v-on:keydown="keydownEvent" class="
          h-auto min-h-32 poemHolder align-middle text-3xl text-center
          text-gray-700 w-full py-2 px-4 border-transparent
          rounded shadow focus:bg-gray-100 bg-white focus:border-red-400

          ">
        </div>
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
import gql from 'graphql-tag';
import POEMS_CREATE from '~/graphql/CreatePoem.gql';
import POEMS_ALL 		from '../graphql/PoemsAll.gql';
import { ulid } from 'ulid'


const todoItemsQuery = gql`
  {
    clientSide @client {
      id
      innerText
      innerHTML
    }
  }
`;
//<span v-for="letter in letters" v-bind:class="{ active: stepNumber === syncKey }" contenteditable="false">{{letter}}</span>
import WebSynth from '../webAudioSynth.js';
import EventLooper from '../EventLooper.js';
import {pasteHtmlAtCaret} from '../helperFunctions.js';
import { observer } from 'vue-mutation-observer';
import RecentPoems from '~/components/RecentPoems.vue';
//import apolloProvider from '~/apollo.js';
import { required, minLength, between } from 'vuelidate/lib/validators';
EventLooper.reset();
EventLooper.start();
let mySynth = null;

function ignoreThis(key){
  return [' '].indexOf(key) > -1 ? true : false;
}


export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    RecentPoems
  },
  data: ()=>
    {
      return {
          syncKey: EventLooper.currentStep,
          letters: [],
          innerHTML:'',
          innerText:''
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
  mounted()
  {

      mySynth = new WebSynth('Original','C',window);

  },
  methods: {
    updatePoem (e) {
      this.$store.commit('updatePoem', e.target.value)
    },
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
        event.stopPropagation();
        mySynth.playNote(event.keyCode);
        let eventID = EventLooper.insertEvent(()=> {
          mySynth.playNote.bind(mySynth,event.keyCode)();
        });
        //this.letters.splice(getCaretCharacterOffsetWithin( ),0,key);
        pasteHtmlAtCaret('<span class="letra active' + eventID.stepNumber + '" contenteditable="false" class="' + eventID.functionNumber + eventID.stepNumber + '" data-functionnumber="' + eventID.functionNumber + '" data-stepnumber="' + eventID.stepNumber + '">' + event.key + '</span>');
        //this.$forceUpdate();
        //let timing = event.timestamp % 10000;

        console.log('Key pressed:', event);
        console.log('timeslot:' + (event.timestamp % 10000));
        console.log(event.key);
        }
      },

    onEdit(evt){
//      console.log('saving')
     this.innerHTML = evt.target.innerHTML;
     this.innerText = evt.target.innerText
     //console.log(src);
     //this.$store.commit('updatePoem',src);
     //console.log(this.$apollo)
    },
          /*
          if(event.key === "Enter"){
            //event.preventDefault();
            event.stopPropagation()
            pasteHtmlAtCaret('<p> </p>')
          }
          */
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
    const newID =  ulid();
    this.$gun.get('allpoems').get(newID).put({innerText:text, innerHTML: html });
    this.$router.push({path:'/' + newID }); 
    //console.log(this.$gun.get('allpoems').map())
  },



  }
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
}

</style>
