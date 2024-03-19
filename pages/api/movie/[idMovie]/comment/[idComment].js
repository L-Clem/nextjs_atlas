import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";

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
                db.collection("movies").findOneAndReplace(
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
                    .collection("movies")
                    .findOneAndDelete({ _id: ObjectId(idComment) });
                res.json({ status: 200 });
            } catch (e) {
                console.log(e);
                res.json({ status: 500 });
            }
            break;
    }
}
