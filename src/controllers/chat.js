const { chat,user } = require("../../models");

exports.addChat = async (req,res) => {

    try {
        let newChat = req.body;

        newChat = {
            ...newChat,
            idSender: req.user.id,
        }

        await chat.create(newChat);

        const newData = await chat.findOne({
            where:{idSender: req.user.id},
            attributes: {
                exclude: ["createdAt","updatedAt"],
            }

        })

        res.status(200).send({
            status: "success",
            data: {
                message: newData.message,
                idSender:  newData.idSender,
                idRecipient:  newData.idRecipient
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            status: "error",
            message: "server error",
        });
    }

};

exports.getChats = async (req,res) => {
    try {
        const data = await chat.findAll({
            where:{
                idSender: req.user.id
            },
            include:[
                {
                    model: user,
                    as: "recipient",
                    attributes:{
                        exclude: ["password","status","createdAt","updatedAt"],
                    },
                },
                {
                    model: user,
                    as: "sender",
                    attributes:{
                        exclude: ["password","status","createdAt","updatedAt"],
                    },
                },
            ],
            attributes:{
                exclude: ["createdAt","updatedAt"],
            },
        });

        res.status(200).send({
            status: "success",
            data: data,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            status: "error",
            message: "server error",
        });
    }
}