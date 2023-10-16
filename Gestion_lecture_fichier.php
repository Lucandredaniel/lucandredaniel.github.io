<?php
 //  lecture de fichier.txt via PHP !';

    // initialisation des variables
    // ============================
    $tableau=[];
    $s_page="\r\n";
    $s_ligne="\n";
    $post_file=".txt";
    // lecture du nom de fichier transmis par l'URl via $_get
    $nom_fichier=$_GET["name"];
    // $nom_fichier.=$post_file;
    // lecture des donnees dans le fichier
    // ====================================
    $file = fopen($nom_fichier, "r");
    if (!$file){
        echo "errorLLA1";
    }else {
        $index=0;
        while (!feof($file)){
            $tableau[$index]="";
            $ligne=fgets($file);
            $tableau[$index].="-LLA-";
            $tableau[$index].=$ligne;
            $index+=1;
        }
        fclose($file);
        // transmission des données via echo
        // =================================
        $texte_ensemble="";
        for ($i = 0; $i < $index; $i++) {
            $texte_ensemble.=$tableau[$i];
        }
        echo $texte_ensemble;
    }

?>