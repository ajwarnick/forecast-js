const uvApi = {
    url: "https://zipapi.warnick.vercel.app/api/uv/"
    // url: "http://localhost:3000/api/uv/"
}

uvApi.get = (zip) => {
    return fetch(uvApi.url + zip )
        .then(response => response.json())
}

export {uvApi};