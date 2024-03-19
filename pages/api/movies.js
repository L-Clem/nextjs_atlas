import clientPromise from "../../lib/mongodb";

/**
* @swagger
* /api/movies:
*   get:
*     description: Returns all movies
*     responses:
*       200:
*         description: You got your movies list
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db.collection("movies").find({}).limit(10).toArray();
    res.json({ status: 200, data: movies });
}