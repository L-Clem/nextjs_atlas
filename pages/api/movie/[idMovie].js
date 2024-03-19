import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

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
