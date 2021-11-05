const { NotFound } = require('http-errors')

const { Contact } = require('../models')

const listContacts = async (req, res) => {
  const contacts = await Contact.find({}, '_id name email phone favorite')
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  })
}

const getContactById = async (req, res) => {
  const { id } = req.params
  const contact = await Contact.findById(id)
  if (!contact) {
    throw new NotFound(`Contact with id = ${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      contact
    }
  })
}

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      newContact
    }
  })
}

const removeContact = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndDelete(id)
  if (!result) {
    throw new NotFound(`Contact with id = ${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete'
  })
}

const updateById = async (req, res) => {
  const { id } = req.params
  const results = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!results) {
    throw new NotFound(`Contact with id = ${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      results
    }
  })
}

const updateStatusContact = async (req, res) => {
  const { id } = req.params
  const { favorite } = req.body
  const results = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
  if (!results) {
    throw new NotFound('missing field favorite')
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      results
    }
  })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
  updateStatusContact
}
