    //
    db.departements.ensureIndex({
        sigle: -1
    });
db.departements.ensureIndex({sigle:1},{unique:true});
    print("departements indexes OK...");
    //
    db.persons.ensureIndex({
        username: 1},{unique:true}
    );
    db.persons.ensureIndex({
        lastname: 1
    });
    db.persons.ensureIndex({
        firstname: 1
    });
    db.persons.ensureIndex({
        email: 1
    });
    db.persons.insert({type:'person',username:'admin',
            password:'eb2b7a4cdb39d84c45261dac74bc8116',lastname:'SYSTSEM',   firstname:'Administrator',
            roles:['super','admin','oper','prof','etud','reader']});
    print("persons indexes OK...");
//
    db.personinfos.ensureIndex({personid:1},{unique:true});
    //
    db.administrators.ensureIndex({
        departementid: 1
    });
    db.administrators.ensureIndex({
        personid: 1
    });
    db.administrators.ensureIndex({
        departementid: 1,
        personid: 1
    }, {
        unique: true,
        dropDups: true
    });
    print("administrators indexes OK...");
    //
    db.enseignants.ensureIndex({
        departementid: 1
    });
    db.enseignants.ensureIndex({
        personid: 1
    });
     db.enseignants.ensureIndex({
        departementid: 1,
        personid: 1
    }, {
        unique: true,
        dropDups: true
    });
    print("enseignants indexes OK...");
    //
    db.etudiants.ensureIndex({
        departementid: 1
    });
    db.etudiants.ensureIndex({
        personid: 1
    });
     db.etudiants.ensureIndex({
        departementid: 1,
        personid: 1
    }, {
        unique: true,
        dropDups: true
    });
    db.etudiants.ensureIndex({
        sexe: 1
    });
    db.etudiants.ensureIndex({
        seriebac: 1
    });
    db.etudiants.ensureIndex({
        optionbac: 1
    });
    db.etudiants.ensureIndex({
        mentionbac: 1
    });
    db.etudiants.ensureIndex({
        etudessuperieures: 1
    });
    db.etudiants.ensureIndex({
        redoublant: 1
    });
    db.etudiants.ensureIndex({
        dossier: 1
    });
    db.etudiants.ensureIndex({
        apb: 1
    });
    db.etudiants.ensureIndex({
        avisce: 1
    });
    db.etudiants.ensureIndex({
        etablissement: 1
    });
    db.etudiants.ensureIndex({
        ville: 1
    });
    print("etudiants indexes OK...");
    //
    db.annees.ensureIndex({
        departementid: 1
    });
    db.annees.ensureIndex({
        sigle: -1
    });
    db.annees.ensureIndex({
        departementid: 1,
        sigle: -1
    }, {
        unique: true,
        dropDups: true
    });
    db.annees.ensureIndex({
        startdate: -1
    });
    db.annees.ensureIndex({
        enddate: -1
    });
    db.annees.ensureIndex({
        attributes: 1
    });
    print("annees indexes OK...");
    //
    db.semestres.ensureIndex({
        anneeid: -1
    });
    db.semestres.ensureIndex({
        departementid: 1
    });
    db.semestres.ensureIndex({
        sigle: -1
    });
     db.semestres.ensureIndex({
        anneeid: 1,
        sigle: -1
    }, {
        unique: true,
        dropDups: true
    });
    db.semestres.ensureIndex({
        startdate: -1
    });
    db.semestres.ensureIndex({
        enddate: -1
    });
    print("semestres indexes OK...");
    //
    db.groupes.ensureIndex({
        departementid: 1
    });
    db.groupes.ensureIndex({
        sigle: 1
    });
    db.groupes.ensureIndex({
        departementid: 1,
        sigle: 1
    }, {
        unique: true,
        dropDups: true
    });
    print("groupes indexes OK...");
    //
    db.unites.ensureIndex({
        departementid: 1
    });
    db.unites.ensureIndex({
        sigle: 1
    });
     db.unites.ensureIndex({
        departementid: 1,
        sigle: 1
    }, {
        unique: true,
        dropDups: true
    });
    print("unites indexes OK...");
    //
    db.matieres.ensureIndex({
        uniteid: 1
    });
    db.matieres.ensureIndex({
        departementid: 1
    });
    db.matieres.ensureIndex({
        sigle: 1
    });
     db.matieres.ensureIndex({
        uniteid: 1,
        sigle: 1
    }, {
        unique: true,
        dropDups: true
    });
    db.matieres.ensureIndex({
        genre: 1
    });

    print("matieres indexes OK...");
    //
    db.profaffectations.ensureIndex({
        enseignantid: 1
    });
    db.profaffectations.ensureIndex({
        personid: 1
    });
    db.profaffectations.ensureIndex({
        semestreid: -1
    });
    db.profaffectations.ensureIndex({
        groupeid: 1
    });
    db.profaffectations.ensureIndex({
        matiereid: 1
    });
    db.profaffectations.ensureIndex({
        departementid: 1
    });
    db.profaffectations.ensureIndex({
        anneeid: -1
    });
    db.profaffectations.ensureIndex({
        startdate: -1
    });

    print("profaffectations indexes OK...");
    //
    db.etudaffectations.ensureIndex({
        etudiantid: 1
    });
    db.etudaffectations.ensureIndex({
        personid: 1
    });
    db.etudaffectations.ensureIndex({
        semestreid: -1
    });
    db.etudaffectations.ensureIndex({
        groupeid: 1
    });
    db.etudaffectations.ensureIndex({
        departementid: 1
    });
    db.etudaffectations.ensureIndex({
        anneeid: -1
    });
    db.etudaffectations.ensureIndex({
        stardate: -1
    });

    print("affectations indexes OK...");
    //
    db.groupeevents.ensureIndex({
        date: -1
    });
    db.groupeevents.ensureIndex({
        genre: -1
    });
    db.groupeevents.ensureIndex({
        name: 1
    });
    db.groupeevents.ensureIndex({
        profaffectionid: -1
    });
    db.groupeevents.ensureIndex({
        enseignantid: -1
    });
    db.groupeevents.ensureIndex({
        semestreid: -1
    });
    db.groupeevents.ensureIndex({
        anneeid: -1
    });
    db.groupeevents.ensureIndex({
        departementid: -1
    });

    print("groupeevents indexes OK...");
    //
    db.etudiantevents.ensureIndex({
        groupeeventid: 1
    });
    db.etudiantevents.ensureIndex({
        etudiantid: 1
    });
    db.etudiantevents.ensureIndex({
        personid: 1
    });
    db.etudiantevents.ensureIndex({
        groupeid: 1
    });
    db.etudiantevents.ensureIndex({
        departementid: 1
    });
    db.etudiantevents.ensureIndex({
        semestreid: -1
    });
    db.etudiantevents.ensureIndex({
        anneeid: -1
    });
    db.etudiantevents.ensureIndex({
        photoid: 1
    });
    db.etudiantevents.ensureIndex({
        genre: 1
    });

    print("etudiantevents indexes OK...");
    //
    db.attacheddocs.ensureIndex({
        genre: 1
    });
    db.attacheddocs.ensureIndex({
        name: 1
    });

    print("attacheddocs indexes OK...");
    //
    db.datasets.ensureIndex({sigle: 1},{unique:true});
    db.datasets.ensureIndex({
        attributes: 1
    });
    print("datasets indexes OK...");
    //
    db.indivs.ensureIndex({
        datasetid: 1
    });
    db.indivs.ensureIndex({
        sigle: 1
    });
     db.indivs.ensureIndex({
        datasetid: 1,
        sigle: 1
    }, {
        unique: true,
        dropDups: true
    });

    db.indivs.ensureIndex({
        attributes: 1
    });
    print("indivs indexes OK...");
    //
    db.variables.ensureIndex({
        datasetid: 1
    });
    db.variables.ensureIndex({
        sigle: 1
    });
    db.variables.ensureIndex({
        datasetid: 1,
        sigle: 1
    }, {
        unique: true,
        dropDups: true
    });
    db.variables.ensureIndex({
        attributes: 1
    });
    print("variables indexes OK...");
    //
    db.valeurs.ensureIndex({
        variableid: 1
    });
    db.valeurs.ensureIndex({
        individ: 1
    });
    db.valeurs.ensureIndex({
        datasetid: 1
    });
    db.valeurs.ensureIndex({
        variableid: 1,
        individ: 1
    }, {
        unique: true,
        dropDups: true
    });
    db.valeurs.ensureIndex({
        attributes: 1
    });
    print("valeurs indexes OK...");
