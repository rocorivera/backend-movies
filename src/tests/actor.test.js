const request = require("supertest");
const app=require('../app');
require('../models')

let id;

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get("/actors");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors creacion de actores ', async () => {
    const actor= {
        firstName: "stiven",
        lastName:"seagal",
        nationality:"American",
        image:"https://www.bing.com/th?id=OIP.ey7PdOsXLmKcZ33Y76jtgQHaGf&w=202&h=200&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
        birthday:'10-04-1952'
    }
    const res= await request(app).post('/actors').send(actor)
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);
});
test('PUT /actors/:id actualizar actor', async () => {
    const actor={
        firstName:"Steven"
    }
    const res=await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
});


test('DELETE /actors/:id elimina un actor ', async () => {
    const res= await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});
