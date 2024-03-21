import clientPromise from "../../../lib/mongodb";
import { verifyMovie } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
* @swagger
* /api/movie/{idMovie}:
*   get:
*     tags:
*       - movie
*     summary: Get movie details
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ObjectID of the movie to retrieve.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Movie details.
*   put:
*     tags:
*       - movie
*     summary: Update movie details
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ObjectID of the movie to update.
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: string
*     responses:
*       200:
*         description: Movie updated.
*   delete:
*     tags:
*       - movie
*     summary: Delete movie
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ObjectID of the movie to delete.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Movie deleted.
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const body = req.body;
    const db = client.db("sample_mflix");
    const idMovie = req.query.idMovie;

    switch (req.method) {
        case "GET":
            try {
                let dbMovie = await db
                    .collection("movies")
                    .findOne({ _id: ObjectId(idMovie) });
                res.json({ status: 200, data: dbMovie });
            } catch (e) {
                console.log(e);
                res.json({ status: 500 });
            }
            break;

        case "PUT":
            let replacement = body;
            delete replacement._id;

            try {
                db.collection("movies").findOneAndReplace(
                    { _id: new ObjectId(idMovie) },
                    replacement
                );
                res.json({ status: 200 });
            } catch (e) {
                console.log(replacement);
                console.log(e);
                res.json({ status: 500 });
            }
            break;

        case "DELETE":
            try {
                let dbMovie = await db
                    .collection("movies")
                    .findOneAndDelete({ _id: ObjectId(idMovie) });
                res.json({ status: 200 });
            } catch (e) {
                console.log(e);
                res.json({ status: 500 });
            }
            break;
    }
}
