function fetchMLAPI(product) {

    if (document.getElementById('frame')){
        document.getElementById('frame').remove()
    }

    let parentdiv = document.createElement('div')
    parentdiv.id = 'frame'

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
        fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${product}`, requestOptions)
        .then(response => response.json())
        .then(body => {
            for (let index = 0; index < body.results.length; index++) {
                let div = document.createElement('div')
                let sellerName = document.createElement('h3')
                let title = document.createElement('h2')
                let sellerId = document.createElement('h4')
                let price = document.createElement('h3')
                let available_quantity = document.createElement('h4')
                let adress = document.createElement('h4')
                let permalink = document.createElement('a')
                let message_free_shipping = document.createElement('h4')

                
                var country = body.results[index].seller_address.country.name
                var state = body.results[index].seller_address.state.name
                var city = body.results[index].seller_address.city.name
                var free_shipping = body.results[index].shipping.free_shipping
                if(free_shipping == true){ free_shipping = "¡SI!"}
                else{free_shipping = "No ):"}
                var logistic_type = body.results[index].shipping.logistic_type
                
                adress.textContent = `${country}. ${state}. ${city}`
                message_free_shipping.textContent = `¿El envío es gratis? ${free_shipping} \n Tipo de logística: \n ${logistic_type}`
                title.textContent = body.results[index].title
                sellerId.textContent = `SellerID: ${body.results[index].seller.id}`
                price.textContent = `Price: ${body.results[index].price}`
                available_quantity.textContent = `Cantidad restante: ${body.results[index].available_quantity}`
                permalink.textContent = body.results[index].permalink
                permalink.href = body.results[index].permalink

                div.appendChild(title)
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch(`https://api.mercadolibre.com/users/${body.results[index].seller.id}`, requestOptions)
                .then(response => response.json())
                .then(body => {
                    sellerName.textContent = `Vendido por: ${body.nickname}`
                })
                .catch(error => console.log('error', error))
                div.appendChild(sellerName)
                div.appendChild(sellerId)   
                div.appendChild(price)   
                div.appendChild(available_quantity)   
                div.appendChild(adress)
                div.appendChild(message_free_shipping)
                parentdiv.appendChild(div)
                
                for (let index = 0; index < body.results[index].attributes.length; index++) {
                    let name = document.createElement('h4')

                    name.textContent = `${body.results[index].attributes[index].name}: ${body.results[index].attributes[index].value_name}`
                    div.appendChild(name)
                }
                div.appendChild(permalink)   

    
            }
            document.body.appendChild(parentdiv)
            
        })
        .catch(error => console.log('error', error));
}