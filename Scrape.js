var results = $('li.result-row');


results.each((index,element)=>{
    const result = $(element);
    const imageData = result.find('a.result-image').attr('data-ids');
    if(imageData){
        const parts = imageData.split(',');
        let images = []
        const ids  = parts.map((id)=>{
            let url = `https://images.craigslist.org/${id.split(':')[1]}_300x300.jpg`
            images.push(url);
        })
        return images;
    }

    
})