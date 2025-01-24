import { parse, format } from "date-fns";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export const calculateBillingData = (
  roomAndGuest,
  bookingDate,
  selectedRoom,
  matchedProperty
) => {
  const startDate = new Date(bookingDate?.startDate);
  const endDate = new Date(bookingDate?.endDate);
  const numberOfDays =
    startDate && endDate
      ? Math.max(Math.ceil((endDate - startDate) / (1000 * 3600 * 24)), 1)
      : 1;

  const roomRate = selectedRoom?.rate || 0;
  const commissionPercentage = matchedProperty?.margin / 100;
  const commission = roomRate
    ? roomRate * commissionPercentage * (roomAndGuest?.room || 1) * numberOfDays
    : 0;

  const gstAmount = (matchedProperty?.gst / 100) * selectedRoom?.rate;
  const roomPriceWIthGST = selectedRoom?.rate + gstAmount;

  const extraPersonPrice =
    (roomAndGuest?.extraPerson || 0) * 350 * numberOfDays;

  const finalRoomPrice = roomPriceWIthGST * numberOfDays * roomAndGuest?.room;

  const totalPrice = finalRoomPrice + extraPersonPrice + commission;

  return {
    numberOfDays,
    commission,
    roomPriceWIthGST,
    extraPersonPrice,
    finalRoomPrice,
    totalPrice,
  };
};

export const formatDate = (dateString) => {
  const parsedDate = parse(dateString, "MMM d, yyyy", new Date());
  return parsedDate ? format(parsedDate, "yyyy-MM-dd") : "";
};

export const generateUniqueIds = () => ({
  id: uuidv4(),
  booking_id: uuidv4(),
  room_book: uuidv4(),
});

export const prepareGuestData = ({
  session,
  matchedProperty,
  selectedRoom,
  formattedDates,
  roomAndGuest,
  billingData,
  roomTag,
}) => {
  const { id, booking_id } = generateUniqueIds();
  localStorage.setItem("my_id", booking_id);

  const checkIsManual = matchedProperty?.is_auto ? false : true;

  return {
    id,
    property_id: selectedRoom?.property_id,
    profile_id: session?.user?.id,
    name: session?.user_metadata?.name || "",
    contact: session?.user?.phone || "",
    email: session?.user?.email || "",
    check_in_date: formattedDates.startDate,
    check_out_date: formattedDates.endDate,
    guest_check_in_time: matchedProperty?.check_in_time,
    guest_check_out_time: matchedProperty?.check_out_time,
    number_of_children: 0,
    number_of_adults: roomAndGuest?.guest,
    room_assigned: [roomTag],
    bill_clear: false,
    created_at: new Date(),
    updated_at: new Date(),
    booking_id,
    booking_status: "processing",
    payments: [],
    paid_to_status: "unPaidFromGuest",
    is_manual_entry: checkIsManual,
    total_amount: billingData?.totalPrice,
    extra_guest: {
      extraPerson: roomAndGuest?.extraPerson,
      extraPrice: billingData?.extraPersonPrice,
    },
    our_charges: billingData?.commission,
    total_roomPrice: billingData?.finalRoomPrice,
  };
};
