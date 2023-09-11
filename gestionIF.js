/* ===== gestion Iframe =======*/
/*============================*/

function remove_datas_iframe(){ /* enleve l'affichage de toutes les taches */
    if (affichage_donnees_effectue) {
        for (let i = 0; i < (array_tasks.length); i++) {
            let in_indice=i+1;
            remove_one_task(in_indice);
        }
    }
}
function remove_one_task(int_indice){
    if (!first) { /* attente fin de demarrage à frois */
        idvar="DIV_task"+String(int_indice)
        variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
        if(variable1  != null){ /* tache avec ID trouve et existante */
            variable1.remove(variable1);
            idvar="label_name_task"+String(int_indice)+" ";
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="name_task"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="start_task"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="delay_task"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="gap_with_upstream_task"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="label_milestone"+String(int_indice)+" ";
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="milestone"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="label_downstream_task"+String(int_indice)+" ";
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="downstream_task"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="label_upstream_task"+String(int_indice)+" ";
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="upstream_task"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="label_principal_task"+String(int_indice)+" ";
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="principal_task"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="bouton_delete"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="bouton_insert"+String(int_indice);
            variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
            idvar="bouton_couleur"+String(int_indice);
            variable1=  document.getElementById("page2").contentWindow.document.getElementById(idvar);
            variable1.remove(variable1);
        }
    } else {alert("demarrage à froid ");}
}
function affiche_datas_iframe() { /* affiche les donnees dans l Iframe */
    if (!iframe_hidden) {
        iframe_hidden = document.getElementById("page2");
        iframe_hidden.setAttribute("hidden","hidden");
        iframe_hidden=true;
        affiche_datas_effectue=false;
        let element_a_modifier=window.parent.document.getElementById("display_datas");
        element_a_modifier.innerHTML=array_langue[8][langue+2];
    }
    else {
        if (!deplace_iframe){
            element_a_bouger = window.parent.document.getElementById("page2");
            element_a_bouger.style.position="absolute";
            element_a_bouger.style.left=String(300) + "px";
            element_a_bouger.style.top=String(550) + "px";
            element_a_bouger.style.height=String(400) + "px";
            page2_left=300;
            page2_top=550;
            iframe_hidden = document.getElementById("page2");
            iframe_hidden.removeAttribute("hidden");
            changement_langue_iframe();
            /* initialisation donnees du canvas */
            init_donnees_affichage_canvas();
            affiche_une_seule_tache=false; /* affichage de toutes les taches */
        }
        iframe_hidden=false;
        affiche_datas();
        affichage_donnees_effectue=true;
    }
}
function affiche_datas(){ /* affiche donneees des taches dans l'Iframe */
    initialisation_affichage_datas=true;
    remove_datas_iframe(); /* efface toutes les donnees affichees */
    for (let i = 0; i < (array_tasks.length); i++) {
        let in_indice=i+1;
        display_one_task(in_indice);
        affect_donnees_display(in_indice);
    }
    initialisation_affichage_datas=false
    affiche_datas_effectue=true;
}
function lecture_datas(numero_tache){ /* lecture de toutes les donnees tant que l'iframe est ouvert */
    if (affiche_datas_effectue) {
        if (numero_tache!=0){
            read_one_task(numero_de_la_tache_a_afficher)
        }else{
            if (!initialisation_affichage_datas){
                for (let i = 0; i < (array_tasks.length); i++) {
                    let in_indice=i+1;
                    read_one_task(in_indice);
                }
            }
        }
        recopy_array_2D();
        check_datas_upstream();
        check_datas_downstream();
    }
}
function read_one_task(int_indice){ /* lecture donnees dans l iframe */
    idvar="name_task"+String(int_indice);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
    array_tasks[int_indice-1][0]=String(variable1.value);
    idvar="start_task"+String(int_indice);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
    array_tasks[int_indice-1][1]=Number(variable1.value);
    idvar="delay_task"+String(int_indice);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
    array_tasks[int_indice-1][2]=Number(variable1.value);
    idvar="gap_with_upstream_task"+String(int_indice);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
    array_tasks[int_indice-1][3]=Number(variable1.value);
    idvar="milestone"+String(int_indice);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
    array_tasks[int_indice-1][4]=0;
    if (variable1.checked) {
        array_tasks[int_indice-1][4]=1;
    }
    idvar="downstream_task"+String(int_indice);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
    array_tasks[int_indice-1][5]=Number(variable1.value);
    idvar="upstream_task"+String(int_indice);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
    array_tasks[int_indice-1][7]=Number(variable1.value);
    idvar="principal_task"+String(int_indice);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar);
    array_tasks[int_indice-1][6]=0;
    if (variable1.checked) {
        array_tasks[int_indice-1][6]=1;
    }
}

/* =============couleur des taches  ==================== */
function lecture_bp_color(numero_tache){
    if (numero_tache!=0){
        idvar="bouton_couleur"+String(numero_tache);
        var int_color=document.getElementById("page2").contentWindow.document.getElementById(idvar).value
        array_tasks[numero_tache-1][9]=String(int_color);
    }else{
        if (!iframe_hidden) {
            for (let i = 0; i < (array_tasks.length); i++) {
                idvar="bouton_couleur"+String(i+1);
                var int_color=document.getElementById("page2").contentWindow.document.getElementById(idvar).value
                array_tasks[i][9]=String(int_color);
            }
        }
    }
}

/* =============insert une tache  ==================== */
function lecture_bp_insert(numero_tache){
    if (numero_tache!=0){
        idvar="bouton_insert"+String(numero_tache);
        document.getElementById("page2").contentWindow.document.getElementById(idvar).onclick=insert_task;
    }else{
        if (!iframe_hidden) {
            for (let i = 0; i < (array_tasks.length); i++) {
                idvar="bouton_insert"+String(i+1);
                document.getElementById("page2").contentWindow.document.getElementById(idvar).onclick=insert_task;
            }
        }
    }
}
function insert_task(){
    /* recherche index dans l'ID */
    let compteur_index=0;
    let int_array_tasks=[];
    index_task=(this.id.match(/\d+/g).join(''));
    let var_int=index_task-1;
    /* recherche les taches aval et amont pour savoir si elles sont indexée (upstream/downstream) avec la tache en cours */
    for (let i = 0; i < (array_tasks.length); i++) {
        if (array_tasks[i][7]>var_int) {
            array_tasks[i][7]+=1;
        }
        if (array_tasks[i][5]>var_int){
            array_tasks[i][5]+=1;
        }
    }
    for (let i = 0; i < array_tasks.length; i++) {
        int_array_tasks[compteur_index]=[];
        if (i!=var_int) {
            for  (let j = 0; j < array_tasks[0].length ; j++) {
                int_array_tasks[compteur_index][j]=array_tasks[i][j];
            }
            compteur_index+=1;
        } else {
            for  (let j = 0; j < array_tasks[0].length ; j++) {
                int_array_tasks[compteur_index][j]=array_task_vide[j];
            }
            compteur_index+=1;
            int_array_tasks[compteur_index]=[];
            for  (let j = 0; j < array_tasks[0].length ; j++) {
                int_array_tasks[compteur_index][j]=array_tasks[i][j];
            }
            compteur_index+=1;
        }
    };
    /* recopie du tableau intermediaire */
    array_tasks=[];
    for (let i = 0; i < int_array_tasks.length; i++) {
        array_tasks[i]=[]
        for (let j = 0; j < int_array_tasks[0].length; j++) {
            array_tasks[i][j]=int_array_tasks[i][j];
        }
    }
    if (!affiche_une_seule_tache){
        affiche_datas(0);
    }else{
        affiche_une_tache_specifique(index_task);
    }
}

/* =============delete une tache ==================== */
function lecture_bp_delete(numero_tache){
    if (numero_tache!=0){
       idvar="bouton_delete"+String(numero_tache);
       document.getElementById("page2").contentWindow.document.getElementById(idvar).onclick=delete_task;
    }else{
        if (!iframe_hidden) {
            for (let i = 0; i < (array_tasks.length); i++) {
                idvar="bouton_delete"+String(i+1);
                document.getElementById("page2").contentWindow.document.getElementById(idvar).onclick=delete_task;
            }
        }
    }
}
function delete_task(){
    /* recherche index dans l'ID */
    if (array_tasks.length>0){
        affichage_donnees_effectue=true;
        remove_datas_iframe();
        index_task=(this.id.match(/\d+/g).join(''));
        let var_int=Number(index_task)-1;
        let compteur_index=0;
        let int_array_tasks=[];
        if (var_int==array_tasks.length-1){
            int_array_tasks=array_tasks.pop();
        } else {
            /* recherche les taches aval et amont pour savoir si elles sont indexée (upstream/downstream) avec la tache en cours */
            for (let i = 0; i < (array_tasks.length); i++) {
                if (array_tasks[i][7]==var_int+1) {
                    array_tasks[i][7]=0;
                }else { if (array_tasks[i][7]>var_int+1){
                     array_tasks[i][7]=array_tasks[i][7]-1;
                    }
                }
                if (array_tasks[i][5]==var_int+1){
                    array_tasks[i][5]=0;
                }else { if (array_tasks[i][5]>var_int+1){
                     array_tasks[i][5]=array_tasks[i][5]-1;
                    }
                }
            }
            for (let i = 0; i < array_tasks.length; i++) {
                int_array_tasks[compteur_index]=[];
                if (i!=var_int) {
                    for  (let j = 0; j < array_tasks[0].length ; j++) {
                        int_array_tasks[compteur_index][j]=array_tasks[i][j];
                    };
                    compteur_index+=1;
                };
            };
            array_tasks=[];
            for (let i = 0; i < int_array_tasks.length; i++) {
                array_tasks[i]=[]
                for (let j = 0; j < int_array_tasks[0].length; j++) {
                    array_tasks[i][j]=int_array_tasks[i][j];
                }
            }
        }
        affiche_datas_effectue=true;
        if (!affiche_une_seule_tache){
            affiche_datas(0);
        }else{
            if (numero_de_la_tache_a_afficher>array_tasks.length) {
                remove_datas_iframe();
            }else {
                affiche_une_tache_specifique(numero_de_la_tache_a_afficher);
            }
        }
        recopy_array_2D();
    }
}

/* =============validation devalidation radio button milstone & main task ==================== */
function lecture_bp_radio_task_principale(numero_tache){
    if (numero_tache!=0){
       idvar="principal_task"+String(numero_tache);
       document.getElementById("page2").contentWindow.document.getElementById(idvar).onclick=set_button_radio;
    }else{
        if (!iframe_hidden) {
            for (let i = 0; i < (array_tasks.length); i++) {
                idvar="principal_task"+String(i+1);
                document.getElementById("page2").contentWindow.document.getElementById(idvar).onclick=set_button_radio;
            }
        }
    }
}
function lecture_bp_radio_milstone(numero_tache){
    if (numero_tache!=0){
       idvar="milestone"+String(numero_tache);
       document.getElementById("page2").contentWindow.document.getElementById(idvar).onclick=set_milstone_radio;
    }else{
        if (!iframe_hidden) {
            for (let i = 0; i < (array_tasks.length); i++) {
                idvar="milestone"+String(i+1);
                document.getElementById("page2").contentWindow.document.getElementById(idvar).onclick=set_milstone_radio;
            }
        }
    }
}
function set_milstone_radio(){
    /* recherche index dans l'ID */
    index_task=(this.id.match(/\d+/g).join(''))
    var_int=index_task-1;
    if ( array_tasks[var_int][4]==0) {
        array_tasks[var_int][4]=1;
        array_tasks[var_int][6]=0;  /* devalide la tache principale */
    }
    else {
        array_tasks[var_int][4]=0;
    }
    if (!affiche_une_seule_tache){
        reafecte_donnees();
    }else {
        affect_donnees_display(numero_de_la_tache_a_afficher);
    }
}
function set_button_radio(){
    /* recherche index dans l'ID */
    index_task=(this.id.match(/\d+/g).join(''))
    var_int=index_task-1;
    if ( array_tasks[var_int][6]==0) {
        array_tasks[var_int][6]=1;
        array_tasks[var_int][4]=0; /* devalide la tache jalon */
    }
    else {
        array_tasks[var_int][6]=0;
    }
    if (!affiche_une_seule_tache){
        reafecte_donnees();
    }else {
        affect_donnees_display(numero_de_la_tache_a_afficher);
    }
}

/* ============== affiche variable dans Iframe ============== */
function reafecte_donnees(){
    for (let i = 0; i < (array_tasks.length); i++) {
        let in_indice=i+1;
        affect_donnees_display(in_indice);
    }
}

function affect_donnees_display(inc) {
    message(inc,"essai");
    idvar="name_task"+String(inc);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar)
    variable1.value = array_tasks[inc-1][0];
    idvar="start_task"+String(inc);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar)
    if (array_tasks[inc-1][4]==1){ /* verification si jalon, on bloque l'input */
        /* variable1.setAttribute("disabled","disabled"); */
        variable1.disabled = true;
    } else {
        /* variable1.setAttribute("enable","enable"); */
        variable1.disabled = false;
    }
    variable1.value = array_tasks[inc-1][1];
    idvar="delay_task"+String(inc);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar)
    if (array_tasks[inc-1][4]==1){ /* verification si jalon, on bloque l'input */
        /* variable1.setAttribute("disabled","disabled"); */
        variable1.disabled = true;
    } else {
        /* variable1.setAttribute("enable","enable"); */
        variable1.disabled = false;
    }
    variable1.value = array_tasks[inc-1][2];
    idvar="gap_with_upstream_task"+String(inc);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar)
    if (array_tasks[inc-1][4]==1){ /* verification si jalon, on bloque l'input */
        /* variable1.setAttribute("disabled","disabled"); */
        variable1.disabled = true;
    } else {
        /* variable1.setAttribute("enable","enable"); */
        variable1.disabled = false;
    }
    variable1.value = array_tasks[inc-1][3];
    idvar="milestone"+String(inc);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar)
    if ( array_tasks[inc-1][4]==0){
        variable1.checked=false;
    } else {
        variable1.checked=true;
    }
    idvar="downstream_task"+String(inc);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar)
    variable1.value = array_tasks[inc-1][5];
    idvar="upstream_task"+String(inc);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar)
    variable1.value = array_tasks[inc-1][7];
    idvar="principal_task"+String(inc);
    variable1 = document.getElementById("page2").contentWindow.document.getElementById(idvar)
    if ( array_tasks[inc-1][6]==0){
        variable1.checked=false;
    } else {
        variable1.checked=true;
    }
}
/* ========= rajout d'une tache en fin de Iframe =========*/
function rajout_one_task() {
    if (array_tasks.length <number_tasks_max) {
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_task_vide[i]) ;
        }
        /* initialisation de la tache */
        if (array_tasks.length>1){
            array_tasks[array_tasks.length-2][5]=array_tasks.length;
            array_tasks[array_tasks.length-1][1]=array_tasks[array_tasks.length-2][1]+array_tasks[array_tasks.length-2][2]+array_tasks[array_tasks.length-2][3];
        }
        let in_indice=array_tasks.length;
        display_one_task(in_indice);
        affect_donnees_display(in_indice-1); /* affecte la tache précédente */
        affect_donnees_display(in_indice); /* affecte la tache rajoutée */
        recopy_array_2D();

    } else {
        if (langue=1) {
            CustomAlert("too much task","Definition of tasks")
        }else {
            CustomAlert("trop de tache déclarée >49","Definition des taches")
        }
    }
}
function display_one_task(int_indice) {
    let indice=int_indice;
    idvar="DIV_task"+String(indice)
    // list = document.getElementById("page2").contentWindow.document.querySelector("#container");
    try{
    list = window.document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById("container");
    } catch(e){
        CustomAlert(e,"erreur Iframe")
    }
    variable1= document.createElement('div');
    variable1.setAttribute("id",idvar);
    list.appendChild(variable1);
     /*---*/
    idvar="label_name_task"+String(indice)+" ";
    variable1= document.createElement('label');
    variable1.setAttribute("id",idvar);
    variable1.setAttribute("class","label_name_task");
    variable1.setAttribute("text-align","right");
    texte_int=String(indice)
    if (indice<10){
        texte_int="0"+String(indice)
    }
    variable1.innerHTML = "task"+texte_int+" ";
    list.appendChild(variable1);
    idvar="name_task"+String(indice);
    variable2 = document.createElement('input');
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("class","name_task");
    list.appendChild(variable2);
    /*---*/
    idvar="start_task"+String(indice);
    variable2= document.createElement('input');
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("type","number");
    variable2.setAttribute("step","1");
    variable2.setAttribute("min","0");
    variable2.setAttribute("class","start_task");
    list.appendChild(variable2);
    /*---*/
    idvar="delay_task"+String(indice);
    variable2= document.createElement('input');
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("type","number");
    variable2.setAttribute("step","1");
    variable2.setAttribute("min","0");
    variable2.setAttribute("max","999");
    variable2.setAttribute("value","0");
    variable2.setAttribute("size","5");
    variable2.setAttribute("class","delay_task");
    list.appendChild(variable2);
    /*---*/
    idvar="gap_with_upstream_task"+String(indice);
    variable2= document.createElement('input');
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("type","number");
    variable2.setAttribute("step","1");
    variable2.setAttribute("min","-100");
    variable2.setAttribute("max","100");
    variable2.setAttribute("value","0");
    variable2.setAttribute("size","5");
    variable2.setAttribute("class","gap_with_upstream_task");
    list.appendChild(variable2);
    /*---*/
    idvar="label_downstream_task"+String(indice)+" ";
    variable1= document.createElement('label');
    variable1.setAttribute("id",idvar);
    variable1.innerHTML = array_langue_iframe[2][langue];
    list.appendChild(variable1);
    idvar="downstream_task"+String(indice);
    variable2= document.createElement('input');
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("type","number");
    variable2.setAttribute("step","1");
    variable2.setAttribute("min","0");
    variable2.setAttribute("max","100");
    variable2.setAttribute("value","0");
    variable2.setAttribute("size","5");
    variable2.setAttribute("class","downstream_task");
    list.appendChild(variable2);
    /*---*/
    idvar="label_upstream_task"+String(indice)+" ";
    variable1= document.createElement('label');
    variable1.setAttribute("id",idvar);
    variable1.innerHTML = array_langue_iframe[3][langue];
    list.appendChild(variable1);
    idvar="upstream_task"+String(indice);
    variable2= document.createElement('input');
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("type","number");
    variable2.setAttribute("step","1");
    variable2.setAttribute("min","0");
    variable2.setAttribute("max","100");
    variable2.setAttribute("value","0");
    variable2.setAttribute("size","5");
    variable2.setAttribute("class","upstream_task");
    list.appendChild(variable2);
    /*---*/
    idvar="label_milestone"+String(indice)+" ";
    variable1= document.createElement('label');
    variable1.setAttribute("id",idvar);
    variable1.innerHTML = array_langue_iframe[1][langue];
    list.appendChild(variable1);
    idvar="milestone"+String(indice);
    variable2= document.createElement('input');
    variable2.setAttribute("type","radio");
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("class","milestone");
    list.appendChild(variable2);
    /*---*/
    idvar="label_principal_task"+String(indice)+" ";
    variable1= document.createElement('label');
    variable1.setAttribute("id",idvar);
    variable1.innerHTML = array_langue_iframe[4][langue];
    list.appendChild(variable1);
    idvar="principal_task"+String(indice);
    variable2= document.createElement('input');
    variable2.setAttribute("type","radio");
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("class","principal_task");
    list.appendChild(variable2);
    /*--- button delete task --*/
    idvar="bouton_delete"+String(indice);
    variable2= document.createElement('button');
    variable2.innerHTML = "delete"
    variable2.setAttribute("type","button");
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("class","bouton_delete");
    list.appendChild(variable2);
    /*--- button insert task --*/
    idvar="bouton_insert"+String(indice);
    variable2= document.createElement('button');
    variable2.innerHTML = "insert"
    variable2.setAttribute("type","button");
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("class","bouton_insert");
    list.appendChild(variable2);
    /*--- choix couleur --*/
    idvar="bouton_couleur"+String(indice);
    variable2= document.createElement('input');
    variable2.setAttribute("type","color");
    let string_color=String(array_tasks[indice-1][9]);
    variable2.setAttribute("value",string_color);
    variable2.setAttribute("id",idvar);
    variable2.setAttribute("class","color_task");
    list.appendChild(variable2);
}

function affiche_une_tache_specifique(numero_de_la_tache_a_afficher){
    remove_datas_iframe()
    /* modification de la hauteur de l'Iframe */
    // iframe_page2=document.querySelector('iframe')
    element_a_bouger = window.parent.document.getElementById("page2");
    element_a_bouger.style.position="absolute";
    element_a_bouger.style.left=String(300) + "px";
    element_a_bouger.style.top=String(700) + "px";
    element_a_bouger.style.height=String(120) + "px";
    display_one_task(numero_de_la_tache_a_afficher);
    affect_donnees_display(numero_de_la_tache_a_afficher)
    affiche_une_seule_tache=true;
}

//Get Mouse Position
function getMousePos_iframe(elmnt, e) {
    var rect = elmnt.getBoundingClientRect();
    return {
        x: e.clientX-rect.left,
        y: e.clientY-rect.top,
    };
}
function listen_mouse_on_page2(){
     element_a_ecouter  = window.parent.document.getElementById("page2");
     //element_a_ecouter  = document.getElementById("page2");
     elmnt =element_a_ecouter.contentWindow.document.getElementById("entete_page2");
     elmnt.addEventListener("mousemove", function(e){
        elmnt.style.cursor="grab";
        page2_left_x=element_a_ecouter.getBoundingClientRect().left;
        page2_top_y=element_a_ecouter.getBoundingClientRect().top;
        if (deplace_iframe){
            let mousePos=getMousePos_iframe(elmnt,e);
            let deltax=Number(mousePos.x)-Number(memo_mouse_x);
            let deltay=Number(mousePos.y)-Number(memo_mouse_y);
            if ((page2_left_x==page2_left) && (page2_top_y==page2_top)) {
                if (browserName == "Mozilla"){
                    page2_left=page2_left+deltax;
                    page2_top=page2_top+deltay;
                    element_a_ecouter.style.position="absolute";
                    element_a_ecouter.style.left=String(parseInt(page2_left))+"px";
                    element_a_ecouter.style.top=String(parseInt(page2_top))+"px";
                }else {
                    /*
                    if (deltax>0){
                        page2_left+=1;}
                    if (deltax<0){
                        page2_left-=1;}
                     if (deltay>0){
                        page2_top+=1;}
                    if (deltax<0){
                        page2_top-=1;}
                    element_a_ecouter.style.position="absolute";
                    element_a_ecouter.style.left=String(page2_left)+"px";
                    element_a_ecouter.style.top=String(page2_top)+"px";
                    */
                }
            }
        }else {inc=0}
     }, false);
    elmnt.addEventListener("mouseup", function(a){
        if (deplace_iframe){
            //element_a_ecouter.style.position="absolute";
            //page2_left=page2_left+1;
            //page2_top=page2_top+1;
            //element_a_ecouter.style.left=String(parseInt(page2_left))+"px";
            //element_a_ecouter.style.top=String(parseInt(page2_top))+"px";
            deplace_iframe=false;
        }
        deplace_iframe=false;
     }, false);
     elmnt.addEventListener("mouseleave", function(b){
        deplace_iframe=false;
     }, false);
    elmnt.addEventListener("mousedown", function(c){
        if (!deplace_iframe){
            let mousePos=getMousePos_iframe(elmnt,c);
            memo_mouse_x=mousePos.x
            memo_mouse_y=mousePos.y
            deplace_iframe=true;
        }
      }, false);
}