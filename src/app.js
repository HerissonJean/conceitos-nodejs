const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    const {id} = request.params;

   return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { title, url, techs} = request.body;

     const repository = {
      id: uuid() ,
      title,
      url,
      techs,
      likes: 0,
    }
    repositories.push(repository);

    return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { title, url, techs} = request.body;

    const index = repositories.findIndex(repository => repository.id = id);

    if(index >= 0){
      repositories[index] = {
        id ,title, url, techs,
      }
    };

});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;

    const reposIndex = repositories.findIndex(rep => rep.id == id);

    if(reposIndex >=0 ){
          repositories.slice(reposIndex,1);
    }else{
          return response.status(400).json({error: 'not found'});
    }

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
