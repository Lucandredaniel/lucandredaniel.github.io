<?php

 //  PRG appele par GestiondirectoryPhp.js
 //  creation d'un directory
 //  ========================

    $nom_dir=$_GET["name"]; // passer dans l'url via le prg appelant gestiondirectoryPhp.js
    $erreur=false;

    header('Content-type: text/plain');
    $int_dir=$nom_dir;
    $position_chr=strpos($int_dir,"\\");
    if ($position_chr>0){
        $nom_dir=substr($int_dir,$position_chr+1,Strlen($int_dir));
        $nom_dir1=substr($int_dir,0,$position_chr);
        $reponse =chdir($nom_dir1);
        if (!$reponse) {
            $erreur=true;
        }
        if(!mkdir($nom_dir)){
          $erreur=true;
        }
    }else{ // creation du directory
        $nom_dir=  $int_dir;
        if(!mkdir($nom_dir)){
          $erreur=true;
        }
    }
    echo "effectue";
?>