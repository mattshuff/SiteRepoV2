$(document).ready(function() {
    $.ajax({
        'url': './functions/invoke.php',
        'type': 'post',
        'dataType': 'json',
    })
    .done( function (response) {
        CreateJobsPage(response);
    })
})

function CreateJobsPage(data){
    var MainContent = document.getElementsByClassName("content")[0];

    for(var i = 0; i < data.length; i++){
        //Keys of object: company, company_logo, created_at, description
        //how_to_apply, id, location, title, type, url
        
        //get data by index and can access data from there 
        console.log(data[i]["company"])
    }
}