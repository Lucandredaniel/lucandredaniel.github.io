/* lancement fonction en automatique de façon repetitive */
/* ===================================================== */

 window.onload = function (){
   var intervalle=setInterval(principal,30); /* lancement automatique de la fonction toutes les 30ms */
   }

let brouillon=0;
/* variables globales */
/*=================== */
let browserName="";    /* recherche du nom du browser utilisé */
let page_chargee=false /* verification si page chargee avant analyse soft */
/* variable global pour lecture / ecriture fichier avec PHP */
let reponse_php="rien";
let reponse_type="-";
let reponse_status="-";
let tableau_en_forme="";
let ensemble_tableau="";
let progression=0;
let message_erreur="";
/* variable global pour ecriture fichier avec PHP */
let echange_datas_ecriture=false;
let etape_write_php=0;
/* variable global pour lecture fichier avec PHP */
let echange_datas_lecture=false;
let etape_read_php=0;
/* variables pour DB */
/* ----------------- */
let base_donnees_complete=[];
let longeur_db=60;
let db="";
let openrequest=0;
let index=0;
let index_inside_db=0;
let transaction=0;
let objectStore=0;
let request=0;
let reqdelete=0;
let index_db=0;
let etape_write=0;
let compt_pass=0;
let compteur_ligne_db=0;
let compteur_colonne_db=0;
let name_db="";
let save_donnees_base = false;
let onload_donnees_base =false;
let delete_db=false;
let delete_db_fini=false;
let transfert_datas_fini=true;
let time_milliseconds=100000; /* temps d attente avant exécution fonction */
let maxprogress = 250;   // total à atteindre pour barre graph
let actualprogress = 0;  // valeur courante pour barre graph
let multiplicateur = 10; // pour affichage

/* variable pour lecture fichier XML */
/* --------------------------------- */
let onload_file_xml=false;
let etape_read_xml=0;
let nom_fichier_xml="fichier1.xml";
let xhttp =""; /* objet pour appel fonction ajax */
let tableau_donnees_xml=[]; /* pour sauvegarde des donnees */
let fin_chargement_xml=false;

/* variables pour affichage page 2 IFRAME */
/* ------------------------------------- */
let page2_top=0;
let page2_left=0;
let page2_width=0;
let page2_height=0;
let deplacement_page2=false;
let axeX=0;
let axeY=0;
let memo_axeX=0;
let memo_axeY=0;
let passe_move=false;
let texte1="";
let texte2="";
let element_a_clicker  = 0;
let element_a_deplacer = 0;
let element_a_ecouter  = 0;
let elmnt= 0;
let element_a_bouger   = 0;
let remove_listener=0;
let deplace_iframe=false;
let memo_mouse_x=0;
let memo_mouse_y=0;
/* variable pour remote Ifame */
let affichage_donnees_effectue=false;
let ask_write_parameters=false;
/* variables pour creation des taches */
let iframe_hidden=Boolean(true) ;
let affiche_datas_effectue=Boolean(false);
let indice=0;
let initialisation_affichage_datas= Boolean(false);
let variable_inc=0;
/* pour affichage d'une seule tache */
let numero_de_la_tache_a_afficher=2;
let calcul_numero_de_la_tache_a_afficher=0;
let affiche_une_seule_tache=false;

/* variable pour affichage graph Canvas */
/* ----------------------------------- */
let graphe=0;
let drawing_area=0;
let width_schema=600;
let height_schema=1000;
let start_column=150;  /* debut pour le graphe */
let start_line=50
let number_day = 730; /* planning sur maximum 2 ans */
let space_column=20;
let space_between_line = 25;
let now     = new Date();
let start_project = new Date();
let save_start_project= new Date();
let texte_save_date="2023-07-14";
let with_rows =0;
let with_columns =0;
let letter_size = 14; /* taille lettre du nom des taches */
let letter_size_month = 14; /* taille lettre du mois et de l'année */
let letter_size_semaine = 11; /* taille lettre de la semaine */
let letter_size_jour = 9; /* taille lettre de la semaine */
let increment_pour_size_letter=0.2;
let incp_letter_size=0;
let incm_letter_size=0;
let passage="none";
let colonne_du_jour=0;
let affichage_axes=false;
let mouse_x=0;
let mouse_y=0;
let largeur_graph=0;
let changement_affichage_en_cours_graph=false;
let increment_top_canvas=0;
let increment_left_canvas=0;
let memo_increment_left=0;
let memo_mouse_canvas_x=0;
let int_increment=0;
let memo_mouse_canvas_y=0;
let deplace_canvas=false;
let delta=0; /* zoom avec molette mouse */
let double_click=false; /* gestion click souris */
let scroll_bloquer=false; /* bloquage de du scroll de la molette */
let pos_scroll_y=0; /* position du scroll monte et baisse */
let pos_scroll_x=0; /* position du scroll droite gauche */
let affichage_weekend=false;
let colorise_semaine=false;
let couleur_weekend="gray";
let couleur_fond_semaine="FAEAA9" //"#dbb20d";
let nombre_jour_travaille=7;

/* liste des taches et variables associées */
let first=true;                     /* init au demarrage a froid */
let demarrage_a_froid =true;
/* variables dans array */
let name_task ="nom_tache";         /* 0 definition de la tache */
let start_task=10;                  /* 1 date depart de la tache */
let delay_task=20;                  /* 2 duree de la tache */
let gap_with_upstream_task=4;       /* 3 GAP decalage de la tache par rapport a la tache precedente */
let milestone = 0;                  /* 4 jalon */
let downstream_task=0;              /* 5 tache aval */
let principal_task = 1 ;            /* 6 tache principal ou pas */
let upstream_task=0;                /* 7 tache amont */
let default_task=0;                 /* 8 tache en defaut */
let couleur_task="#4488EE";         /* 9 couleur de la tache */
let dure_tache_principale=0         /*10 duree de la tache principale calculee pour affichage */
let data_spare=0                    /*11 data en spare */
/* --- */
let number_datas_in_array=12;
let number_tasks_max=50;
let change_datas=false;
let array_one_task1 = ["STUDIES/Engineering phase",0 ,1 ,0,0,0,1,0,0,"#4488EE",0,0];
let array_one_task2 = ["mechanical studies"   ,0 ,9 ,0,0,3,0,0,0,"#4488EE",0,0];
let array_one_task3 = ["electrical studies"   ,13,10 ,-3,0,4,0,0,0,"#4488EE",0,0];
let array_one_task4 = ["automation studies"   ,24,6  , 0,0,5,0,0,0,"#4488EE",0,0];
let array_one_task5 = ["informatique studies" ,33,15 ,-4,0,6,0,0,0,"#4488EE",0,0];
let array_one_task6 = ["Studies acceptance"   ,50,1  , 0,1,7,0,0,0,"#4488EE",0,0];
let array_one_task7 = ["part supply"          ,53,10 , 0,0,8,0,0,0,"#4488EE",0,0];
let array_one_task8 = [ "ASSEMBLYING phase"   ,68,0  , 0,0,9 ,1,0,0,"#4488EE",0,0];
let array_one_task9 = ["Assembly / wiring"    ,68,12 , 0,0,10,0,7,0,"#81daf3",0,0];
let array_one_task10 = ["I/O tests/Dry Tests",84,4  , 0,0,11,0,0,0,"#81daf3",0,0];
let array_one_task11 = ["FAT"                 ,90,3  , 0,0,12,0,0,0,"#81daf3",0,0];
let array_one_task12 =["SAT"                  ,95,1  , 0,1,0,0,0,0,"#81daf3",0,0];
let array_one_task13 =["QI"                   ,96,3  , 0,0,0,0,12,0,"#00ff00",0,0];
let array_one_task14 =["QO"                   ,96,2  , 0,0,0,0,12,0,"#00ff00",0,0];
let array_one_task15 =["QP"                   ,96,5  , 0,0,0,0,12,0,"#00ff00",0,0];
let array_task_vide = ["--------",0 ,1,0,0,0,0,0,0,"#4488EE",0,0];

let array_parametre_environnement1=["","","","","","","","","","","",""];
let array_parametre_environnement2=["","","","","","","","","","","",""];
let array_tasks =[];
let array_tasks_2 =[];
let array_tasks_lecture_datas=[]; /* pour lecture de la DB */
let array_tasks_display=[]; /* datas only for to be displayed on diagram*/
let array_tasks_display_save=[]; /* pour sauvegarde de l'affichage */

let etape=0;
let etape_a_froid=0;
let langue=1; /* choix de la langue de départ */
let reponse_boite=false; /* retour de la boite de dialogue oui ou non */

/* variables pour lecture fichier Txt ou CSV */
let brouillon_file=[];
    brouillon_file.push([]);
let brouillon_file1=[];
    brouillon_file1.push([]);
let charge_fichier_en_cours=false;
let charge_fichier_txt_fini=false;
let reader  = new FileReader();
let file_name_csv=[];
let load_fichier_en_cours=false;
let laod_fichier_txt_fini=false;

function recopy_array_2D(){
    array_tasks_display_save=[];
    //alert(array_tasks)
    for (let i = 0; i < array_tasks.length; i++) {
        array_tasks_display_save[i]=[]
        for (let j = 0; j < array_tasks[0].length; j++) {
            array_tasks_display_save[i][j]=array_tasks[i][j];
        }
    }
}

function verifie_si_jour_travaille(index){
    let jour_travaille=true;
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
    return jour_travaille;
}

function recopy_array_for_display(){
    if (changement_affichage_en_cours_graph) {alert("chg")}
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
        if (array_tasks_display_save[i][7]>array_tasks_display_save.length) {
            array_tasks_display_save[i][7]=0;
            array_tasks[i][7]=0;
        }
        if (array_tasks_display_save[i][7]==i+1) {
            array_tasks_display_save[i][7]=0;
            array_tasks[i][7]=0;
        }
    }
    /* déplacer les taches liées */
    for (let i = 0; i < (array_tasks.length); i++) {
        if (array_tasks_display_save[i][7]!=0){ /* vérifie si tache amont déclarée */
            /* vérifie si tache pas > au nombre de tache declaré */
             let numero_tache_amont=Number(array_tasks_display_save[i][7]-1);
             let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[numero_tache_amont][1],array_tasks_display_save[numero_tache_amont][2],numero_tache_amont);
             var fin_tache_en_cours=Number(array_tasks_display_save[numero_tache_amont][1])+Number(resultat_duree_tache)+Number(array_tasks_display_save[numero_tache_amont][3]);
             var debut_tache_suivante=Number(array_tasks_display_save[i][1]);
             var tache_jalon=Number(array_tasks_display_save[i][4]);
             if (tache_jalon!=1) {
                 if (debut_tache_suivante<fin_tache_en_cours){
                    // let delta_tache=fin_tache_en_cours-debut_tache_suivante;
                    let delta_tache=fin_tache_en_cours
                    //array_tasks_display_save[i][1]= array_tasks_display_save[i][1]+delta_tache;
                    array_tasks_display_save[i][1]= delta_tache;
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
        /* verifie le parametre couleur */
        if (array_tasks_display_save[i][9]==0){
            array_tasks_display_save[i][9]="#4488EE"; // nuance de bleu
        }
    }
    /* contrôle des parametres et les incidences entre eux */
    /* sur donnees principale "array_tasks" et sur donnees d affichage "array_tasks_display" */
    /* déplacer les taches liées */
    for (let i = 0; i < (array_tasks.length); i++) {
        if (array_tasks_display_save[i][5]!=0){ /* vérifie si tache aval déclarée */
            /* vérifie si tache pas > au nombre de tache declaré */
            let numero_tache_aval=Number(array_tasks_display_save[i][5]-1);
            let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[i][1],array_tasks_display_save[i][2],i);
             var fin_tache_en_cours=Number(array_tasks_display_save[i][1])+Number(resultat_duree_tache)+Number(array_tasks_display_save[i][3]);
             var debut_tache_suivante=Number(array_tasks_display_save[numero_tache_aval][1]);
             var tache_jalon=Number(array_tasks_display_save[numero_tache_aval][4]);
             if (tache_jalon!=1) {
                 if (!verifie_si_jour_travaille(debut_tache_suivante-1)){
                     debut_tache_suivante+=1;
                 }
                 if (debut_tache_suivante<fin_tache_en_cours){
                    let delta_tache=fin_tache_en_cours-debut_tache_suivante;
                    array_tasks_display_save[numero_tache_aval][1]= array_tasks_display_save[numero_tache_aval][1]+delta_tache;
                 }
             }
        }
    }
    /* mise en erreur des taches si dépassement dune tache par rapport a la tache suivant si elles sont liées */
    /* et que la tache suivante est un jalon */
     for (let i = 0; i < (array_tasks.length); i++) {
        if (array_tasks_display_save[i][5]!=0){ /* vérifie si tache aval déclarée */
            let numero_tache_aval=Number(array_tasks_display_save[i][5]-1);
            let debut_tache_suivante=Number(array_tasks_display_save[numero_tache_aval][1]);
            let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[i][1],array_tasks_display_save[i][2],i);
            let fin_tache_en_cours=Number(array_tasks_display_save[i][1])+Number(resultat_duree_tache)+Number(array_tasks_display_save[i][3]);
            let tache_jalon=Number(array_tasks_display_save[numero_tache_aval][4]);
            let tache_en_defaut=Number(array_tasks_display_save[numero_tache_aval][8]);
            if (debut_tache_suivante<fin_tache_en_cours){
                if (tache_jalon==1){
                    array_tasks[i][8]=1; /* tache en defaut */
                    array_tasks_display_save[i][8]=1;
                }
           } else {
                array_tasks[i][8]=0         /* enleve les defauts */
                array_tasks_display_save[i][8]=0;
           }
        }
    }
    /* contrôle les suites de taches en défaut */
    for (let i = (array_tasks.length-1); i > 0; i--) {
        if (array_tasks_display_save[i][5]>0){
            numero_tache_aval=Number(array_tasks_display_save[i][5]-1);
            tache_en_defaut=array_tasks_display_save[numero_tache_aval][8];
            if (tache_en_defaut==1){
                let debut_tache=Number(array_tasks_display_save[numero_tache_aval][1]);
                let resultat_duree_tache=calcul_duree_tache(array_tasks_display_save[i][1],array_tasks_display_save[i][2],i);
                let fin_tache_amont=Number(array_tasks_display_save[i][1])+Number(resultat_duree_tache)+Number(array_tasks_display_save[i][3]);
                if (fin_tache_amont>=debut_tache){
                    array_tasks[i][8]=1; /* tache en defaut */
                    array_tasks_display_save[i][8]=1;
                }
            }
        }else {
            array_tasks[i][8]=0; /* tache non en defaut */
        }
    }
    /* verifie le gap et prise en compte */
    for (let i = 0; i < (array_tasks_display_save.length); i++) {
        if (array_tasks_display_save[i][3]!=0){
            array_tasks_display_save[i][1]=Number(array_tasks_display_save[i][1])+Number(array_tasks_display_save[i][3]);
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

function set_tasks(){
    if (!affiche_une_seule_tache){
        /* demande affichage parametre au complet */
        iframe_hidden=true;
        affiche_datas_iframe();
        if (changement_affichage_en_cours_graph){
            changement_affichage_en_cours_graph =false;
            recopy_array_2D()
        }
        for (let i = 0; i < (array_tasks.length); i++) {
            array_tasks[i][1]= array_tasks_display_save[i][1]-array_tasks_display_save[i][3];
            if (array_tasks_display_save[i][6]==1){
                array_tasks[i][2]=0;
            }
        }
        reafecte_donnees();
    }else{
        set_one_tasks(numero_de_la_tache_a_afficher-1)
    }
}
function set_one_tasks(indice){
    /* recalcul uniquement le depart de la tache demandée */
        array_tasks[indice][1]= array_tasks_display_save[indice][1]-array_tasks_display_save[indice][3];
        if (array_tasks_display_save[indice][6]==1){
            array_tasks[indice][2]=0;
        }
    reafecte_one_donnees(indice);
}

/* lecture des parametres affichés */
function read_parameters(){
	space_column=Number(document.getElementById("g_columns").value);
    start_column=Number(document.getElementById("w_task").value);
    space_between_line=Number(document.getElementById("g_rows").value);
    letter_size=Number(document.getElementById("l_size").value);
    /* mise à jour date de depart projet */
    variable1=document.getElementById("start_date_project");
    start_project= new Date(variable1.value);
    if (start_project=="Invalid Date"){
        start_project=new Date()
    }
    let annee=start_project.getFullYear();
    let mois =start_project.getMonth()+1;
    let jour =start_project.getDate();
    texte_save_date = String(annee)+"-"+String(mois)+"-"+String(jour);
    /* lecture parametres avec ou sans colonne ou ligne */
    with_rows=0;
    variable1 = document.querySelector('input[id="Choicerows"]:checked');
    if (variable1!=null) {with_rows=1};
    with_columns=0;
    variable1 = document.querySelector('input[id="Choicecol"]:checked');
    if (variable1!=null) {with_columns=1};
    /* lecture parametres avec ou sans affichage semaine et weekend */
    colorise_semaine=false;
    variable1 = document.querySelector('input[id="tracesemaine"]:checked');
    if (variable1!=null) {colorise_semaine=true};
    affichage_weekend=false;
    variable1 = document.querySelector('input[id="traceweekend"]:checked');
    if (variable1!=null) {affichage_weekend=true};
    let nbr_jour=document.getElementById("nbr_jour_w").value;
    if (nbr_jour!=nombre_jour_travaille){
        memo_increment_left=0; /* réinitialise l'affichage */
        increment_left_canvas=0;
        increment_top_canvas=0;
        nombre_jour_travaille=nbr_jour;
    }
}

/* apres lecture paramatre dans DB mise a jour des parametres affichés */
function write_parameters(){
    if (ask_write_parameters){
        let int_langue=Number(array_parametre_environnement2[2]);
        if (int_langue!=1 && int_langue!=2){
            langue=1;
            int_langue=0;
        }
        if (int_langue!=langue){
            langue=int_langue;
            affiche_datas();
            affichage_langue()
            changement_langue_iframe();
        }
        width_schema=String(array_parametre_environnement1[2]);
        height_schema=String(array_parametre_environnement1[3]);
        document.getElementById("g_columns").value=Number(array_parametre_environnement1[6]);
        document.getElementById("w_task").value=Number(array_parametre_environnement1[4]);
        document.getElementById("g_rows").value=Number(array_parametre_environnement1[7]);
        document.getElementById("l_size").value=Number(array_parametre_environnement1[11]);
        let date_db=array_parametre_environnement1[8];
        let essai=new Date(date_db)
        document.getElementById("start_date_project").valueAsDate=essai;
        /* lecture donnees avec ou sans colonne ou ligne */
        variable1 = document.getElementById("Choicerows")
        if (array_parametre_environnement1[9]==1) {
            variable1.checked = true;
        } else {
            variable1.checked = false;
        }
        variable1 = document.getElementById("Choicecol");
        if (array_parametre_environnement1[10]==1) {
            variable1.checked = true;
        } else {
            variable1.checked = false;
        }
        variable1 = document.getElementById("traceweekend");
        variable1.checked = true;
        if (array_parametre_environnement2[3]=="false") {
            variable1.checked = false;
        }
        variable1 = document.getElementById("tracesemaine");
        variable1.checked = true;
        if (array_parametre_environnement2[4]=="false") {
            variable1.checked = false;
        }
        variable1 = document.getElementById("colorweekend");
        let string_color=String(array_parametre_environnement2[5]);
        if (array_parametre_environnement2[5]!="para"){
            variable1.value=string_color;
        }
        variable1 = document.getElementById("colorsemaine");
        string_color=String(array_parametre_environnement2[6]);
        if (array_parametre_environnement2[6]!="para"){
            variable1.value=string_color;
        }
        if  ((array_parametre_environnement2[7]>4)&&(array_parametre_environnement2[7]<8)){
            document.getElementById("nbr_jour_w").value=Number(array_parametre_environnement2[7]);
        }else{
            document.getElementById("nbr_jour_w").value=7;
        }
        ask_write_parameters=false;
    }
}
function clear_project(){
    let titre="";
    let message_avert="";
    if (langue==1){
        titre="New Project";
        message_avert="Action witch reset all datas";
    } else {
        titre="Nouveau Projet";
        message_avert="Action qui réinitialise toutes les données";
    }
    reponse_boite=false;
    CustomConfirm(message_avert,titre);
}

function valid_clear_project() {
    document.getElementById('dialogbox').style.display = "none";
    increment_top_canvas=0;
    increment_left_canvas=0;
    numero_de_la_tache_a_afficher=0;
    letter_size = 14; /* taille lettre du nom des taches */
    letter_size_month = 14; /* taille lettre du mois et de l'année */
    letter_size_semaine = 11; /* taille lettre de la semaine */
    letter_size_jour = 9; /* taille lettre de la semaine */
    document.getElementById("l_size").value=String(letter_size);
    remove_datas_iframe();
    array_tasks=[];
    array_tasks.push([]); /* ajout d'une tache  */
    for (let i = 0; i < (number_datas_in_array); i++) {
        array_tasks[array_tasks.length-1].push(array_task_vide[i]) ;
    }
    number_day=3; // nombre de jour
    affiche_une_seule_tache=true;
    numero_de_la_tache_a_afficher=1;
    recopy_array_2D();
    affiche_une_tache_specifique(numero_de_la_tache_a_afficher)
    //affiche_datas();
}
/* =============couleur des taches  ==================== */
function lecture_bp_color_days(){
    couleur_weekend =String(document.getElementById("colorweekend").value);
    couleur_fond_semaine =String(document.getElementById("colorsemaine").value);
}

/* ======= debut prg principal =======================*/
function principal(){
    /* init tableau a enlever pas la suite */
    /*=====================================*/
    /* pour demarrage a froid */
    if (first) {
        detecte_browser();
        if (browserName != "Mozilla"){
           //CustomAlert("take Browser Mozilla for full use","Choice of Browser")
        }
        init_exemple();
        init_langue();
        first=false;
    }  else {
        if (demarrage_a_froid){
            /* let drawing_area = document.getElementById("schema"); */
            drawing_area=document.getElementById('schema');
            if  (drawing_area!=null) {
                graphe = drawing_area.getContext('2d');
                demarrage_a_froid=false;
                affiche_datas_iframe();
                let iframe_page2=document.getElementById("entete_iframe");
                page2_left = iframe_page2.offsetLeft;
                page2_top  = iframe_page2.offsetTop;
                page2_width = iframe_page2.offsetWidth;
                page2_height = iframe_page2.offsetHeight;
            }
        }
        if (!demarrage_a_froid) {
            /* apres demarrage à froid */
            /* ======== affichage du diagram canvas =============== */
            if (transfert_datas_fini) {
                writing_date_today(); /* en premier avant lecture parameters */
                read_parameters(); /* lecture parametres d affichage */
                write_parameters();
            }
            if (!onload_donnees_base) {
                recopy_array_for_display();
                dimension_schema(graphe,drawing_area);
                if (with_rows==1) {horizontal_lines(graphe,drawing_area);}
                if (with_columns==1) {vertical_lines(graphe,drawing_area);}
                writing_times (graphe,drawing_area,"d");
                draw_task (graphe,drawing_area);
                draw_liaison_task_down(graphe,drawing_area);
                draw_liaison_task_up(graphe,drawing_area);
                draw_axes(graphe,drawing_area);
                axe_du_jour(graphe,drawing_area);
            }
            /* ======== gestion des DB read and write =================== */
            document.getElementById("text34").addEventListener("click",write_datas);
            onwrite_datas();
            document.getElementById("text35").addEventListener("click",read_datas_1);
            onread_datas();
            /* ======== gestion lecture ecriture fichiers de sauvegarde=== */
            //document.getElementById("Sauvefichier").onclick=appel_ajax_ecriture_fichier;
            //document.getElementById("lecturefichier").onclick=appel_ajax_lecture_fichier;
            document.getElementById("text31").addEventListener("click",AAEfichier);
            document.getElementById("text32").addEventListener("click",AALfichier);
            php_ecriture();
            php_lecture();
            /* ========================================================= */
            /* si pas de lecture ecriture sur DB alors affichage possible des datas sur Iframe ==== */
             if ((transfert_datas_fini ) && (!deplace_iframe)) {
                /* lecture des BP */
                document.getElementById("text41").addEventListener("click",read_xml);
                document.getElementById("text42").addEventListener("click",affiche_donnes_diverses);
                document.querySelector('button[id="newproject"]').onclick=clear_project;
                document.querySelector('button[id="display_datas"]').onclick=affiche_datas_iframe;
                document.getElementById("drapeau_F").onclick=langue_Francaise;
                document.getElementById("drapeau_A").onclick=langue_Anglaise;
                /* provisoire rend les BP invisibles */
                inhibe_identity();
                document.getElementById("page2").contentWindow.document.getElementById("bouton_Iframe").onclick=rajout_one_task;
                document.getElementById("page2").contentWindow.document.getElementById("SET_start_tasks").onclick=set_tasks;
                lecture_bp_color_days()
                /* lecture BP dans Iframe */
                /* ---------------------- */
                if (!affiche_une_seule_tache){
                    lecture_datas(0); /* lecture donnees dans l Iframe */
                    lecture_bp_insert(0);
                    lecture_bp_delete(0);
                    lecture_bp_radio_task_principale(0);
                    lecture_bp_radio_milstone(0);
                    lecture_bp_color(0);
                } else {
                    lecture_datas(numero_de_la_tache_a_afficher);
                    lecture_bp_insert(numero_de_la_tache_a_afficher);
                    lecture_bp_delete(numero_de_la_tache_a_afficher);
                    lecture_bp_radio_task_principale(numero_de_la_tache_a_afficher);
                    lecture_bp_radio_milstone(numero_de_la_tache_a_afficher);
                    lecture_bp_color(numero_de_la_tache_a_afficher)
                }
                /* lecture souris */
                listen_mouse_on_canvas(graphe,drawing_area);
                listen_mouse_on_page1();
                lecture_fichier_text();
                onread_datas_xml();
            }
        }
    }
}
