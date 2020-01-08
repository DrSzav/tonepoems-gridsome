<template>

  <Layout>
    <div>
    <div v-if="!poem">
      <h1>Oooops! poem not found...</h1>
    </div>
  <div class="text-center my-16 pb-32">
    <div v-show="poem" class="">
      <h1 class="text-4xl">What a Beautiful Poem</h1>
      <div id="wow" width="100%"
        class="h-auto min-h-32 poemHolder align-middle text-3xl text-center
        text-gray-700 w-full py-2 px-4 border-transparent
        rounded bg-white" v-html="poem.innerHTML" :key="poem['_']['#']">
      </div>
      <button :disabled='playing' v-bind:class="{ 'opacity-50': playing, 'cursor-not-allowed': playing }" v-on:click="playPoem" class="mx-2 mb-8 bg-white hover:bg-gray-100 text-gray font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Play me!
      </button>
      <button :disabled='!playing' v-bind:class="{ 'opacity-50': !playing, 'cursor-not-allowed': !playing }"  v-on:click="stopPoem" class="mx-2 mb-8 bg-white hover:bg-gray-100 text-gray font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Stop
      </button>
      <div class="">
    <h1 v-on:click="copyLink" class="py-2 text-2xl cursor-pointer">Share this masterpiece</h1>
    <input type="text" v-model="this_url" id="inputty" ref="copy"></input>
    <transition name="fade">
    <div v-if="shareOn" class=" container">
    </div>
  </transition>
    </div>
  </div>

</div>
<div>
<RecentPoems/>
</div>
</div>
</Layout>
</template>
<script>
//import VueGoodshare from "vue-goodshare";
import RecentPoems from '~/components/RecentPoems.vue';
import EventLooper from '../EventLooper.js';
import WebSynth from '../webAudioSynth.js';

let mySynth = null;
export default {
  data() {
    return {
      poem: {innerHTML:'','_':{'#':0}},
      shareOn: false,
      playing: false,
      this_url: '',
      window:null
    }
  },
  components: {
    RecentPoems
  },
  methods:{
    copyLink(){

      this.this_url = this.window.location.origin + '/' + this.id;

    console.log('hello')
        setTimeout( () => {
          console.log('hi')
        var copyText = this.$refs.copy;
        copyText.select();

        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
      document.execCommand("copy");
        if (process.isClient) {
          this.$toasted.show('URL copied to clipboard!',{duration:1000});
        }
      },200);

    },
    playPoem(){
      this.playing = true;
      EventLooper.start();
    },
    stopPoem(){
      this.playing = false;
      EventLooper.stop();
    },
    getPoem(id){
      EventLooper.stop();
      this.playing = false;
      this.$gun.get('allpoems').get(id).on((poem)=>{
        this.poem = poem;
        this.id = id;
        EventLooper.reset();

        var wrapper= document.createElement('div');
        wrapper.innerHTML= poem.innerHTML;
        //var div= wrapper.firstChild;
        for(var child=wrapper.firstChild; child!==null; child=child.nextSibling) {
          //console.log(child);
          if(child.innerText){
            let keycode = child.innerText.charCodeAt(0);
            let stepNumber = child.dataset['stepnumber'];
            EventLooper.insertEventAt(()=>{
              mySynth.playNote.bind(mySynth,keycode)();
            },stepNumber);
          }
        }
        console.log(poem)

      }
      );//.put({innerText:text, innerHTML: html })
      console.log(this.poem)
    }
  },
  async mounted() {
    //console.log(this.$route)
    this.this_url = '';
    if(process.isClient){
      this.window = window;
    }
    this.getPoem(this.$route.params.id);
    mySynth = new WebSynth('Original','C',window);
  },
 beforeRouteUpdate (to, from, next) {
   console.log('route change')
    EventLooper.reset();
    EventLooper.stop();
     this.getPoem(to.params.id);
     this.this_url = window.location.href;
     next();
 }
}
</script>
