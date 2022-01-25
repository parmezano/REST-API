import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

new Vue({
    el: "#app", //казываем при помощи el корневой элемент
data(){
        return{
            form:{
                name: '',
                value: ''
            },
            contacts:[]

        }
},
    computed:{
        canCreate(){
            return this.form.name.trim() && this.form.value.trim()
        }
    },

    methods:{
        async createContact(){
            const {...contact} = this.form  // создаём объект с нужными нам значениями

            const newContact = await request ('/api/contacts', 'POST', contact)

            this.contacts.push(newContact)  //добавляем введенные данные в массив для хранения

            this.form.name = this.form.value = ''  //очищаем поля для ввода
        },
       async markContact(id){
            const contact = this.contacts.find(contact => contact.id === id)
           const updated = await request(`/api/contacts/${id}`, 'PUT', {...contact, marked: true})
           contact.marked = updated.marked
        },
        async deleteContact(id){
           await request (`/api/contacts/${id}`, 'DELETE')
            this.contacts = this.contacts.filter(contact => contact.id !== id)
        }
    },
    async mounted(){
        this.contacts = await request('/api/contacts')
    }
})


async function request(url, method = 'GET', data = null) {
    try{
        const headers = {}
        let body

        if (data) {
            headers['Content-type'] = 'application/json'
            body = JSON.stringify(data)
        }
        const response = await fetch(url, {
            method,
            headers,
            body,
        })
        return await response.json()
    } catch (e) {
        console.warn('Error: ', e)
    }
}