/* fonctions utilisé pour lecture fichier sur PC (et non sur serveur) */
/* lecture fichier CSV ============================================== */


function active_inputfile_csv(){
    charge_fichier_txt_fini=false;
    document.getElementById('inputfile').click();
}

async function lecture_fichier_text(file) {
        let text = await file.text();
        brouillon_file[0]=text;
        charge_fichier_txt_fini=true
        file_name_csv=file;
}

function analyse_file_csv(){
    if (charge_fichier_txt_fini==true) {
        let essai="";
        let essai1="";
        let compteur=0;
        let debut=0;
        transfert_file1=[];
        /* decomposition du fichier */
        /* mise en forme des données identique aux donnees reçues via le serveur (voir Gestionreadf.js) */
        if (brouillon_file[0].length>0) {
            for (let i = 0; i < brouillon_file[0].length; i++) {
                essai=brouillon_file[0].slice(i,i+1);
                ascii_code = essai.charCodeAt(0);
                if (ascii_code!=10){ /* recherche le char(10) retour à la ligne */
                    compteur+=1;
                }else{
                    essai1=brouillon_file[0].slice(debut,compteur);
                    debut=compteur+1;
                    compteur+=1;
                    if (essai1.slice(0,1)==","){ // enleve la virgule placée en tête si existante
                        essai1=essai1.slice(1,essai1.length)
                    }
                    essai1+=",";
                    transfert_file1.push(essai1);
                };
            };
            brouillon_file[0]="";
            iframe_hidden=false;
            affiche_datas_iframe();
            remove_datas_iframe();
            array_tasks_lecture_datas=[];
            array_tasks=[];
            array_tasks[0]=[];
            decompose_datas(transfert_file1); // dans gestionreadF.js
            recopy_array_2D();
            ask_write_parameters=true;
            charge_fichier_en_cours=false;
            charge_fichier_txt_fini=false
            iframe_hidden=true;
            affiche_datas_iframe();
            document.getElementById("file_name_db").value=array_parametre_environnement2[9];
        }
    }
}


/* fonction save données */
/* ===================== */
function save_csv() {
    creation_base_donnees_complete();
    for (let i = 0; i < (base_donnees_complete.length); i++) {
        let chaine=base_donnees_complete[i];
        base_donnees_complete[i]=chaine+"\n";
    }
    data=JSON.stringify(base_donnees_complete);
    document.location="data:text/csv;base64,"+btoa(base_donnees_complete);
}