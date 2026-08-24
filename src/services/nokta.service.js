import Nokta from '../models/nokta.model.js';
import Person from '../models/person.model.js';

import ApiError from '../utils/ApiError.js';

export const createNoktaService = async (userId, body) => {
  const { personName, amount, transactionType, occasionType, date } = body;

  let person = await Person.findOne({
    user: userId,
    name: personName.trim()
  });

  if (!person) {
    person = await Person.create({
      user: userId,
      name: personName.trim()
    })
  }

  const nokta = await Nokta.create({
    user: userId,
    person: person._id,
    amount,
    transactionType,
    occasionType,
    date
  });

  await nokta.populate('person', 'name');

  return nokta;
}

export const getAllNoktaService = async (userId) => {
  const noktas = await Nokta.find({ user: userId }).populate('person', 'name').sort({ date: -1 });
  return noktas;
}

export const getNoktaByIdService = async (userId, noktaId) => {
  const nokta = await Nokta.findOne({
    _id: noktaId,
    user: userId
  }).populate('person', 'name');

  if (!nokta) {
    throw new ApiError('Nokta not found', 404);
  }

  return nokta;
} 

export const updateNoktaService = async (userId, noktaId, body) => {
  const { personName, amount, transactionType, occasionType, date } = body;
  
  const nokta = await Nokta.findOne({
    _id: noktaId,
    user: userId,
  });

  if (!nokta) {
    throw new ApiError('Nokta not found', 404);
  }

  if (personName !== undefined) {
    let person = await Person.findOne({
      user: userId,
      name: personName.trim(),
    });

    if (!person) {
      person = await Person.create({
        user: userId,
        name: personName.trim(),
      });
    }

    nokta.person = person._id;
  }

  if (amount !== undefined) {
    nokta.amount = amount;
  }

  if (transactionType !== undefined) {
    nokta.transactionType = transactionType;
  }

  if (occasionType !== undefined) {
    nokta.occasionType = occasionType;
  }

  if (date !== undefined) {
    nokta.date = date;
  }

  await nokta.save();

  return await nokta.populate('person', 'name');
}

export const deleteNoktaService = async (userId, noktaId) => {
  const nokta = await Nokta.findOneAndDelete({
    _id: noktaId,
    user: userId,
  });

  if (!nokta) {
    throw new ApiError('Nokta not found', 404);
  }

  return nokta;
};

export const getAllNoktaByPersonService = async (userId, personId) => {
  const person = await Person.findOne({
    _id: personId,
    user: userId,
  });

  if (!person) {
    throw new ApiError('Person not found', 404);
  }

  const noktas = await Nokta.find({ user: userId, person: personId }).populate('person', 'name').sort({ date: -1 });

  return noktas;
};
