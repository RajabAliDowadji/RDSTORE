const searchPincode = require("india-pincode-search");
const PlaceModal = require("../models/Place.modal");
const { PLACE_API, COMMON } = require("../constants/Place.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.getPlaces = async (req, resp, next) => {
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

module.exports.getPlaceById = async (req, resp, next) => {
  const placeId = req.params.id;
  const place = await PlaceModal.findOne({ _id: placeId });
  if (place) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, PLACE_API.PLACE_SUCCESS.message, place)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
module.exports.getPlace = async (req, resp, next) => {
  const pincode = req.body.pincode;
  const pincodeResponse = await searchPincode.search(`${pincode}`);
  if (pincodeResponse.length != 0) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PLACE_API.PLACE_SUCCESS.message,
          pincodeResponse
        )
      );
  } else if (pincodeResponse.length === 0) {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PLACE_API.PLACE_NOT_FOUND.message));
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.addPlace = async (req, resp, next) => {
  const pincode = req.body.pincode;
  const pincodeResponse = await searchPincode.search(`${pincode}`);
  if (pincodeResponse.length != 0) {
    const place = await PlaceModal.findOne({ pincode });
    if (!place) {
      const placemodal = new PlaceModal({
        town: pincodeResponse[0].village,
        district: pincodeResponse[0].district,
        city: pincodeResponse[0].city,
        state: pincodeResponse[0].state,
        pincode: pincode,
      });
      await placemodal.save();
      return resp
        .status(STATUS.CREATED)
        .send(
          apiResponse(
            STATUS.CREATED,
            PLACE_API.PLACE_CREATE.message,
            placemodal
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

module.exports.updatePlace = async (req, resp, next) => {
  const placeId = req.params.id;
  const pincode = req.body.pincode;
  const pincodeResponse = await searchPincode.search(`${pincode}`);
  if (pincodeResponse.length != 0) {
    const place = await PlaceModal.findOne({ _id: placeId });
    if (place) {
      place.town = pincodeResponse[0].village;
      place.district = pincodeResponse[0].district;
      place.city = pincodeResponse[0].city;
      place.state = pincodeResponse[0].state;
      place.pincode = pincode;
      await place.save();
      return resp
        .status(STATUS.SUCCESS)
        .send(
          apiResponse(STATUS.SUCCESS, PLACE_API.PLACE_UPDATE.message, place)
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

module.exports.deletePlace = async (req, resp, next) => {
  const placeId = req.params.id;
  const response = await PlaceModal.findOne({ _id: placeId });
  if (response) {
    await PlaceModal.findByIdAndRemove({ _id: placeId });
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, PLACE_API.PLACE_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PLACE_API.PLACE_NOT_FOUND.message));
  }
};
