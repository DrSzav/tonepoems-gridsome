<template>
  <div>
    <a href="#recents">
      <h1 class="text-2xl text-center">Recent Tones</h1>
    </a>

    <div  class="flex flex-wrap">


      <div v-for="poem in poemArray" :key="poem.id" class="p-2 w-4/12 w-32 h-32 text-center ">
        <a :href="poem.id" class="box-shadow hover:bg-gray-100 h-full justify-center flex-col flex rounded flex justify-center">
          <div class="h-auto  overflow-hidden"><h2>{{ poem.innerText }}</h2></div>
        </a>
      </div>
    </div>

  <a name="recents"></a>
</div>
</template>


<script>
import Vue from 'vue'
export default {
  name: 'RecentPoems',
  data () {
    return {
      allpoems: {},
    }
  },
  mounted: function(){
  //  this.allpoems = this.$gun.get('allpoems');
//  let vueInstance = this.vm;
  console.log(this)
    this.$gun.get('allpoems').map().on((node, key) => {
         // add results straight to the Vue component state
         // and get updates when nodes are updated by GUN
         console.log(node)
         //node.id = key;
        // this.allpoems[key] = node;
         Vue.set( this.allpoems, key, node )
     });

  },
  computed:{
    poemArray:function(){
      //this.allpoems = this.$gun.get('allpoems');
      let mypoems = [];
      for(var key in this.allpoems) {
        if(this.allpoems[key] && this.allpoems[key].innerHTML ){
          mypoems.push({id:key,innerHTML:this.allpoems[key].innerHTML,innerText:this.allpoems[key].innerText});
        }
      }
      /*
      this.$gun.get('allpoems').map().on((node, key) => {
           // add results straight to the Vue component state
           // and get updates when nodes are updated by GUN
           console.log(node)
           node.id = key;
           mypoems.push(node);
       });
       */
       return mypoems.reverse();
    },
    superpoems:function(){
      return this.$gun.get('allpoems')
    }
  }
}
</script>
