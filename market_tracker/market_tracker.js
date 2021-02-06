$(document).ready(function() {
    $.ajax({
        'url': './functions/invoke.php',
        'type': 'post',
        'dataType': 'html',
    })
    .done( function (response) {
      console.log(response)
    })
  

})

