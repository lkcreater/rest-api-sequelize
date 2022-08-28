
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Role = sequelize.define(
        "role", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            items: {
                type: DataTypes.TEXT,
                get(){
                    const storedValue = this.getDataValue('items');
                    if(storedValue){
                        return JSON.parse(storedValue);
                    }
                    return storedValue;
                },
                set(value){
                    this.setDataValue('items', JSON.stringify(value));
                }
            },
            is_admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        },
        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
  
    return Role;
  };