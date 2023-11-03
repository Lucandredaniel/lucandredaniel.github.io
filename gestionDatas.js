
/* tableau des donnees array_tasks
   array_tasks ==> ce tableau est la sauvegarde des données que l'on exportera de fichiers ou des donnees de l'Iframe
  ce tableau est recopié dans array_tasks_display_save
  array_tasks_display_save ==> ce tableau permet de recalculer les positions des taches entre elles en fonction des contraintes
  ce tableau est recopié dans array_tasks_display
  array_tasks_display ==> tableau uniquement utilisé pour l'affichage dans le canvas (aucun calcul sur ce tableau)
*/

/* génération des tableaux d'affichage du canvas en des donnees contenues dans array_tasks */
/* ======================================================================================== */
function recopy_array_2D(){
    array_tasks_display_save=[];
    //alert(array_tasks)
    for (let i = 0; i < array_tasks.length; i++) {
        array_tasks_display_save[i]=[]
        for (let j = 0; j < array_tasks[0].length; j++) {
         if (j==1){ // verifie si parametre delai. Si oui recalcul de la duree en fonction choix de la selection
            if (choix_planning=="S") {
            array_tasks_display_save[i][j]=array_tasks[i][j]*duree_semaine;
            }else {
                if (choix_planning=="M") {
                    array_tasks_display_save[i][j]=array_tasks[i][j]*duree_mois;
                }else {
                    array_tasks_display_save[i][j]=array_tasks[i][j];
                }
            }
         } else{
            if (j==2){ // verifie si parametre delai. Si oui recalcul de la duree en fonction choix de la selection
                if (choix_planning=="S") {
                    array_tasks_display_save[i][j]=array_tasks[i][j]*duree_semaine;
                }else {
                    if (choix_planning=="M") {
                        array_tasks_display_save[i][j]=array_tasks[i][j]*duree_mois;
                    }else {
                        array_tasks_display_save[i][j]=array_tasks[i][j];
                    }
                }
            }else {
                    if (j==3){ // verifie si parametre GAP. Si oui recalcul de la duree en fonction choix de la selection
                        if (choix_planning=="S") {
                            array_tasks_display_save[i][j]=array_tasks[i][j]*duree_semaine;
                        }else {
                            if (choix_planning=="M") {
                                array_tasks_display_save[i][j]=array_tasks[i][j]*duree_mois;
                            }else {
                                array_tasks_display_save[i][j]=array_tasks[i][j];
                            }
                        }
                    }else {
                        array_tasks_display_save[i][j]=array_tasks[i][j];
                          }
                    }
            }
        }
    }
}

function verifie_si_jour_travaille(index){
    let jour_travaille=true;
    if (choix_planning=="J") { // uniquement si planning jours (sinon on considére tous les jours travaillés)
        if (nombre_jour_travaille<7){
            let save_resultat_increment=index;
            let nbr_m_second = 86400000 /* nbr de seconde en 1 journée */
            variable1=document.getElementById("start_date_project");
            let start_project= new Date(variable1.value);
            if (start_project=="Invalid Date"){
                start_project=new Date()
            }
            if (save_resultat_increment>0){
                let start_int=start_project.getTime()
                start_int+=(index*nbr_m_second);
                start_project.setTime(start_int);
            }
            let date_start=start_project;
            date_start_N_jour_semaine=date_start.getDay();
            if (date_start_N_jour_semaine==0){jour_travaille=false}
            if ((date_start_N_jour_semaine==6)&&(nombre_jour_travaille<6)){jour_travaille=false}
        }
    }
    return jour_travaille;
}

function recopy_array_for_display(){
    if (!changement_affichage_en_cours_graph){
        if (memo_increment_left<0){memo_increment_left=0};
        if (memo_increment_left>number_day){memo_increment_left=number_day};
        array_tasks_display=[];
        let index=0;
        for (let i = 0; i < array_tasks_display_save.length; i++) {
            if (i>=increment_top_canvas){
                array_tasks_display[index]=[]
                for (let j = 0; j < array_tasks_display_save[0].length; j++) {
                    array_tasks_display[index][j]=array_tasks_display_save[i][j];
                    int_increment=increment_left_canvas+memo_increment_left;
                    if (j==5){ /* gestion des taches avals */
                        array_tasks_display[index][j]=array_tasks_display[index][j]-increment_top_canvas;
                        if (array_tasks_display[index][j]<0) {array_tasks_display[index][j]=0}
                    }
                    if (j==7){ /* gestion des tache amonts */
                        array_tasks_display[index][j]=array_tasks_display[index][j]-increment_top_canvas;
                        if (array_tasks_display[index][j]<0) {array_tasks_display[index][j]=0}
                    }
                    for (let x = 0; x < int_increment; x++) {
                        if (j==2) {
                            if (array_tasks_display[index][1]>0){
                               array_tasks_display[index][1]-=1;
                            } else {
                                array_tasks_display[index][1]=0;
                                if (array_tasks_display_save[index][6]==1) {
                                        if (array_tasks_display[index][2]>0) {
                                            array_tasks_display[index][2]-=1;
                                        }
                                }else{
                                    if (verifie_si_jour_travaille(x)){
                                            if (array_tasks_display[index][2]>0) {
                                                array_tasks_display[index][2]-=1;
                                            }
                                    }
                                }
                            }
                        }
                    }
                }
                index+=1;
            }
        }
    }
}
function check_datas_upstream(){
    for (let i = 0; i < (array_tasks.length); i++) {
        if (array_tasks_display_save[i][7]!=0){ /* vérifie si tache amont déclarée */
            /* vérifie si tache pas > au nombre de tache declaré */
            let numero_tache_amont=Number(array_tasks_display_save[i][7]-1);
            let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[numero_tache_amont][1],array_tasks_display_save[numero_tache_amont][2],numero_tache_amont);
            let fin_tache_en_amont=Number(array_tasks_display_save[numero_tache_amont][1])+Number(resultat_duree_tache)+Number(array_tasks_display_save[numero_tache_amont][3]);
            let tache_jalon=Number(array_tasks_display_save[i][4]);
            if (tache_jalon!=1) {
                if (array_tasks_display_save[i][1]<fin_tache_en_amont){
                    array_tasks_display_save[i][1]= fin_tache_en_amont;
                }
            }
        }
    }
}

function check_datas_downstream(){
    change_datas=false;
    for (let i = 0; i < (array_tasks.length); i++) {
        if (array_tasks_display_save[i][5]>array_tasks_display_save.length) {
            array_tasks_display_save[i][5]=0;
            array_tasks[i][5]=0;
        }
        if (array_tasks_display_save[i][5]==i+1) {
            array_tasks_display_save[i][5]=0;
            array_tasks[i][5]=0;
        }
        if (array_tasks_display_save[i][7]>array_tasks_display_save.length) {
            array_tasks_display_save[i][7]=0;
            array_tasks[i][7]=0;
        }
        if (array_tasks_display_save[i][7]==i+1) {
            array_tasks_display_save[i][7]=0;
            array_tasks[i][7]=0;
        }
        /* verifie le parametre couleur */
        if (array_tasks_display_save[i][9]==0){
            array_tasks_display_save[i][9]="#4488EE"; // nuance de bleu
        }
        /* verifie le gap et prise en compte */
        if (array_tasks_display_save[i][3]!=0){
            array_tasks_display_save[i][1]=Number(array_tasks_display_save[i][1])+Number(array_tasks_display_save[i][3]);
        }
    }
    /* contrôle des parametres et les incidences entre eux */
    /* sur donnees principale "array_tasks" et sur donnees d affichage "array_tasks_display" */
    /* déplacer les taches liées */
    for (let i = 0; i < (array_tasks.length); i++) {
        if (array_tasks_display_save[i][5]!=0){ /* vérifie si tache aval déclarée */
            /* vérifie si tache pas > au nombre de tache declaré */
            let numero_tache_aval=Number(array_tasks_display_save[i][5]-1);
            // calcul_duree_tache(depart_tache,duree_tache_n,index_tache)
            let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[i][1],array_tasks_display_save[i][2],i);
            let fin_tache_en_cours=Number(array_tasks_display_save[i][1])+Number(resultat_duree_tache);
            let debut_tache_suivante=Number(array_tasks_display_save[numero_tache_aval][1])+Number(array_tasks_display_save[numero_tache_aval][3]);
            let tache_jalon=Number(array_tasks_display_save[numero_tache_aval][4]);
            if (tache_jalon!=1) {
               calcul_fin_tache= fin_tache_en_cours+Number(array_tasks_display_save[numero_tache_aval][3]);
               if (array_tasks_display_save[numero_tache_aval][1]<calcul_fin_tache){
                    array_tasks_display_save[numero_tache_aval][1]= fin_tache_en_cours+Number(array_tasks_display_save[numero_tache_aval][3]);
               }
            }
        }
    }
}

function check_datas_red(){
    for (let i = 0; i < (array_tasks.length); i++) {
        array_tasks[i][8]=0; // on efface tous les defauts
        array_tasks_display_save[i][8]=0;
    }
    /* mise en erreur des taches si dépassement dune tache par rapport a la tache suivant si elles sont liées */
    /* et que la derniere tache liée est un jalon */
     for (let i = 0; i < (array_tasks.length); i++) {
        // vérifie si tache jalon sinon on saute
        if (Number(array_tasks_display_save[i][4])==1){
            // recherche si tache amont reliée au jalon
            for (let j = 0; j < (array_tasks.length); j++){
                let numero_tache_aval=Number(array_tasks_display_save[j][5]-1);
                if (numero_tache_aval==i) { // tache ratachée au jalon
                    // vérification si pas depassement de la tache jalon

                    let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[j][1],array_tasks_display_save[j][2],j);
                    let fin_tache_en_cours=Number(array_tasks_display_save[j][1])+Number(resultat_duree_tache) // +Number(array_tasks_display_save[j][3]);
                    let debut_tache_jalon=Number(array_tasks_display_save[i][1]);
                    if (debut_tache_jalon<fin_tache_en_cours){
                        array_tasks[j][8]=1; /* tache en defaut */
                        array_tasks_display_save[j][8]=1;
                    }
                }
            }
            // verification si tache jalon n a pas un rattachement en UPStream
            if (array_tasks_display_save[i][7]!=0) {
                let numero_tache_amont=Number(array_tasks_display_save[i][7]-1);
                let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[numero_tache_amont][1],array_tasks_display_save[numero_tache_amont][2],numero_tache_amont);
                let fin_tache_en_cours=Number(array_tasks_display_save[numero_tache_amont][1])+Number(resultat_duree_tache)
                let debut_tache_jalon=Number(array_tasks_display_save[i][1]);
                if (debut_tache_jalon<fin_tache_en_cours){
                    array_tasks[numero_tache_amont][8]=1; /* tache en defaut */
                    array_tasks_display_save[numero_tache_amont][8]=1;
                }
            }
        }
    }

    /* contrôle les suites de taches en défaut liaison Downstream */
    for (let i = (array_tasks.length-1); i > 0; i--) {
        if (array_tasks_display_save[i][5]>0){
            numero_tache_aval=Number(array_tasks_display_save[i][5]-1);
            tache_en_defaut=array_tasks_display_save[numero_tache_aval][8];
            if (tache_en_defaut==1){
                let debut_tache=Number(array_tasks_display_save[numero_tache_aval][1]);
                let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[i][1],array_tasks_display_save[i][2],i);
                let fin_tache_amont=Number(array_tasks_display_save[i][1])+Number(resultat_duree_tache);
                if (fin_tache_amont>=debut_tache){
                    array_tasks[i][8]=1; /* tache en defaut */
                    array_tasks_display_save[i][8]=1;
                }
            }
        }
    }
    /* contrôle les suites de taches en défaut liaison Upstream*/
     for (let i = (array_tasks.length-1); i > 0; i--) {
        if (array_tasks_display_save[i][7]>0){
            numero_tache_amont=Number(array_tasks_display_save[i][7]-1);
            tache_en_defaut=array_tasks_display_save[i][8];
            if (tache_en_defaut==1){
                let debut_tache=Number(array_tasks_display_save[i][1]);
                let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[numero_tache_amont][1],array_tasks_display_save[numero_tache_amont][2],numero_tache_amont);
                let fin_tache_amont=Number(array_tasks_display_save[numero_tache_amont][1])+Number(resultat_duree_tache);
                if (fin_tache_amont>=debut_tache){
                    array_tasks[numero_tache_amont][8]=1;
                    array_tasks_display_save[numero_tache_amont][8]=1;
                }
            }
        }
    }

}

function calcul_tache_principale(){
    /* verifie si tache declarée comme "main task" */
    let compteur_fin_tache=0;
    let debut_tache_principale_precedent=0;
    let fin_tache_principale_precedent=0;
    let compteur_duree=0;
    let i=0;
    let j=0;
    let valeur_int=0;
    while (i < (array_tasks_display_save.length)) {
        j=0;
        /* verifie si tache principal (annule les liaisons filles et additionne le delai total de chaque tache fille */
        if (array_tasks_display_save[i][6]==1){
            j=i+1;
            array_tasks_display_save[i][2]=0;
            array_tasks_display_save[i][3]=0;
            array_tasks_display_save[i][4]=0;
            array_tasks_display_save[i][5]=0;
            /* le debut de la tache devient le debut de la tache suivante (1ere tache de la tache principale) */
            if (i<array_tasks_display_save.length-1) {
                array_tasks_display_save[i][1]=array_tasks_display_save[i+1][1];
                fin_tache_principale_precedent=array_tasks_display_save[i][1];
            }
            while (j < (array_tasks_display_save.length)){
                if (array_tasks_display_save[j][6]==1) {
                    j=number_tasks_max+1; /* trouvé :  une autre tache principale */
                    if (compteur_fin_tache!=0){
                        array_tasks_display_save[i][2]=compteur_fin_tache-fin_tache_principale_precedent;
                    }else {
                        array_tasks_display_save[i][2]=0;
                    }
                    array_tasks_display_save[i][10]=compteur_duree;
                    compteur_fin_tache=0;
                    compteur_duree=0;
                }
                else {
                    let incrementation=int_increment;
                    if (incrementation<0){incrementation=0}
                    let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[j][1],array_tasks_display_save[j][2],j);
                    valeur_int=Number(array_tasks_display_save[j][1])+Number(resultat_duree_tache)
                    compteur_duree+=array_tasks_display_save[j][2]

                    if (valeur_int>compteur_fin_tache) {
                        compteur_fin_tache=valeur_int;
                    }
                    j++;
                }
            }
            if (j==array_tasks_display_save.length) { /* pas d'autre tache jalon */
                //array_tasks_display_save[i][2]=compteur_fin_tache-fin_tache_principale_precedent;
                array_tasks_display_save[i][2]=compteur_fin_tache-fin_tache_principale_precedent;
                array_tasks_display_save[i][10]=compteur_duree;
                compteur_fin_tache=0;
                compteur_duree=0;
            }
        }
        i++;
    }
}

function calcul_longueur_projet(){
    /* calcul durée total du projet pour parametre affichage (uniquement en fin de function CHECK pour prise en compte des modifications */
    number_day=0;
    for (let i = 0; i < (array_tasks_display_save.length); i++) {
        let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[i][1],array_tasks_display_save[i][2],i);
        let valeur_int=Number(array_tasks_display_save[i][1])+Number(resultat_duree_tache)+Number(array_tasks_display_save[i][3])
        if (valeur_int>number_day) {
            number_day=valeur_int;
        }
    }
}
