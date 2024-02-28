import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    const client = await clientPromise;
    const body = req.body;
    const db = client.db("sample_mflix");
    const idMovie = req.query.id;

    let stat;

    switch (req.method) {
        case "GET":
            try {    
                let dbMovie = await db.collection("movies").findOne({ _id: new ObjectId(idMovie) });
                res.json({ status: 200, data: dbMovie });
            } catch (e) {
                console.log(e)
                res.json({ status: 500 })
            }
            break;

        case "POST":
            // .. Here the logic for GET case
            break;

        case "PUT":
            let replacement = body;
            delete replacement._id
            replacement.year = 1904;

            try {
                db.collection("movies").findOneAndReplace({ _id: new ObjectId(idMovie) }, replacement);
                res.json({ status: 200 }) 
            } catch (e) {
                console.log(replacement)
                console.log(e)
                res.json({ status: 500 })
            }

            break;

        case "DELETE":
            try {
                let dbMovie = await db.collection("movies").findOneAndDelete({ _id: new ObjectId(idMovie) });
                res.json({ status: 200 }) 
            } catch (e) {
                console.log(e)
                res.json({ status: 500 })
            }
            
            break;
    }
}

