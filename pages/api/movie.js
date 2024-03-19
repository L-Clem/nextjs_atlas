import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const body = req.body;
    const db = client.db("sample_mflix");

    switch (req.method) {
        case "POST":
            let document = body;

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
