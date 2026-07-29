import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/User.js";

const removeBGImage = async (req, res) => {
 
    try {
        const { clerkId } = req;
        const user = await User.findOne({
            clerkId,
        });

        if (!user) {
            return res.status(404).json({ success:false, message: "Usuário não encontrado!"});
        } 

        if (user.creditBalance === 0) {
            return res.status(403).json({ success:false, message: "Usuário sem créditos para essa operação!", creditBalance:user.creditBalance});
        }

        const imagePath = req.file.path;

        if (!imagePath) {
            return res.status(400).json({ success:false, message: "Nenhuma imagem enviada!"});
        }

        const imageFile = fs.createReadStream(imagePath);
        const formdata = new FormData();
        formdata.append("image_file", imageFile);
        
        console.log("Chamando ClipDrop");
        const { data } = await axios.post("https://clipdrop-api.co/remove-background/v1", formdata, {
            headers: {
                ...formdata.getHeaders(),
                "x-api-key": process.env.CLIPDROP_API,
            },
            responseType: "arraybuffer",
        });

        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        await User.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1});

        fs.unlinkSync(imagePath);
        return res.json({ success: true, resultImage, creditBalance: user.creditBalance - 1, message: "Fundo removido com sucesso!"});

    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Erro ao remover fundo"
    });
}
}

export { removeBGImage };
