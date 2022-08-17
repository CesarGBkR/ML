import fetch from "node-fetch"    

function fetchMLAPI(product) {
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
        fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${product}`, requestOptions)
        .then(response => response.json())
        .then(body => {
            for (let index = 0; index < body.results.length; index++) {
                console.log(body.results[index].title)
                console.log(body.results[index].seller.id)
                console.log(body.results[index].price)
                console.log(body.results[index].available_quantity)
                console.log(body.results[index].permalink)
        
                var country = body.results[index].seller_address.country.name
                var state = body.results[index].seller_address.state.name
                var city = body.results[index].seller_address.city.name
        
                var adress = `${country}. ${state}. ${city}`
                console.log(adress)
        
                var free_shippong = body.results[index].shipping.free_shipping
                var logistic_type = body.results[index].shipping.logistic_type
                
                var message_shipping = `¿El envío es gratis?: \n ${free_shippong} \n Tipo de logística: \n ${logistic_type}`
                console.log(message_shipping)
                
                for (let index = 0; index < body.results[index].attributes.length; index++) {
                    console.log(`${body.results[index].attributes[index].name}:`)
                    console.log(body.results[index].attributes[index].value_name)
                }
    
            }
            
        })
        .catch(error => console.log('error', error));
}

fetchMLAPI("Celular")