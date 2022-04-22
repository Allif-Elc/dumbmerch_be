const { products, user, category, categoryproduct } = require ("../../models");

exports.addProduct = async (req,res)=> {

    try{

        const data = { 
            image: req.file.filename,
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            qty: req.body.qty,
            idUser: req.user.id,
        }

        const newProduct = await products.create(data);

        let dataProduct = await products.findOne({
            where: {
                id: newProduct.id,
            },
            include:{
                model:user,
                as: "user",
                attributes:{
                    exclude: ["createdAt","updatedAt","password","status"]
                },
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        });

        dataProduct = JSON.parse(JSON.stringify(dataProduct));

        res.status(200).send({
            status: "success",
            data: {
                ...dataProduct,
                image: process.env.FILE_PATH + dataProduct.image,
            }
        })

    }catch(error){
        console.log(error);
        return res.status(400).send({
            status: "error",
            message: "server error",
        });
    };


}

exports.getProducts = async (req,res) => {

    try{

        let listProduct = await products.findAll({
            attributes:{
                exclude: ["createdAt","updatedAt"],
            },
        });

        listProduct = JSON.parse(JSON.stringify(listProduct));
        
        listProduct = listProduct.map((item) => {
            return { ...item, image: process.env.FILE_PATH + item.image };
          });
      
        res.status(200).send({
            status: "succes",
            data: listProduct
        })

    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error",
        })
    }

}

exports.getProduct = async (req,res) => {

    try{

        const { id } = req.params;

        let listProduct = await products.findOne({
            where:{
                id: id,
            },
            include:{
                model:user,
                as: "user",
                attributes:{
                    exclude: ["createdAt","updatedAt","password","status"]
                },
            },
            attributes:{
                exclude: ["createdAt","updatedAt"],
            },
        });

        listProduct = JSON.parse(JSON.stringify(listProduct));
                
        res.status(200).send({
            status: "succes",
            data:{
                product: {
                    ...listProduct,
                    image: process.env.FILE_PATH + listProduct.image
                }
            }
        });

    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error",
        });
    }

}

exports.updateProduct = async (req,res) => {

    try{

        const { id } = req.params;

        const data = {
            image: req?.file?.filename,
            title: req?.body?.title,
            desc: req?.body.desc,
            price: req?.body?.price,
            qty: req?.body?.qty,
            idUser: req?.user?.id,
          };
      
        const dataProduct = await products.update(data,{
            where: { id:id },
        });

        let listProduct = await products.findOne({
            where:{
                id: id,
            },
            attributes:{
                exclude: ["createdAt","updatedAt"],
            },
        });

        listProduct = JSON.parse(JSON.stringify(listProduct));

        res.status(200).send({
            status: "success",
            data: {
                product: {
                    ...listProduct,
                    image: process.env.FILE_PATH + listProduct.image
                },
            }
        })

    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error",
        });
    };
};

exports.deleteProduct = async (req,res) => {
    try{

        const {id} = req.params;

        const deleteProduct = await products.destroy({
            where: {id:id},
        });

        res.status(200).send({
            status: "success",
            data: {
                id: id,
            }
        })

    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message:"server error",
        });
    };
}

exports.searchProduct = async (req,res) => {

    try {
        const title = req.body.title;

        let listProduct = await products.findOne({
            where:{
                title: title,
            },
            attributes:{
                exclude: ["createdAt","updatedAt"],
            },
        });

        listProduct = JSON.parse(JSON.stringify(listProduct));

        res.status(200).send({
            status: "succes",
            data:{
                product: {
                    ...listProduct,
                    image: process.env.FILE_PATH + listProduct.image
                }
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message:"server error",
        });
    };
        
}