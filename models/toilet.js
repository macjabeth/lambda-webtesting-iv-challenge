const Joi = require('joi');
const db = require('../data/db');

module.exports = {
  drop: turd => db('toilet').insert(turd),
  sniff: () => db('toilet').select(),
  sniffBy: filter => db('toilet').where(filter),
  sniffById: id => db('toilet').where({ id }),
  mix: (id, changes) => db('toilet').where({ id }).update(changes),
  liquefy: (id) => db('toilet').where({ id }).del(),
  flush: () => db('toilet').truncate(),
  schema: turd => {
    const schema = Joi.object().keys({
      shape: Joi.string().required(),
      colour: Joi.string().required(),
      smells: Joi.string().required(),
      bloody: Joi.boolean()
    });

    return Joi.validate(turd, schema);
  }
};
