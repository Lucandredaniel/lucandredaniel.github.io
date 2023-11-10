/* =============================================== */
/* Appel PHP pour ecriture fichier sur serveur     */
/* appel le fichier "GestionSfichier.php"          */
/* =============================================== */

function mise_en_forme_tableau(index){
    tableau_en_forme=""
    for (let i = 0; i < base_donnees_complete[index].length; i++) {
        tableau_en_forme=tableau_en_forme+base_donnees_complete[index][i]+",";
    }
}

function AAEfichier(){
    if (!onload_donnees_base){ /* verifie si chargement non en cours */
        abort_lecture_fichier(); // enleve la box précédente
        demande_ecriture_fichier=true;
        //save_datas_directory=true;
        etape_save_sur_serveur=0;
        document.getElementById('dialogbox1').style.display = "block";
        document.getElementById('dialogboxhead1').style.color="white";
        if (langue==1){
            titre="Save project -";
            message_avert=" ";
            document.getElementById('input_name').placeholder="society name?";
            document.getElementById('input_name1').placeholder="your name?";
            document.getElementById('input_name2').placeholder="project name?";
            document.getElementById('input_name3').placeholder="project name?";
        } else {
            titre="Sauvegarde du projet -";
            message_avert=" ";
            document.getElementById('input_name').placeholder="nom société?";
            document.getElementById('input_name1').placeholder="votre nom?";
            document.getElementById('input_name2').placeholder="nom projet?";
            document.getElementById('input_name3').placeholder="nom projet?";
        }
        cherche_fichier_serveur(message_avert,titre);
    }
}

function ecriture_fichier_en_php(){
    ensemble_tableau=""
    creation_base_donnees_complete();
    // etape_write=2;
    let tableau_int=""
    echange_datas_ecriture=true;
    etape_write_php=0;
    let index=0;
    for (let i = 0; i < base_donnees_complete.length; i++) {
        mise_en_forme_tableau(i);
        ensemble_tableau=ensemble_tableau+"l"+String(i)+"="+tableau_en_forme;
        if (i<base_donnees_complete.length-1){
            ensemble_tableau=ensemble_tableau+"&";
        }
    }
   let int1=document.getElementById("input_name").value;
   let int2=document.getElementById("input_name1").value;
   let int3=document.getElementById("input_name3").value;
   nom_fichier_serveur=int1+"\\"+int2+"\\"+int3;
   abort_lecture_fichier(); // enleve la box de sauvegarde fichier
}

function open_ecriture_php() {
  let urlgithub="https://github.com/Lucandredaniel/lucandredaniel.github.io/tree/31871bf73307e80f2c900e2b5b6b8d2b7ceef611/"
  let parametres="GestionSfichier.php/?name="+nom_fichier_serveur+".txt";
  xhttp = new XMLHttpRequest();
  xhttp.timeout = 15000; // 15 secondes
  xhttp.onload = function() {myFunction_ecriture(this);}
  //xhttp.open("POST", parametres, true);
  xhttp.open("POST", parametres, true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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

function myFunction_ecriture(php_datas) {
  reponse_php = php_datas.responseText;
}

function php_ecriture() {
    if (echange_datas_ecriture) {
         switch (etape_write_php) {
            case 0 :
                if (echange_datas_ecriture) {
                    if (nom_fichier_serveur.length<4) {
                        CustomAlert("name project > 4 characters","db error");
                        etape_write_php=0;
                        echange_datas_ecriture= false;
                    }else{
                        etape_write_php=1;
                        fin_chargement_xml=false;
                        abort_php=false;
                    }
                }
            break;
            case 1 :
                try {
                    open_ecriture_php();
                    etape_write_php=2;
                    actualprogress=0;
                    multiplicateur=10;
                } catch (e) {
                    message_erreur="fichier impossible à créer"+e.message;
                    etape_write_php=99;
                }
            break;
            case 2 :
                    /* etape transitoire */

                    if (reponse_type <4){
                        // attente car transaction en cours
                        actualprogress+=1; /* pour visu barre graph */
                        affiche_progression();
                        if (progression>1){progression=0}
                        if (abort_php){
                            xhttp.abort();
                            abort_php=false;
                        }
                    }else {
                        etape_write_php=3;
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
                                etape_write_php=99;
                            break;
                            case 403 :
                                if (langue==2) {
                                    message_erreur="lecture interdite";
                                }else {
                                    message_erreur="reading prohibited";
                                }
                                xhttp.abort();
                                etape_write_php=99;
                            break;
                            case 404 :
                                if (langue==2) {
                                    message_erreur="projet non trouvé - serveur non disponible";
                                }else {
                                    message_erreur="project not found - server not available";
                                }
                                xhttp.abort();
                                etape_write_php=99;
                            break;
                            case 200 :
                                message_erreur="";
                                if (langue==2) {
                                    titre="fichier "+name_db+" : ";
                                    message_erreur="sauvegarde effectuée";
                                }else {
                                    titre="file "+name_db+" : ";
                                    message_erreur="file saved done";
                                }
                                Helpmessage_1(message_erreur,titre)
                                // xhttp.abort();
                                etape_write_php=100;
                                abort_php=false;
                            break;
                        }
                    }else{
                            if (abort_php){
                                xhttp.abort();
                                abort_php=false;
                            }
                        }
            break;
            case 99 :
                CustomAlert("error on save file step 99 : "+message_erreur);
                etape_write_php=0;
                echange_datas_ecriture=false;
                break;
            case 100 :
                etape_write_php=0;
                echange_datas_ecriture=false;
                abort_php=false;
            break;
        }
    }
}