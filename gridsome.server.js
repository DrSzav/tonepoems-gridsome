// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.createPages(({ createPage }) => {
    createPage({
      path: '/:id',
      component: './src/templates/SinglePoem.vue'
    })
  })
  api.loadSource((actions => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const collection = actions.addCollection('poems')

    collection.addNode({
      innerText: 'Lorem ipsum dolor sit amet.',
      innerHTML:''
    });

  }));
}
