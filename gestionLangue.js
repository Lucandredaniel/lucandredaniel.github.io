/* choix d 'affichage de la langue (sous Anglais soit Français) */

let array_langue=[];
let array_langue_iframe=[];

function changement_langue_iframe(){
    document.getElementById("page2").contentWindow.document.getElementById(array_langue_iframe[5][0]).innerHTML=array_langue_iframe[5][langue];
    document.getElementById("page2").contentWindow.document.getElementById(array_langue_iframe[6][0]).innerHTML=array_langue_iframe[6][langue];
    document.getElementById(array_langue_iframe[0][0]).innerHTML=array_langue_iframe[0][langue];
    document.getElementById("page2").contentWindow.document.getElementById("T1").innerHTML=array_langue_iframe[7][langue];
    document.getElementById("page2").contentWindow.document.getElementById("T2").innerHTML=array_langue_iframe[8][langue];
    document.getElementById("page2").contentWindow.document.getElementById("T3").innerHTML=array_langue_iframe[9][langue];
    document.getElementById("page2").contentWindow.document.getElementById("T4").innerHTML=array_langue_iframe[10][langue];
    let element_a_modifier=window.parent.document.getElementById("display_datas");
    element_a_modifier.innerHTML=array_langue[8][langue];
}

function langue_Anglaise(){
    langue=1;
    if (!affiche_une_seule_tache){
        affiche_datas(0);
    }else{
        affiche_une_tache_specifique(numero_de_la_tache_a_afficher);
    }
    affichage_langue()
    changement_langue_iframe();
};
function langue_Francaise(){
    langue=2;
    if (!affiche_une_seule_tache){
        affiche_datas(0);
    }else{
        affiche_une_tache_specifique(numero_de_la_tache_a_afficher);
    }
    affichage_langue()
    changement_langue_iframe();
};

function init_langue(){
    /* para1=id para2=langue1, para2=langue2 */
    /*============================ texte sur page HTML page 1 ==================*/
    array_langue.push([]); /* ================= */
    array_langue[0].push("entete_page1");
    array_langue[0].push("Chart");
    array_langue[0].push("Diagramme");
    array_langue.push([]); /* ================= */
    array_langue[1].push("essai_task");
    array_langue[1].push("About");
    array_langue[1].push("Contact");
    array_langue.push([]); /* ================= */
    array_langue[2].push("text1");
    array_langue[2].push("today 's date.");
    array_langue[2].push("date. du. jour");
    array_langue.push([]); /* ================= */
    array_langue[3].push("text2");
    array_langue[3].push("Project. start.");
    array_langue[3].push("Debut projet.");
    array_langue.push([]); /* ================= */
    array_langue[4].push("newproject");
    array_langue[4].push("new project.");
    array_langue[4].push("reset projet");
    array_langue.push([]); /* ================= */
    array_langue[5].push("text3");
    array_langue[5].push("Name. project.");
    array_langue[5].push("Nom du projet");
    array_langue.push([]); /* ================= */
    array_langue[6].push("write_db");
    array_langue[6].push("save datas");
    array_langue[6].push("sauvegarde donnees");
    array_langue.push([]); /* ================= */
    array_langue[7].push("read_db");
    array_langue[7].push("read datas");
    array_langue[7].push("Charge donnees");
    array_langue.push([]); /* ================= */
    array_langue[8].push("display datas ");
    array_langue[8].push("hide datas");
    array_langue[8].push("cache les donnees");
    array_langue[8].push("display datas");
    array_langue[8].push("affiche les donnees");
    array_langue.push([]); /* ================= */
    array_langue[9].push("text4");
    array_langue[9].push("row display");
    array_langue[9].push("affiche ligne");
    array_langue.push([]); /* ================= */
    array_langue[10].push("text5");
    array_langue[10].push("column display");
    array_langue[10].push("affiche colonne");
    array_langue.push([]); /* ================= */
    array_langue[11].push("text6");
    array_langue[11].push("width name task.");
    array_langue[11].push("espace nom tache");
    array_langue.push([]); /* ================= */
    array_langue[12].push("text7");
    array_langue[12].push("letter size task");
    array_langue[12].push("Zoom nom taches.");
    array_langue.push([]); /* ================= */
    array_langue[13].push("text8");
    array_langue[13].push("gap between columns.");
    array_langue[13].push("largeur des colonnes");
    array_langue.push([]); /* ================= */
    array_langue[14].push("text9");
    array_langue[14].push("gap between. rows.");
    array_langue[14].push("largeur des lignes");
    array_langue.push([]); /* ================= */
    array_langue[15].push("Help");
    array_langue[15].push("Help");
    array_langue[15].push("aide");
    /*============================ texte dans Iframe ==================*/
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[0].push("entete_iframe");
    array_langue_iframe[0].push("Set task");
    array_langue_iframe[0].push("parametres taches");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[1].push("label_milestone");
    array_langue_iframe[1].push("- milestone  :");
    array_langue_iframe[1].push("- tache jalon:");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[2].push("label_downstream_task");
    array_langue_iframe[2].push("- downstream task");
    array_langue_iframe[2].push("- tache suivante .: ");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[3].push("label_upstream_task");
    array_langue_iframe[3].push("- upstream task:");
    array_langue_iframe[3].push("- tache. amont :");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[4].push("label_principal_task");
    array_langue_iframe[4].push("- principal task :");
    array_langue_iframe[4].push("-tache principale:");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[5].push("bouton_Iframe");
    array_langue_iframe[5].push("New Task");
    array_langue_iframe[5].push("ajout tache");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[6].push("SET_start_tasks");
    array_langue_iframe[6].push("Calcul start tasks");
    array_langue_iframe[6].push("Recalcul début tache");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[7].push("T1");
    array_langue_iframe[7].push("definition");
    array_langue_iframe[7].push("definition");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[8].push("T2");
    array_langue_iframe[8].push("start task.");
    array_langue_iframe[8].push("début tache");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[9].push("T3");
    array_langue_iframe[9].push("delay");
    array_langue_iframe[9].push("durée");
    array_langue_iframe.push([]); /* ================= */
    array_langue_iframe[10].push("T4");
    array_langue_iframe[10].push("Gap");
    array_langue_iframe[10].push("Ecart");
}

function affichage_langue(){
    for (let i = 0; i < (array_langue.length); i++){
        try {
            if (i!=8){
                let identificateur1=array_langue[i][0];
                document.getElementById(identificateur1).innerHTML=array_langue[i][langue];
            }
        }
        catch (err){
            let texte=" err = "+String(err);
            alert(texte+" : "+i + " ident : "+array_langue[i][0]+" : "+array_langue[i][langue]);
        }
    }
}
