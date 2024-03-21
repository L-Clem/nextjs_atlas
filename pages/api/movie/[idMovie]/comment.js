import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const body = req.body;
    const db = client.db("sample_mflix");

    switch (req.method) {
        case "POST":
            let document = body;

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
