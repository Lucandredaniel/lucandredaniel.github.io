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
            $tableau[$i].="  ";
            $tableau[$i].=$time_file[$i];
            $tableau[$i].="\n";
        }