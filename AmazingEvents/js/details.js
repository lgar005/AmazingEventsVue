const { createApp } = Vue

const app = createApp( {

    data(){
        return {
            event: [],
            listEvents:[],
            id:'',
            params:'',
            estiOrAssis:''
        
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/amazing' )
            .then( response => response.json() )
            .then(({events})=>{
                this.listEvents=events
                this.params=new URLSearchParams(location.search)
                console.log(this.params)
                this.id= this.params.get("id")
                console.log(this.id)
                this.event=this.listEvents.find(event=>event._id.toString()===this.id);
                console.log(this.event)
                this.estiOrAssis = this.event.assistance ? "Assistance: " + this.event.assistance: "Estimate: " + this.event.estimate
            } )
            .catch( err => console.log( err ) )
    },
    methods: {
       
    },
    
})

app.mount('#app')