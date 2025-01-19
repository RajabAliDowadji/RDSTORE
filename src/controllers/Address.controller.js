const searchPincode = require("india-pincode-search");
const AddressModal = require("../models/Address.modal");
const PlaceModal = require("../models/Place.modal");
const { ADDRESS_API, COMMON } = require("../constants/Address.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createAddress = async (req, resp) => {
  const userId = req.id;
  const { streetAddress, village, place, place_type, otherDetails } = req.body;
  const zipCodeResponse = await searchPincode.search(`${place}`);
  if (zipCodeResponse.length != 0) {
    const placeDetails = await PlaceModal.findOne({ zipCode: place });
    const address = await AddressModal.findOne({ user: userId });
    if (placeDetails && !address) {
      const addressModal = new AddressModal({
        user: userId,
        address: [
          {
            place: placeDetails.id,
            village: village,
            place_type: place_type,
            otherDetails: otherDetails,
            streetAddress: streetAddress,
          },
        ],
      });

      await addressModal.save();

      const addressModalResponse = {
        ...addressModal.toObject(),
        _id: undefined,
      };

      return resp
        .status(STATUS.CREATED)
        .send(
          apiResponse(
            STATUS.CREATED,
            ADDRESS_API.ADDRESS_CREATE.message,
            addressModalResponse
          )
        );
    } else {
      return resp
        .status(STATUS.BAD)
        .send(
          errorResponse(
            STATUS.BAD,
            ADDRESS_API.ADDRESS_ALREADY_REGISTER.message
          )
        );
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, ADDRESS_API.ADDRESS_NOT_FOUND.message));
  }
};

module.exports.getAddresses = async (req, resp) => {
  const userId = req.id;
  const addresses = await AddressModal.findOne({ user: userId }).populate(
    "address.place"
  );
  if (addresses) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          ADDRESS_API.ADDRESS_SUCCESS.message,
          addresses
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.addAddress = async (req, resp) => {
  const userId = req.id;
  const { streetAddress, village, place, place_type, otherDetails } = req.body;
  const userAddress = await AddressModal.findOne({ user: userId });
  const placeDetails = await PlaceModal.findOne({ zipCode: place });
  if (userAddress) {
    const addressIndex = userAddress.address.findIndex(
      (address) =>
        address.place.toString() === place.toString() &&
        streetAddress.toString() === address.streetAddress.toString()
    );
    if (addressIndex === -1) {
      userAddress.address.push({
        place: placeDetails.id,
        village: village,
        place_type: place_type,
        otherDetails: otherDetails,
        streetAddress: streetAddress,
      });
    }
    await userAddress.save();

    const userAddressResponse = {
      ...userAddress.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          ADDRESS_API.ADDRESS_UPDATE.message,
          userAddressResponse
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
// NEED TESTING
module.exports.updateAddress = async (req, resp) => {
  const userId = req.id;
  const {
    place,
    village,
    place_type,
    address_id,
    otherDetails,
    streetAddress,
  } = req.body;
  const userAddress = await AddressModal.findOne({ user: userId });
  const placeDetails = await PlaceModal.findOne({ zipCode: place });
  if (userAddress) {
    const addressIndex = userAddress.address.findIndex(
      (address) => address.id.toString() === address_id.toString()
    );
    if (addressIndex != -1) {
      const update_address = userAddress.address[addressIndex];
      update_address.village = village || update_address.village;
      update_address.place_type = place_type || update_address.place_type;
      update_address.otherDetails = otherDetails || update_address.otherDetails;
      update_address.place = placeDetails.id || update_address.place;
      update_address.streetAddress =
        streetAddress || update_address.streetAddress;
    }
    await userAddress.save();

    const userAddressResponse = {
      ...userAddress.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          ADDRESS_API.ADDRESS_UPDATE.message,
          userAddressResponse
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
// NEED TESTING
module.exports.deleteAddress = async (req, resp) => {
  const userId = req.id;
  const { address_id } = req.body;
  const userAddress = await AddressModal.findOne({
    user: userId,
  });
  if (userAddress) {
    const addressIndex = userAddress.address.findIndex(
      (address) => address.id.toString() === address_id.toString()
    );
    if (addressIndex === -1) {
      return resp
        .status(STATUS.BAD)
        .send(
          errorResponse(STATUS.BAD, ADDRESS_API.ADDRESS_INVALID_ID.message)
        );
    }
    userAddress.address.splice(addressIndex, 1);

    await userAddress.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          ADDRESS_API.ADDRESS_DELETE.message,
          superAdminResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, ADDRESS_API.ADDRESS_NOT_FOUND.message));
  }
};
