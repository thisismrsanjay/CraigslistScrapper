var results = $('li.result-row');


results.each((index,element)=>{
    const result = $(element);
    const title= result.find('div.swipe-wrap')
    console.log(title);
})