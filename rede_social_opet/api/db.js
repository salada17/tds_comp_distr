import Sequelize from 'sequelize'

const db = new Sequelize('postgres://postgres:postgres@localhost:5430/rede_social_opet_dev')

export { db }
