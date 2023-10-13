<?php

    // initialisation des variables
    // ============================
    $tableau=[];
    $s_page="\r\n";
    $s_ligne="\n";
    $post_file=".txt";
    // lecture du nom de fichier transmis par l'URl via $_get
    $nom_fichier=$_GET["name"];
    $nom_fichier.=$post_file;
    // lecture de toutes les donnees transmises via $_post
    // ===================================================
    for ($i = 0; $i < 60; $i++) {
        $int=strval($i);
        $ligne="l";
        $ligne.=$int;
        $variable=$_POST[$ligne];
        $tableau[]=$variable;
    }
    echo ($nom_fichier);

    // sauvegarde donnees dans le fichier (le fichier sera réécit si existant)
    // =======================================================================
    $file = fopen($nom_fichier, "w");
    for ($i = 0; $i < 60; $i++) {
        fwrite($file, $tableau[$i]);
        fwrite($file, $s_ligne);
    }
    fclose($file);

?>