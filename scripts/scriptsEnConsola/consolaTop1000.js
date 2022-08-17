import fetch from "node-fetch"
    
function top(product) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    for (let index = 0; index < 20; index++) {
        fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${product}&offset=${index}&sort=price_asc`, requestOptions)
        .then(response => response.json())
        .then(body =>{
            for (let segundoIndex = 0; segundoIndex < body.results.length; segundoIndex++) {
                console.log(body.results[segundoIndex].seller.id)

                console.log(`${body.results[segundoIndex].attributes[0].name}:`)
                console.log(body.results[segundoIndex].attributes[0].value_name)
                
                var free_shippong = body.results[segundoIndex].shipping.free_shipping
                var logistic_type = body.results[segundoIndex].shipping.logistic_type
                
                var message_shipping = `¿El envío es gratis?: \n ${free_shippong} \n Tipo de logística: \n ${logistic_type}`
                console.log(message_shipping)

                var country = body.results[segundoIndex].seller_address.country.name
                var state = body.results[segundoIndex].seller_address.state.name
                var city = body.results[segundoIndex].seller_address.city.name

                var adress = `${country}. ${state}. ${city}`
                console.log(adress)

                console.log(`${body.results[segundoIndex].attributes[1].name}:`)
                console.log(body.results[segundoIndex].attributes[1].value_name)

                console.log(`price: ${body.results[segundoIndex].price}`)
                console.log(`${body.results[segundoIndex].prices.prices[0].type}:`)
                console.log(body.results[segundoIndex].prices.prices[0].amount)

                if (body.results[segundoIndex].prices.prices[1] != undefined){
                    if(body.results[segundoIndex].prices.prices[1].type != "standard"){
                        console.log(`${body.results[segundoIndex].prices.prices[1].type}:`)
                    }
                    else{
                        console.log("promotion:")
                    }
                    console.log(body.results[segundoIndex].prices.prices[1].amount)
                    console.log(`${body.results[segundoIndex].prices.reference_prices[0].type}:`)
                    console.log(body.results[segundoIndex].prices.reference_prices[0].amount)
                }

            
            }

        })
        .catch(error => console.log('error', error));
    }
}
    
top("Celular")