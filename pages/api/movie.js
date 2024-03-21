import clientPromise from "../../lib/mongodb";


/**
* @swagger
* /api/movie:
*   post:
*     tags:
*       - movie
*     summary: Insert a new movie
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: string
*     responses:
*       200:
*         description: Your movie has been inserted.
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
                let dbMovie = await db.collection("movies").insertOne(document);
                res.json({ status: 200, data: dbMovie });
            } catch (e) {
                console.log(e);
                res.json({ status: 500 });
            }
            break;
    }
}
