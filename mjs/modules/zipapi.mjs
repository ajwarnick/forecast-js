const zipApi = {
    url: "https://zipapi.warnick.vercel.app/api/"
    // url: "http://localhost:3000/api/"
}

zipApi.get = (zip) => {
    return fetch(zipApi.url + zip, {mode:'cors'} )
        .then(response => response.json())
}

export {zipApi};