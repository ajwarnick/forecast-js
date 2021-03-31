const airApi = {
    url: "https://zipapi.vercel.app/api/air/"
    // url: "http://localhost:3000/api/air/"
}

airApi.get = (zip) => {
    return fetch(airApi.url + zip )
        .then(response => response.json())
}

export {airApi};