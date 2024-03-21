import clientPromise from "../../../../lib/mongodb";

/**
* @swagger
* /api/movie/{idMovie}/comment:
*   post:
*     tags:
*       - comment
*     summary: Insert a new movie comment
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ObjectID of the movie to retrieve comments from.
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
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const body = req.body;
    const db = client.db("sample_mflix");

    switch (req.method) {
        case "POST":
            let document = body;
            delete document._id;

            try {
                let dbComment = await db.collection("comments").insertOne(document);
                res.json({ status: 200, data: dbComment });
            } catch (e) {
                console.log(e);
                res.json({ status: 500 });
            }
            break;
    }
}
