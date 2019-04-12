exports.seed = function(knex) {
  return knex('toilet').insert([
    {
      shape: 'hard pellet-like lumps',
      smells: 'sulfurous',
      colour: 'black'
    },
    {
      shape: 'lumpy and sausage like',
      smells: 'like rotten eggs',
      colour: 'white'
    },
    {
      shape: 'crusty with cracks in the surface',
      smells: 'odourless',
      colour: 'green'
    },
    {
      shape: 'like a smooth, soft sausage or snake',
      smells: 'like a rotting corpse',
      colour: 'red',
      bloody: true
    },
    {
      shape: 'soft blobs',
      smells: 'of spoiled cheese',
      colour: 'orange'
    },
    {
      shape: 'like a gooey mush',
      smells: 'a mix of vomit and cat urine',
      colour: 'yellow'
    },
    {
      shape: 'liquidy with no solid pieces',
      smells: 'like plain ol diarrhea',
      colour: 'brown'
    }
  ]);
};
