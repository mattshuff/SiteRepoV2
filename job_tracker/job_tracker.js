$(document).ready(function() {
    build_jobs()
})

function build_jobs(){
    $(document).ready(function() {
        $.ajax({
            'url': './functions/invoke.php',
            'type': 'post',
            'dataType': 'json',
        })
        .done( function (response) {
            build_jobs_resolved(response)
        })
    })
}
function build_jobs_resolved(data){
    var MainContent = document.getElementsByClassName("content")[0];

    for(var i = 0; i < data.length; i++){
        //Keys of object: company, company_logo, created_at, description
        //how_to_apply, id, location, title, type, url
        
        //get data by index and can access data from there 
        console.log(data[i]["company"]);

        var TempDiv = document.createElement("div");
        TempDiv.classList.add("job_posting")
    
        var TempHeader = document.createElement("h3");
        TempHeader.innerHTML = data[i]["company"];
        TempDiv.appendChild(TempHeader);

        TempDiv.onclick = job_on_click;

        MainContent.appendChild(TempDiv);
    }
}


function job_on_click(self){
    self.cancelBubble = true;

    var clicked_element = self.originalTarget;
    var parent_div = self.originalTarget.parentElement;

    var background_color = $(parent_div).css("background-color");

    if(background_color=="rgb(0, 0, 0)"){
        $(parent_div).css("width", "auto");
        $(parent_div).css("background-color", "white");
        clicked_element.style.color = 'black';

        console.log($(parent_div).children())
        $(parent_div).remove(1)
    }
    else{
    $(parent_div).css("width", "50%");
    $(parent_div).css("background-color", "black");
    clicked_element.style.color = 'white';
    
    // call jobs page, pass to function and append to box 
    $.ajax({
        'url': './functions/invoke.php',
        'type': 'post',
        'dataType': 'json',
    })
    .done( function (response) {
        job_on_click_resolved(response,self)
    })
    }
}
function job_on_click_resolved(data,this_event){
    var clicked_name = this_event.originalTarget.innerHTML;
    
    var matched_json_object = ""
    for(var i = 0; i < data.length; i++){
        if(data[i].company==clicked_name){
            matched_json_object=data[i];
            break;
        }
    }
    
    var job_description_span = document.createElement("span");
    job_description_span.classList.add("job_posting")
    job_description_span.innerHTML = matched_json_object.description;

    var parent_div = this_event.originalTarget.parentElement;
    parent_div.appendChild(job_description_span)

}