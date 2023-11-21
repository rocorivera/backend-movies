const request=require("supertest");
const app=require('../app');
require('../models')

let id;


test('GET /directors trae a todos los directores ', async () => {
    const res=await request(app).get("/directors");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors crea nuevos directores', async () => {
    const director= {
        firstName: "scott",
        lastName:"derickson",
        nationality:"american",
        image:"https://th.bing.com/th?id=OSK.8388326c9ddd8bd630c0a65a84f09438&w=46&h=46&c=12&rs=1&qlt=80&o=6&dpr=2&pid=SANGAM",
        birthday:'1966/7/16'
    }
    const res = await request(app).post('/directors').send(director)
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
});

test('PUT /directors/:id actualizamos el director', async () => {
    const director={
        firstName:"Scott"
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});

test('DELETE /directors/:id elimina el director', async () => {
    const res=await request(app).delete(`/directors/${id}`);
    console.log(res.body)
    expect(res.status).toBe(204);
});