
const link="http://127.0.0.1:5000"




function addFetch(){
    $(".repoList").empty()
    fetch(link+"/getRepo",{
    method:"GET",   
    headers: {
        'Content-Type': 'application/json',
      }}     
    ).then(response => {
            if(response.status==200){//remove it
                console.log("Recieved Repos from Database!!!")
            }
            return response.json()})
        .then(response => {
            for(var i = 0; i < (response.users).length; i++) {
                var obj = response.users[i];
                    $(".repoList").append(
                        `<div class="card w-auto m-2">
                        <div class="card-body">
                          <h5 class="card-title"><a href="">${obj.title}</a></h5>
                          <p class="card-text1">
                          ${obj.desc}
                          </p>
                        </div>
                      </div>`
                    );
            }
        }).catch(function(error){
            console.error(String(error));
            if(error=="TypeError: Failed to fetch"){
              console.log("SOMETHING")
            }
        });
    }

    addFetch()



function createRepo(){
    title=document.getElementById('recipient-name').value
    desc=document.getElementById('message-text').value
    allowAccess=document.getElementById('drop-access').value
    who=document.getElementById('nameof').innerHTML
    console.log(title,desc,allowAccess,who)

    fetch(link+"/insertRepo",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(
                {who:who,
                 title:title,
                 desc:desc,
                allowAccess:allowAccess})
                }).then(response => {
                if (response.status==200){
                  addFetch()
                }
                
    }).catch(function(error){
        console.error(String(error));
        if(error=="TypeError: Failed to fetch"){
            console.log("SOMETHING")
        }
    });
}


