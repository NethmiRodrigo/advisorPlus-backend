const { Advisor_Profile, Advisor_Service, Service } = require("../models");

exports.addServices = async (request, response) => {
  const advisor_id = request.user.uid;

  const services = request.body.services;

  service_data = [];

  services.forEach((element) => {
    data = {
      id: element,
      user_id: advisor_id,
    };

    service_data.push(data);
  });

  try {
    let advisor_services = await Advisor_Service.bulkCreate(service_data);

    return response.status(201).json({ advisor_services });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError")
      return response
        .status(400)
        .json({ error: { message: "Advisor already has this service" } });
    return response.status(500).json({ error });
  }
};

exports.getAllServices = async (request, response) => {
  const advisor_id = request.params.advisor_id;
  let serviceIds = [];

  try {
    let advisor_services = await Advisor_Service.findAll({
      where: {
        user_id: advisor_id,
      },
    });

    advisor_services.forEach((element) => {
      serviceIds.push(element.id);
    });

    let services = await Service.findAll({
      where: {
        id: serviceIds,
      },
    });

    return response.status(200).json({ services });
  } catch (error) {
    response.status(500).json({ error });
  }
};

exports.getAllAdvisors = async (request, response) => {
  const service_id = request.params.service_id;

  let advisorIds = [];

  try {
    let advisor_services = await Advisor_Service.findAll({
      where: {
        id: service_id,
      },
    });

    advisor_services.forEach((element) => {
      advisorIds.push(element.user_id);
    });

    let advisors = await Advisor_Profile.findAll({
      where: {
        user_id: advisorIds,
      },
    });

    return response.status(200).json({ advisors });
  } catch (error) {
    response.status(500).json({ error });
  }
};
