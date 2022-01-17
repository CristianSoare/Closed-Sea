const options = { method: 'GET', headers: { Accept: 'application/json' } };

async function fetchData(event) {
    let searchQuery = event.target.value
    let returnedData = await fetch(`https://api.opensea.io/api/v1/assets?owner=${searchQuery}&order_direction=asc&offset=0&limit=50`, options);
    let jsonData = await returnedData.json('');
    
    console.log(jsonData)
    let userAssetsList = document.querySelector('.assets');
    userAssetsList.innerHTML = jsonData.assets.map((asset) => assetHTML(asset)).join('');
}

function assetHTML(asset) {
    if (asset.image_url == '') {return}
    return `<div class="asset">
    <div class="asset__img--wrapper"><img class="asset__img"
            src="${asset.image_url}"
            alt=""></div>
    <div class="asset__name">${asset.name}
        <span class="asset__description">${asset.description}</span>
    </div>
    <div class="asset__slug">slug : ${asset.collection.slug}</div>
</div>`
}
