/* ================================================= */
/* Appel PHP pour lecture des directorys sur serveur */
/* ================================================= */


function liste_directory(){
    // FUNCTION INUTILE
    //ensemble_tableau="";
    //echange_datas_directory=true;
    //etape_directory_php=0;
}

function php_analyse_input_save_name(){
    message_divers( String(save_datas_directory)+" : "+String(demande_ecriture_fichier),document.getElementById("input_name").value )

    if ((save_datas_directory)||(demande_ecriture_fichier)){
        let int1="";
        let int2="";
        let elt="";
        elt=document.getElementById("input_name");
        int1=elt.value
        int2= int1.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        elt.value=int2;
        elt=document.getElementById("input_name1");
        int1=elt.value
        int2= int1.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        elt.value=int2;
        elt=document.getElementById("input_name2");
        int1=elt.value
        int2= int1.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        elt.value=int2;
        elt=document.getElementById("input_name3");
        int1=elt.value
        int2= int1.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        elt.value=int2;
        m
    }
}

function lecture_directory_php() {
    let parametres="GestionDirectory.php/?name="+name_directory;
    xhttp = new XMLHttpRequest();
    xhttp.timeout = 15000; // 5 seconds
    xhttp.onload = function() {myFunction_lecture_directory(this);}
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

function creation_directory_php() {
    let parametres="gestionMkdir.php/?name="+name_directory;
    xhttp = new XMLHttpRequest();
    xhttp.timeout = 15000; // 5 seconds
    xhttp.onload = function() {myFunction_lecture_directory(this);}
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

function myFunction_lecture_directory(php_datas) {
  reponse_php = php_datas.responseText;
}

function remove_decomposition_reponse_php_directory(){
    if (tableau_directory.length>0){
        for (let i = 0; i < (tableau_directory.length); i++) {
            idvar="file"+String(i)
            variable1 = document.getElementById(idvar);
            variable1.remove(variable1);
        }
    }
   tableau_directory=[];
   tableau_directory_time=[];
}

function decomposition_reponse_php_directory(reponse_php){
    let tableau_int=reponse_php.split("\n");
    for (let i = 0; i < (tableau_int.length); i++) {
        if (tableau_int[i]!=""){
            let position=tableau_int[i].search("&");
            tableau_directory[i]=tableau_int[i].substring(0,position);
            tableau_directory_time[i]=tableau_int[i].substring(position+1,tableau_int[i].length);
        }
    }
    /* inserte dans liste html le tableau ds fichiers */
    if (tableau_directory.length>0){
        for (let i = 0; i < (tableau_directory.length); i++) {
            idvar="file"+String(i)
            list = element_file_directory[0];
            variable1= document.createElement('a');
            variable1.setAttribute("id",idvar);
            variable1.setAttribute("href","#");
            let function_a_appeler="memorise_nom_file("+String(i)+")";
            variable1.setAttribute("onclick",function_a_appeler);
            list.appendChild(variable1);
            list=document.getElementById(idvar);
            list.innerHTML=tableau_directory[i]+"   : "+tableau_directory_time[i];
        }
    }
}

function demande_recherche_directory_1(){
    name_directory=document.getElementById("input_name").value;
    if (!demande_ecriture_fichier){
        echange_datas_directory=true;
        save_datas_directory=false;
    }else{
        echange_datas_directory=false;
        save_datas_directory=true;
    }
    numero_dir=1;
}

function demande_recherche_directory_2(){
    let int1=document.getElementById("input_name").value;
    let int2=document.getElementById("input_name1").value;
    name_directory=int1+"\\"+int2;
    if (!demande_ecriture_fichier){
        echange_datas_directory=true;
        save_datas_directory=false;
    }else{
        echange_datas_directory=false;
        save_datas_directory=true;
        attente_validation_dir2=true;
    }
    numero_dir=2;
}

function memorise_nom_file(index){
        let elm_directory=document.getElementById("input_name1");
        if (numero_dir==2){
            elm_directory=document.getElementById("input_name2");
        }
        nom_fichier_serveur=tableau_directory[index];
        elm_directory.value=nom_fichier_serveur;
}

function abort_lecture_fichier(){ // réinitialisation de l'ensemble
    document.getElementById('dialogbox1').style.display = "none";
    element_file_directory[0].style.display='none';
    efface_container_secondaire();
    echange_datas_directory=false;
    save_datas_directory=false;
    demande_ecriture_fichier=false;
}
function efface_container_secondaire(){ // réinitialisation des containers secondaires
    element_directory=document.getElementsByClassName("container2");
    element_directory[0].style.display='none';
    element_directory=document.getElementsByClassName("container3");
    element_directory[0].style.display='none';
    element_directory=document.getElementsByClassName("container4");
    element_directory[0].style.display='none';
    element_directory=document.getElementsByClassName("container5");
    element_directory[0].style.display='none';
    etape_directory_php=0;
    etape_save_sur_serveur=0;
}

function attente_reponse_php(){
    /* etape transitoire */
    reponse_increment_php=0;
    if (reponse_type <4){
        if (abort_php){
            xhttp.abort();
            abort_php=false;
        }
    }else {
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
                    document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                    document.getElementById('dialogboxhead1').style.color="red";
                    reponse_increment_php=100;
                break;
                case 403 :
                    if (langue==2) {
                        message_erreur="lecture interdite";
                    }else {
                        message_erreur="reading prohibited";
                    }
                    xhttp.abort();
                    document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                    document.getElementById('dialogboxhead1').style.color="red";
                    reponse_increment_php=100;
                break;
                case 404 :
                    if (langue==2) {
                        message_erreur="projet non trouvé - serveur non disponible";
                    }else {
                        message_erreur="project not found - server not available";
                    }
                    xhttp.abort();
                    document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                    document.getElementById('dialogboxhead1').style.color="red";
                    reponse_increment_php=100;
                break;
                case 200 :
                    if ((reponse_php.search("inexistant")>0) || (reponse_php.length==0)){
                        if (langue==2) {
                            message_erreur="profil inexistant";
                        }else {
                            message_erreur="non-existent profile";
                        }
                        document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                        document.getElementById('dialogboxhead1').style.color="red";
                        if (!demande_ecriture_fichier){
                            reponse_increment_php=100;
                        } else{
                            // demande de confirmation pour creation repertoire
                            reponse_increment_php=8
                        }
                    } else {
                        message_erreur="";
                        reponse_increment_php=3;
                    }
                break;
            }
        }else{
                if (abort_php){
                    xhttp.abort();
                    abort_php=false;
                }
             }
        }
}

function php_ecriture_fichier() {
    if(save_datas_directory){
        switch (etape_save_sur_serveur) {
            case 0 :
                    if (name_directory.length<4) {
                        if (langue==2) {
                            message_erreur="nom société > 4 caractéres";
                        }else {
                            message_erreur="society name > 4 characters";
                        }
                        document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                        document.getElementById('dialogboxhead1').style.color="red";
                        echange_datas_directory=false;
                    }else{
                        etape_save_sur_serveur=1;
                        fin_chargement_xml=false;
                        abort_php=false;
                        remove_decomposition_reponse_php_directory(); // enleve les élements existants
                        element_file_directory[0].style.display='none'; // affichage des repertoires
                        element_directory=document.getElementsByClassName("container2");
                    }
            break;
            case 1 :
                    reponse_php="";
                    reponse_type=0;
                    lecture_directory_php(); // 1=lecture
                    etape_save_sur_serveur=2;
            break;
            case 2 : // analyse reponse
                    attente_reponse_php();
                    if (reponse_increment_php==100){
                        etape_save_sur_serveur=100;
                    }
                    if (reponse_increment_php==8){ // demande de creation du directory
                        message_erreur="company creation : confirmation";
                        if (langue==2){
                            message_erreur="confirmation création de la société";
                        }
                        document.getElementById('text50').innerHTML=message_erreur;
                        document.getElementsByClassName("container5")[0].style.top = "120px";
                        document.getElementsByClassName("container5")[0].style.display='block';
                        validation_de_la_creation_societe=0;
                        etape_save_sur_serveur=5;
                    }
                    if (reponse_increment_php==3){
                        etape_save_sur_serveur=3;
                    }
            break;
            case 3 :
                    etape_save_sur_serveur=4;
                    abort_php=false;
                    directory_trouve=true;
                    decomposition_reponse_php_directory(reponse_php);
            break;
            case 4 :
                    if (langue==2) {
                        message_erreur="choisir le nom du dossier";
                    }else {
                        message_erreur="choice of project name";
                    }
                    document.getElementById('dialogboxhead1').style.color="white";
                    document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                    element_file_directory[0].style.display='block'; // affichage des repertoires
                    directory_trouve=false;
                    etape_save_sur_serveur=6;
            break;
            case 5 : //creation directory
                    if (validation_de_la_creation_societe==1){ // ok
                        document.getElementsByClassName("container5")[0].style.display='none';
                        remove_decomposition_reponse_php_directory(); // enleve les élements existants
                        element_file_directory[0].style.display='none'; // affichage des repertoires
                        element_directory=document.getElementsByClassName("container2");
                        reponse_php="";
                        reponse_type=0;
                        creation_directory_php()
                        etape_save_sur_serveur=55;
                    }else{
                        if (validation_de_la_creation_societe==2){ //Nok
                            abort_lecture_fichier();
                            etape_save_sur_serveur=0;
                        }
                    }
            break;
            case 55: // analyse réponse après création repertoire
                    attente_reponse_php();
                    if (reponse_increment_php==100){
                        etape_save_sur_serveur=100;
                    }
                    if (reponse_increment_php==8){ // demande de creation du directory
                        etape_save_sur_serveur=55;
                    }
                    if (reponse_increment_php==3){
                        etape_save_sur_serveur=6;
                    }
            break;
            case 6 :
                    element_directory[0]=document.getElementsByClassName("container2");
                    element_directory[0].style.display='block';
                    attente_validation_dir2=false;
                    etape_save_sur_serveur=7;
            break;
            case 7 : // attente validation
                    if (attente_validation_dir2){
                        attente_validation_dir2=false;
                        let int1=document.getElementById("input_name1").value;
                        if (int1.length<4) {
                            message_erreur="society name > 4 characters";
                            if (langue==2) {
                                message_erreur="nom société > 4 caractéres";
                            }
                            document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                            document.getElementById('dialogboxhead1').style.color="red";
                            echange_datas_directory=false;
                        }else{
                            abort_php=false;
                            remove_decomposition_reponse_php_directory(); // enleve les élements existants
                            element_file_directory[0].style.display='none'; // affichage des repertoires
                            reponse_php="";
                            reponse_type=0;
                            lecture_directory_php(); // 1=lecture
                            etape_save_sur_serveur=8;
                        }
                    }
            break;
            case 8: // analyse reponse
                    attente_reponse_php();
                    if (reponse_increment_php==100){
                        etape_save_sur_serveur=100;
                    }
                    if (reponse_increment_php==8){ // demande de creation du directory
                        message_erreur="confirmation creation : your entity";
                        if (langue==2){
                            message_erreur="confirmation création de votre entité";
                        }
                        document.getElementById('text50').innerHTML=message_erreur;
                        document.getElementsByClassName("container5")[0].style.top = "160px";
                        document.getElementsByClassName("container5")[0].style.display='block';
                        validation_de_la_creation_societe=0;
                        etape_save_sur_serveur=9;
                    }
                    if (reponse_increment_php==3){
                        etape_save_sur_serveur=11;
                    }
            break;
            case 9: // creation du deuxième directory
                    if (validation_de_la_creation_societe==1){ // ok
                        document.getElementsByClassName("container5")[0].style.display='none';
                        remove_decomposition_reponse_php_directory(); // enleve les élements existants
                        element_file_directory[0].style.display='none'; // affichage des repertoires
                        //name_directory=document.getElementById("input_name").value;
                        reponse_php="";
                        reponse_type=0;
                        creation_directory_php()
                        etape_save_sur_serveur=10;
                    }else{
                        if (validation_de_la_creation_societe==2){ //Nok
                            abort_lecture_fichier();
                            etape_save_sur_serveur=0;
                        }
                    }
            break;
            case 10 : // analyse reponse
                    attente_reponse_php();
                    if (reponse_increment_php==100){
                        etape_save_sur_serveur=100;
                    }
                    if (reponse_increment_php==8){ // demande de creation du directory
                        etape_save_sur_serveur=10;
                    }
                    if (reponse_increment_php==3){
                        etape_save_sur_serveur=11;
                    }
            break;
            case 11 : // sauvegarde du fichier
                    if (langue==2) {
                        message_erreur="choisir le nom projet";
                    }else {
                        message_erreur="choice of project name";
                    }
                   document.getElementById('dialogboxhead1').style.color="white";
                   document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                   element_directory=document.getElementsByClassName("container4"); // affichage demande de sauvegarde
                   element_directory[0].style.display="block";
                   document.getElementById("input_name3").value=name_db;
                   etape_save_sur_serveur=12;
            break;
            case 12 :
                   etape_save_sur_serveur=100;
            break;
            case 99 :
                    document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                    directory_trouve=false;
                    etape_save_sur_serveur=0;
                    save_datas_directory=false;
            break;
            case 100 : // fin
                    etape_save_sur_serveur=0;
                    save_datas_directory=false;
                    abort_php=false;
            break;
        }
    }
}


function php_lecture_directory() {
    if (echange_datas_directory) {
         switch (etape_directory_php) {
            case 0 :
                    if (echange_datas_directory) {
                        if (name_directory.length<4) {
                            if (langue==2) {
                                message_erreur="nom société > 4 caractéres";
                            }else {
                                message_erreur="society name > 4 characters";
                            }
                            document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                            document.getElementById('dialogboxhead1').style.color="red";
                            echange_datas_directory=false;
                        }else{
                            etape_directory_php=1;
                            fin_chargement_xml=false;
                            abort_php=false;
                            remove_decomposition_reponse_php_directory(); // enleve les élements existants
                            element_file_directory[0].style.display='none'; // affichage des repertoires
                            element_directory=document.getElementsByClassName("container2");
                            if (numero_dir==2){
                                element_directory=document.getElementsByClassName("container3");
                            }
                        }
                    }
            break;
            case 1 :
                    try {
                        lecture_directory_php(); // 1=lecture
                        etape_directory_php=2;
                    } catch (e) {
                        message_erreur=" fichier impossible à lire"+e.message;
                        document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                        document.getElementById('dialogboxhead1').style.color="red";
                        etape_directory_php=100;
                    }
            break;
            case 2 :
                    reponse_increment_php=0;
                    attente_reponse_php();
                    if (reponse_increment_php==100){
                        etape_directory_php=100;
                    }
                    if (reponse_increment_php==8){
                        etape_directory_php=100;
                    }
                    if (reponse_increment_php==3){
                        etape_directory_php=3;
                    }
            break;
            case 3 :
                    etape_directory_php=4;
                    abort_php=false;
                    directory_trouve=true;
                    decomposition_reponse_php_directory(reponse_php);
            break;
            case 4 :
                    element_file_directory[0].style.display='block'; // affichage des repertoires
                    directory_trouve=false;
                    etape_directory_php=6;
            break;
            case 6 :
                    if (langue==2) {
                        message_erreur="choisir le nom du dossier et projet";
                    }else {
                        message_erreur="choice of project name";
                    }
                    document.getElementById('dialogboxhead1').style.color="white";
                    document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                    element_directory[0].style.display='block';
                    etape_directory_php=100;
            break;
            case 99 :
                    document.getElementById('dialogboxhead1').innerHTML=message_erreur;
                    directory_trouve=false;
                    etape_directory_php=0;
                    echange_datas_directory=false;
            break;
            case 100 : // fin
                    etape_directory_php=0;
                    echange_datas_directory=false;
                    abort_php=false;
            break;
        }
    }
}