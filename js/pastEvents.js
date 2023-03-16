const {createApp}= Vue

const app=createApp({
    data(){
        return{
            dateActual:'',
            pastEvents: [],
            events: [],
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
            .then((datos)=>{
               this.dateActual=new Date(datos.currentDate)
               this.events=datos.events
               this.pastEvents=this.events.filter(event=> new Date(event.date)<this.dateActual)
               this.filteredEvents=this.pastEvents
               this.categories=[...new Set(this.events.map(event=>event.category))]
               this.cargando=false    
            } )
            .catch( err => console.log( err ) )
    },
    methods: { 
        filter(){
            let filterCheck=this.pastEvents.filter(event=> event.name.toLowerCase().includes(this.searchInput.toLowerCase()))
            let filterSearch=filterCheck.filter(eventT=>this.checked.includes(eventT.category) || this.checked.length == 0)
            this.filteredEvents=filterSearch
        }
    },
})
app.mount("#app")
