<?php

 // PRG appele par GestiondirectoryPhp.js
 //  lecture de la liste des directory sous serveur PHP
 // ==================================================

    $tableau=[];
    $time_file=[];
    $index=0;
    $nom_dir=$_GET["name"]; // passer dans l'url via le prg appelant gestiondirectoryPhp.js
    $erreur=false;
    $enleve_txt=false;

    // fonction non récursive
    function explorer_dir($chemin){
        $lstat    = lstat($chemin);
        $mtime    = date('d/m/Y H:i:s', $lstat['mtime']);
        $filetype = filetype($chemin);
        global $index, $tableau , $directory2 , $time_file, $enleve_txt;
        // recherche uniquement les repertoires
        if( is_dir($chemin) ){
            if ($chemin==$directory2) {
                $me = opendir($chemin);
                while( $child = readdir($me) ){
                    if( $child != '.' && $child != '..' ){
                        $fichier=$chemin.DIRECTORY_SEPARATOR.$child;
                        $nom_fichier=substr($fichier,Strlen($directory2)+1,Strlen($fichier)-Strlen($directory2));
                        if ($enleve_txt){
                            $nom_fichier=substr($nom_fichier,0,Strlen($nom_fichier)-4); // enleve le .txt
                        }
                        $tableau[$index]= $nom_fichier;
                        $time_file[$index]=$mtime;
                        $index+=1;
                       //explorer( $chemin.DIRECTORY_SEPARATOR.$child );
                    }
                }
            }
        }
    }

    header('Content-type: text/plain');
    $int_dir=$nom_dir;
    $position_chr=strpos($int_dir,"\\");
    if ($position_chr>0){
        $nom_dir=substr($int_dir,$position_chr+1,Strlen($int_dir));
        $nom_dir1=substr($int_dir,0,$position_chr);
        $enleve_txt=true;
        $reponse =chdir($nom_dir1);
        if (!$reponse) {
            $erreur=true;
        }
    }else{
        $nom_dir=  $int_dir;
    }
    $directory1= getcwd();
    $reponse =chdir($nom_dir);
    $directory2= getcwd() ;
    if ((!$reponse) ||($erreur)) {
        echo "-inexistant";
    }else{
        explorer_dir($directory2);
        $texte_ensemble="";
        // calcul longueur nom fichier le + important
        $longueur=0;
        for ($i = 0; $i < $index; $i++) {
            $longueur1=Strlen($tableau[$i]);
            if ($longueur1>$longueur){
                $longueur=$longueur1;
            }
        }
        // rajout de blanc pour tabulation
        for ($i = 0; $i < $index; $i++) {
            $tableau[$i].="&";
            $tableau[$i].=$time_file[$i];
            $tableau[$i].="\n";
        }
        // concatenation
        for ($i = 0; $i < $index; $i++) {
            $texte_ensemble.=$tableau[$i];
        }
        echo "$texte_ensemble"  ;
    }

?>