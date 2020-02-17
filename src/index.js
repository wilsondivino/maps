(function() {

    "use strict";

    const inputSearch = document.querySelector("input");

    inputSearch.addEventListener("keyup", debounce(function() {
        
        clear();

        getAddress(inputSearch.value).then(address => {
            if (address.status === "OK") {
                makeOptions(address.results);
            } else if (address.status === "ZERO_RESULTS") {
                zeroResults();
            } else {
                notFound();
            }
        });

    }, 500), false);

})();