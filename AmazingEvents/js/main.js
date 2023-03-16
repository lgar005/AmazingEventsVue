const { createApp } = Vue

const app = createApp( {

    data(){
        return {
            listEvents: [],
            categories : [],
            checked : [],
            filteredEvents: [],
            searchInput:'',
            cargando:true
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/amazing' )
            .then( response => response.json() )
            .then(({events})=>{
                this.listEvents=events
                this.filteredEvents=events
                this.categories  = [... new Set (events.map( event => event.category ))]
                this.cargando=false  
            } )
            .catch( err => console.log( err ) )
    },
    methods: {
 
        filter(){
            let filterCheck=this.filteredEvents=this.listEvents.filter(event=> event.name.toLowerCase().includes(this.searchInput.toLowerCase()))
            let filterSearch=filterCheck.filter(eventT=>this.checked.includes(eventT.category) || this.checked.length == 0)
            this.filteredEvents=filterSearch
        }
    },
    
})

app.mount('#app')