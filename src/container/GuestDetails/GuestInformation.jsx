// import FormComponent from "@/componets/guest-details/FormComponent";
// import PaymentBar from "@/componets/guest-details/PaymentBar";

// export default function GuestInformation() {
//   return (
//     <div className="min-h-fit flex flex-col lg:flex-row justify-between items-start gap-10 pb-20 lg:px-20 lg:py-10">
//       <div className=" w-full lg:w-[60%] h-full">
//         {/* Form Section */}
//         <FormComponent />
//       </div>
//       <div className="w-full lg:w-[40%] h-full">
//         {/* Payment Section */}
//         <PaymentBar />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import FormComponent from "@/componets/guest-details/FormComponent";
import PaymentBar from "@/componets/guest-details/PaymentBar";

export default function GuestInformation() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    checkin: "",
    checkout: "",
    adults: 2,
    children: 0,
  });

  const handleSubmit = () => {
    alert(formData, "submit form");
  };

  const [step, setStep] = useState(1);

  const handleContinue = (data) => {
    setFormData(data);
    setStep(2);
  };

  return (
    <div className="">
      <div className="min-h-fit pb-20 lg:hidden">
        {step === 1 ? (
          <FormComponent
            onContinue={handleContinue}
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
            <div className="w-full lg:w-[60%]">
              <PaymentBar formData={formData} setStep={setStep} />
            </div>
          </div>
        )}
      </div>
      <div className="min-h-fit pb-20 px-10 lg:px-5 lg:py-5 hidden w-full lg:flex items-center justify-center">
        <div className="border  flex items-center justify-center">
          <div className="w-[50%] border-r">
            <FormComponent
              onContinue={handleContinue}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
            />
          </div>

          <div className="w-[40%]">
            <PaymentBar formData={formData} setStep={setStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
