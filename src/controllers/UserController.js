import { Webhook } from "svix";
import User from "../models/User.js";


const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        })
        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }
                await User.create(userData);
                res.status({});
                
                break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                await User.findOneAndUpdate({
                    clerkId: data.id}, 
                    userData
                );
                res.status({});
                
                break;
            }

            case "user.deleted": {
                await User.findOneAndDelete({
                    clerkId: data.id,
                });
                res.status({});
                
                break;
            }
            default:
                res.status(200)
                break;
        };

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }

}

export default clerkWebhooks;
