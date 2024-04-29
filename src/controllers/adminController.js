
import { Skater } from '../models/skaterModel.js';
import path from 'path';
export const getDashboard = async (req, res) => {
    try {

        let skaters = await Skater.findAll();
        skaters = JSON.parse(JSON.stringify(skaters));
        // res.render(path.resolve("src", "views", "pages", "admin.hbs"), { skaters: skaters });
        console.log("OK render");
        res.render('pages/admin', {
            title: 'Admin Dashboard',
            user: req.user,
            skaters: skaters
        });
    } catch (error) {
        res.status(500).json({ message: 'Error accessing admin dashboard.' });
    }
};

export const approveUser = async (req, res) => {
    const { estado } = req.body;  // Estado es enviado desde el cliente
    const { id } = req.params;   // ID del usuario a actualizar

    try {
        const result = await Skater.update({ estado }, { where: { id } });
        const skater = await Skater.findByPk(id);
        if (!skater) {
            return res.status(404).json({ message: 'Skater not found' });
        }

        skater.estado = estado;
        await skater.save();

        res.json({ message: 'Skater status updated', skater });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Error updating user status.' });
    }
};


