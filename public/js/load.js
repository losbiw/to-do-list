let id = localStorage.getItem('id');
if(id == null){
    (async()=>{
        await createUser();
        await getUser();
    })();
}
else{
    getUser();
}

async function createUser(){
    const response = await fetch('./generateId');
    id = await response.json();
    localStorage.setItem('id', id);
}

async function getUser(){
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
}
