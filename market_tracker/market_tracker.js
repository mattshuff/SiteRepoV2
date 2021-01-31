$(document).ready(function() {
$.get("pyfunctions/invoke.php",testfunc())

})

function testfunc(data,status){
console.log(status);
console.log(data);
}