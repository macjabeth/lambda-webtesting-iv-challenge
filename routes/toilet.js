const validate = require('../middleware/validate');
const Toilet = require('../models/toilet');
const router = require('express').Router();

// C
router.post('/', validate(Toilet.schema), async ({ body: newTurd }, res) => {
  const [id] = await Toilet.drop(newTurd);
  const [turd] = await Toilet.sniffById(id);
  res.status(201).json(turd);
});

// R
router.get('/', async (req, res) => {
  const turds = await Toilet.sniff();
  res.status(200).json(turds);
});

router.get('/:id', async ({ params: { id } }, res) => {
  const [turd] = await Toilet.sniffById(id);
  Boolean(turd)
    ? res.status(200).json(turd)
    : res.status(404).json({ message: 'That turd couldn\'t be found in the toilet.' });
});

// U
router.put(
  '/:id',
  validate(Toilet.schema),
  async ({ params: { id }, body: changes }, res) => {
    const count = await Toilet.mix(id, changes);
    Boolean(count)
      ? res.status(200).json({ count })
      : res.status(404).json({ message: 'That turd couldn\'t be mixed, sorry.' });
  }
);

// D
router.delete('/:id', async ({ params: { id } }, res) => {
  const count = await Toilet.liquefy(id);
  Boolean(count)
    ? res.status(204).end()
    : res.status(404).json({ message: 'That turd couldn\'t be liquefied, sorry.' });
});

module.exports = router;
