const openZip = {
    url: "https://nominatim.openstreetmap.org/search?postalcode=__zip__&country=USA&format=json"
}

openZip.get = (zip) => {
    return fetch(  "https://nominatim.openstreetmap.org/search?postalcode="+ zip +"&country=USA&format=json" , {mode:'cors'} )
        .then(response => response.json())
}

export {openZip};