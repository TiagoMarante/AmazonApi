const TYPES = {
    IAuthService: Symbol.for("IAuthService"),

    IUserService: Symbol.for("IUserService"),
    IUserRepository: Symbol.for("IUserRepository"),

    IProductService: Symbol.for("IProductService"),
    IProductRepository: Symbol.for("IProductRepository"),

    IStockService: Symbol.for("IStockService"),
    IStockRepository: Symbol.for("IStockRepository"),

    ISupplierService: Symbol.for("ISupplierService"),
    ISupplierRepository: Symbol.for("ISupplierRepository"),
};

export { TYPES };