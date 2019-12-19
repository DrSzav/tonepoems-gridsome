<template>

  <div class="layout">
    <header class="header">
      <head>
  <!-- Open Graph -->
  <meta name="og:title" content="Tone Poems" />
  <meta
    name="og:description"
    content="For creating and sharing short poems and messages."
  />
  <meta name="og:type" content="article" />
  <meta
    name="og:image"
    content="/favicon.png"
  />
</head>
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
@import url('https://fonts.googleapis.com/css?family=Lilita+One|Montserrat|Solway&display=swap');
body {
  font-family: 'Solway', serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}

.showSpace{
  white-space: pre-wrap;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
