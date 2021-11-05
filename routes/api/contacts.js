const express = require('express')
const router = express.Router()

const { controllerWrapper, validation } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:id', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:id', controllerWrapper(ctrl.removeContact))

router.put('/:id', validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:id', controllerWrapper(ctrl.updateStatusContact))

module.exports = router
