const flights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, layover: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, layover: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, layover: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, layover: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, layover: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, layover: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, layover: true },
  { id: 07, to: "Shangai", from: "Barcelona", cost: 800, layover: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, layover: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, layover: false },
];

let ahead = true;

const showFlights = () =>{
    
  for(let i=0; i<flights.length;i++){
      
             if(flights[i].layover === false){
                console.log(`El vuelo con origen: ${flights[i].from},y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ y no realiza ninguna escala. `);
             }
             console.log(`El vuelo con origen: ${flights[i].from},y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€  `);          
         }
}

const lowCost = () =>{
   let minPrice = 0;
    minPrice = flights[0].cost;
    for(let i=0; i<flights.length;i++){
        if(flights[i].cost < minPrice){
            minPrice = flights[i].cost;
        }
    
    }
    return minPrice;
}

const searchFlights = () =>{
    let control = lowCost(); 
    let price = parseInt(prompt("Introduzca el precio del vuelo: "));
    if(!(isNaN(price))){
        if(price < control){
           console.log("Lo sentimos, no se ha encontrado ningun vuelo.");
        }else{
            for(let i=0; i<flights.length;i++){
            
                if(flights[i].cost <= price){
                            if(flights[i].layover === false){
                               console.log(`El vuelo con origen: ${flights[i].from},y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ y no realiza ninguna escala. `);

                            }
                              console.log(`El vuelo con origen: ${flights[i].from},y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€  `);
               }  
        }

        }
            
    }else{
       
        alert(" El valor introducido no es valido.");
    }
}

const deleteFlights = () =>{
  let number = parseInt(prompt("Introduzca el id del vuelo a eliminar"));
    
    if(!(isNaN(number))){
        for(let i=0; i<flights.length;i++){
            if(flights[i].id === number){
                flights.splice(i,1);
              
            }
        
        }
       
    }else{
      alert(" El identificador introducido no es valido");
    }

}

const newFlights = () =>{
    let continuar = true;
    let checkFlights = 0;
    while(continuar){
       const destino = prompt("Introduzca el destino del vuelo");
        if(isNaN(destino) && typeof(destino) === "string"){
            const origen = prompt("Introduzca el origen del vuelo");
            if(isNaN(origen) && typeof(origen) === "string"){
                            const flight = {id:flights.length,to:destino,from:origen};
                            let fligthCost = parseInt(prompt("Introduzca el precio del vuelo"));
                            if(!(isNaN(fligthCost))){
                               flight.cost = fligthCost;
                            }else{
                                 alert("Los datos introducidos no son validos");
                            }
                   let fligtLayover = prompt("El vuelo tiene escala ?  s/n");
                     if(fligtLayover === "s" || fligtLayover === "S" ){
                         flight.layover = true;
                         flights.push(flight);
                     }else if(fligtLayover === "n" || fligtLayover === "N" ){
                        flight.layover = false;
                         flights.push(flight);
                     }else{
                     
                          alert("Los datos introducidos no son validos");
                     }
            }
        
        }else{
           alert("Los datos introducidos no son validos");
        }
        checkFlights +=1;
        continuar = confirm("Quiere anadir mas vuelos?");
        if(checkFlights === 15 && continuar === true){
            alert("Ha llegado al numero maximo de vuelos para hoy");
            continuar = false;
        }
    }

}

const lastFlights = () =>{
  const myFlights = flights.slice(-5);
    console.log("A continuacion estan los destinos de los ultimos vuelos del dia:");
         for(let j = 0;j<myFlights.length;j++){
             
                console.log(myFlights[j].to);
         }
}

 const flightInformation = () =>{
     let averageCost = 0;
     let numLayover = 0;
     
     const name = prompt("Buenos dias, cual es su nombre de Usuario? ");
     if(isNaN(name) && typeof(name) === "string"){
         console.log(`Bienvenido  ${name}`);
         
         for(let i=0; i<flights.length;i++){
             if(flights[i].layover === false){
                console.log(`El vuelo con origen: ${flights[i].from},y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ y no realiza ninguna escala. `);
                 numLayover += 1;
             }
             console.log(`El vuelo con origen: ${flights[i].from},y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€  `);
             averageCost += flights[i].cost;
             
         }
         averageCost = averageCost/flights.length;
         numLayover = flights.length - numLayover;
         console.log(`Coste medio de los vuelos : ${averageCost}€`);
         console.log(`Numeros de vuelos con escala : ${numLayover}`);
         lastFlights();
              
     }else{
       console.log("La entrada no es una cadena de caracteres.");
       flightInformation();
     }
 
 }
 
 while(ahead){
      flightInformation();
     let user = prompt(" Es usted ADMIN/USER ?");
     if(isNaN(user) && typeof(user) === "string"){
     
       let userLower = user.toLowerCase();
         
         switch(userLower){
             case "admin":
                 let opcion = prompt(" A: para añadir vuelos, D: para eliminar"); 
                     if(isNaN(opcion) && typeof(opcion) === "string"){
                        let lowOpcion = opcion.toLowerCase();
                         if(lowOpcion === "a"){
                             newFlights();
                         }
                         if(lowOpcion === "d"){
                             deleteFlights();
                             showFlights();
                         }
                         
                     }else{
                        console.log("Opcion no valida.");
                     }
             break;
             
             case "user":
                 searchFlights();
             break;
                 
             default:
              console.log("La opcion elegida no es valida");   
             break;
         
         } 
     
     }else{
       console.log("La entrada no es una cadena de caracteres.");
     }
     
    ahead = confirm("Quiere continuar?");
     if(ahead === false){
       alert("Ha sido un placer, hasta la proxima!");
     }
 }
 
