<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="https://github.com/Mouhamadou-Soumare/SportSyncFinal/blob/master/backend/public/assets/sportSyncLogo2.png" alt="SportSync" width="100"></a>
  <br>
  SportSync
  <br>
</h1>

<h4 align="center">SportSync - La meilleur app pour suivre vos sports préférés  .</h4>



![screenshot](https://github.com/Mouhamadou-Soumare/SportSyncFinal/blob/master/backend/public/assets/sportsyncdemo.png)



## Comment utiliser ce projet

Pour cloner et exécuter cette application, vous aurez besoin de [Git](https://git-scm.com) et de [Node.js](https://nodejs.org/fr/download/) (qui inclut [npm](http://npmjs.com)) installés sur votre ordinateur. À partir de votre ligne de commande :

```bash
# Clonez ce dépôt.
$ git clone https://github.com/Mouhamadou-Soumare/sportsync

# Accédez au Backend
$ cd backend

$ npm install

$ npm run start

# Accédez au Front
$ cd front

$ npm install

$ npm run start
```


## Fonctionnalités et pages

L'application comprends les différentes pages suivantes:

- /: Page d'accueil affichant les dernières actualités.
- /allnews: Page affichant toutes les actualités disponibles.
- /news/:id: Page affichant les détails d'une actualité spécifique.
- /adminlogin: Page de connexion pour les administrateurs. Utilisez les identifiants admin et password!
- /gestion-actus: Page de tableau de bord pour la gestion des actualités.
- /modif-actus/:id: Page de formulaire pour modifier une actualité spécifique.
- /classements : Page affichant le classements des championnats européens 
- /alltopscorers : Page affichant le classements des meilleurs buteurs toutes compétitions confondues 
- /allfixtures : Page affichant les matchs de la journée en cours
- /contact : Page de contact
- 404: Page d'erreur 404




## API

Cette application utilise l'API Football pour obtenir les matchs en direct et les classements. L'API Football est une API de données sportives fournissant des informations sur les matchs, les équipes, les compétitions et bien plus encore. Pour plus d'informations sur l'API Football, veuillez consulter leur documentation officielle : [https://www.api-football.com/](https://www.api-football.com/).
