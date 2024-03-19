import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/movie/[id]/comments:
 *   get:
 *     description: Returns all movies
 *     responses:
 *       200:
 *         description: You got your movies list
 */
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const idMovie = req.query.idMovie;

  switch (req.method) {
    case "GET":
      try {
        let dbComments = await db
          .collection("comments")
          .find({ movie_id: ObjectId(idMovie) });
        res.json({ status: 200, data: dbComments });
      } catch (e) {
        console.log(e);
        res.json({ status: 500 });
      }
      break;
  }
}
