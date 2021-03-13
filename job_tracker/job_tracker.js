var jobs_json;

$(document).ready(function () {
    build_jobs()
})

function build_jobs() {
    $(document).ready(function () {
        $.ajax({
            'url': './functions/invoke.php',
            'type': 'post',
            'dataType': 'json',
        })
            .done(function (response) {
                build_jobs_resolved(response)
                jobs_json = response
            })
    })
}
function build_jobs_resolved(data) {
    var MainContent = document.getElementsByClassName("content")[0];

    for (var i = 0; i < data.length; i++) {
        //Keys of object: company, company_logo, created_at, description
        //how_to_apply, id, location, title, type, url

        //get data by index and can access data from there 

        var TempDiv = document.createElement("div");
        TempDiv.classList.add("job_posting")

        var TempHeader = document.createElement("h3");
        TempHeader.innerHTML = data[i]["company"];
        TempDiv.appendChild(TempHeader);
        TempDiv.expanded = false;

        TempDiv.onclick = job_on_click;


        MainContent.appendChild(TempDiv);
    }
}


function job_on_click(self) {
    self.cancelBubble = true;

    //get clicked element, go up through parents until main div is found
    var target = self.target
    var clicked_element = ""
    while(target.classList.contains("job_posting") == false){
        target = target.parentNode;
    }
    clicked_element = target

    //if element hasnt been expanded yet
    if (clicked_element.expanded == false) {
        clicked_element.classList.add("expanded")
        clicked_element.expanded = true;

        clicked_header = clicked_element.children[0]
        company_json = "";

        for (var i = 0; i < jobs_json.length; i++) {
            if (jobs_json[i].company == clicked_header.innerHTML) {
                company_json = jobs_json[i];
            }
        }

        //construct further info 
        var parent_div = clicked_element;

        job_title_header = document.createElement("h3")
        job_title_header.textContent = company_json.title;
        parent_div.appendChild(job_title_header)

        job_desc_html_string = company_json.description;
        var description_wrapper_div = document.createElement("div")
        description_wrapper_div.innerHTML = job_desc_html_string
        parent_div.appendChild(description_wrapper_div)

    }

    // if element has already been expanded
    else if (clicked_element.expanded == true) {


        while (clicked_element.childNodes.length > 1) {
            clicked_element.removeChild(clicked_element.lastChild);
        }
        clicked_element.classList.remove("expanded")
        clicked_element.expanded = false;
    }

    else {
        console.log(clicked_element)
    }
}
