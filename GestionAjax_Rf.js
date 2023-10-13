/* lancement fonction en automatique de façon repetitive */
/* ===================================================== */

function conversion_tableau(reponse_php_int){
    /* recopy string recu dans tableau par tache */
    let analyse_fini=false;
    let index_DIV=5;
    let j=0;
    let recherche_texte="-LLA-";
    //let recherche_texte="finlla2";
    let word_restant=String(reponse_php_int);
    tableau_de_reception=[];
    // separe le ligne via les separateurs <DIV> et </DIV>
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

function appel_ajax_lecture_fichier(){
    ensemble_tableau=""
    let tableau_int=""
    echange_datas_lecture=true;
    etape_read_php=0;
}

function open_datas_lecture_php() {
  let parametres="Gestion_lecture_fichier.php/?name="+name_db+".txt";
  xhttp = new XMLHttpRequest();
  xhttp.timeout = 15000; // 5 seconds
  xhttp.onload = function() {myFunction_lecture(this);}
  xhttp.open("POST", parametres, true);
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

function echanges_datas_php_lecture() {
    const abort_button=document.getElementById("AbortFonctionAjax")
    if (echange_datas_lecture) {
         switch (etape_read_php) {
            case 0 :
                if (echange_datas_lecture) {
                    if (name_db.length<4) {
                        CustomAlert("name project > 4 characters","db error");
                        etape_read_php=0;
                        echange_datas_lecture= false;
                    }else{
                        etape_read_php=1;
                        fin_chargement_xml=false;
                    }
                }
            break;
            case 1 :
                alert("lecture")
                try {
                    open_datas_lecture_php();
                    etape_read_php=2;
                    actualprogress=0;
                    multiplicateur=10;
                    iframe_hidden=false;
                    affiche_datas_iframe();
                    remove_datas_iframe();
                    array_tasks_lecture_datas=[];
                    array_tasks=[];
                    array_tasks[0]=[];
                    transfert_datas_fini=false;
                } catch (e) {
                    message_erreur=" fichier impossible à créer"+e.message;
                    etape_read_php=100;
                }
            break;
            case 2 :
                    /* etape transitoire */
                    if (reponse_type <4){
                        // attente car transaction en cours
                        actualprogress+=1; /* pour visu barre graph */
                        affiche_progression();
                        if (progression>1){progression=0}
                        abort_button.addEventListener("click",function(){
                            xhttp.abort();
                            etape_read_php=0;
                            echange_datas_lecture=false;
                        },{once:true},);
                    }else {
                        etape_read_php=3;
                    }
            break;
            case 3 :
                    // si status =3 ==> demande en cours
                    if (reponse_type==4){
                         switch (reponse_status) {
                            case 0 :
                                message_erreur="time_out server non disponible"
                                xhttp.abort();
                                etape_read_php=99;
                            break;
                            case 403 :
                                message_erreur="Requete interdite (lecture)";
                                xhttp.abort();
                                etape_read_php=99;
                            break;
                            case 404 :
                                message_erreur="Page non trouvée - serveur non disponible";
                                xhttp.abort();
                                etape_read_php=99;
                            break;
                            case 200 :
                                conversion_tableau(reponse_php);
                                recopy_array_2D();
                                ask_write_parameters=true;
                                message_erreur="";
                                // xhttp.abort();
                                etape_read_php=4;
                            break;
                        }
                    }else{
                            abort_button.addEventListener("click",function(){xhttp.abort();
                            },{once:true},)
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
            break;
            case 99 :
                CustomAlert("error on load file step 99 : "+message_erreur);
                etape_read_php=0;
                echange_datas_lecture=false;
                break;
            case 100 :
                etape_read_php=0;
                echange_datas_lecture=false;
            break;
        }
    }
}

