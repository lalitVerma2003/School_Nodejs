import sequelize from "../models/index.js";
import httpStatus from "http-status"
import School from "../models/school.js";

export async function addSchool(req, res) {
    try {
      const dbtrans = await sequelize.transaction();
      const { name, address, latitude, longitude } = req.body;
  
      const newSchool = await School.create({ name, address, latitude, longitude }, {transaction:dbtrans});
      await dbtrans.commit();
      return res.status(201).json({ success:true, status:httpStatus.CREATED, message: 'School added successfully', result: newSchool, error:"" });
    } catch (err) {
      if (dbtrans) await dbtrans.rollback();
      return res.status(500).json({ success:false, status:httpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', error: err.message, result:{} });
    }
};

export async function listSchools(req, res) {
    try {
      let { latitude, longitude } = req.query;

      if (!latitude || !longitude ) {
        return res.status(400).json({ success:false, status:httpStatus.BAD_REQUEST, message: 'Latitude, Longitude is required', result: {}, error: 'Latitude, Longitude is required' });
      }
      latitude = parseFloat(latitude)
      longitude = parseFloat(longitude)
      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({
          success: false,
          status: httpStatus.BAD_REQUEST,
          result:{},
          message: "Invalid or missing latitude/longitude",
          error: "Latitude and longitude must be valid numbers",
        });
      }
  
      const schools = await sequelize.query(
          `
          SELECT *, (
            6371 * acos(
              cos(radians(:lat)) *
              cos(radians(latitude)) *
              cos(radians(longitude) - radians(:lng)) +
              sin(radians(:lat)) *
              sin(radians(latitude))
            )
          ) AS distance
          FROM schools
          ORDER BY distance ASC
          `,
          {
            replacements: { lat: latitude, lng: longitude },
            model: School,
            mapToModel: true,
          }
      );
      return res.status(200).json({ success:true, status:httpStatus.OK, message: 'School fetched successfully', result: schools, error:"" });
    } catch (err) {
      return res.status(500).json({ success:false, status:httpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', error: err.message, result:{} });
    }
};
  