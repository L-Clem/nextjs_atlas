
# Projet Next.JS 

Projet d'API sommaire *Next.JS*.


## Run Locally

Clone the project

```bash
  git clone https://github.com/L-Clem/nextjs_atlas.git
```

Go to the project directory

```bash
  cd nextjs_atlas
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

If needed run the shell.nix file to start the dev environment
```bash
nix-shell
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Look at the `.env.exemple` if needed.

`MONGODB_URI`

## API Reference

Run the projet and go to the `/swagger` route on `http://localhost:3000``.


## Roadmap

- [x]  `/movies` - (*GET*) Récupérer tous les films
- [x]  `/movie/:idMovie` - (*GET-POST-PUT-DELETE*) Récupérer/Ajouter/Modifier/Supprimer un film via son ID
  - [x]  GET 
  - [x]  POST 
  - [x]  PUT 
  - [x]  DELETE 
- [x]  `/movie/:idMovie/comments` - (*GET*) Récupérer la liste de tous les commentaires liés à un film
- [x]  `/movie/:idMovie/comment/:idComment` - (*GET-POST-PUT-DELETE*) Récupérer/Ajouter/Modifier/Supprimer un commentaire d'un film
  - [x]  GET
  - [x]  POST
  - [x]  PUT
  - [x]  DELETE



## Related

Here are the rules:

[Projet rules](https://drive.google.com/file/d/1Qy6oFQgYrA3VOI9aXLHrypjL8ZxDF_k9/view?usp=share_link)


## Authors

- [@L-Clem](https://www.github.com/L-Clem)

