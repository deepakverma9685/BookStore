'use strict';
var today = new Date();
module.exports = (sequelize, DataTypes) => {
    var Model =  sequelize.define('Schools', {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        school_name: DataTypes.STRING,
        city_name:DataTypes.INTEGER,
        created_at:today,
        updated_at:today
    });
    return Model;
}