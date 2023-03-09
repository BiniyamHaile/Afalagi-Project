async function getUser(){
   

    const req = fetch('http://localhost:3000/user' , {
        headers : {
            'x-access-token'  : localStorage.getItem('token')
        }
    })

    const data =  (await req).json;


    return data.loggedIn
}

export {getUser}