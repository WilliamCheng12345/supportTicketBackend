const { getConnection } = require('../model')
const supportTicketController = {}

supportTicketController.getRequests = async (req, res, next) => {
  const pool = await getConnection()
  try {
    const { recordset } = await pool.query('SELECT SupportTickets.ID, SupportTickets.Name, SupportTickets.Email, SupportTickets.Description, ' +
            'Status.Status FROM SupportTickets INNER JOIN Status ON SupportTickets.status = Status.ID')
    res.status(200).json(recordset)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

supportTicketController.createRequest = async (req, res, next) => {
  const { name, email, description, status } = req.body
  const pool = await getConnection()
  try {
    await pool.query(`INSERT INTO SupportTickets VALUES ('${name}', '${email}', '${description}', ${status})`)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

supportTicketController.updateStatus = async (req, res, next) => {
  const { id, status } = req.body
  const pool = await getConnection()
  try {
    await pool.query(`UPDATE SupportTickets SET Status = ${status} WHERE ID = ${id}`)
    const { recordset } = await pool.query('SELECT SupportTickets.ID, Status.Status FROM SupportTickets ' +
        `INNER JOIN Status ON SupportTickets.status = Status.ID WHERE SupportTickets.ID = ${id}`)

    res.status(200).json(recordset)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = supportTicketController
