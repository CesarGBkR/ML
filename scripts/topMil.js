function topMil(product) {
    if (document.getElementById('frame')){
        document.getElementById('frame').remove()
    }

    let parentdiv = document.createElement('div')
    parentdiv.id = 'frame'

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    for (let index = 0; index < 20; index++) {
        fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${product}&offset=${index}&sort=price_asc`, requestOptions)
        .then(response => response.json())
        .then(body => {
            for (let segundoIndex = 0; segundoIndex < body.results.length; segundoIndex++) {

                let div = document.createElement('div')
                let sellerId = document.createElement('h4')
                let sellerName = document.createElement('h4')
                let brand = document.createElement('h3')
                let adress = document.createElement('h4')
                let stateItem = document.createElement('h4')
                let price = document.createElement('h4')
                let priceStandar = document.createElement('h4')
                let message_free_shipping = document.createElement('h4')

                
                
                var free_shipping = body.results[segundoIndex].shipping.free_shipping
                if(free_shipping == true){ free_shipping = "¡SI!"}
                else{free_shipping = "No ):"}
                var logistic_type = body.results[segundoIndex].shipping.logistic_type
                var logistic_type = body.results[segundoIndex].shipping.logistic_type
                var country = body.results[segundoIndex].seller_address.country.name
                var state = body.results[segundoIndex].seller_address.state.name
                var city = body.results[segundoIndex].seller_address.city.name

                sellerId.textContent = `Seller ID: ${body.results[segundoIndex].seller.id}`
                brand.textContent = `${body.results[segundoIndex].attributes[0].name}: ${body.results[segundoIndex].attributes[0].value_name}`
                message_free_shipping.textContent = `¿El envío es gratis?: \n ${free_shipping} \n Tipo de logística: \n ${logistic_type}`
                adress.textContent = `${country}. ${state}. ${city}`
                stateItem.textContent= `${body.results[segundoIndex].attributes[1].name}: ${body.results[segundoIndex].attributes[1].value_name}`

                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch(`https://api.mercadolibre.com/users/${body.results[segundoIndex].seller.id}`, requestOptions)
                .then(response => response.json())
                .then(body => {
                    sellerName.textContent = `Vendido por: ${body.nickname}`
                })
                .catch(error => console.log('error', error))

                div.appendChild(sellerName)
                div.appendChild(sellerId)
                div.appendChild(brand)   
                div.appendChild(adress)   
                div.appendChild(stateItem)   
                div.appendChild(price)   
                div.appendChild(priceStandar) 
                parentdiv.appendChild(div)

                price.textContent = `price: ${body.results[segundoIndex].price}`
                priceStandar.textContent=`${body.results[segundoIndex].prices.prices[0].type}: ${body.results[segundoIndex].prices.prices[0].amount}`

                if (body.results[segundoIndex].prices.prices[1] != undefined){
                    if(body.results[segundoIndex].prices.prices[1].type != "standard"){
                        let priceDiscount = document.createElement('h4')
                        priceDiscount.textContent = `${body.results[segundoIndex].prices.prices[1].type}: ${body.results[segundoIndex].prices.prices[1].amount}`
                        div.appendChild(priceDiscount)     
                    }
                    else{
                        let priceDiscount = document.createElement('h4')
                        priceDiscount.textContent = `promotion: ${body.results[segundoIndex].prices.prices[1].amount}`
                        div.appendChild(priceDiscount)
                    }
                    let priceMin = document.createElement('h4')
                    priceMin.textContent = `${body.results[segundoIndex].prices.reference_prices[0].type}: ${body.results[segundoIndex].prices.reference_prices[0].amount}`
                    div.appendChild(priceMin)
                }
                div.appendChild(message_free_shipping)   
            
            }
            document.body.appendChild(parentdiv)
        })
        .catch(error => console.log('error', error));
    }
}