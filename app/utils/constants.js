const DELETION_SUCCESS = "Deletion is successful"
const DELETION_ERROR = "Error while deleting resource"
const PARAMETER_MISSING = "Necessary parameter missing"
const SUCCESS = "Resource creation successful"
const RESOURCE_CREATION_ERROR = "Error while resource creation"
const RESOURCE_ALREADY_PRESENT = "Resource already present"
const RESOURCE_NOT_FOUND = "Resource Not Found"
const DATABASE_CONNECTION_ERROR = "Error while retrieving or connecting to the database"
const UPDATE_SUCCESS = "Resource updation successful"
const UPDATE_ERROR = "Error while updating resource"
const PARAMETER_NOT_PRESENT_IN_DATABASE = "Query parameters does not exits in the database"
const NAME = 'name';
const NUMBER_OF_SEATS = 'numberOfSeats';
const FLOOR_NUMBER = 'floorNumber';
const WHITEBOARD = 'whiteboard';
const ROOM_PIC = 'roomPic';
const CONFERENCE_COST_IN_CREDITS = 'conference_cost_in_credits'
const DATE_TO_BOOK = 'dateToBook';
const ROOM_ID = 'roomId';
const SLOTS_REQUIRED = 'slotsRequired';
const USERNAME = 'userName';
const SLOT_IS_FULL = 'Slot is full, Please try with other slots or date';

module.exports = {
    SLOT_IS_FULL,
    DATE_TO_BOOK,
    ROOM_ID,
    SLOTS_REQUIRED,
    USERNAME,
    NAME,
    NUMBER_OF_SEATS,
    FLOOR_NUMBER,
    WHITEBOARD,
    ROOM_PIC,
    CONFERENCE_COST_IN_CREDITS,
    DELETION_SUCCESS,
    DELETION_ERROR,
    PARAMETER_MISSING,
    SUCCESS,
    RESOURCE_CREATION_ERROR,
    RESOURCE_ALREADY_PRESENT,
    RESOURCE_NOT_FOUND,
    DATABASE_CONNECTION_ERROR,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    PARAMETER_NOT_PRESENT_IN_DATABASE
}