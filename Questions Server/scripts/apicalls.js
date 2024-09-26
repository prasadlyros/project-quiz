function data(){
    fetch("http://localhost:3001/ContactDetails").then((resolve) => resolve.json()).then(resolve2 => console.log(resolve2)).catch(err => console.log(err));

        const data  = {
            cname : "Longbottom",
            cemail : "long@gmail.com"
        }
        fetch("http://localhost:3001/ContactDetails", {
            method : 'PUT',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(resolve => resolve.json()).then(resolve2 => console.log(resolve2)).catch(err => console.log(err));
}

data(); 

// function postData(){
//     const data  = {
//         cid: 5,
//         cname : "Nevile",
//         cno : 12345,
//         cemail : "nevile@gmail.com"
//     }
//     fetch("http://localhost:3001/ContactDetails", {
//         method : 'POST',
//         body : JSON.stringify(data),
//         headers : {
//             'Content-Type' : 'application/json'
//         }
//     }).then(resolve => resolve.json()).then(resolve2 => console.log(resolve2)).catch(err => console.log(err))
// }

// postData();

// function putData(){
//     const data  = {
//         cname : "Longbottom",
//         cemail : "long@gmail.com"
//     }
//     fetch("http://localhost:3001/ContactDetails", {
//         method : 'PUT',
//         body : JSON.stringify(data),
//         headers : {
//             'Content-Type' : 'application/json'
//         }
//     }).then(resolve => resolve.json()).then(resolve2 => console.log(resolve2)).catch(err => console.log(err));
// }

// putData()


// function deleteData(){
//     const data  = {
//         cname : "Longbottom",
//         cemail : "long@gmail.com"
//     }
//     fetch("http://localhost:3001/ContactDetails", {
//         method : 'DELETE',
//         body : JSON.stringify(data),
//         headers : {
//             'Content-Type' : 'application/json'
//         }
//     }).then(resolve => resolve.json()).then(resolve2 => console.log(resolve2)).catch(err => console.log(err));
// }

// deleteData()