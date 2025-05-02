//#### Unit Controller ####

const { Unit, UnitType, Floor } = require("../models");

const createUnit = async (req, res) => {
  console.log("Create Unit Called!");
  try {
    const {
      societyId,
      unitName,
      buildingId,
      floorId,
      unitTypeId,
      unitNumber,
      unitsize,
    } = req.body;

    if (
      !societyId ||
      !unitName ||
      !buildingId ||
      !floorId ||
      !unitTypeId ||
      !unitNumber
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const isUnitExists = await Unit.findOne({ where: { unitName: unitName } });

    if (isUnitExists) {
      return res.status(400).json({ message: "Unit Already Exists" });
    }

    const newUnit = await Unit.create({
      societyId,
      unitName,
      buildingId,
      floorId,
      unitTypeId,
      unitNumber,
      unitsize,
    });

    res
      .status(201)
      .json({ message: "Unit created successfully!", data: newUnit });
  } catch (error) {
    console.error("Error creating unit: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getUnit = async (req, res) => {
  try {
    console.log("Get Unit Called!");
    console.log(req.query);

    const { unitName, unitNumber, unitsize, floorId, unitTypeId } = req.query;

    const societyId = req.params.societyId;

    if (!societyId) {
      return res.status(400).json({ message: "Society ID is required!" });
    }

    const whereClause = { societyId }; 

    if (unitName) whereClause.unitName = unitName;
    if (unitNumber) whereClause.unitNumber = unitNumber;
    if (unitsize) whereClause.unitsize = unitsize;
    if (floorId) whereClause.floorId = floorId;
    if (unitTypeId) whereClause.unitTypeId = unitTypeId;

    const units = await Unit.findAll({
      where: whereClause,
      include: [
        {
          model: UnitType,
          attributes: ["unitTypeId", "unitTypeName"],
        },
        {
          model: Floor,
          attributes: ["floorId", "floorName"], 
        },
      ],
    });

    if (units.length === 0) {
      return res.status(404).json({ message: "No units found for the specified filters!" });
    }

    return res.status(200).json({
      message: "Units fetched successfully!",
      data: units,
    });
  } catch (error) {
    console.error("Error fetching unit: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllUnits = async (req, res) => {
  try {
    const pagination = {
      page: parseInt(req.query.page, 10) || 0,
      pageSize: parseInt(req.query.pageSize, 10) || 10,
    };

    const whereClause = {};
    console.log(req.query);


    const { count, rows } = await Unit.findAndCountAll({
      where: whereClause,
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
      include: [
        {
          model: UnitType,
          attributes: ["unitTypeId", "unitTypeName"], 
        },
        {
          model: Floor,
          attributes: ["floorId", "floorName"], 
        },
      ],
    });

    const totalPages = Math.ceil(count / pagination.pageSize);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No units found!" });
    }

    return res.status(200).json({
      message: "Customers fetched successfully",
      data: rows,
      total: count,
      totalPages,
    });

  } catch (error) {
    console.error("Error fetching units: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createUnit, getUnit, getAllUnits };