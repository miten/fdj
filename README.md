# fdj


FRONT:

La partie front est gérée avec Angular 15, pour gérer le state de l'application j'utilise un store et des observables.

Le site est entièrement responsive desktop/mobile, le design à été réalisé avec tailwind css

J'ai choisi de requêter les données à chaque changement de page mais bien sur j'aurais pû ne le faire qu'une seule fois à l'initialisation du site.
Pareil pour les querys de la barre de recherche j'aurais pû filtrer depuis le front avec les données initialement requêtées mais j'ai choisi de toujours m'adresser à l'API.

Lors des requêtes vers l'API, j'ai fait exprès de rajouter du temps de réponse serveur de 3sec, afin de simuler une mauvaise connection, cela affiche un skeleton
pour prévenir l'utilisateur du chargement des données  

Comme demandé, la gestion des erreurs est prise en compte:
Une page 404 est affichée si une url est mauvaise (ex: localhost:4200/xxx).
Par contre pop up s'affichera avec le code d'erreur et le message, si l'erreur vient du back (ex: mauvaise url API, error 500)

J'ai ajouté la possibilité de lister et de query l'ensemble des joueurs et d'ajouter un joueur à une team ( via le bouton + sur la liste des joueurs ) . 

Après avoir tapé le nom du joueur j'ai ajouté la possibilité de choisir une thumbnail dans une liste d'image générée par une API cliente externe qui 
est appelée via l'API fdj.


BACK:

La partie back est gérée avec le framework NESTJS 9

Le nom de la database est à renseigner à la ligne 11 du app.module.ts (par défault 'fdj') les nom des collections sont : leagues, players et teams.

Pour lancer le serveur lancer la commande: npm run start

Pour la sécurité de l'application j'utilise des DTO sur les requêtes de GET/query et de POST, le meilleur est de visiter le swagger de l'API mis en place: localhost:3000/swagger

Les requêtes de get/:id renvoient une erreur notFound si l'Id n'est pas valide, la requête post renvoie les raisons de l'echec du post si le post n'est pas valide
