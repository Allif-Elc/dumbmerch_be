const { category } = require("../../models");

exports.addCategory = async (req,res)=>{

    try{
        
        const datcat = {
            name: req.body.name,
        }

        const newCategory = await category.create(datcat);

        res.status(200).send({
            status: "success",
            data:{
                id: newCategory.id,
                name: newCategory.name,
            },
        });

    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error",
        });
    };
};

exports.getCategory = async (req,res)=>{

    try{

        const { id } = req.params;

        const data = await category.findOne({
            where:{id:id},
            attributes:{
                exclude:["createdAt","updatedAt"],
            },
        });

        res.status(200).send({
            status: "success",
            data:{
                data
            },
        });

    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error",
        });
    };
};

exports.getCategories = async (req,res)=>{

    try{

        const data = await category.findAll({
            attributes:{
                exclude:["createdAt","updatedAt"],
            },
        });

        res.status(200).send({
            status: "success",
            data:
              data,
            
        });

    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error",
        });
    };
};

exports.updateCategory = async (req,res)=>{

    try{
        const {id} = req.params;

        const data = await category.update(req.body,{
            where:{
                id:id,
            },
        });

        const newdata = await category.findOne({
            where:{
                id:id,
            },
            attributes:{
                exclude:["createdAt","updatedAt"],
            },
        })

        res.status(200).send({
            status: "success",
            data:{
              id:newdata.id,
              name:newdata.name,
            },
        });

    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error",
        });
    };
};

exports.deleteCategory = async (req,res)=>{

    try{
        const {id} = req.params;

        const data = await category.destroy({
            where:{
                id:id,
            },
            attributes:{
                exclude:["createdAt","updatedAt"],
            }
        });

        res.status(200).send({
            status: "success",
            data:{
              id:id,
            },
        });

    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error",
        });
    };
};