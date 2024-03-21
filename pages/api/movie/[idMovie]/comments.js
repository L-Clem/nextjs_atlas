import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
* @swagger
* /api/movie/{idMovie}/comments:
*   get:
*     tags:
*       - comments
*     summary: Returns all movie comments.
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ObjectID of the movie to retrieve comments from.
*         schema:
*           type: string
*     responses:
*       200:
*         description: All your movies list.
*/
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const idMovie = req.query.idMovie;
  console.log(idMovie)

  switch (req.method) {
    case "GET":
      try {
        let dbComments = await db
          .collection("comments")
          .find({ "movie_id": ObjectId(idMovie) })
          .toArray();
        res.json({ status: 200, data: dbComments });
      } catch (e) {
        console.log(e);
        res.json({ status: 500 });
      }
      break;
  }
}
