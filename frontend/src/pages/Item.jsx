import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import mario from "../assets/mario.png";

const Appointment = () => {
  const { itemId } = useParams();
  const { items, currencySymbol, backendUrl, token, getItemsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [itemInfo, setItemInfo] = useState(null);
  const [itemSlots, setItemSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  const staticTimeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"
  ];

  const fetchItemInfo = () => {
    const info = items.find((item) => item._id === itemId);
    setItemInfo(info);
  };

  const getAvailableSlots = () => {
    setItemSlots([]);

    let slots = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      slots.push({
        date: date,
        timeSlots: staticTimeSlots,
      });
    }

    setItemSlots(slots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book item");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const date = itemSlots[slotIndex].date;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-item",
        { itemId, slotDate, slotTime, quantity },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getItemsData();
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchItemInfo();
  }, [items, itemId]);

  useEffect(() => {
    getAvailableSlots();
  }, [itemInfo]);

  const totalCost = itemInfo ? itemInfo.fees * quantity : 0;

  return (
    itemInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="w-full sm:max-w-72 rounded-lg" src={mario} alt="Item" />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <h1 className="flex items-center gap-2 text-5xl font-medium text-green-600">
              Proceed... With Your Purchase
            </h1>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <h2 className="flex items-center gap-2 text-2xl font-medium text-blue-900">
                Assured Products
                <img className="w-5" src={assets.verified_icon} alt="Verified" />
              </h2>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <img src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                You grow it, we help you sell it. With [Your Website Name], farmers can easily list their crops, tools, and products, reaching real buyers directly. No middlemen, no extra cuts—just more money in your pocket. From your field to their doorstep, we make it simple, fair, and profitable.
              </p>
            </div>
          </div>
        </div>

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Choose your Date and Time</p>

          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {itemSlots.length > 0 &&
              itemSlots.map((slot, index) => {
                const date = new Date(slot.date);
                return (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index
                      ? "bg-green-600 text-white"
                      : "border border-gray-200"
                      }`}
                    key={index}
                  >
                    <p>{daysOfWeek[date.getDay()]}</p>
                    <p>{date.getDate()}</p>
                  </div>
                );
              })}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {itemSlots.length > 0 &&
              itemSlots[slotIndex]?.timeSlots.map((time, index) => (
                <p
                  onClick={() => setSlotTime(time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${time === slotTime
                    ? "bg-green-600 text-white"
                    : "text-gray-400 border border-gray-300"
                    }`}
                  key={index}
                >
                  {time}
                </p>
              ))}
          </div>

          <div className="mt-4">
            <label htmlFor="quantity" className="block text-sm text-gray-700 font-medium">
              Quantity
            </label>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 text-center border border-gray-300 rounded-md"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                +
              </button>
            </div>
          </div>

          <p className="mt-2 text-lg font-medium">
            Total Cost: {currencySymbol} {totalCost}
          </p>

          <button
            onClick={bookAppointment}
            className="bg-green-600 text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book NOW
          </button>
        </div>
      </div>
    )
  );
};

export default Appointment;
