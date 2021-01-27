var Prompts = ["Minute","Hour","Day (1-31)","Month","Day (0-6)","command to run ( && for multiple lines)","pipe log elsewhere? (y/n)","log path"];
var BuildingCron = []
$(document).ready(function() {


})

function CronBuilder(event){
    var Input = document.getElementById("main_input");
    var InputValue = $(Input).val();

    var result = document.getElementsByClassName("result")[0];
 
    if(event.key=="Enter" && InputValue != "" && BuildingCron.length <= 7){
        
        //if user wants to log in non standard directory, handle this input here.
        if(BuildingCron.length == 6){
            
            if(InputValue=="y"){
                BuildingCron.push("")
            }else{

                //pushing 5 elements to skip straight to "Cron Finished!" message
                BuildingCron.push("");
                BuildingCron.push("");
                BuildingCron.push("");
                BuildingCron.push("");
                BuildingCron.push("");
            }
        }

        //push log path, adding weird logging string onto the end.
        else if(BuildingCron.length == 7){
            //handling log path
            InputValue += " 2>&1";
            BuildingCron.push(InputValue)
            result.innerHTML = BuildingCron.join(" ");
        }

        //if not any of the above cases, push the input and write it to screen
        else{
            BuildingCron.push(InputValue + " ");
            result.innerHTML = BuildingCron.join(" ");
        }

        //setting up for next loop through 
        Input.value="";

        //check we havent ran out of options to avoid the undefined message
        var EnterPrompterh2 = document.getElementById("EnterPrompter");

        if(BuildingCron.length >= 8){         
            EnterPrompterh2.innerHTML = "Cron Complete!";
        }
        else{
            EnterPrompterh2.innerHTML = Prompts[BuildingCron.length]
        }
    }
}