const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const contactService = require('./services/contact.service')
const app = express()

// Cors Config:
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Express Config:
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// Express Routing:

app.get('/api/contact', async (req, res) => {
  const { contactsType } = req.query
  try {
    const contacts = await contactService.query(contactsType)
    res.send(contacts)
  }
  catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Failed to get contacts' })
  }
})

// READ
app.get('/api/contact/:contactId', async (req, res) => {
  const {contactId} = req.params

  try {
    const contact = await contactService.getById(contactId)
    res.send(contact)
  } 
  catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Failed to get contact by Id' })
  }
})

// ADD
app.post('/api/contact/', (req, res) => {
  const { contactParam1, contactParam2 } = req.body

  const contact = {
    contactParam1,
    contactParam2,
  }

  contactService.save(contact).then((savedContact) => {
    res.send(savedContact)
  })
})

// UPDATE
app.put('/api/contact/:contactId', (req, res) => {
  // TODO: EXPRESS.JSON()
  const { contactParam1, contactParam2, _id } = req.body

  const contact = {
    _id,
    contactParam1, 
    contactParam2,
  }
  contactService.save(contact).then((savedContact) => {
    res.send(savedContact)
  })
})

// DELETE
app.delete('/api/contact/:contactId', (req, res) => {
  const { contactId } = req.params
  contactService.remove(contactId).then(() => {
    res.send('Removed!')
  })
})


app.listen(3030, () =>
  console.log(`Server listening on port http://127.0.0.1:3030/`)
)
