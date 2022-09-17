
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Profile = sequelize.define(
        "profile", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            image: {
                type: DataTypes.TEXT,
                get(){
                    const value = this.getDataValue('image');
                    if(value){
                        return JSON.parse(value);
                    }
                    return value;
                },
                set(value){
                    this.setDataValue('image', JSON.stringify(value));
                }
            },
            firstname: {
                type: DataTypes.STRING
            },
            surename: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.CHAR(100)
            },
            birthday: {
                type: DataTypes.DATE
            },
            sex: {
                type: DataTypes.ENUM({
                    values : ['Male', 'Female']
                }),
                defaultValue: 'Male'
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
  
    return Profile;
  };