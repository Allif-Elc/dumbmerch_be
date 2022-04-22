const { user, profile } = require("../../models");

exports.addProfile = async (req,res) => {

    try{

        let data = {
            idUser: req.user.id
        }

        await profile.create(data);

        const newUser = await profile.findOne({
            where: {idUser: req.user.id},

            includes:{
                model: user,
                as: "user",
                attributes:{
                    exclude: ["password","status","createdAt","updatedAt"],
                },
            },

            attributes: {
                exclude: ["createdAt","updatedAt"],
            }
        });

        res.status(200).send({
            status: "success",
            data : newUser,
        })

    }catch(error){
        console.log(error);
        return res.status(400).send({
            status: "error",
            message: "server error",
        });
    }

};


exports.getProfile = async (req,res) => {

    try{

        let userExist = await profile.findOne({
            where: {idUser: req.user.id},

            include:{
                model: user,
                as: "user",
                attributes:{
                    exclude: ["password","status","createdAt","updatedAt"],
                },
            },

            attributes: {
                exclude: ["createdAt","updatedAt"],
            }
        });

        userExist = JSON.parse(JSON.stringify(userExist));

        userExist = {
            ...userExist,
            photo: process.env.FILE_PATH + userExist.photo,
        }

        res.status(200).send({
            status: "success",
            data : userExist,
        })

    }catch(error){
        console.log(error);
        return res.status(400).send({
            status: "error",
            message: "server error",
        });
    }

};

exports.updateUser = async (req,res)=>{
  try {    
      
    dataProfile = {
        photo: req?.file?.filename,
        gender: req?.body?.gender,
        address: req?.body?.address,
    };
    

    const newProfile = await profile.update(dataProfile,{
        where: {idUser:req.user.id},
    });

    let data = await profile.findOne({
        where: {idUser:req.user.id},
        includes:{
            model: user,
            as: "user",
            attributes:{
            exclude: ["password","status","createdAt","updatedAt"],
            }
        },
        attributes: {
            exclude: ["createdAt","updatedAt"]
        },
    });

    data = JSON.parse(JSON.stringify(data));

    
    res.status(200).send({
        status: "success",
        data: {
            ...data,
            photo: process.env.FILE_PATH + data.photo,
        }
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send({
        status: "error",
        message: "server error",
    }); 
  };
}