const fs = require('fs')
const axios = require('axios');

const callHistoryPath = './data/call-history.json';
const contactsPath = './data/contacts.json';

// Read the file and parse it
const rawHistoryData = fs.readFileSync(callHistoryPath);
const contactsData = fs.readFileSync(contactsPath);

let gContacts = JSON.parse(contactsData);
let gHistory = JSON.parse(rawHistoryData);
const CONTACTS_PER_PAGE = 9                                                  

module.exports = {
  query,
  getById,
  remove,
  save,
}

async function query(contactsType) {

  contacts = await _loadContacts(contactsType)
  return { contacts }
}

async function getById(contactId) {

}

function remove(contactId) {
  const idx = gContacts.findIndex((contact) => contact._id === contactId)
  gContacts.splice(idx, 1)
  return _saveContactsToFile()
}

function save(contact) {
  if (contact._id) {
    const idx = gContacts.findIndex((currContact) => currContact._id === contact._id)
    gContacts[idx] = contact
  } else {
    contact._id = _makeId()
    gContacts.unshift(contact)
  }
  return _saveContactsToFile().then(() => contact)
}

async function _loadContacts(contactsType) {
  const contacts = contactsType === 'history' ? gHistory : gContacts 
  return contacts
}

function _saveContactsToFile() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(gContacts, null, 2)

    fs.writeFile('data/contact.json', data, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}


// this func made to clear the unnecessary contacts
function _minifyContacts(gContacts) {
  const minifiedContacts = gContacts.map(contact => {
    return {
      id: contact.id,
    }
  })
  return minifiedContacts
}