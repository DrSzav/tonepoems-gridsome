<template>
  <Layout>
  
    <SinglePoem />

  </Layout>
</template>


<script>
//import SinglePoem from '~/templates/SinglePoem'
export default {
  components: {
    SinglePoem:import('~/templates/SinglePoem').default
  }
}
</script>
