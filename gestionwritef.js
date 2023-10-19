/* lancement fonction en automatique de façon repetitive */
/* ===================================================== */

function mise_en_forme_tableau(index){
    tableau_en_forme=""
    for (let i = 0; i < base_donnees_complete[index].length; i++) {
        tableau_en_forme=tableau_en_forme+base_donnees_complete[index][i]+",";
    }
}

function AAEfichier(){
    ensemble_tableau=""
    creation_base_donnees_complete();
    etape_write=2; // etape pour DB RAZ
    let tableau_int=""
    echange_datas_ecriture=true;
    etape_write_php=0;
    /* initialise le tableau de données a transmettre */
    let index=0;
    for (let i = 0; i < base_donnees_complete.length; i++) {
        mise_en_forme_tableau(i);
        ensemble_tableau=ensemble_tableau+"l"+String(i)+"="+tableau_en_forme;
        if (i<base_donnees_complete.length-1){
            ensemble_tableau=ensemble_tableau+"&";
        }
    }
}