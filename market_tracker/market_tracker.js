$(document).ready(function() {
$.get("pyfunctions/test.php",testfunc())

})

function testfunc(data,status){
console.log(status);
console.log(data);
}