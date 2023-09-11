
function lecture_fichier_text() {
    if (!charge_fichier_en_cours) {brouillon_file[0]=[] }
    document.getElementById('inputfile').addEventListener('change', function() {
        charge_fichier_en_cours=true;
        const [file] = document.querySelector("input[type=file]").files;
        reader.readAsText(file,"utf-8");
        reader.onload  = function (event) { brouillon_file[0] = reader.result};
        reader.onerror = function(event) {alert(reader.error);charge_fichier_en_cours=false;charge_fichier_txt_fini=false }
        //reader.readAsBinaryString(file) ;
    });
    if (reader.readyState == 2 ) {charge_fichier_txt_fini=true } /* vérifie si fichier lu en entier */
    if (charge_fichier_txt_fini==true) {
        let essai="";
        let essai1="";
        let compteur=0;
        let debut=0;
        /* decomposition du fichier */
        if (brouillon_file[0].length>0) {
            for (let i = 0; i < brouillon_file[0].length; i++) {
                essai=brouillon_file[0].slice(i,i+1);
                ascii_code = essai.charCodeAt(0);
                if (ascii_code!=10){ /* recherche le char(10) retour à la ligne */
                    compteur+=1;
                }else{
                    essai1=brouillon_file[0].slice(debut,compteur-1);
                    essai1+="--";
                    debut=compteur+1;
                    compteur+=1;
                    brouillon_file1[0].push(essai1);
                };
            };
            brouillon_file[0]="";
            /* decomposition des donnees */
            let index_1_array_task=0;
            let index_2_array_task=0;
            array_tasks=[];
            for (let i = 0; i < brouillon_file1[0].length; i++) {
                debut=0;
                compteur=0;
                index_2_array_task=0;
                array_tasks[i]=[]; /* inititialisation du tableau des taches */
                for (let j = 0; j < array_task_vide.length; j++) {
                    array_tasks[i][j]=array_task_vide[j];
                }
                for (let j = 0; j < brouillon_file1[0][i].length; j++) {
                    essai=brouillon_file1[0][i].slice(j,j+1);
                    ascii_code = essai.charCodeAt(0);
                    if (ascii_code!=59){ /* recherche le char(";") */
                        compteur+=1;
                    }else{
                        essai1=brouillon_file1[0][i].slice(debut,compteur);
                        debut=compteur+1;
                        compteur+=1;
                        if (index_2_array_task==0){
                            array_tasks[i][index_2_array_task]=essai1;
                        }else{
                            if (index_2_array_task==9){
                                array_tasks[i][index_2_array_task]=essai1;
                            }else {
                             array_tasks[i][index_2_array_task]=Number(essai1);
                            }
                        }
                        index_2_array_task+=1;
                    };
                }
            }
            charge_fichier_en_cours=false;
            charge_fichier_txt_fini=false
            recopy_array_2D();
            iframe_hidden=true;
            affiche_datas_iframe();
        }
    }
}