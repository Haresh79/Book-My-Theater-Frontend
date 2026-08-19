'use client'

import SeatSelection from "@/components/SeatSelection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Seats() {
  const params = useParams();
  const slug = params.slug || [];
  const router = useRouter();
  const jId = slug[0];
  const [UID, setUID] = useState('');
  const [loadingPay, setLoadingPay] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeatsA, setAvailableSeatsA] = useState([]);
  const [availableSeatsB, setAvailableSeatsB] = useState([]);
  const [availableSeatsC, setAvailableSeatsC] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showTitle, setShowTitle] = useState('');

  useEffect(() => {
    setAvailableSeatsA(generateSeats(10));
    setAvailableSeatsB(generateSeats(10));
    setAvailableSeatsC(generateSeats(10));
  }, [jId]);

  const generateSeats = (numSeats) => {
    let seats = [];
    for (let i = 0; i < numSeats; i++) {
      seats.push({ isAvailable: true });
    }
    return seats;
  };

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('UID')) {
        setUID(localStorage.getItem('UID'));
      } else {
        router.push('/login');
      }
    }

    if (jId) {
      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search_by_jatra_id`, { 'jatra_id': jId })
        .then((res) => {
          if (res.data && res.data.data && res.data.data[0]) {
            const jatra = res.data.data[0];
            setShowTitle(jatra.title);
            if (jatra.ticket_price) {
              setTotalPrice(jatra.ticket_price * selectedSeats.length);
            }
          }
        }).catch((err) => {
          console.error('Error loading show price:', err);
        });
    }
  }, [selectedSeats, jId]);

  function generatePayment() {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat before proceeding.');
      return;
    }

    if (typeof window === 'undefined' || !window.Razorpay) {
      alert('Razorpay Checkout SDK is loading. Please try again in a few seconds.');
      return;
    }

    setLoadingPay(true);
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay`, { 'amount': totalPrice })
      .then((res) => {
        if (res.data && res.data.id) {
          const options = {
            'key': process.env.NEXT_PUBLIC_YOUR_RAZORPAY_TEST_KEY_ID,
            'amount': res.data.id.amount,
            'currency': res.data.id.currency,
            'name': 'Book My Theater',
            'description': `Tickets for ${showTitle || 'Jatra Show'}`,
            'order_id': res.data.id.id,
            'handler': function (response) {
              axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking`, {
                'u_id': UID,
                'jatra_id': jId,
                'seats': selectedSeats,
                'amount': totalPrice,
                'pay_id': response.razorpay_order_id,
                'razorpayPaymentId': response.razorpay_payment_id,
                'razorpaySignature': response.razorpay_signature,
              }).then((res) => {
                setLoadingPay(false);
                if (res.data) {
                  router.push('/bookings');
                }
              }).catch((err) => {
                setLoadingPay(false);
                console.error('Booking save error:', err);
                alert(err.response?.data?.error || 'Failed to save booking');
              });
            },
            'modal': {
              'ondismiss': function() {
                setLoadingPay(false);
              }
            }
          };
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          setLoadingPay(false);
          alert('Failed to generate Razorpay order ID.');
        }
      }).catch((err) => {
        setLoadingPay(false);
        console.error('Razorpay order creation error:', err);
        alert(err.response?.data?.error || 'Error creating Razorpay order');
      });
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white pb-28">
      <div>
        <Header />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
            <Link href="/" className="hover:text-purple-400 transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">home</span>
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-400">Seat Selection</span>
            {showTitle && (
              <>
                <span>/</span>
                <span className="text-purple-400 font-semibold">{showTitle}</span>
              </>
            )}
          </div>

          {/* Seat Status Legend Bar */}
          <div className="flex flex-wrap justify-center items-center gap-6 py-4 px-6 rounded-2xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-xl mb-6 shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-lg bg-slate-800 border border-slate-700"></div>
              <span className="text-xs font-semibold text-slate-300">Available</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 shadow-sm shadow-purple-500/50"></div>
              <span className="text-xs font-semibold text-purple-300">Selected</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-lg bg-slate-800/50 opacity-45 border border-slate-800"></div>
              <span className="text-xs font-semibold text-slate-500">Booked / Taken</span>
            </div>
          </div>

          {/* Interactive Seat Map */}
          <SeatSelection
            jatraID={jId}
            avilableSeatsA={availableSeatsA}
            avilableSeatsB={availableSeatsB}
            avilableSeatsC={availableSeatsC}
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
          />
        </main>
      </div>

      {/* Sticky Bottom Glassmorphic Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 border-t border-purple-500/30 backdrop-blur-2xl py-4 px-6 shadow-2xl">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">event_seat</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">
                {selectedSeats.length > 0 ? `Selected Seats (${selectedSeats.length}):` : 'No Seats Selected'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Click seats above to select'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Total Amount</span>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                ₹{totalPrice}
              </span>
            </div>

            <button
              disabled={selectedSeats.length === 0 || loadingPay}
              onClick={generatePayment}
              className={`px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 transition-all ${
                selectedSeats.length > 0 && !loadingPay
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-600/40 active:scale-95 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              {loadingPay ? (
                <div className="bouncing-loader">
                  <div></div><div></div><div></div>
                </div>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">payment</span>
                  <span>Proceed to Pay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}