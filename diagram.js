/* gestion de l affichage du diagramme dans canvas*/
/* ============================================== */

function init_donnees_affichage_canvas(){
    increment_top_canvas=0;
    increment_left_canvas=0;
    memo_increment_left=0;
    memo_mouse_canvas_x=0;
    int_increment=0;
    memo_mouse_canvas_y=0;
    deplace_canvas=false;
    memo_increment_left=0;
}

function writing_date_today(){
    let Day_now_L=new Date();
    document.getElementById("date_jour").value=Day_now_L.toLocaleDateString()
}

function axe_du_jour(graphe,drawing_area) { /* axe du jour actuel */
	graphe.beginPath();
	graphe.lineWidth="1";
	graphe.strokeStyle="red";
    graphe.setLineDash([5, 2]); /* ligne discontinu */
	graphe.moveTo(colonne_du_jour,drawing_area.height);
	graphe.lineTo(colonne_du_jour,start_line-20);
	graphe.stroke();
}
function dimension_schema(graphe,drawing_area) { /* axe du jour actuel */
 	/* calcul hauteur du scheme */
 	let nombre_de_ligne=array_tasks_display.length
 	let hauteur=start_line+((nombre_de_ligne+1)*space_between_line)
 	height_schema=hauteur;
 	drawing_area.style.height=String(hauteur)+'px';
 	drawing_area.style.width=String(largeur_graph)+'px';
 	drawing_area.height=(hauteur);
 	drawing_area.width=(largeur_graph);
}
function vertical_lines(graphe,drawing_area){
    var inc_colonne=(start_column-4);
    /* zone du dessin */
    graphe.beginPath();
    for (let i = 1; i < number_day+3; i++) {
        graphe.beginPath();
 	    graphe.globalAlpha = 0.6;
        graphe.setLineDash([5, 2]); /* ligne discontinu */
        graphe.moveTo(inc_colonne,start_line-20); /* point de part */
        graphe.lineTo(inc_colonne,height_schema); /* ligne point final*/
        graphe.strokeStyle= '#4488EE'; //Nuance de bleu
        graphe.lineWidth= 1;
        graphe.stroke(); /* affiche la ligne */
        inc_colonne=start_column+(i*space_column)-4;
    }
}

function horizontal_lines(graphe,drawing_area){
    const number_line = (drawing_area.height/20);
    var inc_line=space_between_line;
    /* zone du dessin */
    let width_schema_line = ((number_day+1)*space_column)+start_column
    graphe.beginPath();
    for (let i = 1; i < number_line; i++) {
        inc_line=start_line+(i*space_between_line);
        graphe.beginPath();
 	    graphe.globalAlpha = 0.6;
        graphe.setLineDash([5, 2]); /* ligne discontinu */
        graphe.moveTo(start_column, inc_line); /* point de part */
        graphe.lineTo(width_schema_line, inc_line); /* ligne point final*/
        graphe.strokeStyle= '#4488EE'; //Nuance de bleu
        graphe.lineWidth= 1;
        graphe.stroke(); /* affiche la ligne */
    }
}

function wrinting_text(graphe,drawing_area,texte){
    graphe.font = '48px serif';
    graphe.fillText(texte, 10, 50);
    graphe.strokeText(texte, 10, 100);
}

function display_arrow(graphe,drawing_area,end_column_task,inc_line_task){
    graphe.strokeStyle="red";
    graphe.beginPath();
    graphe.lineCap='square';
    graphe.moveTo(end_column_task-space_column, inc_line_task); /* point de depart */
    graphe.lineTo(end_column_task, inc_line_task); /* ligne point final*/
    graphe.stroke(); /* affiche la ligne */
}

function draw_task (graphe,drawing_area){
    var start_column_task=20;
    var inc_line_task=space_between_line
    var deb_column_task=0
    /* titre du projet */
    /* --------------- */
    graphe.fillStyle = "darkgreen";
    graphe.globalAlpha = 0.8;
    graphe.fillRect(0, 0,start_column, 50)
    name_db=document.getElementById("file_name_db").value;
    if (name_db!="") {
        graphe.beginPath();
        graphe.globalAlpha = 1;
        graphe.fillStyle = "orange";
        size_font='bold '+String(letter_size+2)+'px serif'
        graphe.font = size_font;
        texte=name_db;
        graphe.fillText(texte,20, 30);
    }
    for (let i = 0; i < (array_tasks_display.length); i++) {
        inc_line_task=start_line+((i+1)*space_between_line)
        graphe.beginPath();
        graphe.globalAlpha = 1;
        graphe.fillStyle = "black";
        size_font='bold '+String(letter_size)+'px serif'
        graphe.font = size_font;
        /* affiche le numero de la tache et le texte */
        let inc_numero_tache=array_tasks.length-array_tasks_display.length
        texte="T"+String(i+inc_numero_tache+1)+": "
        texte=texte+array_tasks_display[i][0];
        graphe.fillText(texte,start_column_task, inc_line_task);
        /* trace longueur de la tache */
        deb_column_task = (array_tasks_display[i][1]*space_column)+start_column
        end_column_task=deb_column_task+(array_tasks_display[i][2]*space_column)
        graphe.beginPath();
        graphe.lineCap='square';
        graphe.moveTo(deb_column_task, inc_line_task); /* point de depart */
        graphe.lineTo(end_column_task, inc_line_task); /* ligne point final*/
        if (array_tasks_display[i][6]==1) { /* verifie si "main task" */
            graphe.strokeStyle= '#000000'; // noir
            graphe.lineWidth= 8;
        }
        else{
            if (array_tasks_display[i][8]==1) { /* verifie si tache en défaut mettre couleur flashy */
                graphe.strokeStyle= "red";
                graphe.lineWidth= 9;
            } else {
                graphe.strokeStyle= array_tasks_display[i][9];
                graphe.lineWidth= 5;
            }
        }
        graphe.stroke(); /* affiche la ligne */
        if (array_tasks_display[i][4]==1){ /* verifie si jalon milestone */
            display_arrow(graphe,drawing_area,end_column_task,inc_line_task)
        }
        /* affichage durée de la tache */
        size_font='bold '+String(letter_size-2)+'px serif'
        graphe.font = size_font;
        let longueur_tache=end_column_task-deb_column_task;
        texte=String(array_tasks_display[i][2]);
        let position_texte=deb_column_task+longueur_tache/2.5;
        graphe.fillText(texte,position_texte, inc_line_task-5);
    }
}
/* ---- */
function draw_liaison_task_down(graphe,drawing_area){
    var start_column_task=20;
    var interval=0;
    var inc_line_task=space_between_line;
    var deb_column_task=0;
    for (let i = 0; i < (array_tasks_display.length); i++) {
        graphe.beginPath();
        graphe.globalAlpha = 1;
         /* trace liaison entre tache si tache suivante declarée */
        if (array_tasks_display[i][5]!=0){
            if (array_tasks_display[i][5]<array_tasks_display.length+1){
            /* verifie si la tache existe et donc inferieure a la longueur de la liste */
                downstream_task=array_tasks_display[i][5]-1;
                deb_column_task_1 = (array_tasks_display[i][1]*space_column);
                end_column_task_1= deb_column_task_1+(array_tasks_display[i][2]*space_column);
                deb_column_task_2 = (array_tasks_display[downstream_task][1]*space_column);
                pos_line_task_1=start_line+((i+1)*space_between_line);
                pos_line_task_2=start_line+((downstream_task+1)*space_between_line);
                graphe.beginPath();
                graphe.lineCap='square';
                if (end_column_task_1==deb_column_task_2){
                    if (downstream_task>i){
                        graphe.moveTo(end_column_task_1+start_column, pos_line_task_1); /* trace --> */
                        graphe.lineTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1);
                        graphe.moveTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1); /* trace | */
                        graphe.lineTo(end_column_task_1+start_column+(space_column/4), pos_line_task_2-(space_between_line/2));
                        graphe.moveTo(end_column_task_1+start_column+(space_column/4), pos_line_task_2-(space_between_line/2)); /* trace <-- */
                        graphe.lineTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2-(space_between_line/2));
                        graphe.moveTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2-(space_between_line/2)); /* trace | */
                        graphe.lineTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2);
                        graphe.moveTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2); /* trace --> */
                        graphe.lineTo(deb_column_task_2+start_column, pos_line_task_2);
                    } else {
                        graphe.moveTo(end_column_task_1+start_column, pos_line_task_1); /* trace --> */
                        graphe.lineTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1);
                        graphe.moveTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1); /* trace | */
                        graphe.lineTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1-(space_between_line/2));
                        graphe.moveTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1-(space_between_line/2)); /* trace <-- */
                        graphe.lineTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_1-(space_between_line/2));
                        graphe.moveTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_1-(space_between_line/2)); /* trace | */
                        graphe.lineTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2);
                        graphe.moveTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2); /* trace --> */
                        graphe.lineTo(deb_column_task_2+start_column, pos_line_task_2);
                    }
                }
                else {
                    if (deb_column_task_2 > end_column_task_1){
                        /* si decalage des taches, decomposition des liaisons */
                        interval= deb_column_task_2 - end_column_task_1;
                        inter_col_deb=end_column_task_1;
                        inter_col_fin=end_column_task_1+interval-space_column;
                        graphe.moveTo(inter_col_deb+start_column, pos_line_task_1); /* ligne de depart */
                        graphe.lineTo(inter_col_fin+start_column, pos_line_task_1);
                        graphe.moveTo(inter_col_fin+start_column, pos_line_task_2); /* ligne d arrivee */
                        graphe.lineTo(deb_column_task_2+start_column, pos_line_task_2);
                        graphe.moveTo(inter_col_fin+start_column, pos_line_task_1); /* ligne d arrivee */
                        graphe.lineTo(inter_col_fin+start_column, pos_line_task_2);
                    }
                    else {
                        interval= deb_column_task_2 - end_column_task_1;
                        interval_lin=pos_line_task_2-pos_line_task_1
                        inter_lin_deb=pos_line_task_1;
                        //inter_lin_fin=pos_line_task_1+(interval_lin/2);
                        inter_lin_fin=pos_line_task_1+interval_lin-(space_between_line/2)
                        graphe.moveTo(end_column_task_1+start_column, inter_lin_deb); /* ligne de depart */
                        graphe.lineTo(end_column_task_1+start_column, inter_lin_fin);
                        graphe.moveTo(deb_column_task_2+start_column, inter_lin_fin); /* ligne d arrivee */
                        graphe.lineTo(deb_column_task_2+start_column, pos_line_task_2);
                        graphe.moveTo(end_column_task_1+start_column, inter_lin_fin); /* ligne d arrivee */
                        graphe.lineTo(deb_column_task_2+start_column, inter_lin_fin);
                    }
                }
                graphe.strokeStyle= '#FF0000'; //Nuance de rouge
                graphe.lineWidth= 1;
                graphe.stroke(); /* affiche la ligne */
            }
        }
        /* verifie si tache principale . Si oui alors liaison avec la tache downstream (plus basse) */
        if (array_tasks_display[i][6]==1){
            if (i+1<array_tasks_display.length){ /* verifie si la tache existe et donc inferieure a la longueur de la liste */
                downstream_task=i+1;
                deb_column_task_1 = (array_tasks_display[i][1]*space_column);
                deb_column_task_2 = (array_tasks_display[downstream_task][1]*space_column);
                pos_line_task_1=start_line+((i+1)*space_between_line);
                pos_line_task_2=start_line+((downstream_task+1)*space_between_line);
                //graphe.beginPath();
                graphe.lineCap='square';
                graphe.moveTo(deb_column_task_1+start_column, pos_line_task_1); /* trace <-- */
                graphe.lineTo(deb_column_task_1+start_column-(space_column/4), pos_line_task_1);
                graphe.moveTo(deb_column_task_1+start_column-(space_column/4), pos_line_task_1); /* trace | */
                graphe.lineTo(deb_column_task_1+start_column-(space_column/4), pos_line_task_2);
                graphe.moveTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2); /* trace --> */
                graphe.lineTo(deb_column_task_2+start_column, pos_line_task_2);
                graphe.strokeStyle= '#000000'; //Nuance de rouge
                graphe.lineWidth= 1;
                graphe.stroke(); /* affiche la ligne */
            }
        }
    }
}
/* ---- */
function draw_liaison_task_up(graphe,drawing_area){
    var start_column_task=20;
    var interval=0;
    var inc_line_task=space_between_line;
    var deb_column_task=0;
    for (let i = 0; i < (array_tasks_display.length); i++) {
        graphe.beginPath();
        graphe.globalAlpha = 1;
         /* trace liaison entre tache si tache precedente declarée */
        if (array_tasks_display[i][7]!=0){
            /* verifie si la tache existe et donc inferieur a la longueur de la liste */
            if (array_tasks_display[i][7]<array_tasks_display.length){
                /* verifie si la tache amont n a pas deja une attache avec la tache en cours d etude. si oui alors on ne trace rien */
                numero_de_la_tache=array_tasks_display[i][7]
                if (i !=(array_tasks_display[numero_de_la_tache][5]-1)){
                    upstream_task=array_tasks_display[i][7]-1;
                    downstream_task=i;
                    deb_column_task_1 = (array_tasks_display[upstream_task][1]*space_column);
                    end_column_task_1= deb_column_task_1+(array_tasks_display[upstream_task][2]*space_column);
                    deb_column_task_2 = (array_tasks_display[downstream_task][1]*space_column);
                    pos_line_task_1=start_line+((upstream_task+1)*space_between_line);
                    pos_line_task_2=start_line+((downstream_task+1)*space_between_line);
                    graphe.beginPath();
                    graphe.lineCap='square';
                    if (end_column_task_1==deb_column_task_2){
                        if (upstream_task>i){
                            graphe.moveTo(end_column_task_1+start_column, pos_line_task_1); /* trace --> */
                            graphe.lineTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1);
                            graphe.moveTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1); /* trace | */
                            graphe.lineTo(end_column_task_1+start_column+(space_column/4), pos_line_task_2-(space_between_line/2));
                            graphe.moveTo(end_column_task_1+start_column+(space_column/4), pos_line_task_2-(space_between_line/2)); /* trace <-- */
                            graphe.lineTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2-(space_between_line/2));
                            graphe.moveTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2-(space_between_line/2)); /* trace | */
                            graphe.lineTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2);
                            graphe.moveTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2); /* trace --> */
                            graphe.lineTo(deb_column_task_2+start_column, pos_line_task_2);
                        }else {
                            graphe.moveTo(end_column_task_1+start_column, pos_line_task_1); /* trace --> */
                            graphe.lineTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1);
                            graphe.moveTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1);
                            graphe.lineTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1+(space_between_line/2));
                            graphe.moveTo(end_column_task_1+start_column+(space_column/4), pos_line_task_1+(space_between_line/2));
                            graphe.lineTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_1+(space_between_line/2));
                            graphe.moveTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_1+(space_between_line/2));
                            graphe.lineTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2);
                            graphe.moveTo(deb_column_task_2+start_column-(space_column/4), pos_line_task_2);
                            graphe.lineTo(deb_column_task_2+start_column, pos_line_task_2);
                        }
                    }
                    else {
                        if (deb_column_task_2 > end_column_task_1){
                            /* si decalage des taches, decomposition des liaisons */
                            interval= deb_column_task_2 - end_column_task_1;
                            inter_col_deb=end_column_task_1;
                            inter_col_fin=end_column_task_1+interval-space_column;
                            graphe.moveTo(inter_col_deb+start_column, pos_line_task_1); /* ligne de depart */
                            graphe.lineTo(inter_col_fin+start_column, pos_line_task_1);
                            graphe.moveTo(inter_col_fin+start_column, pos_line_task_2); /* ligne d arrivee */
                            graphe.lineTo(deb_column_task_2+start_column, pos_line_task_2);
                            graphe.moveTo(inter_col_fin+start_column, pos_line_task_1); /* ligne d arrivee */
                            graphe.lineTo(inter_col_fin+start_column, pos_line_task_2);
                        }
                        else {
                            interval= deb_column_task_2 - end_column_task_1;
                            interval_lin=pos_line_task_2-pos_line_task_1
                            inter_lin_deb=pos_line_task_1;
                            inter_lin_fin=pos_line_task_1+interval_lin-(space_between_line/2);
                            graphe.moveTo(end_column_task_1+start_column, inter_lin_deb); /* ligne de depart */
                            graphe.lineTo(end_column_task_1+start_column, inter_lin_fin);
                            graphe.moveTo(deb_column_task_2+start_column, inter_lin_fin); /* ligne d arrivee */
                            graphe.lineTo(deb_column_task_2+start_column, pos_line_task_2);
                            graphe.moveTo(end_column_task_1+start_column, inter_lin_fin); /* ligne d arrivee */
                            graphe.lineTo(deb_column_task_2+start_column, inter_lin_fin);
                        }
                    }
                    graphe.strokeStyle= '#008000'; //Nuance de rouge
                    graphe.lineWidth= 1;
                    graphe.stroke(); /* affiche la ligne */
                }
            }
        }
    }
}

function recupere_num_semaine(date_actuelle){
  date_actuelle.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date_actuelle.setDate(date_actuelle.getDate() + 3 - (date_actuelle.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date_actuelle.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date_actuelle.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

function writing_times (graphe,drawing_area,type_time){
    let date_start = new Date();
    let aujourdhui = new Date();
    let account_day=0
    let nbr_m_second = 86400000 /* nbr de seconde en 1 journée */
    /* calcul date de depart en fonction de l'increment de déplacement du canvas */
    if (int_increment>0){
        let start_int=start_project.getTime()
        start_int=start_int+(int_increment*nbr_m_second);
        start_project.setTime(start_int);
    }
    start_time=0 ;  /* date du jour */
    now.getSeconds(0)
    date_start.setTime(now.getTime())
    date_start=start_project;
    start_day=date_start.getTime()
    /* display month */
    let memo_year=-1;
    let memo_month=-1;
    let memo_week=-1;
    let interval_month=0;
    let interval_week=0;
    let interval_space=0;
    let color_month="#0ec9e6"    /* bleue*/
    let color_week="#0af25f"   /* vert */
    graphe.beginPath();
    colonne_du_jour=0;
    for (let i = 0; i < (number_day+2); i++) {
        /* ecriture des mois */
        /* ----------------- */
        date_start_m   = date_start.getMonth() + 1;
        date_start_j_m = date_start.getDate();
        date_start_y = date_start.getFullYear();
        date_start_w = recupere_num_semaine(date_start);
        inter_space = (i*space_column)+start_column
        /* ecriture du mois */
        if (date_start_m!=memo_month){
            interval_space=interval_month+((inter_space-interval_month)/2)
            if (memo_month!=-1){
                graphe.beginPath();
                graphe.globalAlpha = 1;
                graphe.fillStyle = "black";
                graphe.font = 'bold 14px serif';
                if (memo_month<12) {
                    texte_m="M"+String(memo_month)+"  / "+String(date_start_y)
                }else {
                    texte_m="M"+String(memo_month)+"  / "+String(date_start_y-1)
                }
                graphe.fillText(texte_m,interval_space,10 );
                /* trace une ligne sur le mois */
                if (color_month == "#0ec9e6") {
                    color_month="#1bb6cf";}
                else {color_month="#0ec9e6";}
                graphe.beginPath();
                graphe.fillStyle = color_month;
                graphe.globalAlpha = 0.5;
                /* trace rectangle pour les mois */
                graphe.fillRect(interval_month+2, 0, inter_space-interval_month-2, 15)
            }
            interval_month=inter_space;
            memo_month=date_start_m;
        }
        /* ecriture de semaine */
        if (date_start_w!=memo_week){
            interval_space=interval_week+((inter_space-interval_week)/2)
            if (memo_week!=-1){
                graphe.beginPath();
                graphe.globalAlpha = 1;
                graphe.fillStyle = "black";
                graphe.font = 'bold 11px serif';
                let entete_text="W";
                if (langue==2){entete_text="S" }
                texte_w=entete_text+String(memo_week)
                graphe.fillText(texte_w,interval_space,25 );
                /* trace une ligne sur la semaine */
                if (color_week == "#0af25f") {
                    color_week="#08d152";}
                else {color_week="#0af25f";}
                graphe.beginPath();
                graphe.fillStyle = color_week;
                graphe.globalAlpha = 0.5;
                /* trace rectangle pour les mois */
                graphe.fillRect(interval_week+2, 15, inter_space-interval_week-2, 15)
            }
            interval_week=inter_space;
            memo_week=date_start_w;
        }
        /* ecrit les jours en cours */
        /*------------------------- */
        graphe.beginPath();
        graphe.globalAlpha = 1;
        graphe.fillStyle = "black";
        graphe.font = '9px serif';
        /* verifie si le jour est le jour actuel pour trace de l'axe */
        if (date_start_j_m == aujourdhui.getDate()) {
            if (date_start_m == (aujourdhui.getMonth() +1)) {
                if (date_start_y == aujourdhui.getFullYear()) {
                    colonne_du_jour=inter_space;
                }
            }
        }
        graphe.fillText(date_start_j_m , inter_space,40 );
        start_day=start_day+nbr_m_second;
        date_start.setTime(start_day);
    }
    /* ecrit le mois en cours non terminé (en fin de tableau) */
    /*------------------------------------------------------- */
    interval_space=interval_month+((inter_space-interval_month)/2)
    graphe.beginPath();
    graphe.font = "bold 14px serif"
    texte_m="M"+String(memo_month)
    graphe.fillText(texte_m , interval_space,10 );
    if (color_month == "#0ec9e6") {
        color_month="#1bb6cf";}
    else {color_month="#0ec9e6";}
    graphe.fillStyle = color_month;
    graphe.globalAlpha = 0.7;
    /* trace rectangle pour le dernier mois */
    /* ----------------------------- */
    graphe.fillRect(interval_month+2, 0, inter_space-(interval_month-18), 15)
    interval_month=inter_space;
    memo_month=date_start_m;
    /* ecrit la semaine en cours non terminée (en fin de tableau) */
    /*------------------------------------------------------- */
    interval_space=interval_week+((inter_space-interval_week)/2)
    graphe.beginPath();
    graphe.font = "bold 11px serif"
    graphe.fillStyle = "black";
    texte_m="W"+String(memo_week)
    graphe.fillText(texte_m , interval_space,25 );
    if (color_week == "#0af25f") {
        color_week="#08d152";}
    else {color_week="#0af25f";}
    graphe.fillStyle = color_week;
    graphe.globalAlpha = 0.3;
    /* trace rectangle pour la dernière semaine */
    /* ----------------------------- */
    graphe.fillRect(interval_week+2, 15, inter_space-(interval_week-18), 15)
    interval_week=inter_space;
    memo_week=date_start_w;

    /* encadre les jours */
    /* ------------------- */
    graphe.beginPath();
    graphe.fillStyle = "#dbb20d";
    graphe.globalAlpha = 0.3;
    let int=inter_space-130;
    largeur_graph=inter_space;
    graphe.fillRect(start_column, 30, int, 20);
}

function draw_axes(graphe,drawing_area){
    if (affichage_axes){
        drawing_area.style.cursor="crosshair";
        /* trace axe vertical */
        graphe.beginPath();
 	    graphe.globalAlpha = 0.6;
        graphe.setLineDash([5, 2]); /* ligne discontinu */
        graphe.moveTo(mouse_x,start_line-20); /* point de part */
        graphe.lineTo(mouse_x,height_schema); /* ligne point final*/
        graphe.strokeStyle= 'black'; //Nuance de bleu
        graphe.lineWidth= 1;
        graphe.stroke(); /* affiche la ligne */
        /* trace axe horizontale */
        graphe.beginPath();
 	    graphe.globalAlpha = 0.6;
        graphe.setLineDash([5, 2]); /* ligne discontinu */
        graphe.moveTo(start_column-50,mouse_y); /* point de part */
        graphe.lineTo(largeur_graph,mouse_y); /* ligne point final*/
        graphe.strokeStyle= '#black'; //Nuance de bleu
        graphe.lineWidth= 1;
        graphe.stroke(); /* affiche la ligne */
    }
}

function listen_mouse_on_canvas(graphe,drawing_area){
    if (deplace_canvas){
        drawing_area.style.cursor="grab";}
    drawing_area.addEventListener("mousemove", function(e){
        let mousePos=getMousePos(drawing_area,e);
        affichage_axes=true;
        mouse_x=mousePos.x
        mouse_y=mousePos.y
        if (deplace_canvas){
            increment_left_canvas=(memo_mouse_canvas_x-mouse_x)/space_column;
            let int_pos_mouse=memo_mouse_canvas_y-mouse_y;
            let int_pos_mouse_n=mouse_y-memo_mouse_canvas_y;
            if (int_pos_mouse>0) {
                if (int_pos_mouse>=space_between_line) {
                    increment_top_canvas+=1;
                    //increment_top_canvas=0 /* pas de mouvement pour le moment PB de liaison */
                    memo_mouse_canvas_y=mouse_y };
            }else{
                if (int_pos_mouse_n>=space_between_line) {
                    increment_top_canvas=increment_top_canvas-1;
                    //increment_top_canvas=0 /* pas de mouvement pour le moment PB de liaison */
                    memo_mouse_canvas_y=mouse_y };
            }
            if (increment_top_canvas<0){increment_top_canvas=0};
            if (increment_top_canvas>(array_tasks_display_save.length-2)){increment_top_canvas=(array_tasks_display_save.length-2)};
        }
     }, false);
     drawing_area.addEventListener("mouseleave", function(e){
        affichage_axes=false;
        deplace_canvas=false;
        memo_increment_left=int_increment;
        increment_left_canvas=0;
     }, false);
    drawing_area.addEventListener("mousedown", function(e){

        deplace_canvas=true;
        let mousePos=getMousePos(drawing_area,e);
        memo_mouse_canvas_x=mousePos.x
        memo_mouse_canvas_y=mousePos.y
      }, false);
    drawing_area.addEventListener("mouseup", function(e){
        deplace_canvas=false;
        memo_increment_left=int_increment;
        increment_left_canvas=0;
     }, false);

}
//Get Mouse Position
function getMousePos(drawing_area, e) {
    var rect = drawing_area.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}
