<template>
  <div>
    <a href="#recents">
      <h1 class="text-2xl text-center">Recent Tones</h1>
    </a>

    <div  class="flex flex-wrap">


      <div v-for="poem in poems" :key="poem.id" class="p-2 w-4/12 w-32 h-32 text-center ">
        <a :href="poem.id" class="box-shadow hover:bg-gray-100 h-full justify-center flex-col flex rounded flex justify-center">
          <div class="h-auto  overflow-hidden"><h2>{{ poem.innerText }}</h2></div>
        </a>
      </div>
    </div>

  <a name="recents"></a>
</div>
</template>


<script>
import { db } from '~/firebaseConfig'

export default {
  name: 'RecentPoems',
  data() {
    return {
      poems: []
    }
  },
  mounted() {
    db.collection('poems').get().then(snapshot => {
      console.log(snapshot.docs)  
      let poems = snapshot.docs.map(doc => {
        console.log(doc.data())
        
        return { ...doc.data(), id: doc.id }
      })
      this.poems = poems.reverse()
    })
  }
}
</script>
