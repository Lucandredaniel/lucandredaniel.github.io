/* =============================================== */
/* Appel PHP pour lecture fichier .TXT sur serveur */
/* appel le fichier "GestionLfichier.php"          */
/* =============================================== */

function conversion_tableau(reponse_php_int){
    /* recopy string recu dans tableau par tache */
    let analyse_fini=false;
    let index_DIV=5;
    let j=0;
    let recherche_texte="-LLA-";
    //let recherche_texte="finlla2";
    let word_restant=String(reponse_php_int);
    tableau_de_reception=[];
    // separe les lignes via les separateurs <DIV> et </DIV>
    // enleve le premier <DIV> de la string
    word_restant=word_restant.slice(index_DIV,word_restant.length-index_DIV);
    while (!analyse_fini){
        if (word_restant.length==0){analyse_fini=true }
        index_DIV=word_restant.search(recherche_texte);
        if (index_DIV==-1){
            analyse_fini=true;
            tableau_de_reception[j]=word_restant;
        }else {
            tableau_de_reception[j]=word_restant.slice(0,index_DIV);
            word_restant=word_restant.slice(index_DIV+recherche_texte.length,word_restant.length);
            j++;
        }
    }
    decompose_datas(tableau_de_reception);
}
function decompose_datas(tableau_de_reception){
    /* decomposition des donnees de chaque tache */
    /* ==========================================*/
    let index_virgule=0;
    let word=[];
    let max_index=array_task_vide.length;
    for (let index_db = 0; index_db < tableau_de_reception.length; index_db++) {
        word_restant=tableau_de_reception[index_db]
        analyse_fini=false;
        j=0;
        word=[];
        index_virgule=0;
        while (!analyse_fini){
            if (word_restant.length==0){analyse_fini=true }
            index_virgule=word_restant.search(",");
            if (index_virgule==-1){
                analyse_fini=true;
                //word[j]=word_restant;
            }else {
                word[j]=word_restant.slice(0,index_virgule);
                word_restant=word_restant.slice(index_virgule+1)
                j++;
                if (j>array_task_vide) {analyse_fini=true}
            }
        }
        if (word[1]!="finlla"){
          array_tasks[index_db]=[];
          for (let j = 0; j < word.length; j++) {
            if (j==0) {
                array_tasks[index_db][j]=word[j];
            }else {
                if (j==9) {
                    array_tasks[index_db][j]=word[j];
                }else {
                    array_tasks[index_db][j]=Number(word[j]);
                }
            }
          }
        } else {
            if (word[0]=="parametre1"){
              array_parametre_environnement1=[];
              for (let j = 0; j < word.length; j++) {
                    array_parametre_environnement1[j]=word[j];
              }
            }else { if (word[0]=="parametre2"){
                      array_parametre_environnement2=[];
                      for (let j = 0; j < word.length; j++) {
                            array_parametre_environnement2[j]=word[j];
                      }
                  }else{
                     index_db=tableau_de_reception.length; /* fin de transfert */
                  }
            }
        }
    }
}

function AALfichier(){
    if (!onload_donnees_base){ /* verifie si chargement non en cours */
        abort_lecture_fichier(); // enleve la box précédente
        demande_ecriture_fichier=false;
        document.getElementById('dialogbox1').style.display = "block";
        document.getElementById('dialogboxhead1').style.color="white";
        if (langue==1){
            titre="READ Project - Action witch reset all datas";
            message_avert="Action witch reset all datas";
            document.getElementById('input_name').placeholder="society name?";
            document.getElementById('input_name1').placeholder="your name?";
            document.getElementById('input_name2').placeholder="project name?";
            document.getElementById('input_name3').placeholder="project name?";
        } else {
            titre="Lecture Projet - Action qui réinitialise toutes les données";
            message_avert="Action qui réinitialise toutes les données";
            document.getElementById('input_name').placeholder="nom société?";
            document.getElementById('input_name1').placeholder="votre nom?";
            document.getElementById('input_name2').placeholder="nom projet?";
            document.getElementById('input_name3').placeholder="nom projet?";
        }
        cherche_fichier_serveur(message_avert,titre);
    }
}

function ALfichier_txt1(){
    let nom_fichier=document.getElementById('input_name2').value;
    let dir1=document.getElementById('input_name').value;
    let dir2=document.getElementById('input_name1').value;
    // vérifie si fichier existant
    let erreur=true;
    for (let i = 0; i < tableau_directory.length; i++) {
        if (tableau_directory[i].includes(nom_fichier)){
            erreur=false;
        }
    }
    if (!erreur){
        nom_fichier_serveur=dir1+"\\"+dir2+"\\"+nom_fichier;
        ensemble_tableau=""
        let tableau_int=""
        echange_datas_lecture=true;
        etape_read_php=0;
        if (langue==2) {
            message_erreur="fichier trouvé";
        }else {
            message_erreur="file found";
        }
        document.getElementById('dialogboxhead1').style.color="white";
        document.getElementById('dialogboxhead1').innerHTML=message_erreur;
    }else {
        if (langue==2) {
            message_erreur="fichier inexistant";
        }else {
            message_erreur="file not found";
        }
        document.getElementById('dialogboxhead1').style.color="red";
        document.getElementById('dialogboxhead1').innerHTML=message_erreur;
    }
}

function open_lecture_php() {
  let parametres="GestionLfichier.php/?name="+nom_fichier_serveur+".txt";
  xhttp = new XMLHttpRequest();
  xhttp.timeout = 15000; // 5 seconds
  xhttp.onload = function() {myFunction_lecture(this);}
  //xhttp.open("POST", parametres, true);
  xhttp.open("GET", parametres, true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // let body=JSON.stringify("var1=tableau de texte pour essai&var2=essai encore"); // avec conversion de la variable
  //xhttp.send("var1=tableaudetextepouressai");
  xhttp.send(ensemble_tableau);
  xhttp.onreadystatechange =  function() {
        reponse_type=xhttp.readyState
        reponse_status=xhttp.status
        if (xhttp.readyState == 4) { // REQUETE TERMINÉE
            if (xhttp.status == 200) { // LA RÉPONSE EST OK :
                reponse_php = xhttp.responseText;
            } else { // IL Y A EU UN PROBLÈME
                reponse_php ="error";
            }
        }
    }
}

function myFunction_lecture(php_datas) {
  reponse_php = php_datas.responseText;
}

function php_lecture() {
    if (echange_datas_lecture) {
         switch (etape_read_php) {
            case 0 :
                if (echange_datas_lecture) {
                    if (nom_fichier_serveur.length<4) {
                        CustomAlert("name project > 4 characters","project error");
                        etape_read_php=0;
                        echange_datas_lecture= false;
                    }else{
                        etape_read_php=1;
                        fin_chargement_xml=false;
                        abort_php=false;
                    }
                }
            break;
            case 1 :
                try {
                    open_lecture_php();
                    etape_read_php=2;
                    actualprogress=0;
                    multiplicateur=10;

                    transfert_datas_fini=false;
                } catch (e) {
                    message_erreur=" fichier impossible à lire"+e.message;
                    etape_read_php=100;
                }
            break;
            case 2 :
                    /* etape transitoire */
                    if (reponse_type <4){
                        // attente car transaction en cours
                        actualprogress+=1; /* pour visu barre graph */
                        affiche_progression();
                        //if (progression>1){progression=0}
                        if (abort_php){
                            xhttp.abort();
                            abort_php=false;
                        }
                    }else {
                        etape_read_php=3;
                    }
            break;
            case 3 :
                    // si status =3 ==> demande en cours
                    if (reponse_type==4){
                         switch (reponse_status) {
                            case 0 :
                                if (langue==2) {
                                    message_erreur="time_out serveur non disponible";
                                }else {
                                    message_erreur="time_out server not available";
                                }
                                xhttp.abort();
                                etape_read_php=99;
                            break;
                            case 403 :
                                if (langue==2) {
                                    message_erreur="lecture interdite";
                                }else {
                                    message_erreur="reading prohibited";
                                }
                                xhttp.abort();
                                etape_read_php=99;
                            break;
                            case 404 :
                                if (langue==2) {
                                    message_erreur="projet non trouvé - serveur non disponible";
                                }else {
                                    message_erreur="project not found - server not available";
                                }
                                xhttp.abort();
                                etape_read_php=99;
                            break;
                            case 200 :
                                if (reponse_php.search("errorLLA1")>0){
                                    valid_clear_project();
                                    if (langue==2) {
                                        message_erreur="projet non trouvé - serveur non disponible";
                                    }else {
                                        message_erreur="project not found";
                                    }
                                    etape_read_php=99;
                                } else {
                                    iframe_hidden=false;
                                    affiche_datas_iframe();
                                    remove_datas_iframe();
                                    array_tasks_lecture_datas=[];
                                    array_tasks=[];
                                    array_tasks[0]=[];
                                    conversion_tableau(reponse_php);
                                    document.getElementById('file_name_db').value=document.getElementById('input_name2').value;
                                    recopy_array_2D();
                                    ask_write_parameters=true;
                                    message_erreur="";
                                    etape_read_php=4;
                                }
                            break;
                        }
                    }else{
                            if (abort_php){
                                xhttp.abort();
                                abort_php=false;
                            }
                        }
            break;
            case 4 :
                    etape_read_php=100;
                    transfert_datas_fini=true;
                    iframe_hidden=true;
                    affiche_datas_iframe();
                    onload_donnees_base=false;
                    actualprogress=0;
                    affiche_progression();
                    abort_php=false;
            break;
            case 99 :
                CustomAlert("error on load file step 99 : ",message_erreur);
                etape_read_php=0;
                echange_datas_lecture=false;
                transfert_datas_fini=true;
                break;
            case 100 :
                etape_read_php=0;
                echange_datas_lecture=false;
                transfert_datas_fini=true;
                abort_php=false;
            break;
        }
    }
}