const {createApp}= Vue
 
const app= createApp({
    data(){
        return {
            listEvents: [],
            upcomingEvents: [],
            pastEvents: [],
            categories : [],
            dateActual:'',
            eventAttendancePercentage:[],
            eventLargeCapacity:[],
            infoFirstTable: [],
            informationByCategoryP:[],
            dataUpcomingEvents:[],
            dataUpcomingtEventsFill:[],
            informationByCategoryU:[],
            dataPastEvents:[],
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/amazing' )
            .then( response => response.json() )
            .then((datos)=>{
                this.dateActual=new Date(datos.currentDate)
                this.events=datos.events
                this.pastEvents=this.events.filter(event=> new Date(event.date)<this.dateActual)
                this.upcomingEvents=this.events.filter(event=> new Date(event.date)>this.dateActual)
                this.categories=[...new Set(this.events.map(event=>event.category))]   
                this.pastEvents.forEach(eventT=>{
                this.eventAttendancePercentage.push({   
                    nameEvent: eventT.name,
                    percentage:(eventT.assistance*100)/eventT.capacity,
                    })
                })
                this.eventAttendancePercentage.sort((x,y)=>y.percentage-x.percentage)
                this.eventLargeCapacity= this.pastEvents.sort((x,y)=>y.capacity-x.capacity)
                
                this.infoFirstTable.push({
                                    name1:this.eventAttendancePercentage[0].nameEvent, 
                                    name2:this.eventAttendancePercentage[this.eventAttendancePercentage.length-1].nameEvent, 
                                    name3:this.eventLargeCapacity[0].name})  
                //_____________________________________---
                
                this.categories.map(category=>   
                this.informationByCategoryP.push({
                    category:category,
                    events: this.upcomingEvents.filter(eventT=>eventT.category===category)
            }))
                this.informationByCategoryP.map(datos=>{
                        this.dataUpcomingEvents.push({
                        category:datos.category,
                        estimate:datos.events.map(e=>e.estimate),
                        capacity:datos.events.map(e=>e.capacity),
                        revenue:datos.events.map(e=>e.estimate * e.price)
                    })
            }) 
            this.dataUpcomingEvents.forEach(category=>{
                let estimateUE= 0
                category.estimate.forEach(estimate=>estimateUE+=Number(estimate))
                category.estimate= estimateUE
                let capacityUE=0
                category.capacity.forEach(capacity=>capacityUE += Number(capacity))
                category.capacity=capacityUE
                let revenueUE=0
                category.revenue.forEach(revenue=>revenueUE += revenue)
                category.revenue=revenueUE
                category.attendancePercentage= ((estimateUE*100)/capacityUE).toFixed(2)
            })
            this.dataUpcomingtEventsFill= this.dataUpcomingEvents.filter(element=> !element.attendancePercentage.includes("NaN"))   
            //***************************************************** */
            this.categories.map(category=>   
                this.informationByCategoryU.push({
                category:category,
                events:this.pastEvents.filter(eventT=>eventT.category===category)
            })) 
            this.informationByCategoryU.map(datos=>{
                this.dataPastEvents.push({
                    category:datos.category,
                    assistance:datos.events.map(e=>e.assistance),
                    capacity:datos.events.map(e=>e.capacity),
                    revenue:datos.events.map(e=>e.assistance * e.price)
                 })
         })
     
         this.dataPastEvents.forEach(category=>{
             let assistancePE= 0;
             category.assistance.forEach(assistance=>assistancePE +=Number(assistance))
             category.assistance= assistancePE;
             let capacityPE=0;
             category.capacity.forEach(capacity=>capacityPE += Number(capacity))
             category.capacity=capacityPE;
             let revenuePE=0;
             category.revenue.forEach(revenue=>revenuePE += revenue)
             category.revenue=revenuePE;
             category.attendancePercentage= ((assistancePE*100)/capacityPE).toFixed(2)
         })
            } )
            .catch( err => console.log( err ) )
    },
})
app.mount("#app")