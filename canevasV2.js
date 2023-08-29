/* lancement fonction en automatique de façon repetitive */
/* ===================================================== */

 window.onload = function (){
   var intervalle=setInterval(principal,60); /* lancement automatique de la fonction toutes les 60ms */
   }

let brouillon=0;
/* variables globales */
/*=================== */
let browserName="";    /* recherche du nom du browser utilisé */
let page_chargee=false /* verification si page chargee avant analyse soft */
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

/* variables pour creation des taches */
/* --------------------------------- */
let iframe_hidden=Boolean(true) ;
let affiche_datas_effectue=Boolean(false);
let indice=0;
let initialisation_affichage_datas= Boolean(false);
let variable_inc=0;

/* variable pour affichage graph Canvas */
/* ----------------------------------- */
let graphe=0;
let drawing_area=0;
let width_schema=2000;
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
let letter_size = 14;
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

/* variable pour remote Ifame */
let affichage_donnees_effectue=false;
let ask_write_parameters=false;

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
/* --- */
let number_datas_in_array=12;
let number_tasks_max=50;
let change_datas=false;
let array_one_task1 = ["STUDIES/Engineering phase",0 ,1 ,0,0,0,1,0,0,"#4488EE",0,0];
let array_one_task2 = ["mechanical studies"   ,0 ,10 ,0,0,3,0,0,0,"#4488EE",0,0];
let array_one_task3 = ["electrical studies"   ,10,10 ,-3,0,4,0,0,0,"#4488EE",0,0];
let array_one_task4 = ["automation studies"   ,17,6  , 0,0,5,0,0,0,"#4488EE",0,0];
let array_one_task5 = ["informatique studies" ,23,15 ,-4,0,6,0,0,0,"#4488EE",0,0];
let array_one_task6 = ["Studies acceptance"   ,34,1  , 0,1,7,0,0,0,"#4488EE",0,0];
let array_one_task7 = ["part supply"          ,35,10 , 0,0,8,0,0,0,"#4488EE",0,0];
let array_one_task8 = [ "ASSEMBLYING phase"   ,45,1  , 0,0,9 ,1,0,0,"#4488EE",0,0];
let array_one_task9 = ["Assembly / wiring"    ,46,12 , 0,0,10,0,7,0,"#81daf3",0,0];
let array_one_task10 = ["I/O tests & Dry Tests",58,4  , 0,0,11,0,0,0,"#81daf3",0,0];
let array_one_task11 = ["FAT"                 ,62,3  , 0,0,12,0,0,0,"#81daf3",0,0];
let array_one_task12 =["SAT"                  ,65,1  , 0,1,0,0,0,0,"#81daf3",0,0];
let array_one_task13 =["QI"                   ,66,3  , 0,0,0,0,12,0,"#00ff00",0,0];
let array_one_task14 =["QO"                   ,69,2  , 0,0,0,0,12,0,"#00ff00",0,0];
let array_one_task15 =["QP"                   ,71,5  , 0,0,0,0,12,0,"#00ff00",0,0];
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

function recopy_array_2D(){
    array_tasks_display_save=[]
    for (let i = 0; i < array_tasks.length; i++) {
        array_tasks_display_save[i]=[]
        for (let j = 0; j < array_tasks[0].length; j++) {
            array_tasks_display_save[i][j]=array_tasks[i][j];
        }
    }
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
                        if (j==3) {
                            if (array_tasks_display[index][1]>0){
                               array_tasks_display[index][1]-=1;
                            } else {
                                array_tasks_display[index][1]=0;
                                if (array_tasks_display[index][2]>0) {
                                    array_tasks_display[index][2]-=1;
                                }else {
                                    array_tasks_display[index][2]=0;
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

function reafecte_donnees(){
    for (let i = 0; i < (array_tasks.length); i++) {
        let in_indice=i+1;
        affect_donnees_display(in_indice);
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
             var fin_tache_en_cours=Number(array_tasks_display_save[numero_tache_amont][1])+Number(array_tasks_display_save[numero_tache_amont][2])+Number(array_tasks_display_save[numero_tache_amont][3]);
             var debut_tache_suivante=Number(array_tasks_display_save[i][1]);
             var tache_jalon=Number(array_tasks_display_save[i][4]);
             if (tache_jalon!=1) {
                 if (debut_tache_suivante<fin_tache_en_cours){
                    let delta_tache=fin_tache_en_cours-debut_tache_suivante;
                    array_tasks_display_save[i][1]= array_tasks_display_save[i][1]+delta_tache;
                 }
             }
        }
    }
}
function check_datas_downstream(){
    change_datas=false;
    //recopy_array_2D();
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
             var fin_tache_en_cours=Number(array_tasks_display_save[i][1])+Number(array_tasks_display_save[i][2])+Number(array_tasks_display_save[i][3]);
             var debut_tache_suivante=Number(array_tasks_display_save[numero_tache_aval][1]);
             var tache_jalon=Number(array_tasks_display_save[numero_tache_aval][4]);
             if (tache_jalon!=1) {
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
            let fin_tache_en_cours=Number(array_tasks_display_save[i][1])+Number(array_tasks_display_save[i][2])+Number(array_tasks_display_save[i][3]);
            let tache_jalon=Number(array_tasks_display_save[numero_tache_aval][4]);
            let tache_en_defaut=Number(array_tasks_display_save[numero_tache_aval][8]);
            if (debut_tache_suivante<fin_tache_en_cours){
                if (tache_jalon==1){
                    array_tasks[i][8]=1; /* tache en defaut */
                    array_tasks_display_save[i][8]=1;
                } /* else {
                    array_tasks_display[array_tasks_display[i][5]-1][1]=Number(array_tasks_display[i][1])+Number(array_tasks_display[i][2])+Number(array_tasks_display[i][3]);
                    array_tasks[array_tasks_display[i][5]-1][1]=array_tasks_display[array_tasks_display[i][5]-1][1];
                } */
           } else {
                array_tasks[i][8]=0         /* enleve les defauts */
                array_tasks_display_save[i][8]=0;
           }
        }
    }
    /* contrôle les suites de taches en défaut */
    for (let i = (array_tasks.length-1); i > 0; i--) {
        numero_tache_aval=Number(array_tasks_display_save[i][5]-1);
        if (numero_tache_aval>0) {
            tache_en_defaut=array_tasks_display_save[numero_tache_aval][8];
            if (tache_en_defaut==1){
                let debut_tache=Number(array_tasks_display_save[numero_tache_aval][1]);
                let fin_tache_amont=Number(array_tasks_display_save[i][1])+Number(array_tasks_display_save[i][2])+Number(array_tasks_display_save[i][3]);
                if (fin_tache_amont>=debut_tache){
                    array_tasks[i][8]=1; /* tache en defaut */
                    array_tasks_display_save[i][8]=1;
                }
            }
        }
    }
    /* verifie le gap et prise en compte */
    for (let i = 0; i < (array_tasks_display_save.length); i++) {
        if (array_tasks_display_save[i][3]!=0){
            array_tasks_display_save[i][1]=Number(array_tasks_display_save[i][1])+Number(array_tasks_display_save[i][3]);
        }
    }
    /* verifie si tache declarée comme "main task" */
    var compteur_fin_tache=0;
    var debut_tache_principale_precedent=0;
    var fin_tache_principale_precedent=0;
    for (let i = 0; i < (array_tasks_display_save.length); i++) {
        var j=0;
        fin_tache_principale_precedent=array_tasks_display_save[i][1];
        /* verifie si tache principal (annule les liaions filles et additionne le delai total de chaque tache fille */
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
                if (array_tasks_display_save[j][6]==1){
                    j=number_tasks_max+1;
                    /* trouvé :  autre tache principale */
                }
                else {
                    let valeur_int=Number(array_tasks_display_save[j][1])+Number(array_tasks_display_save[j][2])
                    if (valeur_int>compteur_fin_tache) {
                        compteur_fin_tache=valeur_int}
                    j++;
                }
            }
            if (Number(array_tasks_display_save[i][2])==(compteur_fin_tache-fin_tache_principale_precedent))  {
                change_datas=false;
            } else {
                array_tasks_display_save[i][2]=compteur_fin_tache-fin_tache_principale_precedent;
                fin_tache_principale_precedent=compteur_fin_tache;
                change_datas=true;
            }
        }
    }
    /* calcul durée total du projet pour parametre affichage (uniquement en fin de function CHECK pour prise en compte des modifications */
    number_day=0;
    for (let i = 0; i < (array_tasks_display_save.length); i++) {
        let valeur_int=Number(array_tasks_display_save[i][1])+Number(array_tasks_display_save[i][2])+Number(array_tasks_display_save[i][3])
        if (valeur_int>number_day) {
            number_day=valeur_int;
        }
    }
}

function set_tasks(){
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
    /* lecture donnees avec ou sans colonne ou ligne */
    with_rows=0;
    variable1 = document.querySelector('input[id="Choicerows"]:checked');
    if (variable1!=null) {with_rows=1};
    with_columns=0;
    variable1 = document.querySelector('input[id="Choicecol"]:checked');
    if (variable1!=null) {with_columns=1};
}

/* apres lecture paramatre dans DB mise a jour des parametres affichés */
function write_parameters(){
    if (ask_write_parameters){
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
        ask_write_parameters=false;
    }
}
function clear_project(){
    remove_datas_iframe();
    array_tasks=[];
    array_tasks.push([]); /* ajout d'une tache  */
    for (let i = 0; i < (number_datas_in_array); i++) {
        array_tasks[array_tasks.length-1].push(array_task_vide[i]) ;
    }
    recopy_array_2D();
    //demarrage_a_froid=true;
    affiche_datas();
}

/* ======= debut prg principal =======================*/
function principal(){
    /* verifie si toutes les pages ont ete chargées */
    //window.onload = function(e){
    /* init tableau a enlever pas la suite */
    /*=====================================*/
    /* pour demarrage a froid */
    if (first) {
        detecte_browser();
        if (browserName != "Mozilla"){
           CustomAlert("take Browser Mozilla for full use","Choice of Browser")
        }
        init_exemple();
        first=false;
    }  else {
        if (demarrage_a_froid){
            /* let drawing_area = document.getElementById("schema"); */
            drawing_area=document.getElementById('schema');
            if  (drawing_area!=null) {
                graphe = drawing_area.getContext('2d');
                demarrage_a_froid=false;
                affiche_datas_iframe();
                iframe_page2=document.querySelector('iframe')
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
                read_parameters(); /* lecture paramettre d affichage */
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
            document.querySelector('button[id="write_db"]').onclick=write_datas;
            onwrite_datas();
            document.querySelector('button[id="read_db"]').onclick=read_datas;
            onread_datas();
            /* ========================================================= */
            /* si pas de lecture ecriture sur DB alors affichage possible des datas sur Iframe ==== */
             if ((transfert_datas_fini ) && (!deplace_iframe)) {
                lecture_datas(); /* lecture donnees dans l Iframe */
                document.querySelector('button[id="display_datas"]').onclick=affiche_datas_iframe;
                document.querySelector('button[id="essai_task"]').onclick=affiche_donnes_diverses;
                document.querySelector('button[id="newproject"]').onclick=clear_project;
                document.getElementById("page2").contentWindow.document.getElementById("bouton_Iframe").onclick=rajout_one_task;
                document.getElementById("page2").contentWindow.document.getElementById("SET_start_tasks").onclick=set_tasks;
                /* lecture BP dans Iframe */
                lecture_bp_insert();
                lecture_bp_delete();
                lecture_bp_radio_task_principale();
                lecture_bp_radio_milstone();
                lecture_bp_color();
                /* lecture souris */
                listen_mouse_on_canvas(graphe,drawing_area);
                listen_mouse_on_page2();
            }
        }
    }
}
