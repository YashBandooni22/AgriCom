import express from 'express'
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentCancel,
  appointmentsAdmin,
  loginAdmin,
} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

// POST /add-doctor - add a new doctor (auth + image upload)
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)

// POST /login - admin login (no auth required obviously)
adminRouter.post('/login', loginAdmin)

// POST /all-doctors - fetch all doctors (admin only)
adminRouter.post('/all-doctors', authAdmin, allDoctors)

// POST /change-availability - update doctor's availability (admin only)
adminRouter.post('/change-availability', authAdmin, changeAvailability)

// GET /appointments - list all appointments for admin
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)

// POST /cancel-appointment - admin cancels an appointment
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)

// GET /dashboard - admin dashboard stats
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter
