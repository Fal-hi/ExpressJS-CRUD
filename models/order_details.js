module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'order_details',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
      },
    },
    {
      sequelize,
      tableName: 'order_details',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_ortail_id',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
