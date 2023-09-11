let db;
window.onload = function() {
    /* ouverture de la DB */
    let request = window.indexedDB.open('notes', 1);
    request.onerror = function() {
      message("Database failed to open","");
    };
    // la base de données a été ouverte avec succès
    request.onsuccess = function() {
      message("Database opened successfully","");
    // Stocke la base de données ouverte dans la variable db. On l'utilise par la suite
    db = request.result;
    // Exécute la fonction displayData() pour afficher les notes qui sont dans la BDD
    displayData();

    // Spécifie les tables de la BDD si ce n'est pas déjà pas fait
    request.onupgradeneeded = function(e) {
    // Récupère une référence à la BDD ouverte
    let db = e.target.result;

    // Crée un objectStore pour stocker nos notes (une table)
    // Avec un champ qui s'auto-incrémente comme clé
    let objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement:true });

    // Définit les champs que l'objectStore contient
    objectStore.createIndex('title', 'title', { unique: false });
     objectStore.createIndex('body', 'body', { unique: false });

    console.log('Database setup complete');
};

};