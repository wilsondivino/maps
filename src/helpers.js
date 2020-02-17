(function(window) {
    
    function debounce(fn, wait) {
        let timer = null;
        return function() {
            clearTimeout(timer);
            timer = setTimeout(fn, wait);
        }
    }

    function getAddress(address = "") {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_API_KEY`)
            .then(resp => resp.json());
    }

    function notFound() {
        document.querySelector("#message").innerHTML = "Não foi encontrado nenhuma ocorrência";
    }

    function zeroResults() {
        document.querySelector("#message").innerHTML = "Nenhuma ocorrência";
    }

    function clear() {
        document.querySelector("#message").innerHTML = "";
        document.querySelector(".address-list").innerHTML = "";
    }

    function makeOptions (addressList) {
        console.log(addressList);
        const ul = document.querySelector("ul");
        ul.innerHTML = "";
        addressList.forEach(function(address) {
            const li = document.createElement("li");
            li.classList.add("address");
            li.innerHTML = address.formatted_address;
            li.addEventListener("click", function() {
                displayMap(address.geometry.location);
            }, false);
            ul.appendChild(li);
        })
    }

    function displayMap(latLongObject) {
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 4, center: latLongObject});
        
        new google.maps.Marker({position: latLongObject, map: map});
    }

    function showMap() {
        // Localização da Praça da Sé
        var pracaSe = {lat: -23.5503099, lng: -46.6363896};

        displayMap(pracaSe);
    }

    window.debounce = debounce;
    window.getAddress = getAddress;
    window.notFound = notFound;
    window.zeroResults = zeroResults;
    window.clear = clear;
    window.makeOptions = makeOptions;
    window.showMap = showMap;

})(window);