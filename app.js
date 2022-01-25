const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express();

app.use(express.json())

CONTACTS=[
    {id: v4(), name: 'Danila', value:'+871263548734', marked: false}
]

///GET
app.get('/api/contacts', (req, res)=>{
    res.status(200).json(CONTACTS)
})

///POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: Date.now(), marked: false}; ///// почему при задании айди при помощи Date.now() не работает обработка пут и делит на стороне сервера
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

///DELETE
app.delete(`/api/contacts/:id`, (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.json({message: 'Контакт был удалён!'})
})

///PUT
app.put('/api/contacts/:id', (req,res) => {
    const indx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[indx] = req.body
    res.json(CONTACTS[indx])
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client', 'index.html'))
})

app.listen(3000, ()=>{
    console.log('Server has been started at port 3000...')
})
