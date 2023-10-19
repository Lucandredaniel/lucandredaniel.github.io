/* ============= gestion DB =======================*/
/*=================================================*/


/* fonction non utilisee car elle ne fonctionne pas avec Mozilla
   fonctionne avec Chrome et autre
   elle permet la lecture du nom des DB stockés en local*/
function lecture_donnees_DB(){
    const promise =  indexedDB.databases();
    alert(promise)
    promise.then(function(databases){
        alert(databases.length);
        for (let i = 0; i < databases.length; i++) {
        alert(databases[i].name);
        }
    });
}

function reset_array_tasks(){
    array_tasks=[];
    array_tasks_display_save=[];
    array_tasks[0]=[];
    array_tasks_display_save[0]=[];
    for (let j = 0; j < array_task_vide.length; j++) {
        array_tasks[0][j]=array_task_vide[j];
        array_tasks_display_save[0][j]=array_task_vide[j];
    }
    let drawing_area_1 = document.getElementById("schema");
    let graphe_1 = drawing_area_1.getContext('2d');
    read_parameters(graphe_1,drawing_area_1)
}
/* ================================================*/
function creation_base_donnees_complete(){
    let pos_index=0
    base_donnees_complete=[];
    for (let i = 0; i < array_tasks.length; i++) {
        base_donnees_complete[i]=[];
        for (let j = 0; j < array_tasks[0].length; j++) {
            base_donnees_complete[i][j]=array_tasks[i][j];
        }
        pos_index+=1;
    }
   for (let i = pos_index; i < longeur_db-2; i++) {
    base_donnees_complete[i]=[];
       for (let j = 0; j < array_tasks[0].length; j++) {
            if (j==0){
                variable_int="compteur"+String(i);
                base_donnees_complete[i][j]=[variable_int];
            } else {
                base_donnees_complete[i][j]=["finlla"];
            }
        }
   }
    /* sauvegarde des parametres d'environnement */
   base_donnees_complete[pos_index][0] = ["parametre1"];
   base_donnees_complete[pos_index][1] = ["finlla"];     /* finlla obligatoire */
   base_donnees_complete[pos_index][2] = [width_schema];
   base_donnees_complete[pos_index][3] = [height_schema];
   base_donnees_complete[pos_index][4] = [start_column];
   base_donnees_complete[pos_index][5] = [start_line];
   base_donnees_complete[pos_index][6] = [space_column];
   base_donnees_complete[pos_index][7] = [space_between_line];
   base_donnees_complete[pos_index][8] = [texte_save_date];
   base_donnees_complete[pos_index][9] = [with_rows];
   base_donnees_complete[pos_index][10] = [with_columns];
   base_donnees_complete[pos_index][11] = [letter_size];
   pos_index+=1;
   base_donnees_complete[pos_index][0] = ["parametre2"];
   base_donnees_complete[pos_index][1] = ["finlla"];
   base_donnees_complete[pos_index][2] = [langue];
   base_donnees_complete[pos_index][3] = [affichage_weekend];
   base_donnees_complete[pos_index][4] = [colorise_semaine];
   base_donnees_complete[pos_index][5] = [couleur_weekend];
   base_donnees_complete[pos_index][6] = [couleur_fond_semaine];
   base_donnees_complete[pos_index][7] = [nombre_jour_travaille];
   base_donnees_complete[pos_index][8] = ["para"];
   base_donnees_complete[pos_index][9] = ["para"];
   base_donnees_complete[pos_index][10] = ["para"];
   base_donnees_complete[pos_index][11] = ["para"];
   etape_write=2;
}

function delete_datas_base(){
        let reqdelete = indexedDB.deleteDatabase(name_db);

        reqdelete.onsuccess = function () {
            etape_write=3;
        };
        reqdelete.onerror = function () {
            CustomAlert("DB not Found","db error");
            etape_write=3;
        };
        reqdelete.onblocked = function () {
            CustomAlert("Couldn't delete database due to the operation being blocked","db error");
            etape_write=99;
        };
}

function open_db_save_db(){
        openrequest = window.indexedDB.open(name_db,2);
        openrequest.onupgradeneeded = function() {
            db = openrequest.result;
            if (!db.objectStoreNames.contains("diagramme")){
                let object=db.createObjectStore("diagramme", { keyPath: "id"});
                object.createIndex("by_task","task", {unique: true});
                object.createIndex("by_name","name");
                etape_write=4;
            }
        }
        openrequest.onerror   = function() {
            CustomAlert("error open DB","db error");
            etape_write=99;
            db = openrequest.result;
        }
        openrequest.onsuccess = function() {
            db = openrequest.result;
            etape_write=4;
        }
}

function open_db(){ /* etape 2 */

        openrequest = window.indexedDB.open(name_db, 2);
        openrequest.onupgradeneeded = function() {
            db = openrequest.result;
            if (!db.objectStoreNames.contains("diagramme")){
                db.createObjectStore("diagramme", { keyPath: "id" })
                object.createIndex("by_task","task", {unique: true});
                object.createIndex("by_name","name");
            }
        }
        openrequest.onerror   = function() {
            etape_read=99;
        }
        openrequest.onsuccess = function() {
            db = openrequest.result;
            etape_read=3;
        }
}

function lecture_datas_db() {
    const transaction = db.transaction("diagramme", 'readwrite');
    const objectStore = transaction.objectStore("diagramme");
    index_inside_db=objectStore.index("by_task");
    titre_tache="titre"+String(index_db);
    let getarray = index_inside_db.get(titre_tache);
    getarray.onsuccess = function() {
        try {
            array_tasks_lecture_datas=getarray.result.name;
            word_restant=String(array_tasks_lecture_datas);
            let index_virgule=0;
            let word=[];
            let j=0;
            let analyse_fini=false
            while (!analyse_fini){
                if (word_restant.length==0){analyse_fini=true }
                index_virgule=word_restant.search(",");
                if (index_virgule==-1){
                    analyse_fini=true;
                    word[j]=word_restant;
                }else {
                    word[j]=word_restant.slice(0,index_virgule);
                    word_restant=word_restant.slice(index_virgule+1)
                    j++;
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
              etape_read=4;
            } else {
                if (word[0]=="parametre1"){
                  array_parametre_environnement1=[];
                  for (let j = 0; j < word.length; j++) {
                        array_parametre_environnement1[j]=word[j];
                  }
                  etape_read=4;
                }else if (word[0]=="parametre2"){
                          array_parametre_environnement2=[];
                          for (let j = 0; j < word.length; j++) {
                                array_parametre_environnement2[j]=word[j];
                          }
                          etape_read=4;
                      }
                else{
                    etape_read=6; /* fin de transfert */
                }
            }
        } catch (e) {
            CustomAlert(e.name + " : " + e.message,"db error");
            etape_read=100;
        }
    };
    getarray.onerror   = function() {
        let texte="error lecture donnees tache : "+String(titre_tache);
        CustomAlert(texte,"db error");
        etape_read=99;
    };
    getarray.onblocked  = function() {
        let texte="error requete bloquée : "+String(titre_tache);
        CustomAlert(texte,"db error");
        etape_read=99;
    }
}

function save_datas() { /* etape 6 */
        const tx = db.transaction("diagramme", 'readwrite');
        const store = tx.objectStore("diagramme");
        titre_tache="titre"+ String(index_db);
        let valeur_int={task: titre_tache , name: base_donnees_complete[index_db], id:index_db};
        let request = store.add(valeur_int);
        request.onsuccess = function() {
            etape_write=7;
        };
        request.onerror   = function() {
            let texte="error save datas : "+String(titre_tache);
            CustomAlert(texte,"db error");
            etape_write=99;
        };
}
function attente_fin_transaction() { /* etape 7 */
        const tx = db.transaction("diagramme", 'readwrite');
        tx.oncomplete = function() {
            etape_write=5;
            if (index_db == (base_donnees_complete.length) ) {
                etape_write=8; /* fin du transfert total */
        }
    };
    transaction.onerror = function() {
        error_write_db=true;
        index_db=0;
        let texte="Transaction not opened due to error ";
        CustomAlert(texte,"db error");
        etape_write=99;
        db.close()
    };
}

function fermeture_db() {
    db.close();
}

function write_datas() {
    if (!save_donnees_base){ /* attente si sauvegarde deja en cours */
        let titre="";
        let message_avert="";
        if (langue==1){
            titre="name project : "+name_db;
            message_avert="Local backup: Be careful, if you clear your browser history, you will lose the backup";
        } else {
            titre="nom du project : "+name_db;
            message_avert="Sauvegarde locale : Attention, si vous effacez l'historique de votre navigateur, vous perdrez les données.";
        }
        Helpmessage_2(message_avert,titre);
    }
}
function valid_save_donnees_db(){
    document.getElementById('dialogbox').style.display = "none";
    if (!save_donnees_base){
        save_donnees_base=true;
        onload_donnees_base=false;
        etape_write=0;
        etape_read=0;
    }
}

function onwrite_datas() {
    if (save_donnees_base) {
         switch (etape_write) {
            case 0 :
               name_db=document.getElementById("file_name_db").value;
                if (name_db.length<4) {
                    CustomAlert("DB name > 4 characters","db error");
                    name_db="";
                    etape_write=0;
                    save_donnees_base= false;
                } else if (name_db!="") {
                    etape_write=1;
                }
                break;
            case 1 :
                creation_base_donnees_complete();
                actualprogress=0; /* pour visu barre graph */
                multiplicateur=4,1;
                break;
            case 2 :
                if (!window.indexedDB) {
                    CustomAlert("Votre navigateur ne supporte pas une version stable d'IndexedDB. Quelques fonctionnalités ne seront pas disponibles.","db error");
                }
                delete_datas_base()
                break;
            case 3 :
                open_db_save_db();
                break;
            case 4 :
                transaction = db.transaction("diagramme", 'readwrite');
                objectStore = transaction.objectStore("diagramme");
                index_db=-1;
                etape_write=5;
                break;
            case 5 :
                index_db+=1;
                etape_write=6;
                actualprogress+=1; /* pour visu barre graph */
                affiche_progression();
                break;
            case 6 :
                save_datas();
                break;
            case 7 : /* attente fin de transaction */
                attente_fin_transaction();
                break;
            case 8 :
                index_db=0
                fermeture_db();
                etape_write=9;
                break;
            case 9 :
                actualprogress=0;
                affiche_progression();
                save_donnees_base=false;
                etape_write=0;
                break;
            case 99 :
                CustomAlert("error on DB step 99","db error");
                etape_write=7;
                save_donnees_base= false;
                break;
        }
    }
}

function read_datas_1() {
    if (!onload_donnees_base){ /* verifie si chargemnt non en cours */
        let titre=""
        if (langue==1){
            titre="Name new Project : "+name_db;
            message_avert="Action witch reset all datas";
        } else {
            titre="Nom du nouveau Projet : "+name_db;
            message_avert="Action qui réinitialise toutes les données";
        }
        CustomConfirm_1(message_avert,titre)
    }
}

function read_datas() {
    document.getElementById('dialogbox').style.display = "none";
    if(!onload_donnees_base){
            onload_donnees_base= true;
            etape_read=0;
            save_donnees_base=false;
            etape_write=0;
    }
}

function onread_datas() {
    message(String(onload_donnees_base)+" "+etape_read,String(save_donnees_base)+" "+etape_write)
    if (onload_donnees_base) {
         switch (etape_read) {
            case 0 :
                   name_db=document.getElementById("file_name_db").value;
                    if (name_db.length<4) {
                        CustomAlert("DB name > 4 characters","db error");
                        name_db="";
                        etape_read=0;
                        onload_donnees_base= false;
                    }
                    if (name_db!="") {
                        etape_read=1;
                    }
                break;
            case 1 :
                    actualprogress=0;
                    multiplicateur=10;
                    iframe_hidden=false;
                    affiche_datas_iframe();
                    remove_datas_iframe();
                    array_tasks_lecture_datas=[];
                    array_tasks=[];
                    array_tasks[0]=[];
                    transfert_datas_fini=false;
                    etape_read=2;
                break;
            case 2 :
                    if (!window.indexedDB) {
                        CustomAlert("Your browser does not support a stable version of IndexedDB. Some features will not be available.","db error");
                    }
                    try {
                        open_db();
                    } catch (e) {
                        CustomAlert(e.name + " : " + e.message,"db error");
                        etape_read=100;
                        fermeture_db();
                    }
                break;
            case 3 :
                    etape_read=4;
                    index_db=-1;
                break;
            case 4 :
                    actualprogress+=1; /* pour visu barre graph */
                    affiche_progression();
                    index_db+=1;
                    etape_read=5;
                break;
            case 5 :
                    try {
                        lecture_datas_db();
                    } catch (e) {
                        CustomAlert(e.name + " : " + e.message,"db error");
                        etape_read=100;
                        fermeture_db();
                    }
                break;
            case 6 :
                    fermeture_db();
                    recopy_array_2D();
                    ask_write_parameters=true;
                    etape_read=7;
                    actualprogress=maxprogress;
                break;
            case 7 :
                    etape_read=7;
                    transfert_datas_fini=true;
                    iframe_hidden=true;
                    affiche_datas_iframe();
                    onload_donnees_base=false;
                    actualprogress=0;
                    affiche_progression();
                break;
            case 99 :
                let texte="error open DB  : Project not found "+String(name_db)
                CustomAlert(texte,"db error");
                etape_read=7;
                break;
            case 100 :
                etape_read=0;
                transfert_datas_fini=true;
                onload_donnees_base= false;
                reset_array_tasks();
                break;
        }
    }
}

function read_all_db(){
    alert("get all");
        openrequest = window.indexedDB.getAll();
    alert("openrequest");
}