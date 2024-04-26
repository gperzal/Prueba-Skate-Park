
import { Skater } from '../models/skaterModel.js';

export const getDashboard = async (req, res) => {
    try {
        // Lógica para obtener datos relevantes para el dashboard
        res.render('admin.hbs', { data: dashboardData });
    } catch (error) {
        res.status(500).json({ message: 'Error accessing admin dashboard.' });
    }
};

// export const approveUser = async (req, res) => {
//     try {
//         const result = await Skater.update({ estado: true }, { where: { id: req.params.id } });
//         if (result[0] > 0) {
//             res.json({ message: 'User approved successfully.' });
//         } else {
//             res.status(404).json({ message: 'User not found.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error approving user.' });
//     }
// };

export const approveUser = async (req, res) => {
    const { estado } = req.body;  // Estado es enviado desde el cliente
    const { id } = req.params;   // ID del usuario a actualizar

    try {
        const result = await Skater.update({ estado }, { where: { id } });
        if (result[0] > 0) {
            res.json({ message: `User status updated to ${estado}.` });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Error updating user status.' });
    }
};




export const listPendingAccounts = async (req, res, next) => {
    try {
        // Buscar todos los skaters cuyo estado es false (no aprobados)
        const pendingSkaters = await Skater.findAll({
            where: {
                estado: false
            }
        });

        if (pendingSkaters.length > 0) {
            res.json(pendingSkaters);
        } else {
            res.status(404).json({ message: "No pending accounts found." });
        }
    } catch (error) {
        console.error("Error fetching pending accounts: ", error);
        res.status(500).json({ message: "Error retrieving pending accounts from the database." });
        next(error);
    }
};

