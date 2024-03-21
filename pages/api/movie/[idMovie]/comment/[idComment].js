import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
* @swagger
* /api/movie/{idMovie}/comment/{idComment}:
*   get:
*     tags:
*       - comment
*     summary: Obtain movie's comment details
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ObjectID of the movie to retrieve a comment from.
*         schema:
*           type: string
*       - in: path
*         name: idComment
*         required: true
*         description: ObjectID of the movie's comment to retrieve.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Your movie's comment has been inserted.
*   put:
*     tags:
*       - comment
*     summary: Update movie comment details
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ObjectID of the movie to retrieve a comment from.
*         schema:
*           type: string
*       - in: path
*         name: idComment
*         required: true
*         description: ObjectID of the movie's comment to retrieve.
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
*         description: Your movie's comment has been inserted.
*   delete:
*     tags:
*       - comment
*     summary: Delete movie comment
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ObjectID of the movie to retrieve a comment from.
*         schema:
*           type: string
*       - in: path
*         name: idComment
*         required: true
*         description: ObjectID of the movie's comment to retrieve.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Your movie's comment has been inserted.
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const body = req.body;
    const db = client.db("sample_mflix");
    const idComment = req.query.idComment;
    console.log(idComment)

    switch (req.method) {
        case "GET":
            try {

                let dbComment = await db
                    .collection("comments")
                    .findOne({ _id: new ObjectId(idComment) });
                res.json({ status: 200, data: dbComment });
            } catch (e) {
                console.log(e);
                res.json({ status: 500 });
            }
            break;

        case "PUT":
            let replacement = body;
            delete replacement._id;
            
            try {
                db.collection("comments").findOneAndReplace(
                    { _id: new ObjectId(idComment) },
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
                let dbComment = await db
                    .collection("comments")
                    .findOneAndDelete({ _id: ObjectId(idComment) });
                res.json({ status: 200 });
            } catch (e) {
                console.log(e);
                res.json({ status: 500 });
            }
            break;
    }
}
