const request= require("supertest");
const app = require('../app');
const Director = require("../models/Director");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
require('../models')

let id;

test('GET /movies debe lamar a todas las peliculas', async () => {
    const res= await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear nuevas peliculas', async () => {
    const movie= {
        name:"doctor strange",
        image:"https://th.bing.com/th?id=OIP.u1As7tNqwHJH7g90K2EkEQHaK9&w=80&h=80&c=1&vt=10&bgcl=970f92&r=0&o=6&pid=5.1",
        synopsis:"Doctor Strange is a Marvel movie that follows the story of Dr. Stephen Strange, a talented neurosurgeon who, after a tragic car accident, is left permanently unable to operate12. He becomes determined to find a cure and pursues experimental surgeries to heal his hands1. Strange eventually discovers a hidden world of mysticism and alternate dimensions, and must put his ego aside to learn its secrets3." ,
        releaseYear:2001
    }
    const res = await  request(app).post('/movies').send(movie)
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id actualiza peliculas', async () => {
    const movie={
        name:"Doctor Strange"
    }
    const res= await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name); 
});

test('POST /movies/:id/genres agregar el genero a las peliculas', async () => {
    const genre= await Genre.create({
        name:"ciencia"
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});


test('POST /movies/:id/actors agregar los actores de las peliculas', async () => {
    const actor= await Actor.create({
        firstName: "stiven",
        lastName:"seagal",
        nationality:"American",
        image:"https://www.bing.com/th?id=OIP.ey7PdOsXLmKcZ33Y76jtgQHaGf&w=202&h=200&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
        birthday:'10-04-1952'
    })
    const res= await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors debe ingresar el director de las peliculas', async () => {
    const director= await Director.create({
        firstName: "scott",
        lastName:"derickson",
        nationality:"american",
        image:"https://th.bing.com/th?id=OSK.8388326c9ddd8bd630c0a65a84f09438&w=46&h=46&c=12&rs=1&qlt=80&o=6&dpr=2&pid=SANGAM",
        birthday:'1966/7/16'
    })
    console.log(director)
   
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
   
    await director.destroy()
    expect(res.status).toBe(200);
   expect(res.body).toHaveLength(1);
});



test('DELETE /movies/:id elimina una pelicula', async () => {
    const res = await request(app).delete('/movies/'+id)
    expect(res.status).toBe(204);
});
