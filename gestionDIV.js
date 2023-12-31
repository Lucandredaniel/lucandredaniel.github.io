/* fonctions diverses */
/*====================*/


function detecte_browser(){
 let userAgent = navigator.userAgent;

 if(userAgent.match(/chrome|chromium|crios/i)){
    browserName = "chrome";
 }
 if(userAgent.match(/firefox|fxios/i)){
    browserName = "Mozilla";
 }
}

function inhibe_identity(){
    document.getElementById('essai_file').style.display = "none";
    document.getElementById('inputfile').style.display = "none";
    document.getElementById('message1').style.display = "none";
    document.getElementById('message2').style.display = "none";
    document.getElementById('test_divers').style.display = "none";
}

/* test des touches clavier */
/* ======================== */
function listen_keypress () {
    document.onkeydown = function(evt) {
        evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc");
            } else {
                isEscape = (evt.keyCode === 27);
            }
            if (isEscape) {
                affiche_datas_iframe();
            }
    }
}

/* impression du canvas */
/* ==================== */
function printCanvas()  {
    let dataUrl = document.getElementById('schema').toDataURL(); //attempt to save base64 string to server using this var
    let windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    //let printWin = window.open('','','width=340,height=260');
    const printWin = window.open("", "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.addEventListener("load",function(){
        printWin.focus();
        printWin.print();
        setTimeout(function(){
            printWin.document.close();
            printWin.close();
        },901);
    },true);
}

function affiche_texte_mineure(texte_message){
    prompt(texte_message);
}

// confirmation pour lecture donnees via DB
function CustomConfirm_1(message,title){
    let dialogbox = document.getElementById('dialogbox');
    let winH = window.innerHeight;
    //dialogoverlay.style.height = winH+"px";
    dialogbox.style.position="absolute";
    dialogbox.style.top = "120px";
    dialogbox.style.left = "500px";
    dialogbox.style.height="200px"
    dialogbox.style.width="1000px"
    //dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxhead').style.display = 'block';
    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-ok active" onclick="read_datas()">OK</button> <button class="pure-material-button-Nok active" onclick="Bpok()">NOK</button>';
}
// confirmation pour lecture donnees via PHP et fichier TXT
function CustomConfirm_2(message,title){
    // document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
    //let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    let winH = window.innerHeight;
    //dialogoverlay.style.height = winH+"px";
    dialogbox.style.position="absolute";
    dialogbox.style.top = "120px";
    dialogbox.style.left = "500px";
    dialogbox.style.height="200px"
    dialogbox.style.width="1000px"
    //dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxhead').style.display = 'block';
    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-ok active" onclick="ALfichier_txt()">OK</button> <button class="pure-material-button-Nok active" onclick="Bpok()">NOK</button>';
}

/* confirmation pour creation societe */
function validation(){
    validation_de_la_creation_societe=1;
}
function non_validation(){
    validation_de_la_creation_societe=2;
}

/* utiliser pour clear le projet en cours */
function CustomConfirm(message,title){
    // document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    let winH = window.innerHeight;
    //dialogoverlay.style.height = winH+"px";
    dialogbox.style.position="absolute";
    dialogbox.style.top = "120px";
    dialogbox.style.left = "500px";
    dialogbox.style.height="200px"
    dialogbox.style.width="1000px"
    //dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxhead').style.display = 'block';
    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-ok active" onclick="valid_clear_project()">OK</button> <button class="pure-material-button-Nok active" onclick="Bpok()">NOK</button>';
}

function CustomAlert(message,title){
    // document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    let winH = window.innerHeight;
    //dialogoverlay.style.height = winH+"px";
    dialogbox.style.position="absolute";
    dialogbox.style.top = "120px";
    dialogbox.style.left = "500px";
    dialogbox.style.height="200px"
    dialogbox.style.width="1000px"
    //dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxhead').style.display = 'block';
    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="Bpok()">OK</button>';
}

/* affichage texte pour l'aide (Help) */
/* affiche un tableau de données */
function Helpmessage(tableau,title){
    // document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    let winH = window.innerHeight;
    //dialogoverlay.style.height = winH+"px";
    dialogbox.style.position="absolute";
    dialogbox.style.top = "120px";
    dialogbox.style.left = "500px";
    dialogbox.style.height="200px"
    dialogbox.style.width="1000px"
    //dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    //document.getElementById('dialogboxhead').style.display = 'block';
    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    let texte_provisoire="";
    for (let j = 0; j <tableau.length-1; j++){
            texte_provisoire += '<DIV>'+tableau[j][langue-1]+'</DIV>';
    }
    document.getElementById('dialogboxbody').innerHTML = texte_provisoire;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="Bpok()">OK</button>';
}

/* affiche un simple message */
function Helpmessage_1(message,title){
    // document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    let winH = window.innerHeight;
    //dialogoverlay.style.height = winH+"px";
    dialogbox.style.position="absolute";
    dialogbox.style.top = "120px";
    dialogbox.style.left = "500px";
    dialogbox.style.height="200px"
    dialogbox.style.width="1000px"
    //dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    //document.getElementById('dialogboxhead').style.display = 'block';
    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="Bpok()">OK</button>';
}
/* affiche un simple message */
function Helpmessage_2(message,title){
    // document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    let winH = window.innerHeight;
    //dialogoverlay.style.height = winH+"px";
    dialogbox.style.position="absolute";
    dialogbox.style.top = "120px";
    dialogbox.style.left = "500px";
    dialogbox.style.height="200px"
    dialogbox.style.width="1000px"
    dialogbox.style.display = "block";
    //document.getElementById('dialogboxhead').style.display = 'block';
    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-ok active" onclick="valid_save_donnees_db()">OK</button> <button class="pure-material-button-Nok active" onclick="Bpok()">NOK</button>';
}

function Bpok() {
    document.getElementById('dialogbox').style.display = "none";
    //document.getElementById('dialogoverlay').style.display = "none";
}
/* laod ou save fichier sur serveur */
function cherche_fichier_serveur(message,title){
    // document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
    let dialogbox = document.getElementById('dialogbox1');
    let winH = window.innerHeight;
    //dialogoverlay.style.height = winH+"px";
    dialogbox.style.position="absolute";
    dialogbox.style.top = "120px";
    dialogbox.style.left = "500px";
    dialogbox.style.height="200px"
    dialogbox.style.width="1000px"
    dialogbox.style.display = "block";
    //document.getElementById('dialogboxhead').style.display = 'block';
    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead1').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead1').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody1').innerHTML = message;
    document.getElementById('dialogboxfoot1').innerHTML = '<button class="pure-material-button-ok active" onclick="abort_lecture_fichier()">abort</button>';
}

function save_image_png(graphe,drawing_area){
      save_img_canvas.addEventListener('click', function(e) {
          console.log(drawing_area.toDataURL());
          const link = document.createElement('a');
          link.save_img_canvas = 'download.png';
          link.href = drawing_area.toDataURL();
          link.click();
          link.delete;
    });
}

function affiche_progression(){
  let progressnum = document.getElementById("progressnum");
  let indicator = document.getElementById("indicator");
  let visu= actualprogress*multiplicateur;
  let pwidget=document.getElementById("pwidget");
  message_divers(String(actualprogress),String(etape_read)+" : "+String(etape_write))
  if ((etape_read!=0)||(etape_write!=0)||(actualprogress>0)){
    pwidget.style.display = "block";
  }else{
    pwidget.style.display = "none";
  }
  if (visu>maxprogress) {actualprogress=1 };
  indicator.style.width=visu + "px";
  progressnum.innerHTML = actualprogress;
  if(actualprogress == maxprogress) { clearInterval(itv)};
}

function affiche_donnes_diverses() { /* fonction qui affiche des donnes diverses pour debug */
    let loc=location.origin
    let texte_lla="Freelance EXPERTISE :      Python, HTML, CSS, Javascript, PHP, RobotFrameWork, IndexedDB  \\ développement et maintenance soft"
    CustomAlert(texte_lla,"V1.1 - Contact : luc.lassalle@sfr.fr")
    //alert(array_tasks_display_save);
}

function message_divers(text_message1,text_message2){
    if (text_message1!= "" )  {
        area_draw = document.getElementById("message1");
        area_draw.value=text_message1 ;
    }
    if (text_message2!="")  {
        area_draw = document.getElementById("message2");
        area_draw.value=text_message2 ;
    }
}

 function init_exemple(){
        array_tasks=[];
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task1[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task2[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task3[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task4[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task5[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task6[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task7[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task8[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task9[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task10[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task11[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task12[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task13[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task14[i]) ;
        }
        array_tasks.push([]); /* ajout d'une tache  */
        for (let i = 0; i < (number_datas_in_array); i++) {
            array_tasks[array_tasks.length-1].push(array_one_task15[i]) ;
        }
        recopy_array_2D();
}
