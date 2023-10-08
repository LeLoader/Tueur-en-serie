"use strict";

class Tueur{
    constructor(){
        this.name = "Jason";
        this.hp = 100;
    }

    AttackSurvivor(){
        let index = Math.floor(Math.random()*survivorsAlive.length);
        let random = Math.random();
        if (random < 0.2){
            console.log(`${this.name} attaque et tue ${survivorsAlive[index].name}.`);
            survivorsDead.push(survivorsAlive[index]); //ajoute le mort à la liste des morts pour garder ses stats, pas seulement le nom
            survivorsAlive.splice(index, 1); //retire le mort de la liste des vivants
        }
        else if (0.2 < random && random < 0.5){
            console.log(`${this.name} attaque et tue ${survivorsAlive[index].name} mais perd 15 hp.`);
            this.hp -= 15;
            survivorsAlive[index].damageDone += 15;
            survivorsDead.push(survivorsAlive[index]);
            survivorsAlive.splice(index, 1);

        }
        else {
            console.log(`${this.name} attaque ${survivorsAlive[index].name} mais perd 10 hp.`);
            this.hp -= 10;
            survivorsAlive[index].damageDone += 10;
        }
    }
}

class Survivant{
    constructor(){
        this.name = this.ChooseName();
        this.attribute = this.ChooseAttribute();
        this.damageDone = 0;
    }
    ChooseName(){
        let index = Math.floor(Math.random()*survivorNames.length);
        let name = survivorNames[index]; 
        survivorNames.splice(index, 1); //Enlève le nom qui va être utilisé
        return name;
    }

    ChooseAttribute(){
        let index = Math.floor(Math.random()*survivorAttributes.length);
        let attribute = survivorAttributes[index];
        survivorAttributes.splice(index, 1); //Enlève l'attribut qui va être utilisé
        return attribute;
    }
}
//init variables
let survivorNames = ["Dwight Fairfield", 'William "Bill" Overbeck', "David King", "Jake Park", "Nicolas Cage", "David Tapp", "Ace Visconti", "Quentin Smith", "Adam Francis", 'Jeffrey "Jeff" Johansen'];
let survivorAttributes = ["Meneur nerveux", "Survivaliste solitaire", "Parieur chanceux", "Vieux soldat", "Ferrailleur endurci", "Detective déterminé", "Professeur plein de ressource", "Architècte visionnaire", "Jeune agent de police", "Brillant biologiste marin"];
let survivorsAlive = [];
let survivorsDead = [];
let killer = new Tueur(); 

function Main(){
    InitSurvivor();
    console.log(`Un tueur en série nommé ${killer.name} est en cavale. Il est caché quelque part en forêt. Une équipe de choc est présente pour le neutraliser.`)
    while (killer.hp > 0 && survivorsAlive.length > 0){ //conditions victoire (hp du tueur supérieur à 0) / défaite (plus de survivant en vie)
        killer.AttackSurvivor();
    }
    console.log("");
    End();
}

function InitSurvivor(){ //Init des survivants
    for (let i=0; i<5; i++){ 
        survivorsAlive.push(new Survivant()) 
    }
}

function End(){
    if (killer.hp <= 0 && survivorsAlive.length != 0){
        console.log(`${killer.name} s'est fait tuer par les survivants.\nIl aura tué:`);
        survivorsDead.forEach((survivant) => {
            if (survivant.damageDone != 0){ //singulier/pluriel
                console.log(`${survivant.name}, qui lui à fait ${survivant.damageDone} dégats au cours de la chasse.`);
            }
            else{
                console.log(`${survivant.name}, qui lui à fait ${survivant.damageDone} dégat au cours de la chasse. (noob)`);
            }
        });
    }
    else if (killer.hp >= 0 && survivorsAlive.length == 0){
        console.log(`${killer.name} a tué tous les survivants, avec encore ${killer.hp} hp.\nIl aura tué:`)
        survivorsDead.forEach((survivant) => {
            if (survivant.damageDone != 0){ //singulier/pluriel
                console.log(`${survivant.name}, qui lui à fait ${survivant.damageDone} dégats au cours de la chasse.`);
            }
            else{
                console.log(`${survivant.name}, qui lui à fait ${survivant.damageDone} dégat au cours de la chasse. (noob)`);
            }
            
        });
    }
    else{
        console.log(`Dans un dernier combat, ${survivorsDead[4].name} et ${killer.name} s'entretueront, ne laissant personne en vie.\n${killer.name} aura tué:`); //survivorsDead[4] correspond au dernier objet ajouté à la liste = le dernier survivant
        survivorsDead.forEach((survivant) => {
            if (survivant.damageDone != 0){ //singulier/pluriel
                console.log(`${survivant.name}, qui lui à fait ${survivant.damageDone} dégats au cours de la chasse.`);
            }
            else{
                console.log(`${survivant.name}, qui lui à fait ${survivant.damageDone} dégat au cours de la chasse. (noob)`);
            }
        });
    }
}

Main();
