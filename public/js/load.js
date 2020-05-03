let id = localStorage.getItem('id');
if(id == null){
    (async()=>{
        const response = await fetch('./generateId');
        id = await response.json();
        localStorage.setItem('id', id);
    })();
}

(async()=>{
    const response = await fetch('./', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"id": id})
    });
    const result = await response.text();
    
    document.open()
    document.write(result);
    document.close();
})();