<?php
    # Call shell execution of python command script
    $output = shell_exec("python3 test.py");
    echo $output;
?>
