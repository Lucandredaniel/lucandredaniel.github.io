/* Gestion fichier xml diverses */
/*==============================*/

/* appel du fichier Ficher1.xml pour lecture données */
function open_xml() {
  xhttp = new XMLHttpRequest();
  xhttp.onload = function() {myFunction(this);}
  xhttp.open("GET", nom_fichier_xml);
  xhttp.send();
}

function myFunction(xml) {
  const xmlDoc = xml.responseXML;
  const x = xmlDoc.getElementsByTagName("TACHE");
  tableau_donnees_xml[0]=[];
  for (let i = 0; i <x.length; i++) {
    tableau_donnees_xml[i].push( x[i].getElementsByTagName("ANGLAIS")[0].childNodes[0].nodeValue);
    tableau_donnees_xml[i].push( x[i].getElementsByTagName("FRANCAIS")[0].childNodes[0].nodeValue);
    tableau_donnees_xml[i+1]=[];
  }
  fin_chargement_xml=true;
}

function onread_datas_xml() {
    message(onload_file_xml,etape_read_xml);
    if (onload_file_xml) {
         switch (etape_read_xml) {
            case 0 :
                if (onload_file_xml) {
                    etape_read_xml=1;
                    fin_chargement_xml=false;
                }
                break;
            case 1 :
                try {
                    open_xml();
                    etape_read_xml=2;
                } catch (e) {
                    CustomAlert(e.name + " : " + e.message,"file XML error");
                    etape_read_xml=100;
                }
                break;
            case 2 :
                    etape_read_xml=3;
                break;
            case 3 :
                    if (fin_chargement_xml){
                        Helpmessage(tableau_donnees_xml,"HELP")
                        etape_read_xml=0;
                        onload_file_xml=false;
                    }
                break;
            case 99 :
                CustomAlert("error on xml step 99 : file not found","xml error");
                etape_write=3;
                break;
            case 100 :
                etape_write=3;
                break;
        }
    }
}

function read_xml(){
    onload_file_xml=true;
}
