const getAllProducts = async (req, res) => {
    res.json('All products');
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    res.json(`Product ${id}`);
};

const createProduct = async (req, res) => {
    res.json('Create product');
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    res.json(`Update product ${id}`);
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    res.json(`Delete product ${id}`);
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};