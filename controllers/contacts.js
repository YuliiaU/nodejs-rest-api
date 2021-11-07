const { NotFound } = require('http-errors')

const { Contact } = require('../models')

const listContacts = async (req, res) => {
  const { page = 1, limit = 2 } = req.query
  const skip = (page - 1) * limit
  const { _id } = req.user
  const contacts = await Contact.find({ owner: _id }, '_id name email phone', { skip, limit: +limit }).populate('owner', 'email')
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  })
}

const getContactById = async (req, res) => {
  const { _id } = req.params
  const contactId = req.params.contactId
  const contact = await Contact.findById({ _id: contactId, owner: _id })
  if (!contact) {
    throw new NotFound(`Contact with id = ${contactId} not found`)
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
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
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
