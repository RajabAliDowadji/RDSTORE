const searchPincode = require("india-pincode-search");
const PlaceModal = require("../models/Place.modal");
const { PLACE_API, COMMON } = require("../constants/Place.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createPlace = async (req, resp) => {
  const zipCode = req.body.zipCode;
  const zipCodeResponse = await searchPincode.search(`${zipCode}`);
  if (zipCodeResponse.length != 0) {
    const place = await PlaceModal.findOne({ zipCode });
    if (!place) {
      const placeModal = new PlaceModal({
        town: zipCodeResponse[0].village,
        district: zipCodeResponse[0].district,
        city: zipCodeResponse[0].city,
        state: zipCodeResponse[0].state,
        zipCode: zipCode,
      });
      await placeModal.save();
      const placeModalResponse = {
        ...placeModal.toObject(),
        _id: undefined,
      };

      return resp
        .status(STATUS.CREATED)
        .send(
          apiResponse(
            STATUS.CREATED,
            PLACE_API.PLACE_CREATE.message,
            placeModalResponse
          )
        );
    } else {
      return resp
        .status(STATUS.BAD)
        .send(
          errorResponse(STATUS.BAD, PLACE_API.PLACE_ALREADY_REGISTER.message)
        );
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PLACE_API.PLACE_NOT_FOUND.message));
  }
};

module.exports.updatePlace = async (req, resp) => {
  const placeId = req.params.id;
  const zipCode = req.body.zipCode;
  const zipCodeResponse = await searchPincode.search(`${zipCode}`);
  if (zipCodeResponse.length != 0) {
    const place = await PlaceModal.findOne({ id: placeId });
    if (place) {
      place.town = zipCodeResponse[0].village;
      place.district = zipCodeResponse[0].district;
      place.city = zipCodeResponse[0].city;
      place.state = zipCodeResponse[0].state;
      place.zipCode = zipCode;

      await place.save();

      const placeModalResponse = {
        ...place.toObject(),
        _id: undefined,
      };

      return resp
        .status(STATUS.SUCCESS)
        .send(
          apiResponse(
            STATUS.SUCCESS,
            PLACE_API.PLACE_UPDATE.message,
            placeModalResponse
          )
        );
    } else {
      return resp
        .status(STATUS.BAD)
        .send(errorResponse(STATUS.BAD, PLACE_API.PLACE_INVALID_ID.message));
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PLACE_API.PLACE_NOT_FOUND.message));
  }
};

module.exports.deletePlace = async (req, resp) => {
  const placeId = req.params.id;
  const place = await PlaceModal.findOne({ id: placeId });
  if (place) {
    place.activity = {
      ...place.activity,
      is_deleted: true,
      is_active: false,
    };
    await place.save();
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, PLACE_API.PLACE_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PLACE_API.PLACE_NOT_FOUND.message));
  }
};

module.exports.getPlaces = async (req, resp) => {
  const places = await PlaceModal.find();
  if (places) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, PLACE_API.PLACE_SUCCESS.message, places)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
