const Toilet = require('../../../models/toilet');

describe('toilet', () => {
  it('should drop many turds', async () => {
    await Toilet.drop({
      shape: 'like a spear',
      colour: 'grey',
      smells: 'metallic',
      bloody: true
    });

    await Toilet.drop({
      shape: 'like ten family-sized milkyway bars mushed together',
      colour: 'yellowy brown',
      smells: 'the last person who tried, died'
    });

    const turds = await Toilet.sniff();
    expect(turds).toHaveLength(2);
  });

  it('should have those turds inside it', async () => {
    const [turd] = await Toilet.sniffBy({ smells: 'metallic' });
    expect(turd).toBeDefined();
    expect(turd.bloody).toBeTruthy();
  });

  it('should flush the turds away', async () => {
    await Toilet.flush();

    const turds = await Toilet.sniff();

    expect(turds).toHaveLength(0);
  });
});
